import type { Metadata } from "next";
import { Crimson_Pro, Cormorant_Garamond } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

// 1. Load "Old World" Fonts
const crimson = Crimson_Pro({ 
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Personal Blog",
    default: "Personal Blog",
  },
  description: "Thoughts, reflections, and philosophy regarding the modern world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${crimson.variable} ${cormorant.variable}`}>
      <body 
        className="min-h-screen flex flex-col antialiased bg-paper text-ink"
      >
        <Nav />

        <div className="flex-grow">
          {children}
        </div>

        <footer className="border-t-2 border-double border-sepia/20 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-sepia/60 font-serif italic">
            <p>Est. {new Date().getFullYear()} — A Digital Commonplace Book.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}