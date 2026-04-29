"use client";

import { useState, useEffect } from "react";

const WORDS = [
  "soluciones web escalables",
  "experiencias de usuario fluidas",
  "código limpio y mantenible",
  "aplicaciones web modernas",
];

export default function TypingEffect() {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBeforeDelete = 3000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setDisplayedText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), delayBeforeDelete);
      } else if (isDeleting && charIndex === 0) {
        setWordIndex((wordIndex + 1) % WORDS.length);
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <span className="relative">
      {displayedText}
      <span className="absolute -right-1 animate-pulse">|</span>
    </span>
  );
}
