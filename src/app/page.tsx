"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Terminal from "@/components/sections/Terminal";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Footer from "@/components/layout/Footer";

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
            Construyo{" "}
            <span className="text-primary">productos digitales</span> de alto
            rendimiento
          </h1>
          <p className="text-text-secondary text-center mb-8 max-w-2xl">
            Full Stack Developer · Next.js / Node.js / TypeScript · Formación
            DAW. Desde la arquitectura del servidor hasta el pixel perfect en el
            frontend.
          </p>

          {/* Botón de CV */}
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-primary text-background font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Descargar CV
          </a>

          <Terminal />
          <ScrollIndicator />
        </motion.div>
      </section>

      {/* Línea de tiempo de experiencia */}
      <ExperienceTimeline />

      {/* Grid de habilidades */}
      <SkillsSection />

      {/* Casos de estudio (proyectos) */}
      <ProjectsSection />

      <Footer />
    </div>
  );
}