"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINES = [
  { text: "marc@portfolio:~$ cd /pagina-que-buscas", type: "cmd" },
  { text: "bash: cd: No such file or directory", type: "err" },
  { text: "marc@portfolio:~$ ls", type: "cmd" },
  { text: "inicio/   proyectos/   blog/   habilidades/", type: "out" },
  { text: "marc@portfolio:~$ cat error.log", type: "cmd" },
  { text: "ERROR 404: Página no encontrada", type: "err" },
  { text: "marc@portfolio:~$ echo $?", type: "cmd" },
  { text: "404", type: "out" },
  { text: "marc@portfolio:~$ _", type: "cmd" },
];

export default function NotFound() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= LINES.length) return;
    const t = setTimeout(() => setVisible((n) => n + 1), 130);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Terminal */}
        <div className="rounded-lg overflow-hidden shadow-2xl border border-surface">
          <div className="bg-surface px-4 py-2 flex items-center gap-2 border-b border-text-secondary/20">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-text-secondary font-mono">
              marc@portfolio: ~ [404 Not Found]
            </span>
          </div>
          <div className="bg-background p-5 font-mono text-sm min-h-[280px]">
            {LINES.slice(0, visible).map((line, i) => (
              <div
                key={i}
                className={`mb-0.5 ${
                  line.type === "cmd"
                    ? "text-primary"
                    : line.type === "err"
                    ? "text-error"
                    : "text-text-secondary"
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-text-secondary font-mono text-sm">
            La página que buscas no existe o fue eliminada.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300 font-mono text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}