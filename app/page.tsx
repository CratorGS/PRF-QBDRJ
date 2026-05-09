"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pages = [
  "inicio",
  "dashboard",
  "historia",
  "doutrina",
  "hierarquia",
  "codigos",
  "miranda",
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
  "servidores",
  "recrutamento",
  "noticias",
  "galeria",
  "config",
  "creditos",
  "simulador",
  "rankings",
  "ocorrencias",
  "cursos",
  "frota",
  "setores",
  "boletim",
  "agenda",
  "patrulha",
];

const historia = [
  { ano: 1928, evento: "Fundação", desc: "Criada em 24/07/1928 como Polícia de Estradas." },
  { ano: 1945, evento: "PRF Federal", desc: "Oficialmente Polícia Rodoviária Federal." },
  { ano: 1988, evento: "CF/88", desc: "Consolidada como órgão de segurança pública." },
  { ano: 1991, evento: "MJ", desc: "Estrutura fortalecida no Ministério da Justiça." },
  { ano: 2026, evento: "Presente", desc: "Base moderna para RP, operações e patrulhamento." },
];

const timeline = [
  { ano: "1928", titulo: "Origem", desc: "Nascimento da estrutura de fiscalização rodoviária federal." },
  { ano: "1945", titulo: "Nome consolidado", desc: "A corporação passa a ser reconhecida como PRF." },
  { ano: "1988", titulo: "Segurança pública", desc: "A PRF ganha relevância institucional nacional." },
  { ano: "2026", titulo: "Portal RP", desc: "Portal focado em FiveM/GTA RP com estética operacional." },
];

const doutrina = [
  "Disciplina acima de tudo",
  "Hierarquia obrigatória",
  "Comunicação objetiva",
  "Uso progressivo da força",
  "Proteção da vida em primeiro lugar",
  "Operação em equipe",
  "Respeito absoluto ao comando",
  "Controle emocional em ação",
  "Eficiência operacional contínua",
  "Segurança da população antes de qualquer operação",
];

const hierarchy = [
  { level: "ALTO COMANDO", baseColor: "255,0,0", border: "border-red-500/40", ranks: ["Diretor Geral", "Comandante-Geral", "Subcomandante-Geral"] },
  { level: "COMANDO REGIONAL", baseColor: "255,165,0", border: "border-orange-500/40", ranks: ["Comandante Regional", "Chefe de Operações", "Coordenador Estratégico"] },
  { level: "COMANDO TÁTICO", baseColor: "255,255,0", border: "border-yellow-500/40", ranks: ["Comandante de Unidade", "Supervisor Operacional", "Líder Tático"] },
  { level: "OFICIAIS", baseColor: "0,191,255", border: "border-sky-500/40", ranks: ["Inspetor Chefe", "Inspetor", "Agente Especial"] },
  { level: "OPERACIONAIS", baseColor: "0,255,0", border: "border-emerald-500/40", ranks: ["Agente 1ª Classe", "Agente 2ª Classe", "Agente Operacional", "Recruta"] },
];

const operacoes = [
  "Patrulhamento Rodoviário",
  "Bloqueios Táticos",
  "Abordagem Veicular",
  "Fiscalização de Cargas",
  "Combate ao Tráfico",
  "Operações Integradas",
  "Resgate em Acidentes",
  "Apoio Estadual",
  "Inteligência de Trânsito",
  "Ponto de Controle",
  "Escala de Serviço",
  "Apoio em Grandes Eventos",
  "Cerco e Bloqueio",
  "Escolta Operacional",
  "Controle de Fluxo",
];

