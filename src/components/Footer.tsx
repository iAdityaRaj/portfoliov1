import React from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioConfig } from "@/data/portfolio";

export function Footer() {
  const { identity, links } = portfolioConfig;

  return (
    <footer
      id="contact"
      className="mt-8 pt-8 pb-12 border-t border-[var(--global-divider-color)]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-[16px] font-medium text-[var(--global-text-color)]">
            Get in touch
          </h2>
          <p className="mt-1 text-[14px] text-[var(--global-text-color-light)]">
            Open to discussions on AI systems, semantic retrieval, LLM infrastructure, and backend engineering.
          </p>
        </div>

        <a
          href={`mailto:${links.email}`}
          className="inline-flex items-center gap-1.5 font-mono text-[13px] px-3 py-1.5 rounded border border-[var(--global-theme-color)] text-[var(--global-theme-color)] hover:bg-[var(--global-theme-color)] hover:text-white transition-colors self-start sm:self-auto"
        >
          <span>{links.email}</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-6 pt-5 border-t border-[var(--global-divider-color)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12.5px] text-[var(--global-text-color-light)]">
        <div>
          © {new Date().getFullYear()} {identity.name}. Built with Next.js &amp; TypeScript.
        </div>

        <div className="flex flex-wrap items-center gap-4 font-mono text-[12px]">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--global-theme-color)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--global-theme-color)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--global-theme-color)] transition-colors"
          >
            LeetCode
          </a>
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--global-theme-color)] transition-colors"
          >
            Instagram ({links.instagramHandle})
          </a>
          <a
            href={links.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--global-theme-color)] transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
