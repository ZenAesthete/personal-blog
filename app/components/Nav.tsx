import Link from "next/link";
import { CATEGORIES } from "@/lib/content";

export default function Nav() {
  return (
    <nav>
      <ul className="nav">
        {CATEGORIES.map((category) => (
      <li key={category}>
        <Link href={`/${category}`}>{category}</Link>
      </li>
    ))}
  </ul>
    </nav>
  );
}
