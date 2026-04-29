"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Terminal from "@/components/sections/Terminal";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import BlogPreviewFallback from "@/components/sections/BlogPreviewFallback";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Footer from "@/components/layout/Footer";
import TypingEffect from "@/components/ui/TypingEffect";
import RecruiterModal from "@/components/ui/RecruiterModal";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
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
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2 text-center min-h-[2.5em] md:min-h-[1.5em]">
            Construyo{" "}
            <span className="text-primary">
              <TypingEffect />
            </span>
          </h1>

          <p className="text-text-secondary text-center mb-8 max-w-2xl">
            Full Stack Developer · Next.js / Node.js / TypeScript · Formación
            DAW. Desde la arquitectura del servidor hasta el pixel perfect en el
            frontend.
          </p>

          {/* ── Botón CV ── */}
           <a
            href="/cv.pdf"
            download
            aria-label="Descargar Currículum Vitae en PDF"
            className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-primary text-background font-semibold rounded-lg hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
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

      {/* ── Sobre mí ─────────────────────────────────────── */}
      <AboutSection />

      {/* ── Experiencia ──────────────────────────────────── */}
      <ExperienceTimeline />

      {/* ── Skills ───────────────────────────────────────── */}
      <SkillsSection />

      {/* ── Proyectos ────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── Blog Preview ─────────────────────────────────── */}
      <BlogPreviewFallback />

      {/* ── Contacto ─────────────────────────────────────── */}
      <ContactSection />

      <Footer />

      {/* ── Botón flotante reclutador ─────────────────────── */}
      <RecruiterModal />
    </div>
  );
}