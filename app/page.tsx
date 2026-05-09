"use client";

import { useEffect, useState } from "react";

const ranks = [
  "Recruta",
  "Agente",
  "Agente Especial",
  "Inspetor",
  "Supervisor",
  "Comando",
  "Comando Geral",
];

const rules = [
  "Hierarquia deve ser respeitada em qualquer operação.",
  "Comunicação via rádio deve ser objetiva e limpa.",
  "Abordagem sempre com protocolo de segurança.",
  "Uso de força apenas proporcional e necessário.",
  "Relatórios obrigatórios após operações.",
];

const doctrine = [
  "QAP: Escuta ativa contínua obrigatória.",
  "QTH: Identificação de posição operacional.",
  "Código 1: Patrulhamento preventivo.",
  "Código 3: Emergência prioritária.",
  "Código 5: Operação tática ativa.",
  "Comunicação sempre objetiva e curta.",
];

type Page = "dashboard" | "radio" | "rules" | "doctrine" | "ops";

export default function Home() {
  const [page, setPage] = useState<Page>("dashboard");
  const [rank, setRank] = useState("Recruta");
  const [xp, setXp] = useState(0);
  const [missions, setMissions] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 🎧 SYSTEM BOOT
  useEffect(() => {
    setLogs([
      "PRF QBDRJ SYSTEM BOOTED",
      "QTH: Central operacional online",
      "QAP: Sistema pronto",
    ]);
  }, []);

  // 📡 RADIO SYSTEM
  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        "QAP: Patrulha ativa na região",
        "ALERTA: Movimento suspeito detectado",
        "QTH: Unidade reposicionada",
        "CÓDIGO 3: Operação em andamento",
        "STATUS: Área controlada",
      ];

      setLogs((prev) => [
        msgs[Math.floor(Math.random() * msgs.length)],
        ...prev.slice(0, 8),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🎮 AUTO PROGRESS
  useEffect(() => {
    const interval = setInterval(() => {
      setXp((old) => {
        let newXp = old + 12;
        let idx = ranks.indexOf(rank);

        if (newXp >= 100 && idx < ranks.length - 1) {
          newXp = 0;
          idx++;
          setRank(ranks[idx]);
        }

        return newXp;
      });

      setMissions((m) => m + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [rank]);

  const playBeep = () => {
    const audio = new Audio("/beethoven.mp3");
    audio.volume = 0.15;
    audio.play().catch(() => {});
  };

  const NavButton = (label: string, p: Page) => (
    <button
      onClick={() => {
        playBeep();
        setPage(p);
      }}
      className={`px-3 py-1 text-xs border ${
        page === p ? "border-green-400 bg-green-500/10" : "border-green-500/30"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">

      {/* AUDIO */}
      <audio autoPlay loop>
        <source src="/beethoven.mp3" type="audio/mpeg" />
      </audio>

      {/* HEADER */}
      <header className="border-b border-green-500/30 p-4 flex justify-between">
        <h1 className="tracking-[0.3em] font-bold">
          PRF QBDRJ // FULL SYSTEM
        </h1>
        <span className="text-xs animate-pulse">● ONLINE</span>
      </header>

      {/* NAV */}
      <div className="p-3 flex gap-2 flex-wrap border-b border-green-500/20">
        {NavButton("DASHBOARD", "dashboard")}
        {NavButton("RÁDIO", "radio")}
        {NavButton("REGRAS", "rules")}
        {NavButton("DOUTRINA", "doctrine")}
        {NavButton("OPERAÇÕES", "ops")}
      </div>

      {/* CONTENT */}
      <main className="p-6 grid md:grid-cols-3 gap-4">

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            <div className="border border-green-500/30 p-4">
              <h2 className="font-bold mb-2">STATUS</h2>
              <p>Patente: {rank}</p>
              <p>XP: {xp}/100</p>
              <p>Missões: {missions}</p>

              <div className="mt-3 h-2 bg-green-900/40">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${xp}%` }}
                />
              </div>
            </div>

            <div className="border border-green-500/30 p-4 md:col-span-2">
              <h2 className="font-bold mb-2">RÁDIO OPERACIONAL</h2>
              <div className="space-y-1 text-sm max-h-64 overflow-auto">
                {logs.map((l, i) => (
                  <p key={i}>📡 {l}</p>
                ))}
              </div>
            </div>
          </>
        )}

        {/* RADIO FULL */}
        {page === "radio" && (
          <div className="md:col-span-3 border border-green-500/30 p-4">
            <h2 className="font-bold mb-2">RÁDIO FULL SYSTEM</h2>
            {logs.map((l, i) => (
              <p key={i}>📡 {l}</p>
            ))}
          </div>
        )}

        {/* RULES */}
        {page === "rules" && (
          <div className="md:col-span-3 border border-green-500/30 p-4">
            <h2 className="font-bold mb-2">REGRAS PRF QBDRJ</h2>
            <ul className="text-sm space-y-1">
              {rules.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* DOCTRINE */}
        {page === "doctrine" && (
          <div className="md:col-span-3 border border-green-500/30 p-4">
            <h2 className="font-bold mb-2">DOUTRINA OPERACIONAL</h2>
            <ul className="text-sm space-y-1">
              {doctrine.map((d, i) => (
                <li key={i}>• {d}</li>
              ))}
            </ul>
          </div>
        )}

        {/* OPS */}
        {page === "ops" && (
          <div className="md:col-span-3 border border-green-500/30 p-4">
            <h2 className="font-bold mb-2">OPERAÇÕES ATIVAS</h2>
            <p className="text-sm">Sistema em simulação contínua...</p>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-green-700 p-4 border-t border-green-500/20">
        PRF QBDRJ FULL COMMAND SYSTEM v4
      </footer>

      {/* SCANLINE */}
      <div className="pointer-events-none fixed inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,black_50%)] bg-[length:100%_4px]" />
    </div>
  );
}