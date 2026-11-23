"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type ThemeMode = "light" | "dark";

interface ThemeOrigin {
  clientX: number;
  clientY: number;
}

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode, origin?: ThemeOrigin) => void;
  toggleTheme: (origin?: ThemeOrigin) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: ThemeMode = prefersDark ? "dark" : "light";
    // Default to light to match Peter Holderrieth's crisp editorial initial impression unless user explicitly saved dark
    const defaultTheme: ThemeMode = stored ?? (prefersDark ? "light" : initial);
    setThemeState(defaultTheme);
    document.documentElement.setAttribute("data-theme", defaultTheme);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    document.documentElement.setAttribute("data-theme", mode);
    try {
      window.localStorage.setItem("portfolio-theme", mode);
    } catch {
      // Ignore storage quota errors
    }
  };

  const setTheme = (mode: ThemeMode, origin?: ThemeOrigin) => {
    if (mode === theme) return;
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme(mode);
      return;
    }

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };

    if (typeof doc.startViewTransition === "function") {
      const x = origin?.clientX ?? window.innerWidth / 2;
      const y = origin?.clientY ?? window.innerHeight / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      root.style.setProperty("--theme-x", `${x}px`);
      root.style.setProperty("--theme-y", `${y}px`);
      root.style.setProperty("--theme-r", `${radius}px`);
      doc.startViewTransition(() => flushSync(() => applyTheme(mode)));
      return;
    }

    // Fallback: cross-fade colors on every element for browsers without View Transitions
    root.classList.add("theme-transition");
    applyTheme(mode);
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
  };

  const toggleTheme = (origin?: ThemeOrigin) => {
    setTheme(theme === "light" ? "dark" : "light", origin);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
