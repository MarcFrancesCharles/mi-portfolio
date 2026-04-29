"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [egg, setEgg] = useState(false);

  return (
    <footer className="border-t border-surface py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
        <p className="font-mono flex items-center gap-2 flex-wrap">
          <span>
            Construido con{" "}
            <span className="text-primary">Next.js</span>{" "}
            por Marc Frances Charles
          </span>
          <button
            onClick={() => setEgg((v) => !v)}
            className="text-base hover:scale-125 transition-transform focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:outline-none"
            aria-label="Easter egg"
          >
            🐾
          </button>
          <AnimatePresence>
            {egg && (
              <motion.span
                key="egg"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="text-primary font-mono text-xs"
              >
                👋 Gracias por llegar hasta aquí!
              </motion.span>
            )}
          </AnimatePresence>
        </p>

        <div className="flex gap-6">
           <a
            href="https://github.com/MarcFrancesCharles"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-1 focus-visible:outline-none"
          >
            GitHub
          </a>
           <a
            href="https://linkedin.com/in/MarcFrancesCharles"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-1 focus-visible:outline-none"
          >
            LinkedIn
          </a>
           <a
            href="mailto:mfrancescharles@gmail.com"
            className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-1 focus-visible:outline-none"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}