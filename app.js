const SERVICES = [
  { id: "corte", name: "Corte clássico", price: 45, duration: "45 min" },
  { id: "barba", name: "Barba & acabamento", price: 35, duration: "30 min" },
  { id: "combo", name: "Combo Flow", price: 70, duration: "75 min" },
];
const STORAGE_KEY = "barbearia-flow-appointments";
const state = { selectedService: SERVICES[0], appointments: loadAppointments() };
const $ = (selector) => document.querySelector(selector);

function loadAppointments() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveAppointments() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.appointments)); }
function money(value) { return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
}
function showView(route) {
  const name = route || "inicio";
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === name));
  document.querySelectorAll("[data-route]").forEach((link) => link.classList.toggle("active", link.dataset.route === name));
  $(".main-nav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "admin" && sessionStorage.getItem("flow-admin") === "true") showAdminPanel();
}
function renderServices() {
  $("#service-options").innerHTML = SERVICES.map((service) => `<button type="button" class="service-option ${service.id === state.selectedService.id ? "selected" : ""}" data-service="${service.id}"><strong>${service.name}</strong><span>${money(service.price)} • ${service.duration}</span></button>`).join("");
  document.querySelectorAll(".service-option").forEach((button) => button.addEventListener("click", () => {
    state.selectedService = SERVICES.find((service) => service.id === button.dataset.service);
    renderServices(); updateSummary();
  }));
}
function populateTimes() {
  const date = $("#booking-date").value;
  const select = $("#booking-time");
  if (!date) { select.innerHTML = '<option value="">Selecione a data primeiro</option>'; return; }
  const day = new Date(`${date}T12:00:00`).getDay();
  if (day === 0 || day === 1) { select.innerHTML = '<option value="">Fechado neste dia</option>'; return; }
  const taken = state.appointments.filter((item) => item.date === date && item.status !== "cancelled").map((item) => item.time);
  const slots = [];
  for (let hour = 9; hour < 19; hour++) ["00", "30"].forEach((minute) => slots.push(`${String(hour).padStart(2, "0")}:${minute}`));
  select.innerHTML = '<option value="">Selecione um horário</option>' + slots.filter((slot) => !taken.includes(slot)).map((slot) => `<option>${slot}</option>`).join("");
  updateSummary();
}
function updateSummary() {
  const date = $("#booking-date").value, time = $("#booking-time").value;
  if (!date && !time) { $("#summary-content").innerHTML = '<span class="summary-placeholder">Preencha os dados ao lado para visualizar seu resumo.</span>'; }
  else $("#summary-content").innerHTML = `<div class="summary-row"><span>Serviço</span><strong>${state.selectedService.name}</strong></div><div class="summary-row"><span>Data</span><strong>${date ? formatDate(date) : "—"}</strong></div><div class="summary-row"><span>Horário</span><strong>${time || "—"}</strong></div>`;
  $("#summary-price").textContent = money(state.selectedService.price);
}
function handleBooking(event) {
  event.preventDefault();
  const date = $("#booking-date").value, time = $("#booking-time").value;
  const message = $("#booking-message");
  if (!date || !time) { message.className = "form-message error"; message.textContent = "Escolha uma data e um horário disponíveis."; return; }
  const appointment = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), service: state.selectedService.name, price: state.selectedService.price, date, time, client: $("#client-name").value.trim(), phone: $("#client-phone").value.trim(), note: $("#booking-note").value.trim(), status: "confirmed" };
  state.appointments.push(appointment); saveAppointments();
  message.className = "form-message success"; message.textContent = "Agendamento confirmado! Você também pode avisar pelo WhatsApp.";
  const whatsapp = `https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Sou ${appointment.client} e agendei ${appointment.service} para ${formatDate(date)} às ${time}.`)}`;
  message.innerHTML = `Agendamento confirmado! <a href="${whatsapp}" target="_blank" rel="noreferrer">Enviar confirmação no WhatsApp ↗</a>`;
  $("#booking-form").reset(); $("#booking-date").min = new Date().toISOString().split("T")[0]; state.selectedService = SERVICES[0]; renderServices(); updateSummary();
}
function showAdminPanel() {
  $("#admin-login").classList.add("hidden"); $("#admin-panel").classList.remove("hidden"); renderDashboard();
}
function renderDashboard() {
  const sorted = [...state.appointments].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  const upcoming = sorted.filter((item) => item.status === "confirmed");
  $("#stat-upcoming").textContent = upcoming.length; $("#stat-clients").textContent = new Set(state.appointments.map((item) => item.phone)).size; $("#stat-revenue").textContent = money(upcoming.reduce((total, item) => total + item.price, 0));
  const filter = $("#status-filter").value;
  const list = sorted.filter((item) => filter === "all" || item.status === filter);
  $("#appointments-list").innerHTML = list.length ? list.map((item) => `<article class="appointment"><div class="appointment-date">${formatDate(item.date)}<small>${item.time}</small></div><div class="appointment-client"><strong>${item.client}</strong><span>${item.phone}</span></div><div class="appointment-service">${item.service}</div><span class="status status-${item.status}">${item.status === "confirmed" ? "Confirmado" : item.status === "done" ? "Concluído" : "Cancelado"}</span><button class="button button-ghost appointment-action" data-id="${item.id}" data-next="${item.status === "confirmed" ? "done" : "confirmed"}">${item.status === "confirmed" ? "Concluir" : "Reabrir"}</button></article>`).join("") : '<div class="empty-state">Nenhum agendamento encontrado.</div>';
  document.querySelectorAll(".appointment-action").forEach((button) => button.addEventListener("click", () => { const item = state.appointments.find((appointment) => appointment.id === button.dataset.id); item.status = button.dataset.next; saveAppointments(); renderDashboard(); }));
}
$("#booking-date").min = new Date().toISOString().split("T")[0];
renderServices(); updateSummary();
$("#booking-date").addEventListener("change", populateTimes); $("#booking-time").addEventListener("change", updateSummary); $("#booking-form").addEventListener("submit", handleBooking);
$("#login-form").addEventListener("submit", (event) => { event.preventDefault(); if ($("#admin-password").value === "1234") { sessionStorage.setItem("flow-admin", "true"); $("#login-message").textContent = ""; showAdminPanel(); } else { $("#login-message").className = "form-message error"; $("#login-message").textContent = "Senha incorreta. Tente novamente."; } });
$("#logout-button").addEventListener("click", () => { sessionStorage.removeItem("flow-admin"); $("#admin-panel").classList.add("hidden"); $("#admin-login").classList.remove("hidden"); });
$("#status-filter").addEventListener("change", renderDashboard); $(".menu-button").addEventListener("click", () => { const nav = $(".main-nav"); nav.classList.toggle("open"); $(".menu-button").setAttribute("aria-expanded", nav.classList.contains("open")); });
window.addEventListener("hashchange", () => showView(location.hash.slice(1))); showView(location.hash.slice(1));
