"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function getAllPostsServer(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title,
          excerpt: data.excerpt || "",
          date: data.date || "",
          tags: data.tags || [],
          content,
        };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    return posts;
  } catch {
    return [];
  }
}

export async function getPostBySlugServer(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPostsServer();
  return posts.find((post) => post.slug === slug);
}
