"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Terminal, Lock, Gavel, Map, ClipboardList, Target, History, Award, 
  Search, Users, Skull, AlertTriangle, Activity, BarChart, Crosshair, Siren,
  Car, Sword, Radio, MessageSquare, Zap, FileText, Eye, Flame, ChevronRight,
  Info, Bell, Satellite, Database, HardDrive, Wrench, MapPin, Fingerprint, 
  Volume2, VolumeX, Cpu, Navigation, Copy, Scale
} from "lucide-react";

// --- ENGINE DE ÁUDIO ---
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

// --- BASE DE DADOS COMPLETA ---
const DATA = {
  hierarquia: [
    { c: "Diretor-Geral", d: "Comando Supremo.", p: 100, cl: "text-yellow-500" },
    { c: "Superintendente", d: "Comandante Regional RJ.", p: 90, cl: "text-blue-500" },
    { c: "Inspetor-Chefe", d: "Logística e Corregedoria.", p: 80, cl: "text-zinc-200" },
    { c: "Agente Elite GRR", d: "Operações Especiais.", p: 70, cl: "text-red-500" },
    { c: "Policial Rodoviário", d: "Agente Operacional.", p: 50, cl: "text-green-500" },
    { c: "Recruta", d: "Em treinamento.", p: 20, cl: "text-zinc-600" },
  ],
  codigos: [
    { q: "QAP", m: "Na escuta", t: "Mantenha o rádio livre." },
    { q: "QRF", m: "Reforço Imediato", t: "Prioridade 1. Risco de vida." },
    { q: "QTH", m: "Localização", t: "Informe sua coordenada." },
    { q: "QTI", m: "Deslocamento", t: "Unidade a caminho." },
    { q: "QSL", m: "Entendido", t: "Mensagem recebida." },
    { q: "TKS", m: "Obrigado", t: "Agradecimento tático." },
  ],
  penal: [
    { art: "Art. 12", n: "Posse de Arma", p: "60 meses", m: "R$ 50k" },
    { art: "Art. 33", n: "Tráfico", p: "120 meses", m: "R$ 150k" },
    { art: "Art. 157", n: "Assalto", p: "80 meses", m: "R$ 40k" },
    { art: "Art. 331", n: "Desacato", p: "30 meses", m: "R$ 10k" },
  ],
  arsenal: [
    { n: "FAL 7.62", cat: "Fuzil", d: "Poder de parada extremo." },
    { n: "M4A1 5.56", cat: "Fuzil", d: "Precisão em combate urbano." },
    { n: "Glock 17", cat: "Pistola", d: "Secundária padrão." },
  ],
  viaturas: [
    { m: "Trailblazer", f: "Blindagem Nível III." },
    { m: "Dodge Charger", f: "Intercepção de alta velocidade." },
    { m: "Helicóptero", f: "Suporte aéreo e vigilância." },
  ]
};

const navItems = [
  { id: "DASHBOARD", icon: Activity },
  { id: "HIERARQUIA", icon: Award },
  { id: "CODIGOS", icon: MessageSquare },
  { id: "PENAL", icon: Scale },
  { id: "ARSENAL", icon: Skull },
  { id: "VIATURAS", icon: Car },
  { id: "REGISTRO", icon: FileText },
  { id: "SISTEMAS", icon: Cpu },
];

