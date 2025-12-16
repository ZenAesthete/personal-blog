import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";

// Plugins
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

// Components
import { YouTube } from "@/app/components/YouTube";
// 1. IMPORT THE LETTER FORM COMPONENT
import { LetterForm } from "@/app/components/LetterForm";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.meta.title} | Personal Blog`,
    description: article.meta.description,
  };
}

// Custom components available in MDX
const components = {
  YouTube,
};

// Code highlighting options
const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const articleData = getArticleBySlug(slug);

  if (!articleData) notFound();
  if (articleData.meta.category !== category) notFound();

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
        crossOrigin="anonymous"
      />

      <article>
        <header className="mb-10 text-center">
          <div className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3 font-sans">
            {articleData.meta.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 font-serif">
            {articleData.meta.title}
          </h1>
          
          <time className="text-gray-400 text-sm font-sans">
            {format(new Date(articleData.meta.date), "MMMM d, yyyy")}
          </time>
        </header>

        <div className="prose prose-lg prose-headings:font-serif prose-p:font-serif mx-auto">
          <MDXRemote 
            source={articleData.content} 
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                  rehypeKatex, 
                  [rehypePrettyCode, prettyCodeOptions]
                ],
              }
            }}
          />
        </div>

        {/* 2. INSERT LETTER FORM HERE */}
        {/* It sits outside the prose div so it doesn't inherit article styling */}
        <LetterForm title={articleData.meta.title} />

      </article>
    </main>
  );
}