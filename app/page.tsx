"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   DADOS MILITARES
========================= */

const ranksPRF = [
  "Recruta",
  "Agente",
  "Agente Especial",
  "Inspetor",
  "Supervisor",
  "Comando",
  "Comando Geral",
];

const ranksPM = [
  "Soldado",
  "Cabo",
  "Sargento",
  "Subtenente",
  "Tenente",
  "Capitão",
  "Comando PM",
];

const pages = ["dashboard", "academy", "radio", "profile", "history"];

const radioMsgs = [
  "📡 QAP SISTEMA ATIVO",
  "🚔 VIATURA EM PATRULHAMENTO",
  "⚠ MOVIMENTO SUSPEITO DETECTADO",
  "🔥 OPERAÇÃO EM ANDAMENTO",
  "🛰 SINCRONIZAÇÃO TÁTICA OK",
];

export default function PRF_METROPOLE() {
  const [page, setPage] = useState("dashboard");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [profile, setProfile] = useState({
    name: "Operador Federal",
    rank: "Recruta",
    xp: 0,
    missions: 0,
  });

  const [radio, setRadio] = useState<string[]>([
    "📡 SISTEMA INICIALIZADO",
    "QAP CENTRAL ONLINE",
  ]);

  /* =========================
     AUDIO CONTROLADO
  ========================= */

  const playAudio = () => {
    audioRef.current?.play().catch(() => {});
  };

  useEffect(() => {
    playAudio();
  }, []);

  /* =========================
     RADIO DINÂMICO
  ========================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setRadio((prev) => [
        radioMsgs[Math.floor(Math.random() * radioMsgs.length)],
        ...prev.slice(0, 6),
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     XP + RANK SYSTEM
  ========================= */

  const addXP = () => {
    let xp = profile.xp + 25;
    let idx = ranksPRF.indexOf(profile.rank);

    if (xp >= 100 && idx < ranksPRF.length - 1) {
      xp = 0;
      idx++;
    }

    setProfile({
      ...profile,
      xp,
      rank: ranksPRF[idx],
      missions: profile.missions + 1,
    });
  };

  /* =========================
     UI
  ========================= */

  return (
    <div
      className="min-h-screen text-white bg-black overflow-hidden relative"
      onClick={playAudio}
    >
      {/* ================= BACKGROUND VIDEO ================= */}
      <div className="fixed inset-0 z-0">
        <iframe
          className="w-full h-full scale-150 opacity-20 pointer-events-none"
          src="https://www.youtube.com/embed/-He5xYWa8kY?autoplay=1&mute=1&loop=1&playlist=-He5xYWa8kY"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-green-500/10 blur-3xl animate-pulse" />
      </div>

      {/* ================= AUDIO ================= */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0ca7a1176.mp3"
      />

      {/* ================= NAV ================= */}
      <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-green-500/30">
        <div className="max-w-7xl mx-auto flex justify-between px-6 py-4">
          <h1 className="text-green-400 font-black tracking-[0.4em]">
            PRF • METRÓPOLE SYSTEM
          </h1>

          <div className="flex gap-2 flex-wrap">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="px-3 py-1 text-xs border border-green-500/40 hover:bg-green-500/20"
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="pt-28 relative z-10 max-w-6xl mx-auto px-6">

        <AnimatePresence mode="wait">

          {/* DASHBOARD */}
          {page === "dashboard" && (
            <motion.div key="dash" className="space-y-6">
              <h2 className="text-5xl font-black text-green-400">
                CENTRO OPERACIONAL
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="p-6 border border-green-500/40 bg-green-500/10 rounded-xl">
                  <p>Patente</p>
                  <h3 className="text-xl font-bold">{profile.rank}</h3>
                </div>

                <div className="p-6 border border-green-500/40 bg-green-500/10 rounded-xl">
                  <p>XP</p>
                  <h3>{profile.xp}/100</h3>
                  <button
                    onClick={addXP}
                    className="mt-3 bg-green-400 text-black px-3 py-1 font-black"
                  >
                    SIMULAR OPERAÇÃO
                  </button>
                </div>

                <div className="p-6 border border-green-500/40 bg-green-500/10 rounded-xl">
                  <p>Missões</p>
                  <h3>{profile.missions}</h3>
                </div>

              </div>
            </motion.div>
          )}

          {/* RADIO */}
          {page === "radio" && (
            <motion.div key="radio">
              <h2 className="text-4xl font-black text-green-400">
                RÁDIO TÁTICO
              </h2>

              <div className="mt-8 space-y-2 font-mono text-sm">
                {radio.map((r, i) => (
                  <div
                    key={i}
                    className="p-3 border border-green-500/40 bg-black/60"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* HISTORY PRF + PM */}
          {page === "history" && (
            <motion.div className="space-y-6">
              <h2 className="text-4xl font-black text-green-400">
                HISTÓRIA PRF & PM
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="p-6 border border-green-500/40 bg-green-500/10 rounded-xl">
                  <h3 className="font-bold">PRF</h3>
                  <p>
                    Criada para patrulhamento rodoviário federal,
                    combate ao crime interestadual e segurança viária.
                  </p>
                </div>

                <div className="p-6 border border-blue-500/40 bg-blue-500/10 rounded-xl">
                  <h3 className="font-bold">PM</h3>
                  <p>
                    Polícia Militar atua no policiamento ostensivo,
                    preservação da ordem pública e apoio urbano.
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {/* PROFILE */}
          {page === "profile" && (
            <motion.div>
              <h2 className="text-4xl font-black text-green-400">
                PERFIL OPERACIONAL
              </h2>

              <div className="mt-6 p-6 border border-green-500/40 bg-green-500/10 rounded-xl">
                <p>Nome: {profile.name}</p>
                <p>Patente: {profile.rank}</p>
                <p>XP: {profile.xp}</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}