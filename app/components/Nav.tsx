import Link from "next/link";
import { CATEGORIES } from "@/lib/content";

export default function Nav() {
  return (
    // Double border creates a "classical" separator look
    <nav className="border-b-4 border-double border-sepia/20 py-8 mb-12">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
        
        {/* Logo - Large, Centered, Fancy Serif */}
        <Link 
          href="/" 
          className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-gray-900 hover:text-rust transition-colors decoration-clone"
        >
          Personal Blog
        </Link>

        {/* Categories - Elegant serif links with italic hover */}
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-2">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link 
                href={`/${category}`}
                className="text-lg text-sepia hover:text-rust hover:italic transition-all duration-300 capitalize font-serif"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}