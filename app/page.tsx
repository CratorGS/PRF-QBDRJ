"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Radio, BookOpen, GraduationCap, History, Terminal, 
  Search, Bell, Zap, Menu, Award, Scale, Info, Map, 
  Gavel, Car, Users, Target, AlertCircle, FileText, CheckCircle2, MapPin,
  Lock, Flame, Crosshair, ClipboardList
} from "lucide-react";

// --- BANCO DE DADOS INTEGRADO (DADOS DO GITBOOK QUEBRADA RJ) ---
const prfData = {
  codigosQ: [
    { q: "QAP", msg: "Na escuta", ex: "Viatura 01 em QAP." },
    { q: "QRF", msg: "Reforço", ex: "QRF urgente na BR-101!" },
    { q: "QTH", msg: "Localização", ex: "Informe seu QTH atual." },
    { q: "QTI", msg: "Deslocamento", ex: "QTI para delegacia." },
    { q: "QRR", msg: "Apoio Médico", ex: "QRR para o local do acidente." },
    { q: "TKS", msg: "Obrigado/Entendido", ex: "TKS pela informação." },
  ],
  doutrina: [
    { t: "Hierarquia", d: "Respeito total ao superior. Ordens não se discutem, se cumprem." },
    { t: "Uso da Força", d: "1. Presença -> 2. Verbalização -> 3. Contato -> 4. Letal." },
    { t: "Patrulha", d: "Sempre em dupla. Um faz a segurança (S1), outro a consulta (S2)." },
  ],
  // NOVOS DADOS BASEADOS NO GITBOOK DA CIDADE
  codigoPenal: [
    { art: "Art. 01", nome: "Desobediência", pena: "20 meses", multa: "R$ 5.000" },
    { art: "Art. 02", nome: "Desacato", pena: "30 meses", multa: "R$ 10.000" },
    { art: "Art. 05", nome: "Fuga de Abordagem", pena: "40 meses", multa: "R$ 15.000" },
    { art: "Art. 12", nome: "Posse de Arma (Ilegal)", pena: "60 meses", multa: "R$ 50.000" },
  ],
  zonasRisco: [
    { cor: "Verde", status: "Seguro", desc: "Praças, Hospitais, Áreas de Farm." },
    { cor: "Amarela", status: "Atenção", desc: "Periferias e BRs secundárias." },
    { cor: "Vermelha", status: "Perigo", desc: "Favelas e Áreas de Domínio de Facção." },
  ],
  checklistViatura: [
    "Motor e Pneus reparados?",
    "Tanque de combustível cheio?",
    "Colete e Armamento no inventário?",
    "Rádio na frequência 99.1?",
    "Kits médicos e Algemas?"
  ]
};

