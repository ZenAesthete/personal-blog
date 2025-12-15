"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder of the same size so layout doesn't jump
    return <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-800 opacity-50" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="
        p-2 rounded-md transition-all duration-300
        /* VISIBILITY FIX: Give it a background & border by default */
        bg-gray-200 dark:bg-gray-800
        border border-gray-300 dark:border-gray-700
        /* COLOR FIX: Ensure icon is dark/light ink color */
        text-gray-900 dark:text-gray-100
        /* HOVER: Switch to Accent color */
        hover:bg-accent hover:text-white hover:border-accent
      "
      aria-label="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}