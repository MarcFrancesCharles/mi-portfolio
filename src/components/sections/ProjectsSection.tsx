"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { useState } from "react";

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="proyectos" className="py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-2">
            Casos de estudio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-mono">
            Proyectos
          </h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-text-secondary text-sm">
            {projects.length} proyectos
          </p>
          <p className="text-text-secondary text-xs font-mono">
            Click para expandir
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured — ocupa 2 columnas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() =>
            setExpandedId((p) => (p === featured.id ? null : featured.id))
          }
          className={`md:col-span-2 glass rounded-2xl cursor-pointer group transition-all duration-500 overflow-hidden ${
            expandedId === featured.id
              ? "border-primary/60 shadow-[var(--glow-primary)]"
              : "hover:border-primary/40"
          }`}
          style={{ border: "1px solid var(--color-border)" }}
        >
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

          <div className="p-7 md:p-8">
            {/* Label */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-mono text-primary tracking-[0.2em] uppercase px-2 py-0.5 rounded border border-primary/30 bg-primary/5">
                Proyecto destacado
              </span>
              <motion.span
                animate={{ rotate: expandedId === featured.id ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-text-secondary text-lg group-hover:text-primary transition-colors"
              >
                +
              </motion.span>
            </div>

            <h3 className="text-2xl font-bold text-text-primary font-mono mb-1 group-hover:text-primary transition-colors">
              {featured.title}
            </h3>
            <p className="text-secondary text-sm mb-4">{featured.subtitle}</p>
            <p className="text-text-secondary leading-relaxed mb-6">
              {featured.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {featured.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-xs font-mono rounded-full border border-primary/25 text-primary bg-primary/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {featured.link && (
              <a href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-primary transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:outline-none"
              >
                Ver proyecto
                <span aria-hidden="true"> → </span>
              </a>
            )}
          </div>

          {/* Panel expandible */}
          <AnimatePresence>
            {expandedId === featured.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-7 md:px-8 pb-7 grid md:grid-cols-3 gap-4">
                  {[
                    { label: "Problema", content: featured.problem },
                    { label: "Solución", content: featured.solution },
                    { label: "Impacto", content: featured.impact },
                  ].map(({ label, content }) => (
                    <div
                      key={label}
                      className="bg-surface/50 rounded-xl p-4 border border-border"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <h4 className="text-xs font-mono font-bold text-primary mb-2 uppercase tracking-wider">
                        {label}
                      </h4>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cards pequeñas */}
        {rest.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
            onClick={() =>
              setExpandedId((p) => (p === project.id ? null : project.id))
            }
            className={`glass rounded-2xl cursor-pointer group transition-all duration-500 overflow-hidden ${
              expandedId === project.id
                ? "border-primary/60 shadow-[var(--glow-primary)]"
                : "hover:border-primary/40"
            }`}
            style={{ border: "1px solid var(--color-border)" }}
          >
            <div className="h-1 bg-gradient-to-r from-secondary to-primary opacity-60" />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl font-mono font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                  0{i + 2}
                </span>
                <motion.span
                  animate={{ rotate: expandedId === project.id ? 45 : 0 }}
                  className="text-text-secondary group-hover:text-primary transition-colors"
                >
                  +
                </motion.span>
              </div>

              <h3 className="text-lg font-bold text-text-primary font-mono mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-secondary text-xs mb-3">{project.subtitle}</p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-primary/20 text-primary bg-primary/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-0.5 text-[10px] font-mono text-text-secondary">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            <AnimatePresence>
              {expandedId === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-3">
                    {[
                      { label: "Problema", content: project.problem },
                      { label: "Solución", content: project.solution },
                      { label: "Impacto", content: project.impact },
                    ].map(({ label, content }) => (
                      <div key={label} className="border-l-2 border-primary/40 pl-3">
                        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider block mb-1">
                          {label}
                        </span>
                        <p className="text-text-secondary text-xs leading-relaxed">
                          {content}
                        </p>
                      </div>
                    ))}
                    {project.link && (
                      <a href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-mono text-secondary hover:text-primary transition-colors mt-1 focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:outline-none"
                      >
                        Ver proyecto →
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Card de stats — elemento de relleno que da carácter */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-6 md:col-span-1"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em] mb-5">
            Metricas
          </p>
          <div className="space-y-4">
            {[
              { value: "3.2%", label: "Conversion rate", color: "text-primary" },
              { value: "-40%", label: "Tiempo en reporting", color: "text-secondary" },
              { value: "0", label: "Incidencias de seguridad", color: "text-primary" },
              { value: "<2s", label: "Tiempo de carga", color: "text-secondary" },
            ].map(({ value, label, color }) => (
              <div key={label} className="flex items-baseline gap-3">
                <span className={`text-2xl font-mono font-black ${color}`}>
                  {value}
                </span>
                <span className="text-text-secondary text-xs">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}