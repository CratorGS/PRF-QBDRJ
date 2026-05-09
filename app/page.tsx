import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ranks = [
  "Recruta",
  "Agente",
  "Agente Especial",
  "Inspetor",
  "Supervisor",
  "Comando",
  "Comando Geral",
];

const pages = ["dashboard", "academy", "missions", "radio", "profile"];

export default function PRFAlertSystem() {
  const [page, setPage] = useState("dashboard");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("prf_alert");
    return saved
      ? JSON.parse(saved)
      : { name: "Operador PRF", rank: "Recruta", xp: 0, missions: 0 };
  });

  const [radio, setRadio] = useState([
    "QAP • SISTEMA PRF ONLINE",
    "QTH • CENTRAL OPERACIONAL ATIVA",
  ]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        "⚠ ALERTA • MOVIMENTO SUSPEITO DETECTADO",
        "🚔 QAP • VIATURA EM DESLOCAMENTO",
        "📡 QTH • ÁREA CRÍTICA MONITORADA",
        "🔥 CÓDIGO 5 • OPERAÇÃO ATIVA",
        "🛰 SISTEMA • SINCRONIZAÇÃO EM ANDAMENTO",
      ];

      setRadio((prev) => [
        msgs[Math.floor(Math.random() * msgs.length)],
        ...prev.slice(0, 8),
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addXP = () => {
    let xp = profile.xp + 30;
    let idx = ranks.indexOf(profile.rank);

    if (xp >= 100 && idx < ranks.length - 1) {
      xp = 0;
      idx++;
    }

    const updated = {
      ...profile,
      xp,
      rank: ranks[idx],
      missions: profile.missions + 1,
    };

    setProfile(updated);
    localStorage.setItem("prf_alert", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* 🔥 BACKGROUND VIVO */}
      <div className="fixed inset-0 z-0">
        <iframe
          className="w-full h-full scale-150 opacity-25 pointer-events-none"
          src="https://www.youtube.com/embed/-He5xYWa8kY?autoplay=1&mute=1&controls=0&loop=1&playlist=-He5xYWa8kY"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

        {/* efeito pulsante militar */}
        <div className="absolute inset-0 bg-green-500/10 blur-3xl animate-pulse" />
      </div>

      {/* 🔊 AUDIO */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
      />

      {/* ⚡ HEADER ENERGIZADO */}
      <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-green-400/40 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
        <div className="max-w-7xl mx-auto flex justify-between px-6 py-4 items-center">

          <h1 className="text-green-300 font-black tracking-[0.4em] animate-pulse drop-shadow-[0_0_10px_lime]">
            PRF • ALERT COMMAND SYSTEM
          </h1>

          <div className="flex gap-2 flex-wrap">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="px-3 py-1 text-xs border border-green-400/50 hover:bg-green-400/20 hover:shadow-[0_0_20px_lime] transition-all hover:scale-105"
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* 📊 MAIN */}
      <div className="pt-28 max-w-6xl mx-auto px-6 relative z-10">

        <AnimatePresence mode="wait">

          {/* DASHBOARD */}
          {page === "dashboard" && (
            <motion.div key="dash" className="space-y-6">

              <h2 className="text-5xl font-black text-green-400 animate-pulse">
                🚨 CENTRO DE ALERTA OPERACIONAL
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="p-6 rounded-xl border border-green-400/50 bg-green-500/10 shadow-[0_0_25px_rgba(0,255,0,0.2)] hover:scale-105 transition">
                  <p className="text-green-300 text-xs">PATENTE</p>
                  <h3 className="text-xl font-bold">{profile.rank}</h3>
                </div>

                <div className="p-6 rounded-xl border border-green-400/50 bg-green-500/10 shadow-[0_0_25px_rgba(0,255,0,0.2)] hover:scale-105 transition">
                  <p className="text-green-300 text-xs">XP OPERACIONAL</p>
                  <h3 className="text-xl font-bold">{profile.xp}/100</h3>

                  <button
                    onClick={addXP}
                    className="mt-4 bg-green-400 text-black px-3 py-1 font-black hover:shadow-[0_0_25px_lime] animate-pulse"
                  >
                    SIMULAR OPERAÇÃO
                  </button>
                </div>

                <div className="p-6 rounded-xl border border-green-400/50 bg-green-500/10 shadow-[0_0_25px_rgba(0,255,0,0.2)] hover:scale-105 transition">
                  <p className="text-green-300 text-xs">MISSÕES</p>
                  <h3 className="text-xl font-bold">{profile.missions}</h3>
                </div>

              </div>

            </motion.div>
          )}

          {/* ACADEMY */}
          {page === "academy" && (
            <motion.div key="academy">
              <h2 className="text-4xl font-black text-green-400 animate-pulse">
                🧠 ACADEMIA TÁTICA PRF
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mt-10">

                {[
                  "DISCIPLINA OPERACIONAL",
                  "COMUNICAÇÃO QAP/QTH",
                  "ABORDAGEM TÁTICA",
                  "HIERARQUIA FEDERAL",
                ].map((a) => (
                  <div
                    key={a}
                    className="p-6 rounded-xl border border-green-400/40 bg-green-500/10 hover:shadow-[0_0_25px_lime] hover:scale-105 transition"
                  >
                    <h3 className="font-black text-green-200">{a}</h3>

                    <button
                      onClick={addXP}
                      className="mt-4 bg-green-400 text-black px-3 py-1 text-xs font-black animate-pulse"
                    >
                      CONCLUIR TREINO
                    </button>
                  </div>
                ))}

              </div>
            </motion.div>
          )}

          {/* MISSIONS */}
          {page === "missions" && (
            <motion.div key="missions">
              <h2 className="text-4xl font-black text-green-400 animate-pulse">
                🔥 MISSÕES FEDERAIS ATIVAS
              </h2>

              <div className="mt-10 space-y-3">

                {[
                  "Patrulha BR-040",
                  "Interceptação de veículo suspeito",
                  "Controle de área crítica",
                  "Resposta tática imediata",
                ].map((m) => (
                  <div
                    key={m}
                    className="p-4 rounded-xl border border-green-400/50 bg-black/60 hover:shadow-[0_0_25px_lime] hover:scale-105 transition"
                  >
                    🎯 {m}
                  </div>
                ))}

              </div>
            </motion.div>
          )}

          {/* RADIO */}
          {page === "radio" && (
            <motion.div key="radio">
              <h2 className="text-4xl font-black text-green-400 animate-pulse">
                📡 RÁDIO TÁTICO PRF
              </h2>

              <div className="mt-10 space-y-3 font-mono text-sm">

                {radio.map((r, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-green-400/50 bg-black/70 animate-pulse hover:shadow-[0_0_20px_lime]"
                  >
                    {r}
                  </div>
                ))}

              </div>
            </motion.div>
          )}

          {/* PROFILE */}
          {page === "profile" && (
            <motion.div key="profile">
              <h2 className="text-4xl font-black text-green-400 animate-pulse">
                👮 PERFIL OPERACIONAL
              </h2>

              <div className="mt-10 p-6 rounded-xl border border-green-400/50 bg-green-500/10 shadow-[0_0_25px_rgba(0,255,0,0.2)]">

                <p>Nome: {profile.name}</p>
                <p>Patente: {profile.rank}</p>
                <p>XP: {profile.xp}</p>
                <p>Missões: {profile.missions}</p>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}