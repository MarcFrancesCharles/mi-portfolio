import Link from "next/link";
import { getAllPostsServer } from "@/lib/blog-server";

export const metadata = {
  title: "Blog | Marc FC",
  description: "Artículos sobre desarrollo Full Stack, Next.js, React y más.",
};

export default async function BlogPage() {
  const posts = await getAllPostsServer();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold font-mono text-text-primary mb-4">
        <span className="text-primary">$ </span>Blog
      </h1>
      <p className="text-text-secondary mb-12 max-w-xl">
        Artículos técnicos donde comparto soluciones, experiencias y buenas prácticas.
      </p>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-surface/30 backdrop-blur-sm rounded-lg border border-surface hover:border-primary hover:scale-[1.01] transition-all duration-300 p-6 group"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
              <h2 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <span className="text-xs text-text-secondary font-mono whitespace-nowrap">
                {post.date}
              </span>
            </div>
            <p className="text-text-secondary text-sm mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono bg-background rounded border border-text-secondary/20 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}