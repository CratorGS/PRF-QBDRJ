"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Terminal, Lock, Gavel, Map, ClipboardList, Target, History, Award, 
  Search, Users, Skull, AlertTriangle, Activity, BarChart, Crosshair, Siren
} from "lucide-react";

// --- BANCO DE DADOS (ULTRA OVERDRIVE) ---
const prfData = {
  codigosQ: [
    { q: "QAP", msg: "Na escuta", ex: "Viatura 01 em QAP." },
    { q: "QRF", msg: "Reforço", ex: "QRF urgente na BR-101!" },
    { q: "QTH", msg: "Localização", ex: "Informe seu QTH atual." },
    { q: "QTI", msg: "Deslocamento", ex: "QTI para delegacia." },
    { q: "TKS", msg: "Entendido", ex: "TKS pela informação." },
  ],
  codigoPenal: [
    { art: "Art. 01", nome: "Desobediência", pena: "20 meses", multa: "R$ 5.000" },
    { art: "Art. 02", nome: "Desacato", pena: "30 meses", multa: "R$ 10.000" },
    { art: "Art. 05", nome: "Fuga de Abordagem", pena: "40 meses", multa: "R$ 15.000" },
    { art: "Art. 12", nome: "Posse de Arma Ilegal", pena: "60 meses", multa: "R$ 50.000" },
  ],
  checklist: [
    "Motor e Pneus reparados?",
    "Tanque de combustível cheio?",
    "Colete e Armamento no inventário?",
    "Rádio na frequência 99.1?",
    "Algemas e Kits Médicos?"
  ],
  // NOVOS DADOS ADICIONADOS
  hierarquia: [
    { cargo: "Superintendente", cor: "border-yellow-500 text-yellow-500", desc: "Comando Geral da Base. Palavra final." },
    { cargo: "Inspetor Chefe", cor: "border-blue-500 text-blue-500", desc: "Gestão de patrulhas e autorização de QRF." },
    { cargo: "Agente de Elite", cor: "border-purple-500 text-purple-500", desc: "Operador tático, lidera invasões (Baques)." },
    { cargo: "Patrulheiro", cor: "border-green-500 text-green-500", desc: "O pilar da corporação. Realiza rondas e blitz." },
    { cargo: "Recruta", cor: "border-zinc-500 text-zinc-500", desc: "Em fase de testes. Apenas dirige e escuta." }
  ],
  regrasRP: [
    { regra: "Anti-CopBait", desc: "Ignorar civis provocando a guarnição sem motivo RP. Grave e reporte." },
    { regra: "Uso da Força Limitada", desc: "Proibido atirar em pneu de carro em fuga a menos que o suspeito atire primeiro." },
    { regra: "Safezone (Hospitais/Praças)", desc: "Proibido iniciar tiroteios ou prender dentro de áreas seguras, salvo exceções da prefeitura." }
  ],
  estatisticas: [
    { label: "Prisões na Semana", value: "142", perc: "85%" },
    { label: "Armas Apreendidas", value: "89", perc: "60%" },
    { label: "Multas Aplicadas", value: "R$ 2.4M", perc: "95%" },
  ]
};

// SUAS SEÇÕES ORIGINAIS
const allSections = [
  "INICIO", "DASHBOARD", "HIERARQUIA", "CODIGOS", "MIRANDA", "HISTORIA", 
  "DOUTRINA", "PENAL", "ZONAS", "BRIEFING", "TIMELINE", "OPERACOES", 
  "TREINAMENTO", "EQUIPAMENTOS", "VIATURAS", "ARMAS", "UNIFORMES", "MANUAL", 
  "ESTATISTICAS", "RADIO", "CHAT", "DISCORD", "SERVIDORES", "RECRUTAMENTO", 
  "NOTICIAS", "GALERIA", "CONFIG", "CREDITOS", "SIMULADOR", "RANKINGS", 
  "OCORRENCIAS", "CURSOS", "FROTA", "SETORES", "BOLETIM", "AGENDA", "PATRULHA", 
  "REGRASRJ", "ABORDAGENS", "PERSEGUICOES", "CONDUTAPOLICIAL", "BLITZSTATS", 
  "APREENSOES", "FAVELAS", "BAQUEPROTOCOLO"
];

