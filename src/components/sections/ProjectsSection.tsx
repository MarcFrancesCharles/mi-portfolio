"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { useState } from "react";

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="proyectos" className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12 text-center">
        <span className="text-primary">$ </span>Proyectos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-surface/30 backdrop-blur-sm rounded-lg border transition-all duration-300 cursor-pointer ${
              expandedId === project.id
                ? "border-primary shadow-glow"
                : "border-surface hover:border-primary"
            }`}
            onClick={() => toggleExpand(project.id)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-1 font-mono">
                {project.title}
              </h3>
              <p className="text-sm text-secondary mb-3">{project.subtitle}</p>
              <p className="text-text-secondary text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono bg-background rounded border border-text-secondary/20 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver proyecto →
                </a>
              )}
            </div>

            {/* Detalles expandibles */}
            {expandedId === project.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 space-y-4"
              >
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Problema
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Solución
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {project.solution}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Impacto
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {project.impact}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}