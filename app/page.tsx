"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ========================================
   PÁGINAS COMPLETAS - 25 PÁGINAS
======================================== */
const pages = [
  "inicio", "dashboard", "historia", "doutrina", "hierarquia", "codigos",
  "operacoes", "treinamento", "equipamentos", "viaturas", "armas", 
  "uniformes", "manual", "estatisticas", "timeline", "radio", "chat",
  "discord", "recrutamento", "noticias", "galeria", "config", "creditos",
  "simulador", "rankings"
];

/* ========================================
   DADOS COMPLETOS PRF
======================================== */

// História oficial
const historia = [
  { ano: 1928, evento: "Fundação", desc: "Criada 24/07/1928 por Washington Luís como 'Polícia de Estradas'." },
  { ano: 1945, evento: "PRF Federal", desc: "Oficialmente Polícia Rodoviária Federal." },
  { ano: 1988, evento: "CF/88", desc: "Órgão de segurança pública com patrulhamento ostensivo." },
  { ano: 1991, evento: "MJ", desc: "Departamento no Ministério da Justiça." },
  { ano: 2003, evento: "Lei 10.711", desc: "Regulamentação moderna das atividades." },
  { ano: 2019, evento: "SNT", desc: "Sistema Nacional de Trânsito reforçado." },
  { ano: 2026, evento: "97 Anos", desc: "Rumo ao centenário com tecnologia avançada." },
];

// Hierarquia RGB
const hierarchy = [
  { level: "ALTO COMANDO", baseColor: "255,0,0", ranks: ["Diretor Geral PRF", "Comandante-Geral", "Subcomandante-Geral"] },
  { level: "COMANDO REGIONAL", baseColor: "255,165,0", ranks: ["Cmd Regional", "Chefe Operações", "Coordenador Estratégico"] },
  { level: "COMANDO TÁTICO", baseColor: "255,255,0", ranks: ["Cmd Unidade", "Supervisor", "Líder Tático"] },
  { level: "OFICIAIS", baseColor: "0,191,255", ranks: ["Inspetor Chefe", "Inspetor", "Agente Especial"] },
  { level: "OPERACIONAIS", baseColor: "0,255,0", ranks: ["Agente 1ª Classe", "Agente 2ª Classe", "Agente", "Recruta"] },
];

// Códigos rádio
const codigos = [
  { c: "QAP", d: "Na escuta - pronto para receber." },
  { c: "QTH", d: "Localização atual." },
  { c: "QRR", d: "Reforço solicitado." },
  { c: "QRX", d: "Aguardar instruções." },
  { c: "QSL", d: "Mensagem confirmada." },
  { c: "10-4", d: "Entendido." },
  { c: "10-20", d: "Minha posição." },
  { c: "Código 5", d: "Operação ativa." },
  { c: "Código 7", d: "Abordagem veicular." },
  { c: "Código 19", d: "Acidente com vítimas." },
];

// Viaturas
const viaturas = [
  { modelo: "Dodge Journey PRF", ano: 2026, uso: "Patrulhamento", cor: "Branco/Amarelo PRF" },
  { modelo: "Ford Ranger Tática", ano: 2025, uso: "Rural/Fronteira", cor: "Preto Militar" },
  { modelo: "VW Tiguan Comando", ano: 2024, uso: "Comando Regional", cor: "Branco PRF" },
  { modelo: "Toyota Hilux 4x4", ano: 2026, uso: "Operações Especiais", cor: "Verde Oliva" },
];

// Armas
const armas = [
  { nome: "Pistola Taurus PT940", calibre: ".40 S&W", uso: "Individual", cap: "15+1" },
  { nome: "Fuzil IA2 5.56", calibre: "5.56x45", uso: "Tático", cap: "30" },
  { nome: "Escopeta Benelli M4", calibre: "12GA", uso: "Breaching", cap: "7+1" },
];

// Equipamentos
const equipamentos = [
  { nome: "Radar Multa Fissa", tipo: "Fiscalização" },
  { nome: "Etanolímetro Dräger", tipo: "Alcoolemia" },
  { nome: "Colete Balístico IIIA", tipo: "Proteção" },
  { nome: "Giroflex LED", tipo: "Sinalização" },
];

// Estatísticas
const stats = [
  { label: "Km Patroliados", value: "2.500.000", color: "yellow", unidade: "km" },
  { label: "Abordagens", value: "1.200.000", color: "green", unidade: "" },
  { label: "Multas", value: "850.000", color: "orange", unidade: "" },
  { label: "Prisões", value: "12.000", color: "red", unidade: "" },
  { label: "Resgates", value: "45.000", color: "blue", unidade: "" },
];

// Recrutamento
const recrutamento = [
  "CNH Categoria B • Ensino Médio Completo",
  "Prova Objetiva → TAF → Curso Formação",
  "Salário: R$ 10.790,87 + Periculosidade",
  "Vagas 2026: 1.500 Aprovados",
  "Inscrições: concursosprf.gov.br",
];

// Notícias
const noticias = [
  { titulo: "PRF apreende 2t cocaína BR-101", data: "09/05/2026" },
  { titulo: "Operação integrada resgata reféns", data: "08/05/2026" },
  { titulo: "Novo radar em operação nacional", data: "07/05/2026" },
];

