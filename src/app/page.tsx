"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Glow de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[40rem] w-[40rem] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <h1 className="neon-text font-mono text-5xl font-bold leading-tight sm:text-7xl md:text-8xl">
          Working on it
        </h1>

        <p className="mt-6 max-w-md text-text-secondary">
          Estoy preparando algo nuevo. Mientras tanto, puedes contactarme aquí:
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="mailto:mfrancescharles@gmail.com"
            className="neon-link text-lg font-mono"
          >
            mfrancescharles@gmail.com
          </a>
          <a href="tel:+34616030126" className="neon-link text-lg font-mono">
            +34 616 030 126
          </a>
        </div>
      </motion.div>
    </section>
  );
}
