// src/services/api.ts

const API_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

export async function criarAgendamento(dados: {
  nome: string;
  whatsapp: string;
  data: string;
  horario: string;
  servico: string;
}) {
  if (!API_URL) throw new Error("URL da API não configurada");

  try {
    // Envia como text/plain para contornar restrições de CORS pré-flight do navegador no Apps Script
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(dados),
    });

    const resultText = await response.text();
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Erro na requisição para a API:", error);
    throw error;
  }
}