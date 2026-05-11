"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Radio, BookOpen, GraduationCap, Menu, Award, Scale, 
  Car, Target, Lock, Skull, Siren, Activity, Satellite, 
  Fingerprint, MapPin, CheckCircle2, Send, Megaphone, Cpu, 
  ExternalLink, MessageSquare, ShieldAlert, Crosshair, 
  Mic2, Volume2, Info, List
} from "lucide-react";

// --- BANCO DE DATOS DO ALUNO PRF ---
const DATA = {
  links: { prf: "https://discord.gg/H6kdsd5yRu", cidade: "https://discord.gg/XjBF8qrvJw" },
  
  // DICIONÁRIO DE RÁDIO APELADO PARA OS ALUNOS
  protocolos: {
    codigoQ: [
      { q: "QAP", m: "Na Escuta / Atento", ex: "Agente pronto para receber mensagens." },
      { q: "QRV", m: "À Disposição", ex: "Pronto para qualquer missão ou ordem." },
      { q: "QTH", m: "Localização", ex: "Local exato onde a unidade se encontra." },
      { q: "QSL", m: "Entendido / Confirmado", ex: "Mensagem recebida e compreendida." },
      { q: "QRF", m: "Reforço", ex: "Solicitação de apoio para ocorrência." },
      { q: "QRR", m: "Apoio Médico", ex: "Solicitação de SAMU / Paramédicos." },
      { q: "QTI", m: "A Caminho", ex: "Unidade se deslocando para o local." },
      { q: "TKS", m: "Obrigado", ex: "Agradecimento após comunicação." },
      { q: "QRU", m: "Ocorrência / Novidade", ex: "Verificar se há algo novo no rádio." },
      { q: "QRA", m: "Nome / Identidade", ex: "Nome do Agente ou do Civil." },
    ],
    codigosDeStatus: [
      { c: "10-8", m: "Em Serviço (Disponível)", d: "Entrou em patrulha agora." },
      { c: "10-7", m: "Fora de Serviço (QRL)", d: "Saiu para intervalo ou folga." },
      { c: "10-20", m: "Localização Exata", d: "Mesmo que QTH." },
      { c: "10-31", m: "Crime em Andamento", d: "Flagrante ocorrendo agora." },
      { c: "10-33", m: "EMERGÊNCIA GERAL", d: "Oficial em perigo, silêncio no rádio!" },
    ],
    alfabeto: [
      "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike"
    ]
  },

  hierarquia: [
    { cat: "AUTO COMANDO", ranks: ["Diretor Geral", "Comando Geral", "Sub-Comando Geral"], color: "text-yellow-500" },
    { cat: "COMANDANTES", ranks: ["Comando GRR", "Comando NOE", "Comando GOC", "Comando GMR", "Comando GPT", "Comando NOPI", "Comando COI", "Comando GFT", "Comando GDC"], color: "text-orange-500" },
    { cat: "SUPERVISORES", ranks: ["Coordenador Operacional", "Chefe de Equipe", "Sub-Chefe de Equipe"], color: "text-blue-400" },
    { cat: "INTERMEDIÁRIOS", ranks: ["Inspetor Chefe", "Inspetor", "Agente Especial"], color: "text-green-400" },
    { cat: "POLICIAIS / AGENTES", ranks: ["Agente 1ª Classe", "Agente 2ª Classe", "Agente PRF", "Aluno / Recruta"], color: "text-zinc-400" }
  ],
  penas: [
    { crime: "Desobediência", multa: 5000, meses: 0, desc: "Não acatar ordens." },
    { crime: "Desacato", multa: 10000, meses: 20, desc: "Desrespeito ao Agente." },
    { crime: "Fuga / Evasão", multa: 15000, meses: 30, desc: "Fugir da abordagem." },
    { crime: "Porte Ilegal", multa: 40000, meses: 60, desc: "Arma sem registro." },
    { crime: "Tráfico de Drogas", multa: 90000, meses: 100, desc: "Posse de entorpecentes." },
    { crime: "Homicídio", multa: 150000, meses: 150, desc: "Atentar contra a vida." },
  ]
};

