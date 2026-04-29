"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Cursor circular personalizado solo en desktop.
 * Crece sobre elementos interactivos.
 * Usa mix-blend-difference para contraste automático.
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const isDesktop = useRef(false);

  useEffect(() => {
    // Solo activar en dispositivos con puntero fino (desktop)
    isDesktop.current = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop.current) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(
        !!(t.closest("a") || t.closest("button") || t.closest("[data-cursor]"))
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!visible) return null;

  const size = hovering ? 36 : 12;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full bg-primary mix-blend-difference"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
      }}
      transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.4 }}
    />
  );
}