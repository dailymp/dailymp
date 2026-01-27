import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  readingTime: string;
  content: string;
  lang?: string;
  keywords?: string[];
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  readingTime: string;
  lang?: string;
  keywords?: string[];
}

/**
 * Get all blog posts metadata
 */
export function getAllBlogPosts(): BlogPostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time (approx 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Daily Miranda Pardo",
      category: data.category || "General",
      image: data.image,
      readingTime: `${readingTime} min read`,
      lang: data.lang || "es",
      keywords: Array.isArray(data.keywords) ? data.keywords : (data.keywords ? [String(data.keywords)] : []),
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Calculate reading time
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    author: data.author || "Daily Miranda Pardo",
    category: data.category || "General",
    image: data.image,
    readingTime: `${readingTime} min read`,
    content,
    lang: data.lang || "es",
    keywords: Array.isArray(data.keywords) ? data.keywords : (data.keywords ? [String(data.keywords)] : []),
  };
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPostMetadata[] {
  return getAllBlogPosts().filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get unique categories
 */
export function getBlogCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

/**
 * Get blog posts filtered by language
 */
export function getBlogPostsByLanguage(language: string): BlogPostMetadata[] {
  return getAllBlogPosts().filter((post) => (post.lang || "es") === language);
}

/**
 * Get unique categories for a specific language
 */
export function getBlogCategoriesByLanguage(language: string): string[] {
  const posts = getBlogPostsByLanguage(language);
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}
