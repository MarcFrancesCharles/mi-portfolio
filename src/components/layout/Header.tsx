"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface px-6 py-3 flex justify-between items-center h-16">
      <span className="font-mono text-primary text-lg tracking-wider">
        <span className="text-secondary">marc</span>@<span className="text-primary">portfolio</span>:~$
        <span className="cursor-blink text-primary ml-1">█</span>
      </span>

      <nav className="hidden md:flex gap-6 text-sm text-text-secondary">
        <a href="#inicio" className="hover:text-primary">Inicio</a>
        <a href="#experiencia" className="hover:text-primary">Experiencia</a>
        <a href="#proyectos" className="hover:text-primary">Proyectos</a>
        <a href="#blog" className="hover:text-primary">Blog</a>
        <a href="#contacto" className="hover:text-primary">Contacto</a>
      </nav>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-text-secondary hover:text-primary text-sm px-3 py-1 rounded-md border border-surface hover:border-primary"
        aria-label="Cambiar tema"
      >
        {theme === "dark" ? "🌙 Oscuro" : "☀️ Claro"}
      </button>
    </header>
  );
}