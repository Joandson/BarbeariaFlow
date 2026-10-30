const API_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error(
      "A variável NEXT_PUBLIC_APPS_SCRIPT_URL não está configurada.",
    );
  }

  return API_URL;
}

export async function fetchServicos() {
  const res = await fetch(`${getApiUrl()}?action=getServicos`);

  if (!res.ok) {
    throw new Error("Erro ao buscar serviços");
  }

  return res.json();
}

export async function criarAgendamento(dados: {
  nome: string;
  whatsapp: string;
  data: string;
  horario: string;
  servico: string;
}) {
  const res = await fetch(getApiUrl(), {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar agendamento");
  }

  return res.json();
}