export default function PRFPortalGodMode() {
  const [page, setPage] = useState("dashboard");
  const [sidebar, setSidebar] = useState(true);

  // Lista de seções expandida (MAIS COISAS ADICIONADAS)
  const sections = [
    { id: "dashboard", label: "Terminal Core", icon: <Shield /> },
    { id: "codigos", label: "Códigos Q", icon: <Terminal /> },
    { id: "doutrina", label: "Doutrina PRF", icon: <Scale /> },
    { id: "penal", label: "Código Penal", icon: <Gavel /> },
    { id: "zonas", label: "Zonas de Risco", icon: <Map /> },
    { id: "briefing", label: "Briefing Pré-Patrulha", icon: <ClipboardList /> },
    { id: "miranda", label: "Direitos Miranda", icon: <Lock /> },
    { id: "historia", label: "Nossa História", icon: <History /> },
  ];

  return (
    <div className="min-h-screen bg-[#010204] text-slate-100 font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* HEADER SUPREMO */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/95 border-b-2 border-yellow-500/40 backdrop-blur-3xl z-[60] flex items-center justify-between px-10">
        <div className="flex items-center gap-4 group cursor-pointer">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} className="bg-yellow-500 p-2 rounded shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <Shield className="text-black w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="font-black text-2xl tracking-tighter italic">POLÍCIA <span className="text-yellow-500 underline decoration-2 underline-offset-4">RODOVIÁRIA</span></h1>
            <p className="text-[9px] text-zinc-500 font-bold tracking-[0.5em] uppercase">Unidade de Ensino Quebrada RJ</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2 flex items-center gap-4">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase text-green-500"><div className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Rede Segura</div>
             <div className="w-[1px] h-4 bg-white/20" />
             <span className="text-[10px] font-black uppercase text-zinc-400">Ver: 3.1.0_Final</span>
          </div>
        </div>
      </header>

      <div className="flex pt-20 h-screen overflow-hidden">
        
        {/* SIDEBAR NAVEGADOR DE ELITE */}
        <motion.aside 
          animate={{ width: sidebar ? 280 : 90 }}
          className="bg-black/90 border-r border-white/5 backdrop-blur-2xl z-40 flex flex-col shadow-2xl"
        >
          <nav className="p-5 flex-1 space-y-2 overflow-y-auto custom-scrollbar">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setPage(s.id)}
                className={`w-full flex items-center gap-5 px-4 py-4 rounded-2xl transition-all relative group ${
                  page === s.id ? 'bg-yellow-500 text-black font-black shadow-lg shadow-yellow-500/20' : 'text-zinc-500 hover:bg-white/5'
                }`}
              >
                <span className={`${page === s.id ? 'text-black' : 'text-yellow-500'} transition-colors`}>{s.icon}</span>
                {sidebar && <span className="uppercase text-[11px] tracking-[0.1em] font-black">{s.label}</span>}
                {page === s.id && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-yellow-400/10 rounded-2xl -z-10" />}
              </button>
            ))}
          </nav>
          <button onClick={() => setSidebar(!sidebar)} className="p-6 text-zinc-700 hover:text-yellow-500 flex justify-center border-t border-white/5">
             <Menu className={sidebar ? "" : "rotate-90"} />
          </button>
        </motion.aside>

        {/* ÁREA DE CONTEÚDO (EXPANDIDA) */}
        <main className="flex-1 overflow-y-auto p-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >

              {/* DASHBOARD: O CORE DO SITE */}
              {page === "dashboard" && (
                <div className="space-y-12">
                  <div className="relative p-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-[40px] text-black overflow-hidden shadow-2xl">
                     <Shield className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
                     <h2 className="text-6xl font-black italic uppercase leading-none">Padrão <br/>Operacional</h2>
                     <p className="mt-4 font-bold text-lg max-w-lg">Portal oficial de treinamento da PRF Quebrada RJ. Aqui você se torna a lei.</p>
                     <div className="mt-8 flex gap-4">
                        <button onClick={() => setPage("penal")} className="px-6 py-3 bg-black text-white rounded-xl font-black text-xs uppercase hover:scale-105 transition-transform">Consultar Código Penal</button>
                        <button onClick={() => setPage("briefing")} className="px-6 py-3 bg-black/20 text-black border-2 border-black/30 rounded-xl font-black text-xs uppercase">Checklist de Saída</button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                       <Flame className="text-orange-500 mb-4" />
                       <h3 className="font-black text-xl mb-2 italic">ZONA SUL</h3>
                       <p className="text-xs text-zinc-500">Status: <span className="text-green-500 font-bold">Patrulhamento Intensivo</span></p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                       <Crosshair className="text-red-500 mb-4" />
                       <h3 className="font-black text-xl mb-2 italic">FAVELAS</h3>
                       <p className="text-xs text-zinc-500">Status: <span className="text-red-500 font-bold">Atenção Crítica</span></p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                       <Activity className="text-blue-500 mb-4" />
                       <h3 className="font-black text-xl mb-2 italic">RODOVIAS</h3>
                       <p className="text-xs text-zinc-500">Status: <span className="text-blue-400 font-bold">Fluxo Normal</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* CÓDIGO PENAL (EXTRAÍDO DO GITBOOK) */}
              {page === "penal" && (
                <div className="space-y-6 max-w-5xl">
                   <h2 className="text-4xl font-black italic uppercase border-b-4 border-yellow-500 inline-block mb-8">Código <span className="text-yellow-500">Penal RJ</span></h2>
                   <div className="grid grid-cols-1 gap-4">
                      {prfData.codigoPenal.map((p, i) => (
                        <div key={i} className="flex flex-col md:flex-row justify-between items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                           <div className="flex gap-6 items-center">
                              <span className="text-yellow-500 font-mono font-black text-xl">{p.art}</span>
                              <h4 className="text-lg font-bold uppercase tracking-widest">{p.nome}</h4>
                           </div>
                           <div className="flex gap-8 mt-4 md:mt-0">
                              <div className="text-center"><p className="text-[10px] text-zinc-500 uppercase font-black">Pena</p><p className="text-red-500 font-bold">{p.pena}</p></div>
                              <div className="text-center"><p className="text-[10px] text-zinc-500 uppercase font-black">Multa</p><p className="text-green-500 font-bold">{p.multa}</p></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* CHECKLIST DE BRIEFING (PARA ENSINAR OS MENINOS) */}
              {page === "briefing" && (
                <div className="max-w-3xl mx-auto space-y-10">
                   <div className="text-center">
                      <ClipboardList size={60} className="text-yellow-500 mx-auto mb-4" />
                      <h2 className="text-4xl font-black italic uppercase">Briefing de <span className="text-yellow-500">Patrulha</span></h2>
                      <p className="text-zinc-500 mt-2">Nenhum oficial sai da base sem cumprir estes requisitos.</p>
                   </div>
                   <div className="space-y-4">
                      {prfData.checklistViatura.map((item, i) => (
                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 group cursor-pointer hover:border-yellow-500 transition-all">
                           <div className="w-6 h-6 border-2 border-yellow-500 rounded-lg group-hover:bg-yellow-500 transition-all" />
                           <span className="text-lg font-bold text-zinc-300">{item}</span>
                        </div>
                      ))}
                   </div>
                   <div className="p-8 bg-red-600/10 border-2 border-dashed border-red-600/50 rounded-3xl text-center">
                      <p className="text-red-500 font-black uppercase italic">"A falha na preparação é a preparação para a falha."</p>
                   </div>
                </div>
              )}

              {/* DIREITOS MIRANDA (ESSENCIAL PARA O RP) */}
              {page === "miranda" && (
                <div className="h-[70vh] flex items-center justify-center">
                   <div className="max-w-2xl p-12 bg-black border-4 border-red-600 rounded-[50px] shadow-[0_0_50px_rgba(220,38,38,0.2)] relative overflow-hidden">
                      <Lock className="absolute top-10 right-10 text-red-600 opacity-20" size={100} />
                      <h3 className="text-3xl font-black text-red-600 mb-8 uppercase italic underline decoration-red-600/30">Protocolo de Prisão</h3>
                      <p className="text-2xl font-black leading-relaxed italic text-white italic">"{prfData.miranda}"</p>
                      <div className="mt-10 pt-10 border-t border-white/10">
                         <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Aviso: A não leitura da Miranda anula o RP de prisão.</p>
                      </div>
                   </div>
                </div>
              )}

              {/* FALLBACK PARA OUTRAS SEÇÕES */}
              {!["dashboard", "penal", "briefing", "miranda", "codigos"].includes(page) && (
                <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[40px]">
                   <Zap className="text-yellow-500 animate-pulse mb-4" size={48} />
                   <h2 className="text-2xl font-black uppercase italic">Módulo em Atualização</h2>
                   <p className="text-zinc-500 text-sm mt-2">Acessando dados da Secretaria de Segurança...</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-yellow-500 flex items-center justify-between px-10 z-[70] shadow-2xl">
         <p className="text-[10px] font-black text-black uppercase tracking-widest italic italic">Patria Amada Brasil - PRF Quebrada RJ</p>
         <div className="flex gap-6 items-center">
            <span className="text-[10px] font-black text-black uppercase tracking-widest">Apoio: Comando Governamental</span>
         </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EAB308; border-radius: 10px; }
      `}</style>
    </div>
  );
}