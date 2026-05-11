"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Terminal, Lock, Gavel, Map, ClipboardList, Target, History, Award, 
  Search, Users, Skull, AlertTriangle, Activity, BarChart, Crosshair, Siren,
  Car, Sword, Radio, MessageSquare, Zap, FileText, Eye, Flame, ChevronRight,
  Info, Bell, Satellite, Database, HardDrive, Tool, MapPin, Fingerprint, Volume2, VolumeX, Cpu, Navigation, Copy
} from "lucide-react";

// --- ENGINE DE ÁUDIO TÁTICO ---
const useAudio = () => {
  const [muted, setMuted] = useState(false);
  const play = (freq = 440, type = "sine", duration = 0.1) => {
    if (muted || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type as OscillatorType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };
  return { play, muted, setMuted };
};

// --- DATA INTELECTUAL DA PRF ---
const DATA = {
  hierarquia: [
    { cargo: "Diretor-Geral", desc: "Comando Supremo. Define diretrizes nacionais e políticas.", poder: 100, cor: "text-yellow-500" },
    { cargo: "Superintendente", desc: "Comandante da Regional RJ. Coordenação tática e estratégica.", poder: 90, cor: "text-blue-500" },
    { cargo: "Inspetor-Chefe", desc: "Responsável pela corregedoria e logística de delegacias.", poder: 80, cor: "text-zinc-200" },
    { cargo: "Agente Elite GRR", desc: "Operações Especiais. Intervenção em zonas de guerra (Maré/Alemão).", poder: 70, cor: "text-red-500" },
    { cargo: "Policial Rodoviário", desc: "Agente operacional. Patrulha, abordagem e combate ao tráfico.", poder: 50, cor: "text-green-500" },
    { cargo: "Recruta", desc: "Estagiário em observação. Proibido pilotar ou comandar rádio.", poder: 20, cor: "text-zinc-600" },
  ],
  codigos: [
    { q: "QAP", m: "Na escuta", t: "Mantenha o rádio livre." },
    { q: "QRF", m: "Reforço Imediato", t: "Prioridade 1. Risco de vida." },
    { q: "QTH", m: "Localização", t: "Informe sua rua/coordenada." },
    { q: "QTI", m: "Deslocamento", t: "Unidade a caminho." },
    { q: "QTA", m: "Abortar", t: "Cessar operação imediatamente." },
    { q: "QRV", m: "À disposição", t: "Pronto para novas ordens." },
    { q: "QSL", m: "Entendido", t: "Mensagem recebida com sucesso." },
    { q: "QRA", m: "Identificação", t: "Nome ou número do operador." },
    { q: "TKS", m: "Obrigado", t: "Agradecimento tático." },
  ],
  miranda: {
    texto: "Você tem o direito de permanecer em silêncio. Tudo o que você disser pode e será usado contra você no tribunal. Você tem direito a um advogado; se não puder pagar por um, o estado providenciará. Você entendeu seus direitos?",
    uso: "Deve ser lido no momento da voz de prisão para evitar a anulação do processo."
  },
  patrulha: [
    { func: "S1 (Motorista)", d: "Foco total na condução. Não troca tiro dirigindo. Comunica o QTH no rádio." },
    { func: "S2 (Passageiro)", d: "Comandante da viatura. Faz consultas de placa, radar e visualização de perigos." },
    { func: "S3 (Retaguarda)", d: "Segurança 360. Protege o desembarque do S1 e S2 e foca em ameaças traseiras." }
  ],
  penal: [
    { art: "Art. 12", n: "Posse de Arma", p: "60 meses", m: "R$ 50.000" },
    { art: "Art. 33", n: "Tráfico", p: "120 meses", m: "R$ 150.000" },
    { art: "Art. 157", n: "Assalto", p: "80 meses", m: "R$ 40.000" },
    { art: "Art. 331", n: "Desacato", p: "30 meses", m: "R$ 10.000" },
    { art: "Art. 306", n: "Embriaguez", p: "20 meses", m: "R$ 15.000" },
    { art: "Art. 180", n: "Receptação", p: "45 meses", m: "R$ 25.000" },
  ]
};

const navItems = [
  { id: "DASHBOARD", icon: Activity },
  { id: "HIERARQUIA", icon: Award },
  { id: "CODIGOS", icon: MessageSquare },
  { id: "MIRANDA", icon: Gavel },
  { id: "PATRULHA", icon: Users },
  { id: "PENAL", icon: ScaleIcon }, // Substituído internamente por Shield se der erro
  { id: "ARSENAL", icon: Skull },
  { id: "VIATURAS", icon: Car },
  { id: "REGISTRO", icon: FileText },
];

export default function PRFCompletePortal() {
  const { play, muted, setMuted } = useAudio();
  const [page, setPage] = useState("BOOT");
  const [percent, setPercent] = useState(0);
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  // Simulação de Logs de Sistema
  useEffect(() => {
    if (page !== "BOOT") {
      const logInt = setInterval(() => {
        const events = [
          "VTR-01 iniciou patrulhamento na BR-101",
          "Consulta de placa: ABC-1234 [NADA CONSTA]",
          "QRF solicitado no Complexo do Alemão",
          "Conexão criptografada estabelecida",
          "Verificando integridade do banco de dados...",
        ];
        setLogs(prev => [events[Math.floor(Math.random() * events.length)], ...prev.slice(0, 5)]);
      }, 4000);
      return () => clearInterval(logInt);
    }
  }, [page]);

  // Boot Sequence
  useEffect(() => {
    if (page === "BOOT") {
      const int = setInterval(() => {
        setPercent(p => {
          if (p >= 100) {
            clearInterval(int);
            setTimeout(() => setPage("DASHBOARD"), 600);
            return 100;
          }
          if (p % 15 === 0) play(200 + p * 8, "square", 0.05);
          return p + 1;
        });
      }, 30);
      return () => clearInterval(int);
    }
  }, [page]);

  const changePage = (p: string) => {
    play(600, "sine", 0.05);
    setPage(p);
  };

  if (page === "BOOT") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-10 overflow-hidden">
        <motion.div animate={{ rotateY: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
          <Shield size={100} className="text-yellow-500 mb-8 drop-shadow-[0_0_30px_rgba(234,179,8,0.6)]" />
        </motion.div>
        <div className="w-80 h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-6 border border-white/5">
          <motion.div className="h-full bg-yellow-500 shadow-[0_0_15px_#EAB308]" style={{ width: `${percent}%` }} />
        </div>
        <div className="text-center space-y-2">
          <p className="text-[10px] text-yellow-500 tracking-[0.8em] font-black uppercase">Initializing Aegis Core: {percent}%</p>
          <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">PRF Security Protocol 4.0.2 / RJ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-300 font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* HUD ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,3px_100%]" />
      
      {/* HEADER SUPREMO */}
      <header className="h-28 bg-black/90 backdrop-blur-3xl border-b-2 border-yellow-500/20 flex items-center justify-between px-14 fixed top-0 w-full z-[500] shadow-2xl">
        <div className="flex items-center gap-8 cursor-pointer" onClick={() => changePage("DASHBOARD")}>
          <div className="relative group">
             <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" />
             <Shield className="text-yellow-500 relative" size={45} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic text-white tracking-tighter leading-none">PRF <span className="text-yellow-500">AEGIS</span></h1>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
              <Satellite size={12} className="text-blue-500" /> Terminal de Inteligência RJ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-10">
           <div className="hidden lg:block text-right">
              <p className="text-[9px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Enlace de Rádio</p>
              <div className="flex items-center gap-2 text-green-500 font-mono text-xs">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Canal 99.1 MHz Ativo
              </div>
           </div>
           <button onClick={() => setMuted(!muted)} className="p-4 bg-white/5 rounded-2xl hover:bg-yellow-500/10 transition-all border border-white/5">
              {muted ? <VolumeX className="text-zinc-600" /> : <Volume2 className="text-yellow-500" />}
           </button>
           <div className="text-center bg-black/40 px-6 py-3 rounded-2xl border border-white/10">
              <p className="text-3xl font-mono font-black text-yellow-500 leading-none">{new Date().toLocaleTimeString('pt-BR')}</p>
              <p className="text-[9px] text-zinc-600 font-bold uppercase mt-1 tracking-widest">Time Sync</p>
           </div>
        </div>
      </header>

      {/* LAYOUT PRINCIPAL */}
      <main className="pt-40 px-12 pb-14 flex gap-10 h-screen overflow-hidden">
        
        {/* SIDEBAR TÁTICA */}
        <nav className="w-80 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-3">
          <div className="relative mb-4 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-yellow-500 transition-colors" size={18} />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="PESQUISAR..."
              className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-4 pl-12 text-[10px] font-black uppercase tracking-widest outline-none focus:border-yellow-500/30 transition-all"
            />
          </div>

          {navItems.filter(i => i.id.includes(search.toUpperCase())).map((item) => (
            <button
              key={item.id}
              onMouseEnter={() => play(1200, "sine", 0.01)}
              onClick={() => changePage(item.id)}
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group ${
                page === item.id 
                  ? 'bg-yellow-500 border-yellow-400 text-black shadow-2xl translate-x-2' 
                  : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-yellow-500/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} />
                <span className="text-[11px] font-black uppercase tracking-tighter">{item.id}</span>
              </div>
              <ChevronRight size={16} className={page === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-all"} />
            </button>
          ))}
        </nav>

        {/* DISPLAY CORE (O "MOTOR" DO SITE) */}
        <section className="flex-1 bg-[#07080c] border border-white/10 rounded-[60px] relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="p-12 overflow-y-auto custom-scrollbar h-full relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                
                {/* DASHBOARD: VIVO E COMPLETO */}
                {page === "DASHBOARD" && (
                  <div className="space-y-10">
                     <div className="flex justify-between items-end">
                        <h2 className="text-7xl font-black uppercase italic leading-none tracking-tighter">Comando <br/><span className="text-yellow-500">Central</span></h2>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-right">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Carga do Servidor</p>
                           <div className="h-1.5 w-40 bg-zinc-800 rounded-full overflow-hidden">
                              <motion.div animate={{ width: ["20%", "80%", "45%"] }} transition={{ repeat: Infinity, duration: 5 }} className="h-full bg-yellow-500" />
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { l: "VTRs ATIVAS", v: "12", i: Car, c: "text-blue-500" },
                          { l: "APREENSÕES", v: "242Kg", i: Target, c: "text-yellow-500" },
                          { l: "CRIMES / 24H", v: "18", i: Siren, c: "text-red-500" }
                        ].map((s, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[45px] hover:border-yellow-500/20 transition-all">
                             <s.i className={s.c} size={35} />
                             <p className="text-[10px] font-black text-zinc-500 uppercase mt-6 mb-2 tracking-widest">{s.l}</p>
                             <h4 className="text-5xl font-black">{s.v}</h4>
                          </div>
                        ))}
                     </div>

                     {/* TERMINAL DE LOGS */}
                     <div className="bg-black/60 rounded-[40px] p-8 border border-white/5 font-mono text-[11px] space-y-3 h-48 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black to-transparent z-20" />
                        <p className="text-yellow-500/50 font-black uppercase text-[9px] mb-4 tracking-[0.3em]">Live Intelligence Feed</p>
                        {logs.map((log, i) => (
                          <motion.p initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="text-zinc-500">
                            <span className="text-yellow-500/40">[{new Date().toLocaleTimeString()}]</span> {log}
                          </motion.p>
                        ))}
                     </div>
                  </div>
                )}

                {/* MIRANDA: PROTOCOLO DE PRISÃO */}
                {page === "MIRANDA" && (
                  <div className="max-w-3xl space-y-8">
                    <h2 className="text-5xl font-black uppercase italic text-yellow-500">Protocolo Miranda</h2>
                    <div className="bg-yellow-500/5 border-l-4 border-yellow-500 p-10 rounded-r-[40px] relative group">
                      <p className="text-2xl font-bold leading-relaxed text-white italic">"{DATA.miranda.texto}"</p>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(DATA.miranda.texto);
                          play(400, "square", 0.2);
                        }}
                        className="mt-8 flex items-center gap-3 bg-yellow-500 text-black px-8 py-4 rounded-full font-black text-xs uppercase hover:scale-105 transition-all"
                      >
                        <Copy size={16} /> Copiar para o Rádio
                      </button>
                    </div>
                    <div className="p-8 bg-white/5 rounded-[30px] border border-white/10">
                       <h4 className="text-xs font-black text-zinc-500 uppercase mb-4 flex items-center gap-2"><Info size={16}/> Observação Tática</h4>
                       <p className="text-sm font-medium leading-relaxed">{DATA.miranda.uso}</p>
                    </div>
                  </div>
                )}

                {/* PATRULHA: POSICIONAMENTO */}
                {page === "PATRULHA" && (
                  <div className="space-y-8">
                    <h2 className="text-5xl font-black uppercase italic text-yellow-500">Doutrina de Patrulha</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {DATA.patrulha.map((p, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all">
                           <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black font-black text-xl mb-6">{i+1}</div>
                           <h4 className="text-xl font-black uppercase mb-4">{p.func}</h4>
                           <p className="text-xs text-zinc-500 font-bold leading-relaxed uppercase">{p.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PENAL: TABELA COMPLETA */}
                {page === "PENAL" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {DATA.penal.map((art, i) => (
                      <div key={i} className="bg-black/40 border border-white/10 p-8 rounded-[40px] group hover:border-red-500/50 transition-all relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 bg-red-500/10 text-red-500 text-[10px] font-black">{art.art}</div>
                         <h4 className="text-2xl font-black text-white uppercase mb-6">{art.n}</h4>
                         <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                               <span className="text-zinc-600">Pena Máxima:</span>
                               <span className="text-red-500">{art.p}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-black uppercase">
                               <span className="text-zinc-600">Multa Prevista:</span>
                               <span className="text-green-500">{art.m}</span>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* REGISTRO: FORMULÁRIO DE OCORRÊNCIA */}
                {page === "REGISTRO" && (
                   <div className="bg-white/5 border border-white/10 p-12 rounded-[50px] space-y-8">
                      <header>
                        <h2 className="text-4xl font-black uppercase italic text-yellow-500">Gerador de Boletim</h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Sincronizado com a Secretaria de Segurança</p>
                      </header>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-600 uppercase ml-2">Identificação do Sujeito</label>
                            <input className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-sm font-bold" placeholder="Nome ou Passaporte..." />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-600 uppercase ml-2">Local da Ocorrência (QTH)</label>
                            <input className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-sm font-bold" placeholder="Ex: Praça do Pedágio / BR-101" />
                         </div>
                         <div className="col-span-full space-y-2">
                            <label className="text-[10px] font-black text-zinc-600 uppercase ml-2">Relatório Detalhado</label>
                            <textarea className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 h-40 text-sm font-bold resize-none" placeholder="Descreva os artigos aplicados, itens apreendidos e conduta do indivíduo..." />
                         </div>
                      </div>
                      <button onClick={() => play(200, "square", 0.5)} className="w-full bg-yellow-500 text-black font-black py-6 rounded-3xl uppercase tracking-[0.3em] text-xs hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-yellow-500/20">Enviar para o Banco de Dados</button>
                   </div>
                )}

                {/* HIARARQUIA: INTEGRADA */}
                {page === "HIERARQUIA" && (
                  <div className="grid grid-cols-1 gap-4">
                    {DATA.hierarquia.map((h, i) => (
                      <div key={i} className="flex items-center gap-8 bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all">
                        <div className={`text-4xl font-black ${h.cor} w-24 text-center border-r border-white/10`}>{h.poder}%</div>
                        <div>
                          <h4 className="text-2xl font-black uppercase italic text-white leading-none">{h.cargo}</h4>
                          <p className="text-zinc-500 text-[11px] font-bold mt-2 uppercase tracking-widest">{h.desc}</p>
                        </div>
                        <Award className="ml-auto text-zinc-800" size={40} />
                      </div>
                    ))}
                  </div>
                )}

                {/* CÓDIGOS Q: ORGANIZADOS */}
                {page === "CODIGOS" && (
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {DATA.codigos.map((q, i) => (
                        <div key={i} className="bg-black/60 border border-white/10 p-8 rounded-[40px] text-center hover:border-yellow-500/50 transition-all group">
                           <h4 className="text-4xl font-black text-yellow-500 mb-2 group-hover:scale-110 transition-transform">{q.q}</h4>
                           <p className="text-sm font-black text-white uppercase mb-2">{q.m}</p>
                           <p className="text-[9px] text-zinc-600 font-bold italic uppercase leading-tight">{q.t}</p>
                        </div>
                      ))}
                   </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* FOOTER TICKER */}
      <footer className="fixed bottom-0 w-full h-10 bg-yellow-500 z-[1000] flex items-center overflow-hidden">
        <div className="flex gap-20 animate-marquee items-center text-black font-black text-[10px] italic tracking-[0.4em]">
           {[...Array(8)].map((_, i) => (
             <div key={i} className="flex items-center gap-6 whitespace-nowrap">
               <Siren size={14} /> ALERTA DE SEGURANÇA: PROTOCOLO AEGIS EM VIGOR // TODO O EFETIVO DEVE MANTER O QAP // PRF QUEBRADA RJ
             </div>
           ))}
        </div>
      </footer>

      {/* COMPONENTE DE ÍCONE FALTANTE FIX */}
      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EAB308; border-radius: 10px; }
        body { background-color: #030305; cursor: crosshair; }
      `}</style>
    </div>
  );
}

// Pequeno fix para ícones de escala se necessário
function ScaleIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}