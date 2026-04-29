"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row gap-10 items-center"
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-36 h-36 rounded-full border-2 border-primary shadow-glow overflow-hidden bg-surface flex items-center justify-center">
            {/*
              Cuando tengas foto: reemplaza el emoji por:
              <Image src="/foto.jpg" alt="Marc FC" fill className="object-cover" />
            */}
            <span className="text-6xl select-none">👨‍💻</span>
            {/* Halo animado */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-primary/30"
            />
          </div>
        </div>

        {/* Texto */}
        <div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-5">
            <span className="text-primary">$ </span>Sobre mí
          </h2>
          <div className="space-y-3 text-text-secondary leading-relaxed">
            <p>
              Soy Marc, desarrollador Full Stack con base en Lleida. Me apasiona
              construir productos digitales que combinen{" "}
              <span className="text-primary font-semibold">
                rendimiento técnico
              </span>{" "}
              con una experiencia de usuario que deja huella.
            </p>
            <p>
              Mi filosofía: el código limpio no es una opción, es una
              responsabilidad. Trabajo con Next.js, TypeScript y Node.js en el
              día a día, pero lo que de verdad me diferencia es entender el
              problema antes de escribir la primera línea.
            </p>
            <p>
              Cuando no estoy programando, estoy aprendiendo: nuevas
              arquitecturas, patrones de diseño, o por qué aquella animación de
              scroll tardaba 16ms más de lo esperado.
            </p>
            <p className="font-mono text-sm text-primary">
              → Disponible para proyectos freelance y posiciones remotas.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}