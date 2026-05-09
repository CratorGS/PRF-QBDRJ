"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ========================================
   PÁGINAS
======================================== */
const pages = [
  "inicio",
  "dashboard",
  "historia",
  "doutrina",
  "hierarquia",
  "codigos",
  "operacoes",
  "treinamento",
  "equipamentos",
  "viaturas",
  "armas",
  "uniformes",
  "manual",
  "estatisticas",
  "timeline",
  "radio",
  "chat",
  "discord",
  "recrutamento",
  "noticias",
  "galeria",
  "config",
  "creditos",
  "simulador",
  "rankings",
];

/* ========================================
   DADOS
======================================== */

// História oficial
const historia = [
  { ano: 1928, evento: "Fundação", desc: "Criada em 24/07/1928 por Washington Luís como 'Polícia de Estradas'." },
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
  { nome: "Radar Multa Fixa", tipo: "Fiscalização" },
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
   COMPONENTE
======================================== */

export default function PRFPortal() {
  const [page, setPage] = useState("inicio");
  const [rgbOffset, setRgbOffset] = useState(0);
  const [userLogged, setUserLogged] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>(["Central: Todas unidades QAP?"]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRgbOffset((prev) => (prev + 1.5) % 360);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chatMessages]);

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const getRgbColor = (baseColor: string, intensity = 1) => {
    const hueShift = (rgbOffset * 0.15) % 360;
    return `hsl(${hueShift}, 85%, ${45 + intensity * 30}%)`;
  };

  const handlePageChange = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendChatMessage = (msg: string) => {
    setChatMessages((prev) => [...prev, `Unidade ${Math.floor(Math.random() * 99)}: ${msg}`]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900/50 text-white overflow-hidden relative antialiased">
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

      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0ca7a1176.mp3"
      />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/90 border-b border-yellow-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
              </div>
            </motion.div>

            <div className="md:hidden flex gap-2">
              {pages.slice(0, 6).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    page === p ? "bg-yellow-500 text-black shadow-lg" : "hover:bg-yellow-500/30"
                  }`}
                >
                  {p.slice(0, 3).toUpperCase()}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/40">
                {["inicio", "hierarquia", "equipamentos", "recrutamento", "dashboard"].map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all mx-1 ${
                      page === p
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg scale-105"
                        : "hover:bg-yellow-500/30 hover:scale-105"
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>

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
                  className={`p-2 rounded-xl transition-all text-lg ${userLogged ? "hover:bg-green-500/20" : "hover:bg-yellow-500/20"}`}
                  title="Login"
                >
                  {userLogged ? "✅" : "🔐"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

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
              setIsVideoPlaying,
            })}
          </motion.section>
        </AnimatePresence>
      </main>

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
   RENDER DAS PÁGINAS
======================================== */

function renderPageContent(page: string, props: any) {
  switch (page) {
    case "inicio":
      return renderInicio(props);
    case "hierarquia":
      return renderHierarquia(props);
    case "dashboard":
      return renderDashboard(props);
    case "viaturas":
      return renderViaturas();
    case "equipamentos":
      return renderEquipamentos();
    case "recrutamento":
      return renderRecrutamento();
    case "chat":
      return renderChat(props);
    case "codigos":
      return renderCodigos();
    case "radio":
      return renderRadio();
    case "noticias":
      return renderNoticias();
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
            className="px-16 py-6 border-4 border-yellow-400 text-yellow-400 font-black text-2xl rounded-3xl hover:bg-yellow-500/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePageChange("hierarquia")}
          >
            📋 MANUAL COMPLETO
          </motion.button>
        </div>
      </motion.div>

      <motion.section
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="p-8 group bg-black/60 backdrop-blur-sm border border-white/20 rounded-3xl text-center hover:border-yellow-400/70 hover:bg-yellow-500/10 transition-all cursor-pointer"
            whileHover={{ scale: 1.1, y: -10 }}
            onClick={() => handlePageChange("estatisticas")}
          >
            <div className={`text-4xl font-black mb-3 ${getColorClass(stat.color)}`}>{stat.value}</div>
            <div className="text-lg font-bold text-white/90 uppercase tracking-wide">{stat.label}</div>
            <div className="text-xs text-zinc-500">{stat.unidade}</div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="grid md:grid-cols-3 lg:grid-cols-6 gap-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[
          { page: "doutrina", icon: "📜", label: "DOUTRINA" },
          { page: "equipamentos", icon: "🛠️", label: "EQUIP." },
          { page: "viaturas", icon: "🚔", label: "VIATURAS" },
          { page: "recrutamento", icon: "🎯", label: "RP" },
          { page: "noticias", icon: "📰", label: "NOTÍCIAS" },
          { page: "chat", icon: "💬", label: "RÁDIO" },
        ].map(({ page, icon, label }, i) => (
          <motion.div
            key={i}
            className="p-10 bg-black/50 border border-yellow-500/30 rounded-3xl text-center group cursor-pointer hover:bg-yellow-500/20 hover:border-yellow-400/70 transition-all"
            whileHover={{ scale: 1.1, y: -15 }}
            onClick={() => handlePageChange(page)}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="font-bold text-xl uppercase tracking-wider group-hover:text-yellow-400 transition-colors">
              {label}
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}

function renderHierarquia({ getRgbColor }: any) {
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
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4" style={{ color: getRgbColor(grupo.baseColor, 1.5) }}>
              {grupo.level}
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ backgroundColor: getRgbColor(grupo.baseColor, 0.8) }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grupo.ranks.map((rank, j) => (
              <motion.div
                key={j}
                className="relative p-10 lg:p-12 border-2 border-white/20 rounded-3xl bg-black/70 backdrop-blur-xl cursor-pointer overflow-hidden group-hover:border-white/50 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${getRgbColor(grupo.baseColor, 0.4)})`,
                }}
                whileHover={{
                  scale: 1.08,
                  rotateX: 8,
                  rotateY: 8,
                  boxShadow: `0 35px 70px ${getRgbColor(grupo.baseColor, 0.5)}`,
                }}
                animate={{
                  backgroundColor: [
                    `rgba(0,0,0,0.9)`,
                    getRgbColor(grupo.baseColor, 0.6),
                    `rgba(0,0,0,0.9)`,
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="relative z-20 text-center">
                  <div
                    className="text-2xl lg:text-3xl font-black mb-4 drop-shadow-2xl leading-tight"
                    style={{
                      color: getRgbColor(grupo.baseColor, 1.8),
                      textShadow: `0 0 20px ${getRgbColor(grupo.baseColor, 1)}`,
                    }}
                  >
                    {rank}
                  </div>
                  <div className="text-lg font-semibold text-white/95 uppercase tracking-wide mb-2">
                    Nível {j + 1}
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
                </div>

                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: `radial-gradient(circle at 25% 75%, ${getRgbColor(grupo.baseColor, 1.2)} 0%, transparent 55%)`,
                  }}
                />

                <div className="absolute top-6 right-8 w-3 h-3 bg-white/40 rounded-full animate-ping" />
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-white/30 rounded-full animate-ping [animation-delay:0.5s]" />
                <div className="absolute top-1/2 left-4 w-1 h-1 bg-white/50 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}

function renderDashboard({ userLogged }: any) {
  if (!userLogged) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-4xl">🔐 LOGIN REQUERIDO</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <motion.div
        className="p-8 bg-gradient-to-br from-green-900/80 to-black/60 border border-green-500/50 rounded-3xl col-span-1 lg:col-span-2"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-3xl font-black text-green-400 mb-6">STATUS OPERACIONAL</h3>
        <div className="grid grid-cols-2 gap-6 text-lg">
          <div>
            <span className="text-zinc-400">Unidade:</span> <span className="font-bold text-green-300">ATIVA</span>
          </div>
          <div>
            <span className="text-zinc-400">Posição:</span> <span className="font-bold text-yellow-300">BR-116 KM 420</span>
          </div>
          <div>
            <span className="text-zinc-400">Status:</span> <span className="font-bold text-green-300">PATRULHAMENTO</span>
          </div>
          <div>
            <span className="text-zinc-400">Equipe:</span> <span className="font-bold text-blue-300">4 UNIDADES</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="p-8 bg-gradient-to-br from-blue-900/80 to-black/60 border border-blue-500/50 rounded-3xl"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-2xl font-black text-blue-400 mb-4">PRÓXIMAS AÇÕES</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-2"><span>▶️</span><span>Abordagem KM 425</span></div>
          <div className="flex gap-2"><span>▶️</span><span>Bloqueio planejado</span></div>
          <div className="flex gap-2"><span>▶️</span><span>Fiscalização cargas</span></div>
        </div>
      </motion.div>
    </div>
  );
}

function renderViaturas() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
          FROTA PRF 2026
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {viaturas.map((viatura, i) => (
          <motion.div
            key={i}
            className="p-10 bg-black/70 border-4 border-blue-500/40 rounded-3xl backdrop-blur-xl group hover:border-blue-400/80"
            whileHover={{ y: -15, scale: 1.02 }}
          >
            <div className="text-3xl font-black text-blue-400 mb-6 text-center">{viatura.modelo}</div>
            <div className="space-y-4 text-lg">
              <div><strong>🗓️ Ano:</strong> <span className="text-blue-300">{viatura.ano}</span></div>
              <div><strong>🎯 Uso:</strong> <span className="text-blue-300">{viatura.uso}</span></div>
              <div><strong>🎨 Cor:</strong> <span className="text-blue-300 font-mono">{viatura.cor}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function renderEquipamentos() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {equipamentos.map((equip, i) => (
        <motion.div
          key={i}
          className="p-8 bg-black/60 border border-green-500/40 rounded-3xl hover:border-green-400/70 group"
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="text-3xl mb-4 text-green-400">{getEquipIcon(equip.tipo)}</div>
          <h4 className="text-2xl font-black text-green-400 mb-4 group-hover:text-green-300">{equip.nome}</h4>
          <div className="text-zinc-300 text-lg">{equip.tipo}</div>
        </motion.div>
      ))}
    </div>
  );
}

function renderRecrutamento() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center py-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-8">
          RECRUTAMENTO PRF 2026
        </h1>
        <div className="w-40 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          className="space-y-6 p-10 bg-black/70 border border-emerald-500/50 rounded-3xl"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-3xl font-black text-emerald-400 mb-6">REQUISITOS</h3>
          <div className="space-y-4 text-xl">
            {recrutamento.map((req, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-black/50 rounded-2xl border-l-4 border-emerald-400">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 p-10 bg-gradient-to-br from-emerald-900/80 to-black/60 border border-emerald-500/50 rounded-3xl"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-3xl font-black text-emerald-300 mb-6">PROCESSO</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-black/50 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-500/30 rounded-xl flex items-center justify-center font-bold text-emerald-400">1</div>
              <span className="font-semibold">Prova Objetiva</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-black/50 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-500/30 rounded-xl flex items-center justify-center font-bold text-emerald-400">2</div>
              <span className="font-semibold">TAF</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-black/50 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-500/30 rounded-xl flex items-center justify-center font-bold text-emerald-400">3</div>
              <span className="font-semibold">Curso Formação</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function renderChat({ chatMessages, sendChatMessage, chatRef }: any) {
  return (
    <div className="max-w-2xl mx-auto h-[70vh] flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-green-400 mb-4">RÁDIO SIMULADOR</h1>
        <div className="w-32 h-2 bg-green-500/50 mx-auto rounded-full" />
      </div>

      <div
        ref={chatRef}
        className="flex-1 bg-black/80 border border-green-500/40 rounded-3xl p-6 overflow-y-auto space-y-3 mb-6"
      >
        {chatMessages.map((msg: string, i: number) => (
          <div key={i} className="flex gap-3 p-3 bg-black/60 border border-green-500/30 rounded-2xl">
            <div className="w-8 h-8 bg-green-500/30 rounded-xl flex items-center justify-center font-mono text-xs text-green-400">
              U99
            </div>
            <div className="flex-1">
              <div className="font-mono text-green-400 text-sm">{msg}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Digite comando (QAP, QTH, 10-4...)"
          className="flex-1 bg-black/70 border border-green-500/50 rounded-2xl px-6 py-4 text-lg font-mono placeholder-zinc-500 focus:border-green-400 focus:outline-none transition-all"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const msg = (e.target as HTMLInputElement).value;
              if (msg) {
                sendChatMessage(msg);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
        <button className="w-16 h-16 bg-green-500 hover:bg-green-400 text-black font-bold text-xl rounded-3xl transition-all hover:scale-110">
          📡
        </button>
      </div>
    </div>
  );
}

function renderCodigos() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
          CÓDIGOS RÁDIO PRF
        </h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {codigos.map((codigo, i) => (
          <motion.div
            key={i}
            className="p-8 bg-black/70 border border-purple-500/40 rounded-3xl group hover:border-purple-400/80 backdrop-blur-xl"
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <div className="text-4xl font-mono font-black text-purple-400 mb-4 text-center">{codigo.c}</div>
            <div className="text-zinc-200 text-lg leading-relaxed">{codigo.d}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function getEquipIcon(tipo: string) {
  const icons: Record<string, string> = {
    Fiscalização: "📷",
    Alcoolemia: "🍺",
    Proteção: "🛡️",
    Sinalização: "🚨",
  };
  return icons[tipo] || "🛠️";
}

function renderNoticias() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          ÚLTIMAS NOTÍCIAS
        </h1>
      </div>
      {noticias.map((noticia, i) => (
        <motion.div
          key={i}
          className="group p-8 bg-black/70 border-l-8 border-orange-500 rounded-2xl hover:bg-orange-500/10 transition-all cursor-pointer"
          whileHover={{ x: 20 }}
        >
          <div className="flex gap-4 items-start">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 mb-2 leading-tight">
                {noticia.titulo}
              </h3>
              <div className="text-zinc-500 text-sm font-mono">{noticia.data}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function renderRadio() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="text-7xl mb-12 animate-pulse">📡</div>
      <h1 className="text-5xl font-black text-green-400 mb-8">RÁDIO OPERACIONAL</h1>
      <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
        Simulador de comunicação via rádio PRF ativo. Use a página CHAT para testar códigos Q e 10-Codes em tempo real.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-16">
        <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-2xl font-mono text-green-400 font-bold">QAP</div>
        <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-2xl font-mono text-green-400 font-bold">QTH</div>
        <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-2xl font-mono text-green-400 font-bold">10-4</div>
        <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-2xl font-mono text-green-400 font-bold">Código 5</div>
      </div>
    </div>
  );
}

function getColorClass(color: string) {
  const map: Record<string, string> = {
    yellow: "text-yellow-400",
    green: "text-green-400",
    orange: "text-orange-400",
    red: "text-red-400",
    blue: "text-blue-400",
  };
  return map[color] || "text-white";
}