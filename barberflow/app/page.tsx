"use client";

import { useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("Corte Masculino");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("09:00");

  // Número do WhatsApp da barbearia (coloque o DDD e número do Caio aqui)
  const telefoneBarbearia = "5571999999999"; 

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !data || !horario) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Formata a data para ficar bonita (Ex: 15/11/2026)
    const dataFormatada = data.split("-").reverse().join("/");

    // Monta a mensagem profissional para o WhatsApp
    const mensagem = 
      `*💈 Novo Agendamento - Caio Ramos Barbearia*\n\n` +
      `👤 *Cliente:* ${nome}\n` +
      `✂️ *Serviço:* ${servico}\n` +
      `📅 *Data:* ${dataFormatada}\n` +
      `⏰ *Horário:* ${horario}\n\n` +
      `Olá! Gostaria de confirmar este horário.`;

    // Cria o link oficial do WhatsApp
    const linkWhatsApp = `https://wa.me/${telefoneBarbearia}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp do cliente com a mensagem pronta
    window.open(linkWhatsApp, "_blank");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-amber-500">Caio Ramos Barbearia</h1>
          <p className="text-zinc-400 text-sm mt-1">Selecione seu horário e agende direto pelo WhatsApp</p>
        </div>

        <form onSubmit={handleAgendar} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Seu Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Escolha o Serviço</label>
            <select
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
            >
              <option value="Corte Masculino">Corte Masculino - R$ 40</option>
              <option value="Barba">Barba - R$ 30</option>
              <option value="Corte + Barba">Corte + Barba - R$ 65</option>
              <option value="Coloração">Coloração - R$ 50</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Data do Agendamento</label>
              <input
                type="date"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Horário</label>
              <select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
              >
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-4 rounded-xl transition text-center shadow-lg mt-4 flex items-center justify-center gap-2"
          >
            <span>Agendar pelo WhatsApp</span>
            <span className="text-lg">💬</span>
          </button>
        </form>

        <div className="mt-6 text-center border-t border-zinc-800 pt-4">
          <p className="text-xs text-zinc-500">
            Sistema desenvolvido para Caio Ramos Barbearia • Projeto Acadêmico
          </p>
        </div>
      </div>
    </main>
  );
}