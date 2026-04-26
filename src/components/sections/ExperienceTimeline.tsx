"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/lib/data/Experience";

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="py-20 px-4 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12 text-center">
        <span className="text-primary">$ </span>Experiencia
      </h2>

      <div className="relative border-l-2 border-surface pl-6 md:pl-10">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative mb-12 last:mb-0"
          >
            {/* Círculo en la línea */}
            <div className="absolute -left-[29px] md:-left-[37px] top-1 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-glow" />

            <div className="bg-surface/30 backdrop-blur-sm rounded-lg p-5 border border-surface hover:border-primary transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                <h3 className="text-lg font-semibold text-text-primary">
                  {exp.role} <span className="text-secondary">@ {exp.company}</span>
                </h3>
                <span className="text-xs text-text-secondary font-mono whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-text-secondary text-sm mb-3">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono bg-surface rounded border border-text-secondary/20 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}