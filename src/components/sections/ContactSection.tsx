"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactEmail } from "@/app/actions/contact";

const schema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mínimo 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-3 bg-surface/40 border border-surface rounded-lg " +
  "text-text-primary font-mono text-sm placeholder:text-text-secondary/40 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "hover:border-primary/50 transition-colors";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("email", data.email);
    fd.append("message", data.message);

    const result = await sendContactEmail(fd);

    if (result.success) {
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-3 text-center">
          <span className="text-primary">$ </span>Contacto
        </h2>

        <p className="text-text-secondary text-center mb-10 max-w-md mx-auto">
          Tienes un proyecto en mente? Escríbeme y te respondo en menos de 24h.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-mono text-text-secondary mb-1.5"
            >
              Nombre *
            </label>
            <input
              {...register("name")}
              id="name"
              className={inputClass}
              placeholder="Tu nombre"
            />
            {errors.name && (
              <p className="text-error text-xs mt-1 font-mono">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono text-text-secondary mb-1.5"
            >
              Email *
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className={inputClass}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-error text-xs mt-1 font-mono">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-mono text-text-secondary mb-1.5"
            >
              Mensaje *
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={5}
              className={inputClass + " resize-none"}
              placeholder="Cuéntame tu proyecto o tu idea..."
            />
            {errors.message && (
              <p className="text-error text-xs mt-1 font-mono">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none font-mono text-sm"
          >
            {status === "loading" ? "Enviando..." : "Enviar mensaje"}
          </button>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-center text-primary font-mono text-sm"
              >
                Mensaje enviado correctamente. Te respondo pronto!
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-center text-error font-mono text-sm"
              >
                Error al enviar. Escríbeme a{" "}
                 <a
                  href="mailto:mfrancescharles@gmail.com"
                  className="underline underline-offset-2"
                >
                  mfrancescharles@gmail.com
                </a>
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
}