export default function PRFPortalUltra() {
  const [page, setPage] = useState("DASHBOARD");
  const [searchTerm, setSearchTerm] = useState("");
  const [time, setTime] = useState("");

  // Relógio do RP
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredSections = allSections.filter(sec => 
    sec.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0b10] text-white font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      
      {/* HEADER TÁTICO */}
      <header className="fixed top-0 left-0 right-0 h-24 bg-black/80 z-50 flex items-center justify-between px-10 border-b-4 border-yellow-500/50 backdrop-blur-md shadow-[0_10px_30px_rgba(234,179,8,0.05)]">
         <div className="flex items-center gap-4">
           <Shield className="text-yellow-500 w-10 h-10" />
           <div>
             <h1 className="text-3xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
               PRF <span className="text-yellow-500">QUEBRADA RJ</span>
             </h1>
             <p className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase">Comando Governamental Integrado</p>
           </div>
         </div>
         <div className="hidden lg:flex gap-6 items-center">
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Hora Local do Servidor</p>
              <p className="text-xl font-mono font-black text-yellow-500">{time || "00:00:00"}</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex gap-2 items-center text-xs font-black text-red-500 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 animate-pulse">
              <Siren size={16} /> ALERTA GERAL ATIVO
            </div>
         </div>
      </header>

      {/* BACKGROUND COM RADAR */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-500 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-yellow-500 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-yellow-500 rotate-45" />
      </div>

      <main className="pt-32 px-6 pb-20 max-w-7xl mx-auto relative z-10">
        
        {/* BARRA DE PESQUISA */}
        <div className="relative max-w-2xl mx-auto mb-10 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 group-focus-within:scale-125 transition-transform" size={20} />
          <input 
            type="text" 
            placeholder="Busque o módulo de treinamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border-2 border-zinc-800 focus:border-yellow-500 rounded-full py-4 pl-12 pr-6 text-sm outline-none transition-all text-white placeholder-zinc-500 shadow-lg"
          />
        </div>

        {/* PAREDÃO DE BOTÕES OTIMIZADO */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 p-6 bg-black/30 rounded-[40px] border border-white/5 shadow-2xl backdrop-blur-sm">
          {filteredSections.map((sec) => (
            <button
              key={sec}
              onClick={() => setPage(sec)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase transition-all duration-300 border-2 ${
                page === sec 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.6)] scale-110 z-10' 
                  : 'bg-[#12141c] text-zinc-400 border-zinc-800 hover:border-yellow-500/50 hover:text-yellow-500 hover:-translate-y-1'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* TELA DE RENDENRIZAÇÃO DE CONTEÚDO */}
        <div className="bg-[#12141c] border border-zinc-800/80 rounded-[40px] p-10 min-h-[500px] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="relative z-10">
              
              {/* === MÓDULOS ANTIGOS MANTIDOS === */}
              {page === "DASHBOARD" && (
                <div className="space-y-8">
                  <div className="p-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl text-black shadow-xl flex justify-between items-center">
                     <div>
                       <h2 className="text-5xl font-black italic uppercase">Comando Ativo</h2>
                       <p className="mt-2 font-bold max-w-lg">O Sistema PRF Quebrada RJ está online e monitorando todas as atividades da corporação.</p>
                     </div>
                     <Activity size={100} className="opacity-20" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/50 p-8 border border-zinc-800 rounded-3xl"><h4 className="font-black text-zinc-400 text-xs mb-2">VIATURAS EM QAP</h4><p className="text-4xl font-black text-yellow-500">12</p></div>
                    <div className="bg-black/50 p-8 border border-zinc-800 rounded-3xl"><h4 className="font-black text-zinc-400 text-xs mb-2">STATUS DA CIDADE</h4><p className="text-4xl font-black text-green-500">ESTÁVEL</p></div>
                    <div className="bg-black/50 p-8 border border-zinc-800 rounded-3xl"><h4 className="font-black text-zinc-400 text-xs mb-2">AGENTES DE SERVIÇO</h4><p className="text-4xl font-black text-blue-500">24</p></div>
                  </div>
                </div>
              )}

              {page === "CODIGOS" && ( /* ...mantido... */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prfData.codigosQ.map(q => (
                    <div key={q.q} className="bg-black/40 border border-zinc-800 p-8 rounded-3xl hover:border-yellow-500 transition-all">
                      <div className="text-4xl font-black text-yellow-500 mb-2">{q.q}</div>
                      <p className="font-bold text-zinc-200 uppercase text-xs">{q.msg}</p>
                    </div>
                  ))}
                </div>
              )}

              {page === "PENAL" && ( /* ...mantido... */
                <div className="grid grid-cols-1 gap-4">
                  <h2 className="text-3xl font-black italic uppercase text-yellow-500 mb-4 flex items-center gap-3"><Gavel/> Código Penal</h2>
                  {prfData.codigoPenal.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-black/40 border border-zinc-800 rounded-2xl">
                      <div className="flex gap-4 items-center">
                        <span className="text-yellow-500 font-mono font-black">{p.art}</span>
                        <span className="font-bold uppercase">{p.nome}</span>
                      </div>
                      <div className="flex gap-6 text-xs font-black uppercase">
                        <span className="text-red-500">Pena: {p.pena}</span>
                        <span className="text-green-500">Multa: {p.multa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* === NOVOS MÓDULOS DE ELITE ADICIONADOS === */}

              {page === "HIERARQUIA" && (
                <div className="space-y-6">
                   <h2 className="text-3xl font-black italic uppercase text-yellow-500 mb-8 text-center flex justify-center items-center gap-3"><Users/> Cadeia de Comando</h2>
                   <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                      {prfData.hierarquia.map((h, i) => (
                         <div key={i} className={`flex items-center gap-6 p-6 bg-black/40 border-l-4 border-r border-t border-b border-zinc-800 rounded-2xl ${h.cor}`}>
                            <div className="text-3xl font-black opacity-20">0{i+1}</div>
                            <div>
                               <h3 className="text-xl font-black uppercase italic tracking-widest">{h.cargo}</h3>
                               <p className="text-zinc-400 text-sm font-bold">{h.desc}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              )}

              {page === "REGRASRJ" && (
                <div className="space-y-6">
                   <h2 className="text-3xl font-black italic uppercase text-red-500 mb-8 text-center flex justify-center items-center gap-3"><AlertTriangle/> Regras de Conduta RP</h2>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {prfData.regrasRP.map((r, i) => (
                         <div key={i} className="p-8 bg-red-950/20 border border-red-500/30 rounded-3xl text-center hover:border-red-500 transition-all">
                            <h4 className="text-red-500 font-black uppercase mb-4 text-lg">{r.regra}</h4>
                            <p className="text-zinc-300 text-sm">{r.desc}</p>
                         </div>
                      ))}
                   </div>
                   <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl text-center text-yellow-500 text-xs font-black uppercase">
                      Nota do Comando: O desrespeito às regras da cidade gera exoneração imediata (Wipe Policial).
                   </div>
                </div>
              )}

              {page === "BAQUEPROTOCOLO" && (
                <div className="max-w-4xl mx-auto bg-black p-10 border border-red-600 rounded-[40px] relative overflow-hidden">
                   <Skull className="absolute -right-10 -top-10 text-red-600 opacity-10" size={300} />
                   <h2 className="text-5xl font-black italic uppercase text-red-600 mb-6">Invasão (Baque)</h2>
                   <p className="text-zinc-300 font-bold mb-8 max-w-xl">A entrada em áreas de Zona Vermelha (Favelas) para cumprimento de mandado exige força letal e preparação extrema.</p>
                   
                   <div className="space-y-4">
                      <div className="p-4 border-l-4 border-red-600 bg-red-950/30 font-bold text-sm">1. Mínimo de 4 Viaturas e autorização do Inspetor.</div>
                      <div className="p-4 border-l-4 border-red-600 bg-red-950/30 font-bold text-sm">2. Sirene desligada ao se aproximar do perímetro (Silêncio Rádio).</div>
                      <div className="p-4 border-l-4 border-red-600 bg-red-950/30 font-bold text-sm">3. Arma longa em mãos, dedo no gatilho. Fogo autorizado mediante risco à vida.</div>
                      <div className="p-4 border-l-4 border-red-600 bg-red-950/30 font-bold text-sm">4. Nunca deixar um operador para trás (QRR Absoluto).</div>
                   </div>
                </div>
              )}

              {page === "ESTATISTICAS" && (
                <div className="space-y-8">
                   <h2 className="text-3xl font-black italic uppercase text-yellow-500 flex items-center gap-3"><BarChart/> Desempenho Global</h2>
                   <div className="space-y-6 max-w-3xl">
                      {prfData.estatisticas.map((stat, i) => (
                         <div key={i} className="bg-black/40 p-6 rounded-2xl border border-zinc-800">
                            <div className="flex justify-between items-end mb-2">
                               <span className="font-bold text-zinc-400 uppercase text-sm">{stat.label}</span>
                               <span className="text-3xl font-black text-white">{stat.value}</span>
                            </div>
                            {/* Barra de Progresso Animada */}
                            <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }} 
                                 animate={{ width: stat.perc }} 
                                 transition={{ duration: 1, delay: 0.2 }}
                                 className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" 
                               />
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              )}

              {/* === FALLBACKS MANTEÚDOS === */}
              {page === "MIRANDA" && (
                <div className="flex items-center justify-center py-10">
                   <div className="max-w-2xl p-12 bg-black border-2 border-red-600/50 rounded-3xl text-center">
                      <Lock className="mx-auto text-red-500 mb-6" size={48} />
                      <p className="text-2xl font-black leading-relaxed uppercase italic text-zinc-200">
                        "Você tem o direito de permanecer em silêncio. Tudo o que disser poderá ser usado contra você..."
                      </p>
                   </div>
                </div>
              )}

              {page === "ZONAS" && (
                 <div className="flex items-center justify-center py-10"><h3 className="text-2xl font-black text-yellow-500 uppercase">Consultar Mapa Tático (Em Breve)</h3></div>
              )}
              {page === "BRIEFING" && (
                 <div className="flex items-center justify-center py-10"><h3 className="text-2xl font-black text-yellow-500 uppercase">Checklist Atualizado com Sucesso</h3></div>
              )}

              {!["DASHBOARD", "CODIGOS", "PENAL", "MIRANDA", "ZONAS", "BRIEFING", "HIERARQUIA", "REGRASRJ", "BAQUEPROTOCOLO", "ESTATISTICAS"].includes(page) && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Shield className="text-zinc-800 mb-6" size={64} />
                  <h3 className="text-4xl font-black text-zinc-600 uppercase italic">Módulo {page}</h3>
                  <p className="text-zinc-500 mt-4 font-bold uppercase tracking-[0.2em] text-xs">Área restrita ou em desenvolvimento pelo Alto Comando.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}