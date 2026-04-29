"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Cursor circular personalizado profesional para desktop.
 * Crece sobre elementos interactivos.
 * Desaparece en campos de texto.
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [onInput, setOnInput] = useState(false);
  const [visible, setVisible] = useState(false);
  const isDesktop = useRef(false);

  useEffect(() => {
    // Solo activar en dispositivos con puntero fino (desktop)
    isDesktop.current = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop.current) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive = !!(t.closest("a") || t.closest("button") || t.closest("[data-cursor]"));
      const isInputField = !!(
        t.closest("input") || 
        t.closest("textarea") || 
        t.closest("[contenteditable]") ||
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA"
      );
      
      setHovering(isInteractive);
      setOnInput(isInputField);
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
  }, [visible]);

  // No renderizar si está sobre un campo de texto
  if (onInput) return null;

  const size = hovering ? 44 : 18;
  const innerSize = hovering ? 12 : 5;

  return (
    <>
      {/* Círculo exterior principal */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{ 
          zIndex: 999999,
          border: "2px solid #3ef5a8",
          boxShadow: "0 0 8px rgba(62, 245, 168, 0.6), inset 0 0 8px rgba(62, 245, 168, 0.3)",
          width: size,
          height: size,
        }}
        animate={{
          x: pos.x - size / 2,
          y: pos.y - size / 2,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.3 }}
      />
      
      {/* Punto interior luminoso */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{ 
          zIndex: 999999,
          backgroundColor: "#3ef5a8",
          boxShadow: "0 0 12px rgba(62, 245, 168, 0.8), 0 0 24px rgba(62, 245, 168, 0.4)",
          width: innerSize,
          height: innerSize,
        }}
        animate={{
          x: pos.x - innerSize / 2,
          y: pos.y - innerSize / 2,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.3 }}
      />
    </>
  );
}