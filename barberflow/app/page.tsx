"use client";

import { useState } from "react";
import { criarAgendamento } from "@/src/services/api";

type AgendamentoResponse = {
  sucesso: boolean;
  mensagem?: string;
  id?: string | number;
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("14:00");
  const [servico, setServico] = useState("Corte + Barba");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<AgendamentoResponse | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = (await criarAgendamento({
        nome,
        whatsapp,
        data,
        horario,
        servico,
      })) as AgendamentoResponse;

      if (res.sucesso) {
        setResultado(res);
      } else {
        alert(res.mensagem || "Erro ao agendar.");
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  function gerarLinkWhats() {
    if (!resultado?.id) {
      return "#";
    }

    const mensagem =
      `Olá, Caio! Solicitei um agendamento pelo site.\n\n` +
      `📌 Código: #${resultado.id}\n` +
      `👤 Cliente: ${nome}\n` +
      `✂️ Serviço: ${servico}\n` +
      `📅 Data: ${data}\n` +
      `⏰ Horário: ${horario}`;

    return `https://wa.me/5571999999999?text=${encodeURIComponent(mensagem)}`;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-amber-500 text-center mb-1">
          Caio Ramos Barbearia
        </h1>
        <p className="text-zinc-400 text-center text-sm mb-6">
          Agende seu horário em poucos segundos
        </p>

        {resultado ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-green-400">
              Pré-Reserva Criada!
            </h2>
            <p className="text-zinc-300 text-sm">
              Para confirmar seu agendamento, envie a mensagem de confirmação no
              WhatsApp do barbeiro.
            </p>
            <a
              href={gerarLinkWhats()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition text-center shadow-lg"
            >
              Confirmar no WhatsApp 💬
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(71) 99999-9999"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Serviço
              </label>
              <select
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="Corte Masculino">Corte Masculino</option>
                <option value="Barba">Barba</option>
                <option value="Corte + Barba">Corte + Barba</option>
                <option value="Coloração">Coloração</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  required
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Horário
                </label>
                <select
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500"
                >
                  {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map(
                    (hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 px-4 rounded-xl transition text-center shadow-lg mt-2"
            >
              {loading ? "Reservando..." : "Solicitar Agendamento"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
