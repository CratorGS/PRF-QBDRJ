"use client";

import { useEffect, useRef, useState } from "react";

const ranks = [
  "Recruta",
  "Agente",
  "Agente Especial",
  "Inspetor",
  "Supervisor",
  "Comando",
  "Comando Geral",
];

export default function PRFCommandSystem() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [view, setView] = useState("CORE");

  const [profile, setProfile] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("prf_profile");
      if (saved) return JSON.parse(saved);
    }

    return {
      rank: "Recruta",
      xp: 0,
      missions: 0,
    };
  });

  const [radio, setRadio] = useState([
    "SYSTEM INIT — PRF ONLINE",
    "QAP — Central operacional ativa",
  ]);

  // 📡 SISTEMA VIVO (RADIO)
  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        "QAP — Patrulha ativa na BR-040",
        "ALERTA — Movimento suspeito detectado",
        "QTH — Unidade reposicionada",
        "CÓDIGO 5 — Operação em andamento",
      ];

      setRadio((prev) => [
        msgs[Math.floor(Math.random() * msgs.length)],
        ...prev.slice(0, 5),
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🧠 SISTEMA DE XP / PATENTE
  const runMission = () => {
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

    if (typeof window !== "undefined") {
      localStorage.setItem("prf_profile", JSON.stringify(updated));
    }

    audioRef.current?.play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* 🔊 AUDIO (seguro) */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
      />

      {/* 🟢 BACKGROUND MILITAR */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,120,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-black/85" />

      {/* 🪖 HEADER */}
      <div className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-green-500/30">
        <div className="max-w-6xl mx-auto flex justify-between px-6 py-4">
          <h1 className="text-green-400 font-black tracking-[0.4em]">
            PRF COMMAND CENTER
          </h1>

          <div className="flex gap-2 text-xs">
            {["CORE", "ACADEMY", "RADIO", "PROFILE"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 border border-green-500/30 ${
                  view === v ? "bg-green-500 text-black" : ""
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 CONTEÚDO */}
      <div className="pt-28 max-w-5xl mx-auto px-6 relative z-10">

        {/* CORE */}
        {view === "CORE" && (
          <div>
            <h2 className="text-4xl font-black text-green-400">
              CENTRAL OPERACIONAL
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="p-6 border border-green-500/30 bg-black/60">
                <p className="text-green-300">PATENTE</p>
                <h3 className="font-black">{profile.rank}</h3>
              </div>

              <div className="p-6 border border-green-500/30 bg-black/60">
                <p className="text-green-300">XP</p>
                <h3>{profile.xp}/100</h3>

                <button
                  onClick={runMission}
                  className="mt-4 bg-green-500 text-black px-3 py-1 font-black"
                >
                  SIMULAR OPERAÇÃO
                </button>
              </div>

              <div className="p-6 border border-green-500/30 bg-black/60">
                <p className="text-green-300">MISSÕES</p>
                <h3>{profile.missions}</h3>
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
                <div
                  key={t}
                  className="p-5 border border-green-500/30 bg-black/60"
                >
                  {t}
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
              {radio.map((r, i) => (
                <div
                  key={i}
                  className="p-4 border border-green-500/30 bg-black/60"
                >
                  📡 {r}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {view === "PROFILE" && (
          <div>
            <h2 className="text-4xl font-black text-green-400">
              PERFIL OPERACIONAL
            </h2>

            <div className="mt-10 p-6 border border-green-500/30 bg-black/60">
              <p>Patente: {profile.rank}</p>
              <p>XP: {profile.xp}</p>
              <p>Missões: {profile.missions}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}