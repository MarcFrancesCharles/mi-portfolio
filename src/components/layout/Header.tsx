"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface px-6 py-3 flex justify-between items-center h-16">
      <Link
        href="/#inicio"
        onClick={handleHomeClick}
        className="font-mono text-primary text-lg tracking-wider hover:text-secondary transition-colors"
      >
        <span className="text-secondary">marc</span>@<span className="text-primary">portfolio</span>:~$
        <span className="cursor-blink text-primary ml-1">█</span>
      </Link>

      <nav className="hidden md:flex gap-6 text-sm text-text-secondary">
        <Link
          href="/#inicio"
          onClick={handleHomeClick}
          className="hover:text-primary transition-colors"
        >
          Inicio
        </Link>
        <Link
          href="/#experiencia"
          className="hover:text-primary transition-colors"
        >
          Experiencia
        </Link>
        <Link
          href="/#proyectos"
          className="hover:text-primary transition-colors"
        >
          Proyectos
        </Link>
        <Link href="/blog" className="hover:text-primary transition-colors">
          Blog
        </Link>
        <Link
          href="/#contacto"
          className="hover:text-primary transition-colors"
        >
          Contacto
        </Link>
      </nav>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-text-secondary hover:text-primary transition-colors text-sm px-3 py-1 rounded-md border border-surface hover:border-primary"
        aria-label="Cambiar tema"
      >
        {theme === "dark" ? "🌙 Oscuro" : "☀️ Claro"}
      </button>
    </header>
  );
}