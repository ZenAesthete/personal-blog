import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getArticlesByCategory } from "@/lib/content";
import { format } from "date-fns";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

/**
 * 1. STATIC GENERATION
 */
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category,
  }));
}

/**
 * 2. METADATA (FIXED)
 * 'params' is a Promise here too. We must await it.
 */
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  
  // Capitalize first letter for the title
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${title} | Personal Blog`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // 3. VALIDATION
  if (!CATEGORIES.includes(category as any)) {
    notFound();
  }

  const articles = getArticlesByCategory(category);

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-12 border-b pb-4 border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold capitalize tracking-tight">
          {category}
        </h1>
        <p className="text-gray-500 mt-2">
          {articles.length} {articles.length === 1 ? 'entry' : 'entries'}
        </p>
      </header>

      <div className="space-y-10">
        {articles.map((article) => (
          <article key={article.slug} className="group relative">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <Link 
                  href={`/${category}/${article.slug}`}
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors"
                >
                  <span className="absolute inset-0" />
                  {article.title}
                </Link>
                
                <time className="text-sm text-gray-400 shrink-0 sm:ml-4">
                  {format(new Date(article.date), "MMM d, yyyy")}
                </time>
            </div>

            {article.description && (
              <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                {article.description}
              </p>
            )}
          </article>
        ))}

        {articles.length === 0 && (
          <p className="text-gray-500 italic">No entries in this category yet.</p>
        )}
      </div>
    </main>
  );
}