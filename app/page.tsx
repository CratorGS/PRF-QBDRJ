"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status] = useState("ONLINE");
  const [missions, setMissions] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMissions((m) => m + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">

      {/* HEADER */}
      <header className="border-b border-green-500/30 p-4 flex justify-between">
        <h1 className="tracking-[0.3em] font-bold">
          PRF QBDRJ // SYSTEM
        </h1>
        <span className="text-xs animate-pulse">● {status}</span>
      </header>

      {/* MAIN */}
      <main className="p-6 grid md:grid-cols-2 gap-4">

        <div className="border border-green-500/30 p-4">
          <h2 className="font-bold mb-2">STATUS OPERACIONAL</h2>
          <p>Sistema: {status}</p>
          <p>Missões simuladas: {missions}</p>
        </div>

        <div className="border border-green-500/30 p-4">
          <h2 className="font-bold mb-2">LOG</h2>
          <p>✔ Sistema limpo e estável</p>
          <p>✔ Sem áudio (build seguro)</p>
          <p>✔ Vercel compatível</p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-green-700 p-4 border-t border-green-500/20">
        PRF QBDRJ // STABLE MODE
      </footer>

    </div>
  );
}