export default function PRFOmegaAlpha() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertMode, setAlertMode] = useState(false);
  const [calcPena, setCalcPena] = useState(0);
  const [calcMulta, setCalcMulta] = useState(0);

  const handleCalc = (p: number, m: number, checked: boolean) => {
    setCalcPena(prev => checked ? prev + p : prev - p);
    setCalcMulta(prev => checked ? prev + m : prev - m);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${alertMode ? 'bg-[#2a0505]' : 'bg-[#020308]'} text-slate-100 font-sans`}>
      
      {/* EFEITOS HUD */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,2px_100%]" />

      {/* HEADER */}
      <header className={`fixed top-0 w-full h-24 ${alertMode ? 'bg-red-900/90' : 'bg-black/90'} border-b-2 ${alertMode ? 'border-red-500' : 'border-yellow-500/50'} backdrop-blur-xl z-[100] flex items-center justify-between px-10 transition-all`}>
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => setPage("dashboard")}>
          <motion.div animate={alertMode ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: Infinity }} className={`${alertMode ? 'bg-red-600' : 'bg-yellow-500'} p-3 rounded-2xl`}>
            <Shield className="text-black w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="font-black text-2xl tracking-tighter italic uppercase">PRF <span className={alertMode ? "text-white" : "text-yellow-500"}>QBDRJ</span></h1>
            <p className="text-[8px] text-zinc-500 font-black tracking-[0.5em]">CENTRAL DE INSTRUÇÃO E OPERAÇÕES</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={() => setAlertMode(!alertMode)} className={`px-6 py-2 rounded-xl text-[10px] font-black border transition-all ${alertMode ? 'bg-white text-red-600' : 'bg-red-600/10 border-red-600 text-red-500 hover:bg-red-600 hover:text-white'}`}>
             {alertMode ? "CÓDIGO 3 EM ANDAMENTO" : "ATIVAR CÓDIGO 3"}
           </button>
           <div className="h-10 w-[1px] bg-white/10 mx-2" />
           <a href={DATA.links.prf} target="_blank" className="bg-[#5865F2] p-2 rounded-lg hover:scale-110 transition-all"><MessageSquare size={20}/></a>
        </div>
      </header>

      <div className="flex pt-24 h-screen overflow-hidden">
        
        {/* SIDEBAR */}
        <motion.aside animate={{ width: sidebarOpen ? 280 : 90 }} className="bg-black/95 border-r border-white/5 z-[90] flex flex-col transition-all">
          <div className="p-6 flex-1 space-y-2 overflow-y-auto custom-scrollbar">
            {[
              { id: "dashboard", label: "Dashboard", icon: <Cpu size={18}/> },
              { id: "codigos", label: "Protocolos / Código Q", icon: <Radio size={18}/> },
              { id: "hierarquia", label: "Hierarquia", icon: <Award size={18}/> },
              { id: "penal", label: "Calculadora", icon: <Scale size={18}/> },
              { id: "ouvidoria", label: "Ouvidoria", icon: <Megaphone size={18}/> },
              { id: "miranda", label: "Miranda", icon: <Lock size={18}/> },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setPage(s.id)}
                className={`w-full flex items-center gap-5 px-5 py-4 rounded-xl transition-all ${
                  page === s.id ? (alertMode ? 'bg-red-600 text-white' : 'bg-yellow-500 text-black font-black') : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                {s.icon}
                {sidebarOpen && <span className="uppercase text-[10px] font-black tracking-widest">{s.label}</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-8 border-t border-white/5 text-zinc-700 hover:text-yellow-500 flex justify-center"><Menu size={20} /></button>
        </motion.aside>

        {/* ÁREA PRINCIPAL */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="max-w-6xl mx-auto">
              
              {/* DASHBOARD */}
              {page === "dashboard" && (
                <div className="space-y-8">
                   <div className={`p-16 rounded-[60px] relative overflow-hidden ${alertMode ? 'bg-red-600 text-white' : 'bg-yellow-500 text-black'}`}>
                      <h2 className="text-8xl font-black italic uppercase leading-none tracking-tighter">PRF-QBDRJ</h2>
                      <p className="mt-6 text-xl font-bold max-w-xl uppercase italic opacity-80 leading-tight">
                         Bem-vindo à Central de Instrução. Aluno, aqui você encontrará tudo o que precisa para honrar a farda. Estude os códigos Q e a hierarquia.
                      </p>
                      <div className="flex gap-4 mt-10">
                        <a href={DATA.links.prf} target="_blank" className="bg-black text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase">Discord PRF</a>
                        <a href={DATA.links.cidade} target="_blank" className="bg-white/20 border border-black/10 px-8 py-4 rounded-2xl font-black text-[10px] uppercase">Discord Cidade</a>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 text-center">
                         <Mic2 className="text-yellow-500 mx-auto mb-4" />
                         <h4 className="font-black uppercase italic">Comunicação</h4>
                         <p className="text-[10px] text-zinc-500 font-bold uppercase mt-2">Mantenha o rádio limpo. Use códigos Q para agilizar a resposta.</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 text-center">
                         <Target className="text-red-500 mx-auto mb-4" />
                         <h4 className="font-black uppercase italic">Conduta</h4>
                         <p className="text-[10px] text-zinc-500 font-bold uppercase mt-2">Hierarquia e disciplina acima de tudo. Respeite seus superiores.</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 text-center">
                         <ShieldCheck className="text-green-500 mx-auto mb-4" />
                         <h4 className="font-black uppercase italic">Justiça</h4>
                         <p className="text-[10px] text-zinc-500 font-bold uppercase mt-2">Aplique a lei com imparcialidade. Verifique a calculadora penal.</p>
                      </div>
                   </div>
                </div>
              )}

              {/* PROTOCOLOS DE RÁDIO (APELADO) */}
              {page === "codigos" && (
                <div className="space-y-12">
                   <div className="text-center">
                      <h2 className="text-5xl font-black italic uppercase text-yellow-500">Manual de Comunicação</h2>
                      <p className="text-zinc-500 text-xs font-bold uppercase mt-2 tracking-widest">O domínio do rádio separa o aluno do profissional.</p>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* CÓDIGO Q */}
                      <div className="bg-white/5 border border-white/10 rounded-[50px] p-10">
                         <h3 className="text-2xl font-black italic mb-8 text-yellow-500 flex items-center gap-4"><Radio/> CÓDIGOS Q PRINCIPAIS</h3>
                         <div className="space-y-4">
                            {DATA.protocolos.codigoQ.map((item, i) => (
                              <div key={i} className="bg-black/60 p-5 rounded-2xl border border-white/5 hover:border-yellow-500 transition-all group">
                                 <div className="flex justify-between items-center mb-1">
                                    <span className="text-2xl font-black text-white group-hover:text-yellow-500">{item.q}</span>
                                    <span className="text-[10px] font-black text-zinc-500 uppercase">{item.m}</span>
                                 </div>
                                 <p className="text-[9px] text-zinc-600 font-bold uppercase italic">{item.ex}</p>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-10">
                         {/* CÓDIGOS DE STATUS */}
                         <div className="bg-white/5 border border-white/10 rounded-[50px] p-10">
                            <h3 className="text-2xl font-black italic mb-8 text-blue-500 flex items-center gap-4"><List/> STATUS DE SERVIÇO</h3>
                            <div className="grid grid-cols-1 gap-4">
                               {DATA.protocolos.codigosDeStatus.map((item, i) => (
                                 <div key={i} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                                    <div><span className="font-black text-blue-500 mr-4">{item.c}</span><span className="text-xs font-black uppercase text-white">{item.m}</span></div>
                                    <span className="text-[9px] text-zinc-600 font-bold uppercase">{item.d}</span>
                                 </div>
                               ))}
                            </div>
                         </div>

                         {/* ALFABETO FONÉTICO */}
                         <div className="bg-yellow-500 p-10 rounded-[50px] text-black">
                            <h3 className="text-2xl font-black italic mb-6 flex items-center gap-4"><Volume2/> ALFABETO FONÉTICO</h3>
                            <div className="flex flex-wrap gap-2">
                               {DATA.protocolos.alfabeto.map((word, i) => (
                                 <span key={i} className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">{word}</span>
                               ))}
                               <span className="text-[10px] font-bold italic opacity-60">...entre outros.</span>
                            </div>
                            <p className="mt-6 text-[10px] font-bold uppercase leading-tight opacity-80">
                               ALUNO: Use o alfabeto para informar placas. <br/>Ex: "Veículo placa Alpha-Bravo-01"
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {/* HIERARQUIA */}
              {page === "hierarquia" && (
                <div className="space-y-10">
                   <h2 className="text-5xl font-black italic uppercase text-yellow-500 text-center">Cadeia de Comando</h2>
                   <div className="grid grid-cols-1 gap-6">
                      {DATA.hierarquia.map((cat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-[40px] p-8">
                           <h3 className={`text-xl font-black italic mb-6 uppercase ${cat.color}`}>{cat.cat}</h3>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {cat.ranks.map((rank, idx) => (
                                <div key={idx} className="bg-black/50 p-4 rounded-xl border border-white/5 text-center">
                                   <p className="font-black uppercase text-[10px] tracking-widest">{rank}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* CALCULADORA PENAL */}
              {page === "penal" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 space-y-4">
                      <h2 className="text-4xl font-black italic uppercase text-yellow-500 mb-8 underline">Calculadora de Pena</h2>
                      {DATA.penas.map((l, i) => (
                        <label key={i} className="flex items-center justify-between p-8 bg-black/60 border border-white/5 rounded-[40px] hover:bg-yellow-500/5 cursor-pointer transition-all group">
                           <div className="flex items-center gap-8">
                              <input type="checkbox" className="w-8 h-8 accent-yellow-500" onChange={(e) => handleCalc(l.meses, l.multa, e.target.checked)} />
                              <div><p className="font-black uppercase text-xl group-hover:text-yellow-500">{l.crime}</p><p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{l.desc}</p></div>
                           </div>
                           <div className="text-right font-black">
                              <p className="text-red-500 text-lg">{l.meses} M</p>
                              <p className="text-green-500 text-xs">R$ {l.multa.toLocaleString()}</p>
                           </div>
                        </label>
                      ))}
                   </div>
                   <div className={`p-12 rounded-[60px] text-black h-fit sticky top-32 text-center shadow-2xl transition-all ${alertMode ? 'bg-red-500' : 'bg-yellow-500'}`}>
                      <h3 className="text-3xl font-black uppercase italic border-b-2 border-black/10 pb-6 mb-8">SENTENÇA</h3>
                      <div className="space-y-8">
                        <div><p className="text-[10px] font-black uppercase opacity-60">Pena de Prisão</p><h4 className="text-8xl font-black tracking-tighter leading-none">{calcPena}</h4><p className="text-xs font-black uppercase mt-1">Meses</p></div>
                        <div className="bg-black/10 p-4 rounded-2xl"><p className="text-[10px] font-black uppercase opacity-60">Multas</p><h4 className="text-3xl font-black tracking-tighter">R$ {calcMulta.toLocaleString()}</h4></div>
                      </div>
                      <button onClick={() => window.location.reload()} className="w-full bg-black text-white py-6 rounded-[30px] font-black uppercase text-[10px] mt-10 hover:scale-105 transition-all">Limpar</button>
                   </div>
                </div>
              )}

              {/* LEI DE MIRANDA */}
              {page === "miranda" && (
                <div className="h-[60vh] flex flex-col items-center justify-center border-8 border-red-600/20 rounded-[80px] bg-red-600/5 p-12 text-center shadow-2xl">
                   <Lock size={100} className="text-red-600 mb-8 animate-pulse" />
                   <h2 className="text-7xl font-black italic uppercase text-red-600 mb-10 leading-none text-white">Voz de <br/><span className="text-red-600">Miranda</span></h2>
                   <div className="max-w-4xl p-10 bg-black rounded-[40px] border border-red-600/40">
                      <p className="text-3xl font-black italic text-white leading-tight">
                        "Você tem o direito de permanecer em silêncio. Tudo o que você disser pode e será usado contra você no tribunal. Você tem direito a um advogado; se não puder pagar por um, o estado providenciará um."
                      </p>
                   </div>
                </div>
              )}

              {/* OUVIDORIA */}
              {page === "ouvidoria" && (
                <div className="max-w-2xl mx-auto space-y-12">
                   <div className="text-center">
                      <h2 className="text-5xl font-black italic uppercase text-yellow-500">Ouvidoria</h2>
                      <p className="text-zinc-500 text-xs font-bold uppercase mt-4">Canal oficial para denúncias ou relatos.</p>
                   </div>
                   <div className="space-y-6">
                      <input type="text" placeholder="ID (PASSAPORTE)" className="bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-yellow-500 font-black uppercase text-xs w-full" />
                      <textarea rows={6} placeholder="DESCREVA O RELATO..." className="bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-yellow-500 font-black uppercase text-xs w-full" />
                      <button className="w-full bg-yellow-500 text-black py-6 rounded-3xl font-black uppercase text-[10px] flex items-center justify-center gap-4 hover:scale-105 transition-all">
                         <Send size={18}/> Enviar Relatório
                      </button>
                   </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* FOOTER TICKER */}
      <footer className={`fixed bottom-0 w-full h-12 ${alertMode ? 'bg-red-600 animate-pulse' : 'bg-yellow-500'} z-[100] flex items-center overflow-hidden`}>
        <div className="flex gap-20 animate-marquee whitespace-nowrap items-center text-black font-black text-[10px] italic tracking-widest uppercase">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="flex items-center gap-6">
               <Siren size={18} /> {alertMode ? "ALERTA CÓDIGO 3: PRIORIDADE TOTAL NO RÁDIO" : "POLÍCIA RODOVIÁRIA FEDERAL - QUEBRADA RJ - AS ESTRADAS SÃO NOSSO DOMÍNIO - QAP QRV"}
             </div>
           ))}
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EAB308; border-radius: 10px; }
        body { background-color: #020308; cursor: crosshair; }
      `}</style>
    </div>
  );
}