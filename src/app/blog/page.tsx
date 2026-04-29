import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 60;

export const metadata = {
  title: "Blog | Marc FC",
  description: "Articulos sobre desarrollo Full Stack, Next.js, React y arquitectura web.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">
          $ cat blog/
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-mono text-text-primary mb-4">
          Blog
        </h1>
        <p className="text-text-secondary max-w-lg">
          Articulos tecnicos donde comparto soluciones, arquitecturas y lo que aprendo construyendo productos reales.
        </p>
      </div>

      {/* Featured */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block glass rounded-2xl overflow-hidden mb-6 hover:border-primary/40 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
          <div className="p-7 md:p-9 md:flex gap-10 items-start">
            {featured.coverImage && (
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full md:w-64 h-40 object-cover rounded-lg mb-5 md:mb-0 flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono text-primary tracking-[0.15em] uppercase px-2 py-0.5 rounded border border-primary/30 bg-primary/5">
                  Ultimo post
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  {new Date(featured.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-mono text-text-primary group-hover:text-primary transition-colors mb-3 leading-tight">
                {featured.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs font-mono rounded-full border border-primary/25 text-primary bg-primary/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid del resto */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-border" style={{ background: "var(--color-border)" }} />
            <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">
              Mas articulos
            </span>
            <div className="h-px flex-1 bg-border" style={{ background: "var(--color-border)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 flex flex-col focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-primary/20 text-primary bg-primary/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary font-mono whitespace-nowrap ml-2">
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-mono text-text-primary group-hover:text-primary transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-secondary group-hover:text-primary transition-colors">
                  <span>Leer articulo</span>
                  <span className="group-hover:translate-x-1 transition-transform"> → </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {posts.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center" style={{ border: "1px solid var(--color-border)" }}>
          <p className="font-mono text-text-secondary">
            <span className="text-primary">$</span> No hay posts todavia. Escribe el primero desde{" "}
            <code className="text-primary">/studio</code>
          </p>
        </div>
      )}
    </div>
  );
}