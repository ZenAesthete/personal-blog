import Link from "next/link";
import { format } from "date-fns";
import { ArticleMeta } from "@/lib/content";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link 
      href={`/${article.category}/${article.slug}`}
      className="block group"
    >
      <article className="
        relative p-6 sm:p-8 rounded-lg transition-all duration-300
        /* Base Styling */
        bg-gray-50 dark:bg-white/5 
        border border-gray-300 dark:border-gray-700
        /* Pop Up Animation (Kept as requested) */
        shadow-sm hover:shadow-md hover:-translate-y-1
      ">
        
        {/* Header: Date & Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="
            inline-block px-2 py-1 text-xs font-bold tracking-widest uppercase border rounded
            /* PERMANENT COLOR: Accent/Rust instead of Gray */
            text-accent border-accent
          ">
            {article.category}
          </span>
          
          <time className="text-sm text-gray-400 font-sans">
            {format(new Date(article.date), "MMM d, yyyy")}
          </time>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent transition-colors mb-3">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans mb-4">
            {article.description}
          </p>
        )}

        {/* 'Read More' Indicator - PERMANENTLY VISIBLE */}
        {/* Removed 'opacity-0' and 'group-hover' logic */}
        <div className="flex items-center text-sm font-bold text-accent uppercase tracking-wider">
          Read Article →
        </div>
      </article>
    </Link>
  );
}