const codigos = [
  { c: "QAP", d: "Na escuta, pronto para receber." },
  { c: "QRA", d: "Nome ou identificação da estação/operador." },
  { c: "QRB", d: "Distância aproximada entre estações." },
  { c: "QRC", d: "Quem é responsável pela estação." },
  { c: "QRD", d: "Para onde vai e de onde vem." },
  { c: "QRE", d: "Destino e rota." },
  { c: "QRF", d: "Voltar ao local de origem." },
  { c: "QRG", d: "Frequência atual." },
  { c: "QRH", d: "Frequência varia." },
  { c: "QRI", d: "Tom ou intensidade do sinal." },
  { c: "QRJ", d: "Recepção fraca ou difícil." },
  { c: "QRK", d: "Qualidade do sinal recebido." },
  { c: "QRL", d: "Estou ocupado." },
  { c: "QRM", d: "Interferência atmosférica ou de outra estação." },
  { c: "QRN", d: "Ruído estático." },
  { c: "QRO", d: "Aumentar potência." },
  { c: "QRP", d: "Diminuir potência." },
  { c: "QRQ", d: "Transmitir mais rápido." },
  { c: "QRR", d: "Socorro ou reforço solicitado." },
  { c: "QRS", d: "Transmitir mais devagar." },
  { c: "QRT", d: "Parar de transmitir." },
  { c: "QRU", d: "Não tenho nada para você." },
  { c: "QRV", d: "Pronto para operar." },
  { c: "QRX", d: "Aguardar instruções." },
  { c: "QRY", d: "Sua vez de transmitir." },
  { c: "QRZ", d: "Quem está chamando?" },
  { c: "QSA", d: "Força do sinal." },
  { c: "QSB", d: "Sinal oscilando." },
  { c: "QSL", d: "Mensagem recebida e confirmada." },
  { c: "QSM", d: "Repita a última mensagem." },
  { c: "QSO", d: "Contato direto entre estações." },
  { c: "QSP", d: "Transmitir mensagem para outra estação." },
  { c: "QSY", d: "Mudar de frequência." },
  { c: "QTH", d: "Localização atual." },
  { c: "10-4", d: "Entendido." },
  { c: "10-6", d: "Ocupado." },
  { c: "10-7", d: "Fora de serviço." },
  { c: "10-8", d: "Disponível / em serviço." },
  { c: "10-9", d: "Repita a mensagem." },
  { c: "10-18", d: "Urgente." },
  { c: "10-19", d: "Retornando à base." },
  { c: "10-20", d: "Minha posição." },
  { c: "10-23", d: "Cheguei ao local." },
  { c: "10-33", d: "Emergência máxima." },
  { c: "10-50", d: "Acidente." },
  { c: "10-80", d: "Perseguição em andamento." },
  { c: "Código 1", d: "Ocorrência leve / rotina." },
  { c: "Código 2", d: "Resposta rápida sem sirene." },
  { c: "Código 3", d: "Resposta com urgência." },
  { c: "Código 4", d: "Sem necessidade de apoio." },
  { c: "Código 5", d: "Operação em andamento." },
  { c: "Código 6", d: "Investigação no local." },
  { c: "Código 7", d: "Abordagem veicular." },
  { c: "Código 8", d: "Apoio solicitado." },
  { c: "Código 9", d: "Bloqueio / cerco." },
  { c: "Código 10", d: "Situação sob controle." },
  { c: "Código 11", d: "Equipe em patrulha." },
  { c: "Código 12", d: "Retorno ao serviço." },
  { c: "Código 13", d: "Atenção máxima." },
  { c: "Código 14", d: "Atendimento médico necessário." },
  { c: "Código 15", d: "Encaminhamento à base." },
  { c: "Código 16", d: "Verificação documental." },
  { c: "Código 17", d: "Suspeito em fuga." },
  { c: "Código 18", d: "Apoio aéreo / reforço especial." },
  { c: "Código 19", d: "Acidente com vítimas." },
  { c: "Código 20", d: "Ocorrência encerrada." },
  { c: "Código 21", d: "Contato com central." },
  { c: "Código 22", d: "Perímetro montado." },
  { c: "Código 23", d: "Checagem de local." },
  { c: "Código 24", d: "Retorno de patrulha." },
  { c: "Código 25", d: "Apreensão realizada." },
  { c: "Código 26", d: "Material recolhido." },
  { c: "Código 27", d: "Condução de indivíduo." },
  { c: "Código 28", d: "Documento verificado." },
  { c: "Código 29", d: "Apoio ao comando." },
  { c: "Código 30", d: "Fim de operação." },
];

const miranda = [
  "Você tem o direito de permanecer em silêncio.",
  "Qualquer coisa que disser poderá e será usada contra você.",
  "Você tem o direito de falar com um advogado antes e durante o interrogatório.",
  "Se não puder pagar um advogado, um será nomeado para você.",
  "Você pode encerrar o interrogatório a qualquer momento.",
  "Você entendeu os seus direitos?",
];

const servidoresDiscord = [
  { nome: "DA PRF", link: "https://discord.gg/H6kdsd5yRu" },
  { nome: "DA CIDADE", link: "https://discord.gg/XjBF8qrvJw" },
];

const boletins = [
  { titulo: "Ocorrência 01", desc: "Fiscalização em BR com apoio da guarnição." },
  { titulo: "Ocorrência 02", desc: "Bloqueio tático com suspeita de fuga." },
  { titulo: "Ocorrência 03", desc: "Apoio em acidente e controle da área." },
  { titulo: "Ocorrência 04", desc: "Apreensão e condução à delegacia RP." },
  { titulo: "Ocorrência 05", desc: "Operação integrada em rodovia federal." },
];

const treinamento = [
  { nome: "Patrulhamento", detalhe: "Leitura de via, postura e fiscalização contínua." },
  { nome: "Abordagem Veicular", detalhe: "Aproximação segura, verbalização e controle." },
  { nome: "Bloqueios Táticos", detalhe: "Posicionamento de viaturas, cones e contenção." },
  { nome: "Comunicação", detalhe: "Rádio, clareza de comando e coordenação." },
  { nome: "Tático", detalhe: "Resposta a cenários de risco e reação em equipe." },
  { nome: "Resgate", detalhe: "Proteção da cena e suporte inicial." },
  { nome: "Fiscalização", detalhe: "Documentação, inspeção e irregularidades." },
  { nome: "Disciplina", detalhe: "Postura, hierarquia e rotina operacional." },
];

