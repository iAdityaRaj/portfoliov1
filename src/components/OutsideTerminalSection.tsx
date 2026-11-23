import React from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioConfig } from "@/data/portfolio";

export function OutsideTerminalSection() {
  const { outsideTerminal, links } = portfolioConfig;

  return (
    <section
      id="outside-the-terminal"
      aria-labelledby="outside-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="outside-heading" className="section-rail-label">
          {outsideTerminal.title}
        </h2>
      </div>

      <div>
        <p className="text-[15px] leading-[1.65] text-[var(--global-text-color-secondary)]">
          {outsideTerminal.intro}
        </p>

        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
          {outsideTerminal.items.map((item) => (
            <div
              key={item.id}
              className="pl-3 border-l-2 border-[var(--global-divider-strong)]"
            >
              <dt className="text-[14px] font-medium text-[var(--global-text-color)]">
                {item.label}
              </dt>
              <dd className="mt-0.5 text-[13.5px] leading-[1.52] text-[var(--global-text-color-light)]">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 pt-3.5 border-t border-[var(--global-divider-color)] flex items-center text-[13.5px]">
          <div className="inline-flex items-center gap-1.5 text-[13px] text-[var(--global-text-color-secondary)]">
            <span>Connect on Instagram:</span>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 dashed-link font-mono text-[12px]"
            >
              <span>{links.instagramHandle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--global-theme-color)]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
