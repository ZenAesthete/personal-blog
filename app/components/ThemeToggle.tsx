"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-gray-200 opacity-50" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="
        /* SIZE: Square Keycap */
        w-10 h-10 
        flex items-center justify-center
        
        /* 
           ISSUE 2 FIX: INVERTED COLORS 
           Light Mode = Dark Key (#2A2622)
           Dark Mode  = Beige Key (#EEECE5)
        */
        bg-[#2A2622] dark:bg-[#EEECE5]
        
        /* TEXT COLOR */
        text-[#EEECE5] dark:text-[#8B2C0E]
        
        /* BORDERS */
        rounded-lg
        border border-gray-600 dark:border-gray-300
        
        /* 3D BEVEL (Inverted colors) */
        border-b-[4px] 
        border-b-[#000000] dark:border-b-[#Cdc8B8]
        
        /* INTERACTION */
        transition-all duration-75
        active:border-b-[0px] 
        active:translate-y-[4px]
        hover:brightness-110
      "
      aria-label="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}