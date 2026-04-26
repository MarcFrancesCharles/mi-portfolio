"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data/skills";

export default function SkillsSection() {
  return (
    <section id="habilidades" className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12 text-center">
        <span className="text-primary">$ </span>Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-surface/30 backdrop-blur-sm rounded-lg p-6 border border-surface hover:border-primary hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-xl font-semibold text-text-primary font-mono">
                {category.title}
              </h3>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              {category.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="relative px-2.5 py-1 text-xs font-mono bg-background rounded border border-text-secondary/20 text-primary cursor-default group/tag"
                  title={tech.level}
                >
                  {tech.name}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-primary/30 text-text-primary text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/tag:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {tech.level}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}