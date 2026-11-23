import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-roboto-slab)", "Roboto Slab", "Georgia", "serif"],
        mono: ["var(--font-ibm-mono)", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: "var(--global-bg-color)",
        surface: "var(--global-card-bg-color)",
        codebg: "var(--global-code-bg-color)",
        ink: "var(--global-text-color)",
        muted: "var(--global-text-color-light)",
        accent: "var(--global-theme-color)",
        divider: "var(--global-divider-color)",
        "lc-0": "var(--lc-level-0)",
        "lc-1": "var(--lc-level-1)",
        "lc-2": "var(--lc-level-2)",
        "lc-3": "var(--lc-level-3)",
        "lc-4": "var(--lc-level-4)",
      },
      maxWidth: {
        editorial: "840px",
      },
    },
  },
  plugins: [],
};

export default config;
