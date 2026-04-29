import Link from "next/link";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

// Este componente es Server Component — no hace falta "use client"
export default async function BlogPreview() {
  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
  ]);

  const posts = allPosts.filter((p) => p.slug !== featured?.slug).slice(0, 2);
  const mainFeatured = featured ?? allPosts[0];
  const sidePosts = featured
    ? allPosts.filter((p) => p.slug !== featured.slug).slice(0, 2)
    : allPosts.slice(1, 3);

  return (
    <section id="blog" className="py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-2">
            Conocimiento compartido
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-mono">
            Blog
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden md:inline-flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-1 focus-visible:outline-none"
        >
          Todos los articulos
          <span aria-hidden="true"> → </span>
        </Link>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {/* Post destacado — 3 columnas */}
        {mainFeatured && (
          <Link
            href={`/blog/${mainFeatured.slug}`}
            className="md:col-span-3 group glass rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {/* Cover placeholder / imagen */}
            {mainFeatured.coverImage ? (
              <div className="relative h-52 overflow-hidden">
                <img
                  src={mainFeatured.coverImage}
                  alt={mainFeatured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            ) : (
              <div className="h-52 bg-gradient-to-br from-primary/10 via-surface to-secondary/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-9xl font-mono font-black text-primary select-none">
                    {"</>"}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                {mainFeatured.featured && (
                  <span className="text-[10px] font-mono text-primary tracking-[0.15em] uppercase px-2 py-0.5 rounded border border-primary/30 bg-primary/5">
                    Destacado
                  </span>
                )}
                <span className="text-xs text-text-secondary font-mono">
                  {new Date(mainFeatured.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h3 className="text-xl font-bold text-text-primary font-mono mb-2 group-hover:text-primary transition-colors leading-snug">
                {mainFeatured.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {mainFeatured.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {mainFeatured.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-primary/20 text-primary bg-primary/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        )}

        {/* Posts secundarios — 2 columnas (Con placeholders elegantes) */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {[0, 1].map((i) => {
            const post = sidePosts[i];
            
            // Si el post existe, mostramos la tarjeta normal
            if (post) {
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass rounded-2xl p-5 flex flex-col flex-1 hover:border-primary/40 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-3xl font-mono font-black text-primary/15 group-hover:text-primary/30 transition-colors leading-none">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] text-text-secondary font-mono mt-1">
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary font-mono mb-2 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-secondary/20 text-secondary bg-secondary/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            }

            // Si el post NO existe aún, mostramos la tarjeta "Próximamente" elegante
            return (
              <div
                key={`placeholder-${i}`}
                className="glass rounded-2xl p-5 flex flex-col flex-1 justify-center items-center opacity-60 transition-all duration-500"
                style={{ border: "1px dashed var(--color-border)" }}
              >
                <span className="text-2xl font-mono text-primary/30 mb-2 animate-pulse">
                  {"{...}"}
                </span>
                <p className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em]">
                  Proximamente
                </p>
              </div>
            );
          })}

          {/* CTA card (Sigue igual) */}
          <Link
            href="/blog"
            className="glass rounded-2xl p-5 flex items-center justify-between group hover:border-primary/40 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            style={{ border: "1px solid var(--color-border)" }}
          >
            <div>
              <p className="text-sm font-mono font-bold text-text-primary group-hover:text-primary transition-colors">
                Todos los articulos
              </p>
              <p className="text-xs text-text-secondary">
                {allPosts.length} publicaciones
              </p>
            </div>
            <span className="text-2xl text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}