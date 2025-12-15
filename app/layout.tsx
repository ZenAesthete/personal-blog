import type { Metadata } from "next";
import Nav from "./components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Blog",
  description: "Thoughts, reflections, and philosophy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>
            <a href="/">Personal Blog</a>
          </h1>
          <Nav />
        </header>

        <main className="container">{children}</main>

        <footer>
          <small>© {new Date().getFullYear()}</small>
        </footer>
      </body>
    </html>
  );
}