export default function PRFUltraCommand() {
  const { play, muted, setMuted } = useAudio();
  const [page, setPage] = useState("BOOT");
  const [percent, setPercent] = useState(0);
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (page === "BOOT") {
      const timer = setInterval(() => {
        setPercent(p => {
          if (p >= 100) {
            clearInterval(timer);
            setTimeout(() => setPage("DASHBOARD"), 500);
            return 100;
          }
          if (p % 20 === 0) play(200 + p * 5, "square", 0.05);
          return p + 1;
        });
      }, 25);
      return () => clearInterval(timer);
    }
  }, [page]);

  useEffect(() => {
    if (page !== "BOOT") {
      const l = ["VTR-01 em patrulha", "DB-Sync OK", "Radar Ativo BR-101", "Criptografia G5 Ativa"];
      const logTimer = setInterval(() => {
        setLogs(prev => [l[Math.floor(Math.random() * l.length)], ...prev.slice(0, 4)]);
      }, 3000);
      return () => clearInterval(logTimer);
    }
  }, [page]);

  const navTo = (p: string) => {
    play(800, "sine", 0.05);
    setPage(p);
  };

  if (page === "BOOT") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Shield size={100} className="text-yellow-500 mb-8 drop-shadow-[0_0_20px_#EAB308]" />
        </motion.div>
        <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden mb-4 border border-white/10">
          <motion.div className="h-full bg-yellow-500 shadow-[0_0_10px_#EAB308]" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-[10px] text-yellow-500 tracking-[0.5em] uppercase">Acessando Nucleo Aegis: {percent}%</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020204] text-zinc-300 font-sans selection:bg-yellow-500 selection:text-black overflow-hidden">
      
      {/* EFEITO DE SCANLINE */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,2px_100%]" />

      {/* HEADER */}
      <header className="h-24 bg-black/80 backdrop-blur-xl border-b border-yellow-500/20 flex items-center justify-between px-10 fixed top-0 w-full z-[500]">
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => navTo("DASHBOARD")}>
          <div className="p-3 bg-yellow-500 rounded-2xl shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Shield className="text-black" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic text-white tracking-tighter uppercase leading-none">PRF <span className="text-yellow-500">Quebrada RJ</span></h1>
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1">Status: Operacional G5</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => setMuted(!muted)} className="p-3 bg-white/5 rounded-xl border border-white/5">
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-yellow-500" />}
           </button>
           <div className="text-right border-l border-white/10 pl-6">
              <p className="text-2xl font-mono font-black text-yellow-500">{new Date().toLocaleTimeString('pt-BR')}</p>
              <p className="text-[9px] text-zinc-600 font-bold uppercase">Sincronizado</p>
           </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-32 px-10 pb-10 flex gap-8 h-screen">
        
        {/* SIDEBAR */}
        <nav className="w-72 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="PESQUISAR..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-[9px] font-black outline-none focus:border-yellow-500/50 transition-all"
            />
          </div>
          {navItems.filter(i => i.id.includes(search.toUpperCase())).map((item) => (
            <button
              key={item.id}
              onClick={() => navTo(item.id)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                page === item.id ? 'bg-yellow-500 border-yellow-400 text-black shadow-lg shadow-yellow-500/10' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.id}</span>
              </div>
              <ChevronRight size={12} className={page === item.id ? "opacity-100" : "opacity-0"} />
            </button>
          ))}
        </nav>

        {/* CONTENT AREA */}
        <section className="flex-1 bg-zinc-950/50 border border-white/5 rounded-[40px] relative overflow-hidden flex flex-col">
          <div className="p-10 overflow-y-auto custom-scrollbar h-full">
            <AnimatePresence mode="wait">
              <motion.div key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                
                {page === "DASHBOARD" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                       <h2 className="text-5xl font-black uppercase italic leading-none text-white">Radar de <span className="text-yellow-500">Area</span></h2>
                       <div className="aspect-square bg-black border border-yellow-500/10 rounded-full relative overflow-hidden flex items-center justify-center">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(234,179,8,0.1)_360deg)]" />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                          <p className="absolute bottom-10 text-[9px] font-mono text-yellow-500 uppercase">GPS Ativo: BR-101 / KM-22</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                       {[{l:"VTRs", v:"12", i:Car}, {l:"EFETIVO", v:"34", i:Users}, {l:"ALERTAS", v:"03", i:Bell}].map((s,i)=>(
                         <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                            <div><p className="text-[9px] font-black text-zinc-500 uppercase">{s.l}</p><h4 className="text-3xl font-black text-white">{s.v}</h4></div>
                            <s.i className="text-yellow-500 opacity-20" size={32} />
                         </div>
                       ))}
                       <div className="bg-black p-6 rounded-3xl border border-white/5 font-mono text-[9px] text-zinc-500 h-32 overflow-hidden">
                          <p className="text-yellow-500/50 mb-2 font-black tracking-widest uppercase tracking-tighter">System Intelligence Feed</p>
                          {logs.map((log, i) => <p key={i}>[{new Date().toLocaleTimeString()}] {log}</p>)}
                       </div>
                    </div>
                  </div>
                )}

                {page === "HIERARQUIA" && (
                  <div className="space-y-3">
                    {DATA.hierarquia.map((h, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-6">
                        <div className={`text-3xl font-black ${h.cl} w-16`}>{h.p}%</div>
                        <div><h4 className="text-xl font-black uppercase text-white">{h.c}</h4><p className="text-[10px] text-zinc-500 uppercase">{h.d}</p></div>
                      </div>
                    ))}
                  </div>
                )}

                {page === "PENAL" && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {DATA.penal.map((p, i) => (
                        <div key={i} className="bg-black p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-all">
                           <div className="text-yellow-500 text-[9px] font-black">{p.art}</div>
                           <h4 className="text-xl font-black text-white uppercase my-2">{p.n}</h4>
                           <div className="flex justify-between pt-4 border-t border-white/5 text-[9px] font-black uppercase">
                              <span className="text-red-500">Pena: {p.p}</span>
                              <span className="text-green-500">Multa: {p.m}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                )}

                {["ARSENAL", "VIATURAS", "CODIGOS"].includes(page) && (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(DATA[page.toLowerCase() as keyof typeof DATA] as any[]).map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5">
                           <h4 className="text-lg font-black text-yellow-500 uppercase mb-2">{item.n || item.m || item.q}</h4>
                           <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{item.d || item.f || item.m}</p>
                        </div>
                      ))}
                   </div>
                )}

                {page === "REGISTRO" && (
                   <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 space-y-6">
                      <h2 className="text-3xl font-black italic text-yellow-500 uppercase">Boletim Digital</h2>
                      <div className="grid grid-cols-2 gap-4">
                         <input className="bg-black border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-yellow-500" placeholder="ID DO SUSPEITO" />
                         <input className="bg-black border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-yellow-500" placeholder="QTH (LOCAL)" />
                         <textarea className="col-span-2 bg-black border border-white/10 p-4 rounded-xl text-xs h-32 outline-none focus:border-yellow-500" placeholder="RELATORIO DA OCORRENCIA..." />
                      </div>
                      <button onClick={()=>play(300, "square", 0.3)} className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl uppercase text-xs tracking-widest shadow-xl shadow-yellow-500/20">Enviar ao Comando</button>
                   </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full h-8 bg-yellow-500 flex items-center overflow-hidden">
        <div className="flex gap-20 animate-marquee text-black font-black text-[9px] italic uppercase tracking-widest">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center gap-4 whitespace-nowrap">
               <Siren size={12} /> ALERTA: OPERACAO NA LINHA VERMELHA - MANTENHA O QAP GERAL
             </div>
           ))}
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EAB308; border-radius: 10px; }
      `}</style>
    </div>
  );
}