import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getArticlesByCategory } from "@/lib/content";
import { format } from "date-fns";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${title} | Personal Blog`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!CATEGORIES.includes(category as any)) {
    notFound();
  }

  const articles = getArticlesByCategory(category);

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-12 border-b-2 border-gray-200 pb-4">
        <h1 className="text-4xl font-serif font-bold capitalize text-gray-900">
          {category}
        </h1>
        <p className="text-gray-500 mt-2 font-serif italic">
          {articles.length} {articles.length === 1 ? 'entry' : 'entries'}
        </p>
      </header>

      <div className="space-y-12">
        {articles.map((article) => (
          <article key={article.slug} className="group relative block">
            {/* 
               LINK CONTAINER 
               We wrap the whole block in the link for better UX, 
               but we keep the semantic structure.
            */}
            <div className="flex flex-col mb-2">
               <Link 
                  href={`/${category}/${article.slug}`}
                  className="text-2xl font-serif font-bold text-gray-900 group-hover:text-accent transition-colors"
                >
                  {article.title}
                </Link>
                
                <time className="text-sm text-gray-400 mt-1 font-sans">
                  {format(new Date(article.date), "MMMM d, yyyy")}
                </time>
            </div>

            {article.description && (
              <p className="text-gray-700 leading-relaxed font-sans">
                {article.description}
              </p>
            )}
            
            <div className="mt-3">
               <Link 
                  href={`/${category}/${article.slug}`}
                  className="text-sm font-bold text-accent uppercase tracking-wider hover:underline"
                >
                  Read Article →
                </Link>
            </div>
          </article>
        ))}

        {articles.length === 0 && (
          <p className="text-gray-500 italic">No entries in this category yet.</p>
        )}
      </div>
    </main>
  );
}