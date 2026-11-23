"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Terminal } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "thesis", href: "#featured-project" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "outside", href: "#outside-the-terminal" },
  { label: "~/cli", href: "#terminal", isMono: true },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHash, setActiveHash] = useState<string>("#about");

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
      setScrollProgress(pct);

      const sectionIds = [
        "about",
        "experience",
        "featured-project",
        "projects",
        "terminal",
        "skills",
        "outside-the-terminal",
      ];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveHash(`#${sectionIds[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--global-bg-color)]/95 backdrop-blur-sm border-b border-[var(--global-divider-color)]">
      <nav
        aria-label="Primary navigation"
        className="max-w-editorial mx-auto px-5 sm:px-6 h-[52px] flex items-center justify-between"
      >
        <a
          href="#top"
          className="text-[15px] tracking-tight text-[var(--global-text-color)] hover:text-[var(--global-theme-color)] transition-colors"
        >
          <span className="font-medium">Aditya</span>{" "}
          <span className="font-light">Raj</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link text-[14px] transition-colors ${
                  item.isMono ? "font-mono text-[12.5px]" : "font-normal"
                } ${
                  isActive
                    ? "is-active text-[var(--global-theme-color)] font-medium"
                    : "text-[var(--global-text-color)] hover:text-[var(--global-theme-color)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            className="ml-1 p-1.5 text-[var(--global-text-color)] hover:text-[var(--global-theme-color)] transition-colors rounded"
          >
            <span key={theme} className="theme-icon-swap inline-flex">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#terminal"
            aria-label="Jump to interactive terminal"
            className="p-1.5 text-[var(--global-text-color-light)] hover:text-[var(--global-theme-color)]"
          >
            <Terminal className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            className="p-1.5 text-[var(--global-text-color)] hover:text-[var(--global-theme-color)] transition-colors"
          >
            <span key={theme} className="theme-icon-swap inline-flex">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
            className="p-1.5 text-[var(--global-text-color)] hover:text-[var(--global-theme-color)]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Thin 1px scroll progress bar matching Peter Holderrieth's al-folio progress bar */}
      <div
        aria-hidden="true"
        className="h-[1.5px] bg-transparent w-full overflow-hidden"
      >
        <div
          className="h-full bg-[var(--global-theme-color)] transition-[width] duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-[var(--global-divider-color)] bg-[var(--global-bg-color)] px-5 py-3 space-y-2"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-1.5 text-sm ${
                item.isMono ? "font-mono text-xs" : ""
              } text-[var(--global-text-color)] hover:text-[var(--global-theme-color)]`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
