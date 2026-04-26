"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

type HistoryEntry = {
  type: "input" | "output" | "error";
  content: string;
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "output",
      content:
        "Bienvenid@ a la web interactiva de Marc FC. Escribe 'help' para ver los comandos disponibles.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Autofoco sin scroll
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  // Scroll interno manual, sin afectar a la página
  useEffect(() => {
    if (terminalContainerRef.current && history.length > 1) {
      terminalContainerRef.current.scrollTop =
        terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const processCommand = (cmd: string): HistoryEntry[] => {
    const trimmed = cmd.trim().toLowerCase();
    let output: HistoryEntry[] = [];

    switch (trimmed) {
      case "help":
        output = [
          {
            type: "output",
            content:
              "Comandos disponibles:\n\n" +
              "  whoami     → ¿Quién soy?\n" +
              "  skills     → Tecnologías que domino\n" +
              "  projects   → Proyectos destacados\n" +
              "  contact    → ¿Cómo contactarme?\n" +
              "  cv         → Descargar currículum\n" +
              "  clear      → Limpiar la terminal\n" +
              "  matrix     → ????",
          },
        ];
        break;
      case "whoami":
        output = [
          {
            type: "output",
            content:
              "Marc Frances Charles\n" +
              "Full Stack Developer\n" +
              "Formación: Desarrollo de Aplicaciones Web (DAW)\n" +
              "Ubicación: Lleida\n",
          },
        ];
        break;
      case "skills":
        output = [
          {
            type: "output",
            content:
              "Frontend:\n" +
              "  React · Next.js · TypeScript · Angular · Tailwind CSS · HTML5 · CSS3 \n\n" +
              "Backend:\n" +
              "  Node.js · Next.js API Routes · Express · Laravel · SQL · PostgreSQL \n\n" +
              "DevOps & Tools:\n" +
              "  Git · GitHub · Docker · Vercel · CI/CD · Testing (Vitest, Playwright)",
          },
        ];
        break;
      case "projects":
        output = [
          {
            type: "output",
            content:
              "1. E‑commerce Full Stack\n" +
              "   Next.js · Prisma · Stripe · Tailwind · Vercel\n" +
              "   Tienda completa con carrito, pagos y panel admin.\n\n" +
              "2. Dashboard de Analíticas\n" +
              "   React · D3.js · Express · PostgreSQL\n" +
              "   Visualización de datos en tiempo real.\n\n" +
              "3. API REST de Gestión de Tareas\n" +
              "   Node.js · Express · JWT · MongoDB\n" +
              "   Autenticación, roles y documentación Swagger.",
          },
        ];
        break;
      case "contact":
        output = [
          {
            type: "output",
            content:
              "Email: mfrancescharles@gmail,com\n" +
              "LinkedIn: linkedin.com/in/MarcFrancesCharles\n" +
              "GitHub: github.com/MarcFrancesCharles\n\n",
          },
        ];
        break;
      case "cv":
        output = [
          {
            type: "output",
            content:
              "Abriendo CV en nueva pestaña...\n" +
              "Si no se abre, puedes descargarlo manualmente en /cv.pdf",
          },
        ];
        if (typeof window !== "undefined") {
          window.open("/cv.pdf", "_blank");
        }
        break;
      case "clear":
        return [];
      case "matrix":
        output = [
          {
            type: "output",
            content:
              "Wake up, Neo...\n" +
              "The Matrix has you...\n\n" +
              "⬛🟩⬛🟩⬛🟩⬛🟩⬛🟩",
          },
        ];
        break;
      default:
        output = [
          {
            type: "error",
            content: `Comando no reconocido: '${cmd}'. Escribe 'help' para ver la lista de comandos.`,
          },
        ];
    }

    return output;
  };

  const handleCommand = () => {
    if (!input.trim()) return;

    const newHistory: HistoryEntry[] = [
      ...history,
      { type: "input", content: `marc@portfolio:~$ ${input}` },
    ];

    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      return;
    }

    const output = processCommand(input);
    const updatedHistory = [...newHistory, ...output];
    setHistory(updatedHistory);
    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(historyIndex - 1, 0);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || "");
      }
    }
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-surface"
      onClick={focusInput}
    >
      {/* Barra de título al estilo terminal */}
      <div className="bg-surface px-4 py-2 flex items-center gap-2 border-b border-text-secondary/20">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-text-secondary font-mono">
          marc@portfolio: ~
        </span>
      </div>

      {/* Área de historial + entrada */}
      <div
        ref={terminalContainerRef}
        className="bg-background p-4 font-mono text-sm h-[500px] overflow-y-auto"
      >
        {history.map((entry, i) => (
          <div
            key={i}
            className={`mb-1 whitespace-pre-wrap break-words ${
              entry.type === "input"
                ? "text-primary"
                : entry.type === "error"
                ? "text-error"
                : "text-text-primary"
            }`}
          >
            {entry.content}
          </div>
        ))}

        {/* Línea de entrada activa */}
        <div className="flex items-center text-primary mt-1">
          <span>marc@portfolio:~$&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-sm"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
          {input.length === 0 && (
            <span className="w-2 h-5 bg-primary animate-pulse ml-[1px]" />
          )}
        </div>
      </div>
    </div>
  );
}