const equipamentos = [
  { nome: "Radar", tipo: "Fiscalização" },
  { nome: "Etanolímetro", tipo: "Alcoolemia" },
  { nome: "Colete Balístico", tipo: "Proteção" },
  { nome: "Giroflex", tipo: "Sinalização" },
  { nome: "Rádio", tipo: "Comunicação" },
  { nome: "Câmera", tipo: "Registro" },
  { nome: "Tablet", tipo: "Registro" },
  { nome: "Lanterna Tática", tipo: "Proteção" },
];

const viaturas = [
  { nome: "SUV PRF", uso: "Patrulhamento", status: "Ativa" },
  { nome: "Pickup Tática", uso: "Fronteira e apoio", status: "Disponível" },
  { nome: "Comando Regional", uso: "Coordenação", status: "Em uso" },
  { nome: "4x4 Operacional", uso: "Operações especiais", status: "Disponível" },
  { nome: "Móvel de Controle", uso: "Base", status: "Ativa" },
  { nome: "Resgate Rodoviário", uso: "Socorro", status: "Ativa" },
];

const frota = [
  { modelo: "SUV PRF", setor: "Rodovia", ativo: "Sim" },
  { modelo: "Pickup Tática", setor: "Fronteira", ativo: "Sim" },
  { modelo: "Comando Regional", setor: "Comando", ativo: "Não" },
  { modelo: "4x4 Operacional", setor: "Apoio", ativo: "Sim" },
  { modelo: "Móvel de Controle", setor: "Base", ativo: "Sim" },
  { modelo: "Resgate Rodoviário", setor: "Socorro", ativo: "Sim" },
];

const armas = [
  { nome: "Pistola .40", calibre: ".40", uso: "Individual", cap: "15+1" },
  { nome: "Fuzil 5.56", calibre: "5.56", uso: "Tático", cap: "30" },
  { nome: "Escopeta 12GA", calibre: "12GA", uso: "Breaching", cap: "8" },
];

const manualOperacional = [
  "Manter postura disciplinada em toda comunicação.",
  "Utilizar rádio apenas com mensagens objetivas.",
  "Não romper a hierarquia durante a operação.",
  "Priorizar segurança da equipe e da população.",
  "Executar ações com cautela, precisão e integração.",
  "Registrar ocorrências com clareza após o atendimento.",
  "Seguir o comando da unidade em toda ação.",
  "Respeitar a escala e o plantão em serviço.",
  "Preservar prova e local da ocorrência.",
  "Manter padrão RP coerente e organizado.",
];

const setores = [
  { nome: "Patrulhamento", desc: "Foco em presença constante e prevenção." },
  { nome: "Tático", desc: "Resposta a cenários de risco e apoio especializado." },
  { nome: "Operacional", desc: "Execução direta das ordens e manutenção da ordem." },
  { nome: "Inteligência", desc: "Leitura de rotas e movimentações suspeitas." },
  { nome: "Comunicação", desc: "Rádio, coordenação e repasse de informações." },
  { nome: "Resgate", desc: "Atendimento a acidentes e suporte inicial." },
  { nome: "Fiscalização", desc: "Checagem documental, cargas e irregularidades." },
  { nome: "Comando", desc: "Gestão, liderança e organização da corporação." },
];

const ocorrencias = [
  { tipo: "Fiscalização", detalhe: "Abordagem de rotina em rodovia federal com checagem documental e verificação veicular." },
  { tipo: "Operação Tática", detalhe: "Ação integrada com equipe posicionada para bloqueio e contenção de fuga." },
  { tipo: "Resgate", detalhe: "Atendimento a acidente com apoio médico e proteção da cena." },
  { tipo: "Combate ao Crime", detalhe: "Intervenção em transporte irregular, tráfico ou circulação suspeita." },
  { tipo: "Apoio Externo", detalhe: "Atuação conjunta com outras forças de segurança em ocorrência complexa." },
  { tipo: "Ocorrência Administrativa", detalhe: "Registro, relatório e atualização de prontuário da unidade." },
  { tipo: "Perseguição", detalhe: "Acompanhamento de suspeito em fuga com apoio tático." },
  { tipo: "Cerco e Bloqueio", detalhe: "Interdição operacional de rota para contenção." },
];

const cursos = [
  { nome: "Curso de Patrulhamento", desc: "Postura, leitura de via e presença operacional." },
  { nome: "Curso de Abordagem", desc: "Aproximação, verbalização e controle da situação." },
  { nome: "Curso de Rádio", desc: "Códigos, clareza e precisão operacional." },
  { nome: "Curso Tático", desc: "Cenários de risco e ação coordenada." },
  { nome: "Curso de Resgate", desc: "Proteção da cena e apoio inicial." },
  { nome: "Curso de Fiscalização", desc: "Rotina, documentação e análise de irregularidades." },
  { nome: "Curso de Condução", desc: "Prontidão, escolta e deslocamento operacional." },
  { nome: "Curso de Liderança", desc: "Comando, tomada de decisão e visão de unidade." },
];

