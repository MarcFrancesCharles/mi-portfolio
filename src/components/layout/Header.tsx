"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLink =
  "hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded px-1 py-0.5";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Si clickamos en Inicio y ya estamos en Inicio, subimos arriba del todo
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Si clickamos en una sección y ya estamos en Inicio, hacemos scroll suave a esa parte
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Si NO estamos en home, no prevenimos el evento y dejamos que Next.js nos lleve a /#seccion
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface px-6 py-3 flex justify-between items-center h-16">
      <Link
        href="/"
        onClick={handleHomeClick}
        className={`font-mono text-primary text-lg tracking-wider hover:text-secondary transition-colors ${navLink}`}
        aria-label="Inicio"
      >
        <span className="text-secondary">marc</span>@
        <span className="text-primary">portfolio</span>:~$
        <span className="cursor-blink text-primary ml-1">█</span>
      </Link>

      <nav
        className="hidden md:flex gap-5 text-sm text-text-secondary"
        aria-label="Navegación principal"
      >
        <Link href="/" onClick={handleHomeClick} className={navLink}>
          Inicio
        </Link>
        <Link href="/#sobre-mi" onClick={(e) => handleSectionClick(e, 'sobre-mi')} className={navLink}>
          Sobre mí
        </Link>
        <Link href="/#experiencia" onClick={(e) => handleSectionClick(e, 'experiencia')} className={navLink}>
          Experiencia
        </Link>
        <Link href="/#proyectos" onClick={(e) => handleSectionClick(e, 'proyectos')} className={navLink}>
          Proyectos
        </Link>
        <Link href="/blog" className={navLink}>
          Blog
        </Link>
        <Link href="/#contacto" onClick={(e) => handleSectionClick(e, 'contacto')} className={navLink}>
          Contacto
        </Link>
      </nav>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-text-secondary hover:text-primary transition-colors text-sm px-3 py-1 rounded-md border border-surface hover:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        aria-label={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
      >
        {theme === "dark" ? "🌙 Oscuro" : "☀️ Claro"}
      </button>
    </header>
  );
}