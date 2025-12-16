import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

// 1. Define Categories as a constant
export const CATEGORIES = [
  "philosophy",
  "reflections",
  "resonance",
  "spirituality",
] as const;

// ADDED LINE FOR FIXING BUILD ERROR
export type Category = (typeof CATEGORIES)[number];

// 2. Define the Zod Schema for Frontmatter
// This acts as a contract. If your MD file violates this, the build breaks.
const ArticleSchema = z.object({
  title: z.string(),
  date: z.string().transform((str) => new Date(str).toISOString()), // Standardize dates
  category: z.enum(CATEGORIES), // Must be one of the defined categories
  description: z.string().optional(),
});

export type ArticleMeta = z.infer<typeof ArticleSchema> & { slug: string };

// 3. Helper to recursively find all files in a directory
function getFilesRecursively(dir: string): string[] {
  let files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = [...files, ...getFilesRecursively(fullPath)];
    } else if (item.isFile() && item.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

// 4. Main Function to get all articles
export function getAllArticles(): ArticleMeta[] {
  const filePaths = getFilesRecursively(CONTENT_DIR);

  const articles = filePaths.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    // Validate frontmatter
    const parsedData = ArticleSchema.safeParse(data);

    if (!parsedData.success) {
      console.error(`❌ Validation Error in file: ${filePath}`);
      console.error(parsedData.error.flatten().fieldErrors);
      throw new Error(`Invalid frontmatter in ${path.basename(filePath)}`);
    }

    // Generate Slug: 2025-01-01-my-post.md -> my-post
    const fileName = path.basename(filePath, ".md");
    const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "");

    return {
      ...parsedData.data,
      slug,
    };
  });

  // Sort by date (newest first)
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// 5. Query Functions
export function getArticlesByCategory(category: string): ArticleMeta[] {
  // We use the validation schema to ensure we only return matching categories
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticleBySlug(slug: string) {
  const allArticles = getAllArticles();
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) return null;

  // We need to find the actual file again to get the content
  // (In a larger app, we might cache this path mapping, but this is fine for now)
  const filePaths = getFilesRecursively(CONTENT_DIR);
  const filePath = filePaths.find((path) => {
    const name = path.split("/").pop()?.replace(".md", "");
    // Check if filename matches slug OR (date-slug)
    return name === slug || name?.endsWith(`-${slug}`);
  });

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);

  return {
    meta: article,
    content, // Return raw markdown, we will compile it in the component
  };
}

export function getCategoriesWithCounts() {
  const articles = getAllArticles();
  return CATEGORIES.map((category) => ({
    category,
    count: articles.filter((a) => a.category === category).length,
  }));
}