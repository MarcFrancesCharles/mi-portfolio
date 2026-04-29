"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import MatrixRain from "@/components/ui/MatrixRain";

type HistoryEntry = {
  type: "input" | "output" | "error";
  content: string;
};

const NEOFETCH = `
╔══════════════════════════════════════╗
║  ███╗   ███╗ █████╗ ██████╗  ██████╗║
║  ████╗ ████║██╔══██╗██╔══██╗██╔════╝║
║  ██╔████╔██║███████║██████╔╝██║     ║
║  ██║╚██╔╝██║██╔══██║██╔══██╗██║     ║
║  ██║ ╚═╝ ██║██║  ██║██║  ██║╚██████╗║
║  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝║
╚══════════════════════════════════════╝

  marc@portfolio
  ─────────────────────────────────────
  OS:       Next.js 16 + TypeScript
  Shell:    React Terminal v2.0
  DE:       Tailwind CSS v4
  WM:       Framer Motion
  Theme:    Dark Retro-Futuristic RPG
  CPU:      Full Stack Developer
  RAM:      Unlimited ideas
  Location: Lleida, España 🇪🇸
  Status:   Open to work ✅`;

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "output",
      content:
        "Bienvenid@ a la web interactiva de Marc FC.\nEscribe 'help' para ver los comandos disponibles.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHacking, setIsHacking] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (containerRef.current && history.length > 1) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const processCommand = (cmd: string): HistoryEntry[] => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "help":
        return [
          {
            type: "output",
            content:
              "Comandos disponibles:\n\n" +
              "  whoami     → ¿Quién soy?\n" +
              "  skills     → Tecnologías que domino\n" +
              "  projects   → Proyectos destacados\n" +
              "  contact    → ¿Cómo contactarme?\n" +
              "  cv         → Descargar currículum\n" +
              "  neofetch   → System info\n" +
              "  clear      → Limpiar la terminal\n" +
              "  matrix     → ????\n" +
              "  hack       → [CLASSIFIED]",
          },
        ];

      case "whoami":
        return [
          {
            type: "output",
            content:
              "Marc Frances Charles\n" +
              "Full Stack Developer\n" +
              "Formación: Desarrollo de Aplicaciones Web (DAW)\n" +
              "Ubicación: Lleida, España\n",
          },
        ];

      case "skills":
        return [
          {
            type: "output",
            content:
              "Frontend:\n" +
              "  React · Next.js · TypeScript · Angular · Tailwind CSS\n\n" +
              "Backend:\n" +
              "  Node.js · Express · Laravel · PostgreSQL · Prisma ORM\n\n" +
              "DevOps & Tools:\n" +
              "  Git · Docker · Vercel · Vitest · Playwright",
          },
        ];

      case "projects":
        return [
          {
            type: "output",
            content:
              "1. E-commerce Full Stack\n" +
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

      case "contact":
        return [
          {
            type: "output",
            // ✅ CORRECCIÓN: era gmail,com
            content:
              "Email:    mfrancescharles@gmail.com\n" +
              "LinkedIn: linkedin.com/in/MarcFrancesCharles\n" +
              "GitHub:   github.com/MarcFrancesCharles\n\n" +
              "O usa el formulario en la sección ↓ #contacto",
          },
        ];

      case "cv":
        if (typeof window !== "undefined") window.open("/cv.pdf", "_blank");
        return [
          {
            type: "output",
            content:
              "Abriendo CV en nueva pestaña...\n" +
              "Si no se abre, descárgalo en /cv.pdf",
          },
        ];

      case "neofetch":
        return [{ type: "output", content: NEOFETCH }];

      case "clear":
        return [];

      case "matrix":
        return [
          {
            type: "output",
            content:
              "Wake up, Neo...\n" +
              "The Matrix has you...\n\n" +
              "⬛🟩⬛🟩⬛🟩⬛🟩⬛🟩\n" +
              "🟩⬛🟩⬛🟩⬛🟩⬛🟩⬛\n" +
              "⬛🟩⬛🟩⬛🟩⬛🟩⬛🟩",
          },
        ];

      case "hack":
        setIsHacking(true);
        setTimeout(() => setIsHacking(false), 4000);
        return [
          {
            type: "output",
            content:
              "INICIANDO SECUENCIA...\n" +
              ">> Bypassing firewall..........OK\n" +
              ">> Extracting credentials.....OK\n" +
              ">> Root access granted........OK\n\n" +
              "[ BIENVENIDO AL SISTEMA, AGENTE ]",
          },
        ];

      default:
        return [
          {
            type: "error",
            content: `Comando no reconocido: '${cmd}'. Escribe 'help' para ver los comandos.`,
          },
        ];
    }
  };

  const handleCommand = () => {
    if (!input.trim()) return;

    const withInput: HistoryEntry[] = [
      ...history,
      { type: "input", content: `marc@portfolio:~$ ${input}` },
    ];

    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput("");
      return;
    }

    const output = processCommand(input);
    setHistory([...withInput, ...output]);
    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commandHistory.length) return;
      const idx =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(historyIndex - 1, 0);
      setHistoryIndex(idx);
      setInput(commandHistory[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const idx = historyIndex + 1;
      if (idx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(idx);
        setInput(commandHistory[idx] || "");
      }
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8">
      {isHacking && <MatrixRain />}

      <div
        className="rounded-lg overflow-hidden shadow-2xl border border-surface cursor-text"
        onClick={focusInput}
      >
        {/* Title bar */}
        <div className="bg-surface px-4 py-2 flex items-center gap-2 border-b border-text-secondary/20">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-text-secondary font-mono">
            marc@portfolio: ~
          </span>
        </div>

        {/* Body */}
        <div
          ref={containerRef}
          className="bg-background p-4 font-mono text-sm h-[50vh] md:h-[500px] overflow-y-auto"
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
    </div>
  );
}