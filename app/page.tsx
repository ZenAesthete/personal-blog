import { getArticlesByCategory } from "@/lib/content";

export default function Home() {
  const philosophyArticles = getArticlesByCategory("philosophy");

  //console.log(philosophyArticles);

  return <h1>Home</h1>;
}
