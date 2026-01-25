import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  // Generate params for all language variants (include '-en')
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    let post;
    let language = "es";
    
    // Try to get the post with the slug as-is
    try {
      // Try the slug as provided
      try {
        post = getBlogPost(slug);
        language = post.lang || (slug.endsWith("-en") ? "en" : "es");
      } catch (e) {
        // If not found, try the opposite-language variant
        if (slug.endsWith("-en")) {
          post = getBlogPost(slug.replace(/-en$/, ""));
          language = post.lang || "es";
        } else {
          post = getBlogPost(`${slug}-en`);
          language = post.lang || "en";
        }
      }
    } catch (error) {
      return { title: "Post Not Found" };
    }
    
    return {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      alternates: {
        canonical: `${siteConfig.url}/blog/${slug}/`,
        languages: {
          es: `${siteConfig.url}/blog/${slug.replace(/-en$/, '')}/`,
          en: `${siteConfig.url}/blog/${slug.endsWith('-en') ? slug : slug + '-en'}/`,
        },
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        images: post.image ? [{ url: post.image }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  const { slug } = await params;

  // Resolve post for given slug, trying both language variants if necessary
  try {
    try {
      post = getBlogPost(slug);
    } catch (e) {
      if (slug.endsWith("-en")) {
        post = getBlogPost(slug.replace(/-en$/, ""));
      } else {
        post = getBlogPost(`${slug}-en`);
      }
    }
  } catch (e) {
    notFound();
  }

  // Compile MDX/Markdown to HTML on the server for SEO-safe prerender
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(post.content);
  const htmlContent = String(file);

  const allPosts = getAllBlogPosts();
  const validSlugs = allPosts.map((p) => p.slug);

  return (
    <main className="min-h-screen pt-6 pb-12">
      {/* Post Content */}
      <article className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-6 md:mb-8 px-6 pt-1">
            {post.image && (
              <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-xl mb-8" />
            )}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">{post.title}</h1>
          </header>
          <div className="prose prose-invert max-w-none px-6">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-14 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">Other Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getAllBlogPosts()
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="p-6 rounded-xl bg-card-bg border border-gray-800 hover:border-purple-500/50 transition-all h-full">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2 mb-4">
                      {relatedPost.description}
                    </p>
                    <span className="text-purple-400 group-hover:translate-x-1 transition-transform inline-block">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
