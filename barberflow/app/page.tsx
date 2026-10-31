"use client";

import { useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("Corte Masculino - R$ 40");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("09:00");

  // Número oficial do WhatsApp fornecido
  const telefoneBarbearia = "5571999530935";

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !data || !horario) {
      alert("Por favor, preencha todos os campos do agendamento!");
      return;
    }

    const dataFormatada = data.split("-").reverse().join("/");

    const mensagem = 
      `*💈 Novo Agendamento - Caio Ramos Barbearia*\n\n` +
      `👤 *Cliente:* ${nome}\n` +
      `✂️ *Serviço:* ${servico}\n` +
      `📅 *Data:* ${dataFormatada}\n` +
      `⏰ *Horário:* ${horario}\n\n` +
      `Olá! Gostaria de confirmar este horário.`;

    const linkWhatsApp = `https://wa.me/${telefoneBarbearia}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp, "_blank");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* HEADER / NAVEGAÇÃO */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-wider text-amber-500">CR</span>
            <span className="font-bold tracking-tight text-lg">CAIO RAMOS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#servicos" className="hover:text-amber-500 transition">Serviços</a>
            <a href="#sobre" className="hover:text-amber-500 transition">Sobre</a>
            <a href="#agendamento" className="hover:text-amber-500 transition">Agendar</a>
            <a href="#contato" className="hover:text-amber-500 transition">Contato</a>
          </nav>

          <a
            href={`https://wa.me/${telefoneBarbearia}?text=${encodeURIComponent("Olá! Gostaria de tirar uma dúvida sobre os horários.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm transition shadow-lg shadow-amber-500/10"
          >
            Fale Conosco
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">
          <span className="inline-block bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
            Estilo & Tradição
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            O seu visual em <span className="text-amber-500">altíssimo nível</span>.
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto md:mx-0">
            Ambiente exclusivo, atendimento de primeira e cortes modernos para quem valoriza a própria imagem. Venha relaxar e cuidar do visual na Caio Ramos Barbearia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <a
              href="#agendamento"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl text-center transition shadow-xl shadow-amber-500/20"
            >
              Agendar Horário
            </a>
            <a
              href="#servicos"
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold px-6 py-4 rounded-xl text-center transition"
            >
              Ver Serviços
            </a>
          </div>
        </div>

        {/* Imagem de Destaque da Barbearia */}
        <div className="flex-1 w-full max-w-md">
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-500/5 aspect-[4/5] bg-zinc-900">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
              alt="Barbearia Caio Ramos"
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-amber-400 text-xs font-bold tracking-wider uppercase">Profissionalismo</span>
              <p className="text-white font-bold text-lg">Cortes clássicos & modernos</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE SERVIÇOS */}
      <section id="servicos" className="py-20 bg-zinc-900/50 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-amber-500">Nossos Serviços</h2>
            <p className="text-zinc-400 text-sm">Escolha o procedimento ideal para manter seu visual alinhado e impecável.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 hover:border-amber-500/50 transition group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-amber-500 transition">Corte Masculino</h3>
                <span className="text-amber-400 font-extrabold">R$ 40</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Corte à sua escolha com acabamento na navalha, lavagem inclusa e finalização com produtos premium.</p>
              <a href="#agendamento" className="text-xs font-bold uppercase tracking-wider text-amber-500 hover:underline">Agendar este &rarr;</a>
            </div>

            <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 hover:border-amber-500/50 transition group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-amber-500 transition">Barba Completa</h3>
                <span className="text-amber-400 font-extrabold">R$ 30</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Toalha quente, modelagem com navalha, óleos hidratantes e balm para maciez e alinhamento dos fios.</p>
              <a href="#agendamento" className="text-xs font-bold uppercase tracking-wider text-amber-500 hover:underline">Agendar este &rarr;</a>
            </div>

            <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 hover:border-amber-500/50 transition group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-amber-500 transition">Corte + Barba</h3>
                <span className="text-amber-400 font-extrabold">R$ 65</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">O combo completo para garantir o visual 100% renovado com economia e tratamento VIP.</p>
              <a href="#agendamento" className="text-xs font-bold uppercase tracking-wider text-amber-500 hover:underline">Agendar este &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE AGENDAMENTO */}
      <section id="agendamento" className="py-20 px-4 max-w-3xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8 space-y-2">
            <h2 className="text-3xl font-bold text-amber-500">Agende Seu Horário</h2>
            <p className="text-zinc-400 text-sm">Preencha os dados abaixo. O agendamento é enviado diretamente para o nosso WhatsApp.</p>
          </div>

          <form onSubmit={handleAgendar} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Seu Nome Completo</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Carlos Eduardo"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500 text-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Serviço Desejado</label>
              <select
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500 text-white transition"
              >
                <option value="Corte Masculino - R$ 40">Corte Masculino — R$ 40</option>
                <option value="Barba Completa - R$ 30">Barba Completa — R$ 30</option>
                <option value="Corte + Barba - R$ 65">Corte + Barba — R$ 65</option>
                <option value="Coloração - R$ 50">Coloração — R$ 50</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Data</label>
                <input
                  type="date"
                  required
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500 text-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Horário Disponível</label>
                <select
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500 text-white transition"
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
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition text-center shadow-lg shadow-green-600/20 flex items-center justify-center gap-3 text-base mt-2"
            >
              <span>Confirmar e Enviar para o WhatsApp</span>
              <span className="text-xl">💬</span>
            </button>
          </form>
        </div>
      </section>

      {/* SEÇÃO SOBRE & CONTATO */}
      <section id="sobre" className="py-20 bg-zinc-900/50 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-500">Sobre a Caio Ramos Barbearia</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Fundada com o propósito de resgatar a essência da barbearia clássica somada às tendências modernas de visagismo. Um espaço dedicado ao homem que se importa com a sua apresentação e busca excelência em cada detalhe.
            </p>
            <div className="pt-2 text-sm text-zinc-300">
              <p>📍 <strong>Endereço:</strong> Rua 10, Cabaceiras - PB</p>
              <p>⏰ <strong>Funcionamento:</strong> Segunda a Sábado</p>
            </div>
          </div>

          <div id="contato" className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-500">Redes Sociais & Contato</h3>
            <p className="text-zinc-400 text-sm">
              Fique por dentro dos trabalhos realizados, dicas de cuidados e novidades exclusivas.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="https://instagram.com/joandsonisrael"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-zinc-300 hover:text-amber-500 transition text-sm font-semibold"
              >
                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500">IG</span>
                <span>@joandsonisrael</span>
              </a>
              <a
                href={`https://wa.me/${telefoneBarbearia}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-zinc-300 hover:text-green-400 transition text-sm font-semibold"
              >
                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-green-500">WA</span>
                <span>+55 (71) 99953-0935</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
        <p>© 2026 Caio Ramos Barbearia. Desenvolvido para projeto acadêmico com excelência.</p>
      </footer>

    </div>
  );
}