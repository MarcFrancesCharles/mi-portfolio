"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Terminal from "@/components/sections/Terminal";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero a pantalla completa con animación de entrada */}
      <section
        id="inicio"
        className="min-h-screen pt-20 pb-10 flex flex-col items-center justify-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-4xl flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2 text-center">
            Construyo aplicaciones web{" "}
            <span className="text-primary">completas</span>
          </h1>
          <p className="text-text-secondary text-center mb-8 max-w-2xl">
            Full Stack Developer con formación DAW. Desde la arquitectura del
            servidor hasta el pixel perfect en el frontend.
          </p>
          <Terminal />
          <ScrollIndicator />
        </motion.div>
      </section>

      {/* Línea de tiempo (fuera de pantalla) */}
      <ExperienceTimeline />
    </div>
  );
}