const ranking = [
  { nome: "Agente Destaque", pontos: "980" },
  { nome: "Patrulheiro Elite", pontos: "920" },
  { nome: "Operador Tático", pontos: "870" },
  { nome: "Recruta Promissor", pontos: "740" },
  { nome: "Comando Ativo", pontos: "700" },
  { nome: "Apoiador da Unidade", pontos: "650" },
  { nome: "Fiscal Operacional", pontos: "610" },
  { nome: "Comunicação Ativa", pontos: "590" },
];

const agenda = [
  { dia: "Segunda", evento: "Briefing e patrulha" },
  { dia: "Terça", evento: "Treino de abordagem" },
  { dia: "Quarta", evento: "Operação integrada" },
  { dia: "Quinta", evento: "Fiscalização avançada" },
  { dia: "Sexta", evento: "Rádio e comunicação" },
  { dia: "Sábado", evento: "Evento RP/plantão" },
  { dia: "Domingo", evento: "Manutenção e relatório" },
];

const patrulha = [
  { posto: "BR-101", status: "Ativo", equipe: "3 viaturas" },
  { posto: "BR-116", status: "Ativo", equipe: "2 viaturas" },
  { posto: "BR-040", status: "Em apoio", equipe: "1 viatura" },
  { posto: "Fronteira", status: "Operação", equipe: "4 agentes" },
  { posto: "Base Central", status: "Ativa", equipe: "Comando" },
];

const creditos = [
  "Portal desenvolvido para PRF do FiveM / GTA RP.",
  "Layout operacional com foco em imersão.",
  "Painéis, histórico, rádio, frota e recrutamento.",
  "Interface moderna com tema escuro e RGB.",
  "Seção de códigos, Miranda e servidores Discord.",
];

