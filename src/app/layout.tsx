import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/300-italic.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto-slab/300.css";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/roboto-slab/500.css";
import "@fontsource/roboto-slab/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Aditya Raj | AI Engineer · Software Engineer",
  description:
    "Personal engineering portfolio of Aditya Raj — AI Engineer & Software Engineer working across LLM orchestration, semantic retrieval, MCP tooling, backend infrastructure, and production reliability.",
  keywords: [
    "Aditya Raj",
    "AI Engineer",
    "Software Engineer",
    "IIT Ropar",
    "Intel",
    "Accenture",
    "LLM Orchestration",
    "LangGraph",
    "Semantic Retrieval",
    "FastAPI",
    "Go",
  ],
  authors: [{ name: "Aditya Raj", url: "https://github.com/iAdityaRaj" }],
  openGraph: {
    title: "Aditya Raj — AI Engineer · Software Engineer",
    description:
      "Building intelligent systems and reliable software across LLM orchestration, semantic retrieval, and backend infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Raj — AI Engineer · Software Engineer",
    description:
      "LLM orchestration, semantic retrieval, MCP skills, and reliable backend systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('portfolio-theme');
                if (saved === 'dark' || saved === 'light') {
                  document.documentElement.setAttribute('data-theme', saved);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-[var(--stat-highlight-bg)] selection:text-[var(--global-text-color)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-[var(--global-bg-color)] focus:text-[var(--global-theme-color)] focus:border focus:border-[var(--global-theme-color)] focus:text-sm"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
