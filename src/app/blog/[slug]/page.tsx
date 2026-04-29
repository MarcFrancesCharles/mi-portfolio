import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Articulo no encontrado" };
  return {
    title: `${post.title} | Marc FC`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const readingMinutes = Math.max(
    1,
    Math.ceil(post.content.split(" ").length / 200)
  );

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      {/* Back */}
      <div className="max-w-3xl mx-auto mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:outline-none"
        >
          <span> ← </span>
          Volver al blog
        </Link>
      </div>

      {/* Cover */}
      {post.coverImage && (
        <div className="max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      {/* Header del artículo */}
      <header className="max-w-3xl mx-auto mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-mono rounded-full border border-primary/25 text-primary bg-primary/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-mono text-text-primary mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 pb-6 border-b" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
              M
            </div>
            <div>
              <p className="text-sm font-mono font-semibold text-text-primary">Marc FC</p>
              <p className="text-xs text-text-secondary font-mono">
                {new Date(post.date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="h-4 w-px" style={{ background: "var(--color-border)" }} />
          <span className="text-xs text-text-secondary font-mono">
            {readingMinutes} min de lectura
          </span>
        </div>
      </header>

      {/* Contenido */}
      <article className="max-w-3xl mx-auto prose-custom">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      {/* Footer del artículo */}
      <footer className="max-w-3xl mx-auto mt-16 pt-8 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ border: "1px solid var(--color-border)" }}>
          <div>
            <p className="font-mono font-bold text-text-primary mb-1">
              Te ha resultado util?
            </p>
            <p className="text-text-secondary text-sm">
              Hablemos de tu proyecto.
            </p>
          </div>
          <Link
            href="/#contacto"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-background font-semibold rounded-lg hover:shadow-[var(--glow-primary)] hover:scale-[1.03] transition-all duration-300 text-sm font-mono focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Contactar →
          </Link>
        </div>
      </footer>
    </div>
  );
}