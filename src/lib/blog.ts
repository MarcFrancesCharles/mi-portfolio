import { client } from "./sanity";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
  coverImage?: string;
  featured?: boolean;
};

const POST_FIELDS = `
  "slug": slug.current,
  title,
  excerpt,
  "date": date,
  tags,
  "content": body,
  "coverImage": coverImage.asset->url,
  featured
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(date desc) { ${POST_FIELDS} }`
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const result = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug }
  );
  return result ?? undefined;
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const result = await client.fetch(
    `*[_type == "post" && featured == true] | order(date desc)[0] { ${POST_FIELDS} }`
  );
  return result ?? undefined;
}