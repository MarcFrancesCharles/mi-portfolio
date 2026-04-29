"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Tailwind",
  "Docker",
  "Prisma",
];

const LOGROS = [
  "E-commerce: 3.2% conversión el primer mes",
  "Dashboard: -40% tiempo en reporting",
  "API: 0 incidencias de seguridad en auditoría",
];

export default function RecruiterModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-background rounded-full shadow-glow flex items-center justify-center text-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:outline-none"
        aria-label="Resumen ejecutivo para reclutadores"
        title="Vista rápida para reclutadores"
      >
        ⚡
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto bg-surface border border-primary/40 rounded-2xl shadow-glow p-7"
              role="dialog"
              aria-label="Resumen ejecutivo"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:outline-none"
                aria-label="Cerrar modal"
              >
                X
              </button>

              <h2 className="text-xl font-mono font-bold text-primary mb-5">
                Resumen Ejecutivo
              </h2>

              <div className="space-y-5 text-sm">
                <div>
                  <h3 className="font-semibold text-text-primary font-mono mb-2">
                    Perfil
                  </h3>
                  <ul className="text-text-secondary space-y-1 pl-3 border-l border-primary/30">
                    <li>Full Stack Developer · 2+ años experiencia real</li>
                    <li>Formación DAW + proyectos en producción</li>
                    <li>Lleida · Disponible remoto/híbrido</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary font-mono mb-2">
                    Stack Principal
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {STACK.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-mono bg-background rounded border border-primary/30 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary font-mono mb-2">
                    Logros Clave
                  </h3>
                  <ul className="text-text-secondary space-y-1 pl-3 border-l border-primary/30">
                    {LOGROS.map((logro) => (
                      <li key={logro}>{logro}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/cv.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-background font-semibold rounded-lg hover:shadow-glow hover:scale-[1.02] transition-all duration-300 font-mono text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Descargar CV completo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}