export default function PRFPortal() {
  const [page, setPage] = useState("inicio");
  const [rgbOffset, setRgbOffset] = useState(0);
  const [userLogged, setUserLogged] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>(["Central: Todas unidades QAP?"]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [theme, setTheme] = useState("dark");
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
    <div className={`min-h-screen ${theme === "dark" ? "bg-gradient-to-br from-gray-950 via-black to-indigo-950" : "bg-slate-950"} text-white overflow-hidden relative antialiased`}>
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

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0ca7a1176.mp3" />

```tsx
<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/90 border-b border-yellow-500/30 shadow-2xl">
  <div className="max-w-7xl mx-auto px-3 py-1">
    <div className="flex items-center justify-between gap-2">
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handlePageChange("inicio")}
        whileHover={{ scale: 1.03 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-lg shadow-lg border border-white/20" />

        <div>
          <h1 className="text-sm md:text-lg font-black tracking-wide bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            PRF PORTAL
          </h1>

          <div className="text-[8px] font-mono text-yellow-300 tracking-widest">
            OPERACIONAL RP
          </div>
        </div>
      </motion.div>

      <div className="hidden md:flex items-center gap-1">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-2 py-[3px] text-[9px] rounded-full border border-white/20 hover:bg-white/10"
        >
          TEMA
        </button>

        <button
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          className="px-2 py-[3px] text-[9px] rounded-full border border-white/20 hover:bg-white/10"
        >
          {isVideoPlaying ? "FUNDO OFF" : "FUNDO ON"}
        </button>

        <button
          onClick={() => setUserLogged(!userLogged)}
          className="px-2 py-[3px] text-[9px] rounded-full border border-white/20 hover:bg-white/10"
        >
          {userLogged ? "ON" : "LOGIN"}
        </button>
      </div>
    </div>

    <div className="mt-1 flex flex-wrap gap-1">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-2 py-[3px] text-[9px] font-semibold rounded-full transition-all border ${
            page === p
              ? "bg-yellow-500 text-black border-yellow-300 shadow-lg"
              : "bg-white/5 border-white/10 hover:bg-yellow-500/20 hover:border-yellow-400"
          }`}
        >
          {p.toUpperCase()}
        </button>
      ))}
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
          <div className="text-zinc-500 text-sm mb-6">Simulação RP • FiveM / GTA RP • 2026</div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-600">
            {creditos.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function renderPageContent(page: string, props: any) {
  switch (page) {
    case "inicio":
      return renderInicio(props);
    case "dashboard":
      return renderDashboard(props);
    case "historia":
      return renderHistoria();
    case "doutrina":
      return renderDoutrina();
    case "hierarquia":
      return renderHierarquia(props);
    case "codigos":
      return renderCodigos();
    case "miranda":
      return renderMiranda();
    case "operacoes":
      return renderOperacoes();
    case "treinamento":
      return renderTreinamento();
    case "equipamentos":
      return renderEquipamentos();
    case "viaturas":
      return renderViaturas();
    case "armas":
      return renderArmas();
    case "uniformes":
      return renderUniformes();
    case "manual":
      return renderManual();
    case "estatisticas":
      return renderEstatisticas();
    case "timeline":
      return renderTimeline();
    case "radio":
      return renderRadio();
    case "chat":
      return renderChat(props);
    case "discord":
      return renderDiscord();
    case "servidores":
      return renderServidoresDiscord();
    case "recrutamento":
      return renderRecrutamento();
    case "noticias":
      return renderNoticias();
    case "galeria":
      return renderGaleria();
    case "config":
      return renderConfig();
    case "creditos":
      return renderCreditos();
    case "simulador":
      return renderSimulador();
    case "rankings":
      return renderRankings();
    case "ocorrencias":
      return renderOcorrencias();
    case "cursos":
      return renderCursos();
    case "frota":
      return renderFrota();
    case "setores":
      return renderSetores();
    case "boletim":
      return renderBoletim();
    case "agenda":
      return renderAgenda();
    case "patrulha":
      return renderPatrulha();
    default:
      return <div className="text-center py-32 text-2xl">EM DESENVOLVIMENTO</div>;
  }
}

function renderInicio({ handlePageChange }: any) {
  return (
    <div className="space-y-16">
      <motion.div className="text-center py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-8">
          PRF FIVEM
        </div>
        <div className="text-xl md:text-3xl text-yellow-300 mb-10 max-w-5xl mx-auto leading-relaxed">
          Portal Operacional Completo para PRF do GTA RP • Hierarquia • Frota • Rádio • Ocorrências • Treinamento • Miranda • Discord
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black text-xl rounded-2xl shadow-2xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => handlePageChange("dashboard")}>
            ACESSAR PAINEL
          </motion.button>
          <motion.button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-black text-xl rounded-2xl hover:bg-yellow-500/20 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => handlePageChange("manual")}>
            VER MANUAL
          </motion.button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "UNIDADES ATIVAS", value: "08" },
          { label: "PATRULHAS", value: "24" },
          { label: "OCORRÊNCIAS", value: "17" },
          { label: "AGENTES ON-LINE", value: "41" },
        ].map((item, i) => (
          <div key={i} className="p-6 bg-black/60 border border-yellow-500/30 rounded-3xl text-center">
            <div className="text-4xl font-black text-yellow-400">{item.value}</div>
            <div className="text-sm text-zinc-400 mt-2">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { page: "historia", label: "História", icon: "📜" },
          { page: "hierarquia", label: "Hierarquia", icon: "🎖️" },
          { page: "ocorrencias", label: "Ocorrências", icon: "🚨" },
          { page: "frota", label: "Frota", icon: "🚔" },
          { page: "cursos", label: "Cursos", icon: "🎓" },
          { page: "recrutamento", label: "Recrutamento", icon: "🎯" },
          { page: "miranda", label: "Miranda", icon: "⚖️" },
          { page: "servidores", label: "Discord", icon: "💬" },
          { page: "boletim", label: "Boletim", icon: "🗒️" },
        ].map((item, i) => (
          <motion.div key={i} className="p-8 bg-black/50 border border-yellow-500/30 rounded-3xl text-center cursor-pointer hover:bg-yellow-500/10" whileHover={{ y: -10, scale: 1.03 }} onClick={() => handlePageChange(item.page)}>
            <div className="text-4xl mb-4">{item.icon}</div>
            <div className="text-xl font-bold text-yellow-300">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function renderDashboard({ userLogged }: any) {
  if (!userLogged) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-10 bg-black/60 border border-yellow-500/30 rounded-3xl">
          <div className="text-5xl mb-4">🔐</div>
          <div className="text-3xl font-black text-yellow-400">LOGIN REQUERIDO</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="p-6 bg-black/70 border border-green-500/30 rounded-3xl lg:col-span-2">
        <h3 className="text-3xl font-black text-green-400 mb-4">STATUS OPERACIONAL</h3>
        <div className="grid md:grid-cols-2 gap-4 text-lg">
          <div className="p-4 bg-white/5 rounded-2xl">Unidade: <span className="text-green-300 font-bold">ATIVA</span></div>
          <div className="p-4 bg-white/5 rounded-2xl">Posição: <span className="text-yellow-300 font-bold">BR-116 KM 420</span></div>
          <div className="p-4 bg-white/5 rounded-2xl">Status: <span className="text-green-300 font-bold">PATRULHAMENTO</span></div>
          <div className="p-4 bg-white/5 rounded-2xl">Equipe: <span className="text-blue-300 font-bold">4 UNIDADES</span></div>
        </div>
      </div>
      <div className="p-6 bg-black/70 border border-blue-500/30 rounded-3xl">
        <h3 className="text-2xl font-black text-blue-400 mb-4">PRÓXIMAS AÇÕES</h3>
        <div className="space-y-3 text-sm text-zinc-300">
          <div>▶️ Abordagem KM 425</div>
          <div>▶️ Bloqueio planejado</div>
          <div>▶️ Fiscalização de cargas</div>
          <div>▶️ Apoio a unidade regional</div>
        </div>
      </div>
      <div className="p-6 bg-black/70 border border-yellow-500/30 rounded-3xl">
        <h3 className="text-2xl font-black text-yellow-400 mb-4">PAINEL RÁDIO</h3>
        <div className="space-y-2 text-zinc-300">
          <div>QAP • Central</div>
          <div>QTH • BR-116</div>
          <div>QRR • Em espera</div>
          <div>QSL • Confirmado</div>
        </div>
      </div>
    </div>
  );
}

function renderHistoria() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {historia.map((h, i) => (
        <motion.div key={i} className="p-6 bg-black/70 border border-yellow-500/30 rounded-3xl" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-black text-yellow-400">{h.ano}</div>
          <div className="text-xl font-bold text-white mt-2">{h.evento}</div>
          <p className="text-zinc-300 mt-3">{h.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function renderDoutrina() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doutrina.map((d, i) => (
        <motion.div key={i} className="p-5 bg-black/70 border border-yellow-500/30 rounded-2xl" whileHover={{ scale: 1.02 }}>
          <div className="text-lg font-bold text-yellow-300">• {d}</div>
        </motion.div>
      ))}
    </div>
  );
}

function renderHierarquia({ getRgbColor }: any) {
  return (
    <div className="space-y-12">
      {hierarchy.map((grupo, i) => (
        <motion.div key={i} className={`p-6 bg-black/70 border ${grupo.border} rounded-3xl`} whileHover={{ scale: 1.01 }}>
          <h3 className="text-4xl font-black mb-6 text-center" style={{ color: getRgbColor(grupo.baseColor, 1.5) }}>
            {grupo.level}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grupo.ranks.map((rank, j) => (
              <motion.div
                key={j}
                className="p-5 rounded-2xl border border-white/10 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${getRgbColor(grupo.baseColor, 0.35)})` }}
                whileHover={{ scale: 1.05 }}
                animate={{
                  backgroundColor: ["rgba(0,0,0,0.9)", getRgbColor(grupo.baseColor, 0.6), "rgba(0,0,0,0.9)"],
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="text-2xl font-black text-white text-center">{rank}</div>
                <div className="text-xs text-zinc-300 text-center mt-2">Cargo {j + 1}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function renderCodigos() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-6xl font-black text-purple-400 mb-4">CÓDIGOS RÁDIO</h1>
        <p className="text-zinc-400 text-lg">Q Codes, 10 Codes e códigos operacionais</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {codigos.map((codigo, i) => (
          <motion.div key={i} className="p-6 bg-black/70 border border-purple-500/30 rounded-3xl" whileHover={{ scale: 1.03 }}>
            <div className="text-4xl font-black text-purple-400 text-center">{codigo.c}</div>
            <div className="text-zinc-200 mt-4 text-center">{codigo.d}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function renderMiranda() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-6xl font-black text-red-400 mb-4">CÓDIGO DE MIRANDA</h1>
        <p className="text-zinc-400 text-lg">Direitos do abordado / preso</p>
      </div>
      <div className="grid gap-4">
        {miranda.map((item, i) => (
          <div key={i} className="p-5 bg-black/70 border border-red-500/30 rounded-2xl text-lg text-zinc-200">
            • {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderOperacoes() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {operacoes.map((o, i) => (
        <div key={i} className="p-5 bg-black/70 border border-yellow-500/30 rounded-2xl text-yellow-200">
          • {o}
        </div>
      ))}
    </div>
  );
}

function renderTreinamento() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {treinamento.map((t, i) => (
        <motion.div key={i} className="p-6 bg-black/70 border border-blue-500/30 rounded-3xl" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-black text-blue-300">{t.nome}</div>
          <p className="text-zinc-300 mt-3">{t.detalhe}</p>
        </motion.div>
      ))}
    </div>
  );
}

function renderEquipamentos() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipamentos.map((equip, i) => (
        <motion.div key={i} className="p-6 bg-black/70 border border-green-500/30 rounded-3xl" whileHover={{ scale: 1.03 }}>
          <div className="text-3xl text-green-400 mb-3">{getEquipIcon(equip.tipo)}</div>
          <div className="text-2xl font-black text-green-300">{equip.nome}</div>
          <div className="text-zinc-400 mt-2">{equip.tipo}</div>
        </motion.div>
      ))}
    </div>
  );
}

function renderViaturas() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {viaturas.map((v, i) => (
        <motion.div key={i} className="p-6 bg-black/70 border border-cyan-500/30 rounded-3xl" whileHover={{ scale: 1.03 }}>
          <div className="text-2xl font-black text-cyan-300">{v.nome}</div>
          <div className="text-zinc-300 mt-2">Uso: {v.uso}</div>
          <div className="text-zinc-300">Status: {v.status}</div>
        </motion.div>
      ))}
    </div>
  );
}

function renderArmas() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {armas.map((a, i) => (
        <div key={i} className="p-6 bg-black/70 border border-red-500/30 rounded-3xl">
          <div className="text-2xl font-black text-red-300">{a.nome}</div>
          <div className="text-zinc-300 mt-2">Calibre: {a.calibre}</div>
          <div className="text-zinc-300">Uso: {a.uso}</div>
          <div className="text-zinc-300">Capacidade: {a.cap}</div>
        </div>
      ))}
    </div>
  );
}

function renderUniformes() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { nome: "Uniforme Operacional", desc: "Padrão de serviço em patrulha e fiscalização." },
        { nome: "Uniforme Tático", desc: "Uso em ações especiais e operações de risco." },
        { nome: "Uniforme Administrativo", desc: "Atuação interna, comando e gestão." },
        { nome: "Uniforme RP", desc: "Versão visual para ambientação do servidor." },
        { nome: "Uniforme de Curso", desc: "Utilizado em treinamentos e capacitações." },
        { nome: "Uniforme de Cerimônia", desc: "Eventos, solenidades e apresentações." },
      ].map((u, i) => (
        <div key={i} className="p-6 bg-black/70 border border-white/10 rounded-3xl">
          <div className="text-2xl font-black text-white">{u.nome}</div>
          <p className="text-zinc-300 mt-3">{u.desc}</p>
        </div>
      ))}
    </div>
  );
}

function renderManual() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {manualOperacional.map((item, i) => (
        <div key={i} className="p-5 bg-black/70 border border-yellow-500/30 rounded-2xl text-zinc-200">
          • {item}
        </div>
      ))}
    </div>
  );
}

function renderEstatisticas() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
      {[
        { label: "Km Patroliados", value: "2.5M" },
        { label: "Abordagens", value: "1.2M" },
        { label: "Prisões", value: "12K" },
        { label: "Resgates", value: "45K" },
        { label: "Operações", value: "8K" },
      ].map((s, i) => (
        <div key={i} className="p-6 bg-black/70 border border-yellow-500/30 rounded-3xl text-center">
          <div className="text-3xl font-black text-yellow-400">{s.value}</div>
          <div className="text-sm text-zinc-400 mt-2">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function renderTimeline() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {timeline.map((item, i) => (
        <div key={i} className="p-6 bg-black/70 border border-orange-500/30 rounded-3xl">
          <div className="text-2xl font-black text-orange-400">{item.ano}</div>
          <div className="text-xl font-bold mt-2">{item.titulo}</div>
          <p className="text-zinc-300 mt-3">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function renderRadio() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <div className="text-7xl">📡</div>
      <h2 className="text-5xl font-black text-green-400">RÁDIO OPERACIONAL</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["QAP", "QTH", "10-4", "Código 5"].map((c, i) => (
          <div key={i} className="p-5 bg-black/70 border border-green-500/30 rounded-2xl text-green-300 font-mono font-bold">
            {c}
          </div>
        ))}
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

      <div ref={chatRef} className="flex-1 bg-black/80 border border-green-500/40 rounded-3xl p-6 overflow-y-auto space-y-3 mb-6">
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

function renderDiscord() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <div className="text-7xl">💬</div>
      <h2 className="text-5xl font-black text-indigo-400">DISCORD PRF</h2>
      <div className="grid gap-4">
        {servidoresDiscord.map((srv, i) => (
          <a key={i} href={srv.link} target="_blank" rel="noreferrer" className="block p-6 bg-black/70 border border-indigo-500/30 rounded-3xl">
            <div className="text-2xl font-black text-indigo-300">{srv.nome}</div>
            <div className="text-zinc-400 mt-2">{srv.link}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function renderServidoresDiscord() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-6xl font-black text-indigo-400 mb-4">SERVIDORES DISCORD</h1>
        <p className="text-zinc-400 text-lg">Acesso direto às comunidades</p>
      </div>
      <div className="grid gap-6">
        {servidoresDiscord.map((srv, i) => (
          <a
            key={i}
            href={srv.link}
            target="_blank"
            rel="noreferrer"
            className="p-6 bg-black/70 border border-indigo-500/30 rounded-3xl hover:bg-indigo-500/10 transition-all"
          >
            <div className="text-2xl font-black text-indigo-300">{srv.nome}</div>
            <div className="text-zinc-400 mt-2">{srv.link}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function renderRecrutamento() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-5xl font-black text-emerald-400 text-center">RECRUTAMENTO PRF</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          "CNH categoria B",
          "Ensino médio completo",
          "Disciplina e presença",
          "Boa comunicação",
          "Disponibilidade para escala",
          "Compromisso com RP",
          "Leitura de rádio e comando",
          "Respeito à hierarquia",
        ].map((item, i) => (
          <div key={i} className="p-5 bg-black/70 border border-emerald-500/30 rounded-2xl">
            • {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderNoticias() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-5xl font-black text-orange-400 text-center">NOTÍCIAS</h2>
      {[
        { titulo: "Nova operação integrada na rodovia", data: "09/05/2026" },
        { titulo: "Treinamento interno reforça patrulha", data: "08/05/2026" },
        { titulo: "Central atualiza protocolo de rádio", data: "07/05/2026" },
        { titulo: "Frota recebe novas viaturas RP", data: "06/05/2026" },
      ].map((n, i) => (
        <div key={i} className="p-6 bg-black/70 border border-orange-500/30 rounded-3xl">
          <div className="text-2xl font-bold text-white">{n.titulo}</div>
          <div className="text-sm text-zinc-500 mt-2">{n.data}</div>
        </div>
      ))}
    </div>
  );
}

function renderGaleria() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["Viaturas", "Operações", "Treinos", "Rádio", "Comando", "Fronteira", "Patrulha", "Equipe", "Base", "Ação", "Controle", "Pátio"].map((item, i) => (
        <div key={i} className="p-8 bg-black/70 border border-white/10 rounded-3xl text-center">
          <div className="text-3xl font-black text-yellow-300">{item}</div>
        </div>
      ))}
    </div>
  );
}

function renderConfig() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-5xl font-black text-sky-400 text-center">CONFIGURAÇÕES</h2>
      {["Tema visual", "Som ambiente", "Vídeo de fundo", "Idioma", "Permissões", "Preferências do RP", "RGB", "Modo operacional"].map((c, i) => (
        <div key={i} className="p-5 bg-black/70 border border-sky-500/30 rounded-2xl">
          • {c}
        </div>
      ))}
    </div>
  );
}

function renderCreditos() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-5xl font-black text-yellow-300 text-center">CRÉDITOS</h2>
      {creditos.map((c, i) => (
        <div key={i} className="p-5 bg-black/70 border border-yellow-500/30 rounded-2xl">
          • {c}
        </div>
      ))}
    </div>
  );
}

function renderSimulador() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-center">
      <h2 className="text-5xl font-black text-red-400">SIMULADOR RP</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {["Checkpoints", "Abordagem", "Bloqueio", "Resgate", "Rádio", "Patrulha", "Operação", "Comando", "Fiscalização", "Perseguição"].map((s, i) => (
          <div key={i} className="p-6 bg-black/70 border border-red-500/30 rounded-3xl">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderRankings() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-5xl font-black text-green-400 text-center">RANKINGS</h2>
      {ranking.map((r, i) => (
        <div key={i} className="flex justify-between p-5 bg-black/70 border border-green-500/30 rounded-2xl">
          <span>{i + 1}. {r.nome}</span>
          <span className="font-black text-green-300">{r.pontos} pts</span>
        </div>
      ))}
    </div>
  );
}

function renderOcorrencias() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {ocorrencias.map((o, i) => (
        <div key={i} className="p-6 bg-black/70 border border-red-500/30 rounded-3xl">
          <div className="text-2xl font-black text-red-300">{o.tipo}</div>
          <p className="text-zinc-300 mt-3">{o.detalhe}</p>
        </div>
      ))}
    </div>
  );
}

function renderCursos() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {cursos.map((c, i) => (
        <div key={i} className="p-6 bg-black/70 border border-blue-500/30 rounded-3xl">
          <div className="text-2xl font-black text-blue-300">{c.nome}</div>
          <p className="text-zinc-300 mt-3">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

function renderFrota() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {frota.map((f, i) => (
        <div key={i} className="p-6 bg-black/70 border border-cyan-500/30 rounded-3xl">
          <div className="text-2xl font-black text-cyan-300">{f.modelo}</div>
          <p className="text-zinc-300 mt-3">Setor: {f.setor}</p>
          <p className="text-zinc-300">Ativo: {f.ativo}</p>
        </div>
      ))}
    </div>
  );
}

function renderSetores() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {setores.map((s, i) => (
        <div key={i} className="p-6 bg-black/70 border border-purple-500/30 rounded-3xl">
          <div className="text-2xl font-black text-purple-300">{s.nome}</div>
          <p className="text-zinc-300 mt-3">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

function renderBoletim() {
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h2 className="text-5xl font-black text-yellow-400 text-center">BOLETIM</h2>
      {boletins.map((b, i) => (
        <div key={i} className="p-5 bg-black/70 border border-yellow-500/30 rounded-2xl">
          <div className="text-2xl font-bold text-white">{b.titulo}</div>
          <div className="text-zinc-300 mt-2">{b.desc}</div>
        </div>
      ))}
    </div>
  );
}

function renderAgenda() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {agenda.map((a, i) => (
        <div key={i} className="p-6 bg-black/70 border border-yellow-500/30 rounded-3xl">
          <div className="text-2xl font-black text-yellow-300">{a.dia}</div>
          <p className="text-zinc-300 mt-3">{a.evento}</p>
        </div>
      ))}
    </div>
  );
}

function renderPatrulha() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {patrulha.map((p, i) => (
        <div key={i} className="p-6 bg-black/70 border border-green-500/30 rounded-3xl">
          <div className="text-2xl font-black text-green-300">{p.posto}</div>
          <p className="text-zinc-300 mt-3">Status: {p.status}</p>
          <p className="text-zinc-300">Equipe: {p.equipe}</p>
        </div>
      ))}
    </div>
  );
}

function getEquipIcon(tipo: string) {
  const icons: Record<string, string> = {
    Fiscalização: "📷",
    Alcoolemia: "🍺",
    Proteção: "🛡️",
    Sinalização: "🚨",
    Comunicação: "📡",
    Registro: "🎥",
    "Base": "🏢",
    "Operação": "⚙️",
  };
  return icons[tipo] || "🛠️";
}