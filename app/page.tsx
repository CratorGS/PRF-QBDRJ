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

export default function PRFMilitaryFixed() {
  const [page, setPage] = useState("dashboard");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("prf_military");
      return saved
        ? JSON.parse(saved)
        : {
            name: "Operador PRF",
            rank: "Recruta",
            xp: 0,
            missions: 0,
          };
    } catch {
      return {
        name: "Operador PRF",
        rank: "Recruta",
        xp: 0,
        missions: 0,
      };
    }
  });

  const [radio, setRadio] = useState([
    "QAP — Sistema iniciado",
    "QTH — Central ativa",
  ]);

  // RADIO SIMULADO (ESTÁVEL)
  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        "QAP — Patrulha ativa",
        "ALERTA — Movimento suspeito",
        "QTH — Unidade reposicionada",
        "CÓDIGO 5 — Operação ativa",
      ];

      setRadio((prev) => [
        msgs[Math.floor(Math.random() * msgs.length)],
        ...prev.slice(0, 6),
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // XP SYSTEM
  const addXP = () => {
    let xp = profile.xp + 25;
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
    localStorage.setItem("prf_military", JSON.stringify(updated));

    // SOM (SEGURANÇA: NÃO FORÇA AUTOPLAY)
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* AUDIO (não autoplay) */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
      />

      {/* HEADER */}
      <div className="fixed top-0 w-full z-50 bg-black/90 border-b border-green-500/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex justify-between px-6 py-4">
          <h1 className="text-green-400 font-black tracking-widest">
            PRF MILITARY CORE
          </h1>

          <div className="flex gap-2 flex-wrap">
            {["dashboard", "academy", "missions", "radio", "profile"].map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="px-3 py-1 text-xs border border-green-500/30 hover:bg-green-500/10"
                >
                  {p.toUpperCase()}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-28 max-w-5xl mx-auto px-6">

        <AnimatePresence mode="wait">

          {page === "dashboard" && (
            <motion.div key="dash">
              <h2 className="text-4xl font-black text-green-400">
                CENTRO DE COMANDO
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div className="p-5 border border-green-500/30 bg-black/60">
                  <p className="text-green-300">PATENTE</p>
                  <h3 className="font-black">{profile.rank}</h3>
                </div>

                <div className="p-5 border border-green-500/30 bg-black/60">
                  <p className="text-green-300">XP</p>
                  <h3>{profile.xp}/100</h3>

                  <button
                    onClick={addXP}
                    className="mt-4 bg-green-500 text-black px-3 py-1 font-bold"
                  >
                    SIMULAR OPERAÇÃO
                  </button>
                </div>

                <div className="p-5 border border-green-500/30 bg-black/60">
                  <p className="text-green-300">MISSÕES</p>
                  <h3>{profile.missions}</h3>
                </div>

              </div>
            </motion.div>
          )}

          {page === "academy" && (
            <motion.div key="academy">
              <h2 className="text-4xl font-black text-green-400">
                ACADEMIA PRF
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                {[
                  "Disciplina Operacional",
                  "Hierarquia",
                  "Rádio Q Codes",
                  "Abordagem Tática",
                ].map((a) => (
                  <div className="p-5 border border-green-500/30 bg-black/60">
                    <h3 className="font-black">{a}</h3>
                    <button
                      onClick={addXP}
                      className="mt-4 bg-green-500 text-black px-3 py-1 font-bold"
                    >
                      CONCLUIR
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {page === "missions" && (
            <motion.div key="missions">
              <h2 className="text-4xl font-black text-green-400">
                MISSÕES
              </h2>

              <div className="mt-10 space-y-3">
                {[
                  "Patrulha BR-040",
                  "Abordagem suspeita",
                  "Controle de área",
                  "Resposta rápida",
                ].map((m, i) => (
                  <div key={i} className="p-4 border border-green-500/30">
                    🎯 {m}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {page === "radio" && (
            <motion.div key="radio">
              <h2 className="text-4xl font-black text-green-400">
                RÁDIO
              </h2>

              <div className="mt-10 space-y-3">
                {radio.map((r, i) => (
                  <div key={i} className="p-4 border border-green-500/30">
                    📡 {r}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {page === "profile" && (
            <motion.div key="profile">
              <h2 className="text-4xl font-black text-green-400">
                PERFIL
              </h2>

              <div className="mt-10 p-5 border border-green-500/30">
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