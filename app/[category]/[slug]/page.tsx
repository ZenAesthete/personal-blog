import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

/**
 * 1. STATIC GENERATION
 * This function tells Next.js exactly which paths to build at compile time.
 * Without this, your blog would be slower (Server Side Rendered).
 */
export async function generateStaticParams() {
  const articles = getAllArticles();

  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

/**
 * 2. METADATA (Optional but recommended)
 * Good for SEO. Sets the browser tab title.
 */
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.meta.title} | Personal Blog`,
    description: article.meta.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;

  // 3. FETCH DATA
  // We don't pass the category to the fetcher anymore.
  // We fetch by slug, then validate the category matches.
  const articleData = getArticleBySlug(slug);

  if (!articleData) {
    notFound();
  }

  // 4. URL INTEGRITY CHECK
  // If the article exists but is in "philosophy", and the user visits "/reflections/my-post",
  // we 404. This prevents duplicate content issues.
  if (articleData.meta.category !== category) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <article>
        {/* Header Section */}
        <header className="mb-10 text-center">
          <div className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3">
            {articleData.meta.category}
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            {articleData.meta.title}
          </h1>
          
          <time className="text-gray-500 text-sm">
            {format(new Date(articleData.meta.date), "MMMM d, yyyy")}
          </time>
        </header>

        {/* 
            MDX RENDERER 
            The 'prose' class comes from @tailwindcss/typography.
            It automatically styles h1, p, lists, quotes, etc.
        */}
        <div className="prose prose-lg prose-neutral dark:prose-invert mx-auto">
          <MDXRemote source={articleData.content} />
        </div>
      </article>
    </main>
  );
}