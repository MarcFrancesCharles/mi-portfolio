import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: `${post.title} | Blog Marc FC`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen pt-24 pb-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold font-mono text-text-primary mb-4">
        {post.title}
      </h1>
      <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-8">
        <span className="font-mono">{post.date}</span>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono bg-surface rounded border border-text-secondary/20 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-text-primary leading-relaxed">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}