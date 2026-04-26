"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex flex-col items-center justify-center gap-2 mt-6 text-text-secondary text-sm"
    >
      <span className="font-mono text-xs text-text-secondary">Descubre más</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-primary text-lg"
      >
        ↓
      </motion.div>
    </motion.div>
  );
}