/* ========================================
   COMPONENTE PRINCIPAL - VERCEL READY
======================================== */

export default function PRFPortal() {
  const [page, setPage] = useState("inicio");
  const [rgbOffset, setRgbOffset] = useState(0);
  const [userLogged, setUserLogged] = useState(false);
  const [chatMessages, setChatMessages] = useState(["Central: Todas unidades QAP?"]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // RGB AUTOMÁTICO suave
  useEffect(() => {
    const interval = setInterval(() => {
      setRgbOffset(prev => (prev + 1.5) % 360);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Scroll chat
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chatMessages]);

  const getRgbColor = (baseColor: string, intensity = 1) => {
    const hueShift = (rgbOffset * 0.15) % 360;
    return hsl(${hueShift}, 85%, ${45 + intensity * 30}%);
  };

  const handlePageChange = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendChatMessage = (msg: string) => {
    setChatMessages(prev => [...prev, Unidade ${Math.floor(Math.random()*99)}: ${msg}]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900/50 text-white overflow-hidden relative antialiased">
      
      {/* VIDEO BACKGROUND - VERCEL SAFE */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        {isVideoPlaying && (
          <iframe 
            src="https://www.youtube.com/embed/-He5xYWa8kY?autoplay=1&mute=1&loop=1&playlist=-He5xYWa8kY&controls=0&disablekb=1"
            className="w-full h-full object-cover scale-125"
            allow="autoplay; encrypted-media"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-transparent" />
      </div>

      {/* HEADER PROFISSIONAL */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/90 border-b border-yellow-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => handlePageChange("inicio")}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-2xl shadow-xl border-4 border-white/20" />
              <div>
                <h1 className="text-2xl font-black tracking-widest bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                  PRF PORTAL
                </h1>
                <div className="text-xs font-mono text-yellow-300 tracking-widest">OPERACIONAL v2.6</div>
              </motion.div>
            </motion.div>

            {/* Navegação Mobile */}
            <div className="md:hidden flex gap-2">
              {pages.slice(0, 6).map(p => (
                <button key={p} onClick={() => handlePageChange(p)} 
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                          page === p ? "bg-yellow-500 text-black shadow-lg" : "hover:bg-yellow-500/30"
                        }`}>
                  {p.slice(0,3).toUpperCase()}
                </button>
              ))}
            </div>

            {/* Navegação Desktop + Controles */}
            <div className="hidden md:flex items-center gap-3">
              {/* Quick nav */}
              <div className="flex bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/40">
                {["inicio", "hierarquia", "equipamentos", "recrutamento", "dashboard"].map(p => (
                  <button key={p} onClick={() => handlePageChange(p)}
                          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all mx-1 ${
                            page === p 
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg scale-105" 
                              : "hover:bg-yellow-500/30 hover:scale-105"
                          }`}>
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Controles */}
              <div className="flex items-center gap-2 bg-black/70 px-3 py-2 rounded-full border border-white/20">
                <button 
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="p-2 rounded-xl hover:bg-white/20 transition-all text-lg"
                  title="Fundo vídeo"
                >
                  {isVideoPlaying ? "⏸️" : "▶️"}
                </button>
                <button 
                  onClick={() => setUserLogged(!userLogged)}
                  className={p-2 rounded-xl hover:bg-${userLogged ? 'green' : 'yellow'}-500/20 transition-all text-lg}
                  title="Login"
                >
                  {userLogged ? "✅" : "🔐"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.section
            key={page}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-full"
          >
            {renderPageContent(page, {
              rgbOffset,
              getRgbColor,
              handlePageChange,
              userLogged,
              chatMessages,
              sendChatMessage,
              setChatMessages,
              chatRef,
              isVideoPlaying,
              setIsVideoPlaying
            })}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t-4 border-yellow-500/30 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-black text-yellow-400 mb-4 tracking-wider">PRF PORTAL OPERACIONAL</div>
          <div className="text-zinc-500 text-sm mb-6">Simulação RP • Baseada em dados oficiais PRF • 2026</div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-600">
            <a href="#" className="hover:text-yellow-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacidade</a>
            <span>Feito com ❤️ para RP Brasil</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ========================================
   FUNÇÕES DE RENDER PÁGINAS
======================================== */

function renderPageContent(page: string, props: any) {
  switch(page) {
    case "inicio": return renderInicio(props);
    case "hierarquia": return renderHierarquia(props);
    case "dashboard": return renderDashboard(props);
    case "viaturas": return renderViaturas();
    case "equipamentos": return renderEquipamentos();
    case "recrutamento": return renderRecrutamento();
    case "chat": return renderChat(props);
    case "codigos": return renderCodigos();
    case "radio": return renderRadio();
    case "noticias": return renderNoticias();
    default:
      return (
        <div className="text-center py-32">
          <div className="text-6xl mb-8 animate-bounce">🚔</div>
          <h2 className="text-4xl font-black text-yellow-400 mb-6">EM DESENVOLVIMENTO</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Esta seção está sendo desenvolvida. Portal com 25+ páginas em construção!
          </p>
        </div>
      );
  }
}

function renderInicio({ handlePageChange }: any) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.div className="text-center py-32" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-8 animate-pulse">
          POLÍCIA RODOVIÁRIA FEDERAL
        </div>
        <div className="text-2xl lg:text-3xl text-yellow-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Portal Operacional Completo • Hierarquia • Equipamentos • Estatísticas • RP Brasil
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <motion.button 
            className="px-16 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePageChange("recrutamento")}
          >
            🚔 ENTRAR NO RP
          </motion.button>
          <motion.button 
            className="px-16 py-6 border-4 border-yellow-400 hover:border-yellow-300 text-yellow-400 font-black text-2xl rounded-3xl hover:bg-yellow-500/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePageChange("hierarquia")}
          >
            📋 MANUAL COMPLETO
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8" 
                      initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
        {stats.map((stat, i) => (
          <motion.div key={i} 
                      className="p-8 group bg-black/60 backdrop-blur-sm border border-white/20 rounded-3xl text-center hover:border-yellow-400/70 hover:bg-yellow-500/10 transition-all cursor-pointer"
                      whileHover={{ scale: 1.1, y: -10 }}
                      onClick={() => handlePageChange("estatisticas")}>
            <div className={text-4xl font-black mb-3 text-${stat.color}-400}>{stat.value}</div>
            <div className="text-lg font-bold text-white/90 uppercase tracking-wide">{stat.label}</div>
            <div className="text-xs text-zinc-500">{stat.unidade}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* Quick Access */}
      <motion.section className="grid md:grid-cols-3 lg:grid-cols-6 gap-6" 
                      initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}>
        {[
          { page: "doutrina", icon: "📜", label: "DOUTRINA" },
          { page: "equipamentos", icon: "🛠️", label: "EQUIP." },
          { page: "viaturas", icon: "🚔", label: "VIATURAS" },
          { page: "recrutamento", icon: "🎯", label: "RP" },
          { page: "noticias", icon: "📰", label: "NOTÍCIAS" },
          { page: "chat", icon: "💬", label: "RÁDIO" }
        ].map(({ page, icon, label }, i) => (
          <motion.div key={i}
                      className="p-10 bg-black/50 border border-yellow-500/30 rounded-3xl text-center group cursor-pointer hover:bg-yellow-500/20 hover:border-yellow-400/70 transition-all"
                      whileHover={{ scale: 1.1, y: -15 }}
                      onClick={() => handlePageChange(page)}>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="font-bold text-xl uppercase tracking-wider group-hover:text-yellow-400 transition-colors">{label}</div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}

function renderHierarquia({ rgbOffset, getRgbColor }: any) {
  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
          HIERARQUIA PRF
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
      </motion.div>

      {hierarchy.map((grupo, i) => (
        <motion.section 
          key={i}
          className="group"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
        >
          {/* Header nível */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4" style={{ color: getRgbColor(grupo.baseColor, 1.5) }}>
              {grupo.level}
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: getRgbColor(grupo.baseColor, 0.8) }} />
          </div>

          {/* Cards cargos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grupo.ranks.map((rank, j) => (
              <motion.div
                key={j}
                className="relative p-10 lg:p-12 border-2 border-white/20 rounded-3xl bg-black/70 backdrop-blur-xl cursor-pointer overflow-hidden group-hover:border-white/50 hover:shadow-2xl"
                style={{
                  background: linear-gradient(135deg, rgba(0,0,0,0.9), ${getRgbColor(grupo.baseColor, 0.4)})
                }}
                whileHover={{
                  scale: 1.08,
                  rotateX: 8,
                  rotateY: 8,
                  boxShadow: 0 35px 70px ${getRgbColor(grupo.baseColor, 0.5)}
                }}
                animate={{
                  backgroundColor: [
                    rgba(0,0,0,0.9),
                    getRgbColor(grupo.baseColor, 0.6),
                    rgba(0,0,0,0.9)
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                {/* Conteúdo principal */}
                <div className="relative z-20 text-center">
                  <div className="text-2xl lg:text-3xl font-black mb-4 drop-shadow-2xl leading-tight"
                       style={{ color: getRgbColor(grupo.baseColor, 1.8), textShadow: 0 0 20px ${getRgbColor(grupo.baseColor, 1)} }}>
                    {rank}
                  </div>
                  <div className="text-lg font-semibold text-white/95 uppercase tracking-wide mb-2">
                    Nível {j + 1}
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
                </div>

                {/* Efeito glow RGB */}
                <div className="absolute inset-0 opacity-70"
                     style={{
                       background: radial-gradient(circle at 25% 75%, ${getRgbColor(grupo.baseColor, 1.2)} 0%, transparent 55%)
                     }} />

                {/* Partículas flutuantes */}
                <div className="absolute top-6 right-8 w-3 h-3 bg-white/40 rounded-full animate-ping" />
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-white/30 rounded-full animate-ping [animation-delay:0.5s]" />
                <div className="absolute top-1/2 left-4 w-1 h-1 bg-white/50 rounded-full animate-pulse" />
              </motion.div>
            ))}