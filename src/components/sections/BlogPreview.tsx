import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12 text-center">
        <span className="text-primary">$ </span>Blog
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-surface/30 backdrop-blur-sm rounded-lg border border-surface hover:border-primary hover:scale-[1.02] transition-all duration-300 p-5 group"
          >
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-text-secondary text-sm mb-3">{post.excerpt}</p>
            <span className="text-xs text-secondary font-mono">{post.date}</span>
          </Link>
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