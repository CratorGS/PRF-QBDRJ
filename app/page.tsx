import { useEffect, useRef, useState } from "react";

const ranks = ["Recruta", "Agente", "Inspetor", "Supervisor", "Comando", "Comando Geral"];

export default function PRFCinematicSystem() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [view, setView] = useState("CORE");
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Recruta");
  const [missions, setMissions] = useState(0);

  const [feed, setFeed] = useState([
    "SYSTEM INITIATED...",
    "PRF CORE ONLINE",
  ]);

  // 🔄 SISTEMA VIVO (FEED OPERACIONAL)
  useEffect(() => {
    const t = setInterval(() => {
      const msgs = [
        "QAP — Unidade em patrulha BR-040",
        "ALERTA — Movimento suspeito detectado",
        "QTH — Coordenação atualizada",
        "CÓDIGO 5 — Operação ativa",
      ];

      setFeed((p) => [msgs[Math.floor(Math.random() * msgs.length)], ...p.slice(0, 5)]);
    }, 3000);

    return () => clearInterval(t);
  }, []);

  const action = () => {
    let newXp = xp + 25;
    let idx = ranks.indexOf(rank);

    if (newXp >= 100 && idx < ranks.length - 1) {
      newXp = 0;
      idx++;
    }

    setXp(newXp);
    setRank(ranks[idx]);
    setMissions((m) => m + 1);

    audioRef.current?.play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* 🔊 AUDIO (manual) */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
      />

      {/* 🎥 BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,100,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-black/80" />

      {/* 🪖 HEADER MILITAR */}
      <div className="fixed top-0 w-full z-50 border-b border-green-500/30 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-green-400 tracking-[0.4em] font-black">
            PRF COMMAND CENTER
          </h1>

          <div className="flex gap-3 text-xs">
            {["CORE", "ACADEMY", "OPERATIONS", "RADIO"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 border ${
                  view === v ? "bg-green-500 text-black" : "border-green-500/30"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🧠 MAIN CORE */}
      <div className="pt-28 max-w-6xl mx-auto px-6 relative z-10">

        {/* CORE */}
        {view === "CORE" && (
          <div>
            <h2 className="text-5xl font-black text-green-400">
              CENTRAL OPERACIONAL
            </h2>

            <div className="mt-10 grid md:grid-cols-3 gap-6">

              <div className="p-8 border border-green-500/30 bg-black/60">
                <p className="text-green-300 tracking-widest">PATENTE</p>
                <h3 className="text-2xl font-black">{rank}</h3>
              </div>

              <div className="p-8 border border-green-500/30 bg-black/60">
                <p className="text-green-300 tracking-widest">XP</p>
                <h3 className="text-2xl font-black">{xp}/100</h3>

                <button
                  onClick={action}
                  className="mt-5 bg-green-500 text-black px-4 py-2 font-black"
                >
                  SIMULAR OPERAÇÃO
                </button>
              </div>

              <div className="p-8 border border-green-500/30 bg-black/60">
                <p className="text-green-300 tracking-widest">MISSÕES</p>
                <h3 className="text-2xl font-black">{missions}</h3>
              </div>

            </div>
          </div>
        )}

        {/* ACADEMY */}
        {view === "ACADEMY" && (
          <div>
            <h2 className="text-4xl font-black text-green-400">
              ACADEMIA TÁTICA
            </h2>

            <div className="mt-10 space-y-4">
              {[
                "Disciplina Operacional",
                "Hierarquia Militar",
                "Comunicação Rádio",
                "Conduta em Patrulha",
              ].map((t) => (
                <div className="p-6 border border-green-500/30 bg-black/60">
                  <h3 className="font-black">{t}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OPERATIONS */}
        {view === "OPERATIONS" && (
          <div>
            <h2 className="text-4xl font-black text-green-400">
              OPERAÇÕES
            </h2>

            <div className="mt-10 space-y-3">
              {[
                "BR-040 LIMPA",
                "ECLIPSE TÁTICO",
                "RESPOSTA RÁPIDA",
                "CONTROLE DE ÁREA",
              ].map((o, i) => (
                <div key={i} className="p-5 border border-green-500/30">
                  🎯 {o}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RADIO */}
        {view === "RADIO" && (
          <div>
            <h2 className="text-4xl font-black text-green-400">
              RÁDIO OPERACIONAL
            </h2>

            <div className="mt-10 space-y-3">
              {feed.map((f, i) => (
                <div
                  key={i}
                  className="p-4 border border-green-500/30 bg-black/60"
                >
                  📡 {f}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}