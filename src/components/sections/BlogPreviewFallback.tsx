"use client";

import Link from "next/link";

export default function BlogPreviewFallback() {
  return (
    <section id="blog" className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12 text-center">
        <span className="text-primary">$ </span>Blog
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Placeholder cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface/30 backdrop-blur-sm rounded-lg border border-surface p-5 animate-pulse"
          >
            <div className="h-6 bg-surface rounded mb-2"></div>
            <div className="h-4 bg-surface rounded mb-3"></div>
            <div className="h-3 bg-surface rounded w-16"></div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
        >
          Ver todos los artículos
        </Link>
      </div>
    </section>
  );
}
