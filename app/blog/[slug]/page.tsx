import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import BlogPostClientWrapper from "@/app/components/BlogPostClientWrapper";
import { siteConfig } from "@/config/site";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  // Generate params for all language variants
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
      post = getBlogPost(slug);
      language = post.lang || "es";
    } catch (error) {
      // If not found, try with language suffix
      if (!slug.endsWith("-en")) {
        try {
          post = getBlogPost(`${slug}-en`);
          language = "en";
        } catch {
          throw error;
        }
      } else {
        throw error;
      }
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

  try {
    post = getBlogPost(slug);
  } catch (error) {
    // Try with language suffix if main slug not found
    if (!slug.endsWith("-en")) {
      try {
        post = getBlogPost(`${slug}-en`);
      } catch {
        notFound();
      }
    } else {
      notFound();
    }
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  const allPosts = getAllBlogPosts();
  const validSlugs = allPosts.map(p => p.slug);

  return (
    <main className="min-h-screen pt-6 pb-12">
      {/* Post Content */}
      <article className="py-10 px-6">
        <BlogPostClientWrapper
          source={mdxSource}
          title={post.title}
          date={post.date}
          author={post.author}
          category={post.category}
          readingTime={post.readingTime}
          image={post.image}
          validSlugs={validSlugs}
        />
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
