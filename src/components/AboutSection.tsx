import React from "react";
import { portfolioConfig } from "@/data/portfolio";

export function AboutSection() {
  const { about, identity } = portfolioConfig;

  return (
    <section id="about" aria-labelledby="about-heading" className="editorial-section">
      <div className="section-rail">
        <h2 id="about-heading" className="section-rail-label">
          About
        </h2>
      </div>

      <div className="space-y-3.5 text-[15.5px] leading-[1.68]">
        {about.paragraphs.map((paragraph, idx) => (
          <p key={idx} className="text-[var(--global-text-color)]">
            {paragraph}
          </p>
        ))}

        <p className="text-[var(--global-text-color)]">{about.interestsIntro}</p>
        <ul className="space-y-1.5 pl-1">
          {about.interests.map((interest) => (
            <li key={interest.label} className="flex gap-2">
              <span className="text-[var(--global-theme-color)]" aria-hidden="true">
                ▸
              </span>
              <span className="text-[var(--global-text-color-secondary)]">
                <strong className="font-medium text-[var(--global-text-color)]">
                  {interest.label}:
                </strong>{" "}
                {interest.items}
              </span>
            </li>
          ))}
        </ul>

        {about.closingParagraphs.map((paragraph, idx) => (
          <p key={`closing-${idx}`} className="text-[var(--global-text-color)]">
            {paragraph}
          </p>
        ))}

        {/* Subtle systemctl-inspired current status block referencing msingh9365 while keeping Holderrieth's editorial restraint */}
        <div className="mt-5 pt-4 border-t border-[var(--global-divider-color)]">
          <div className="text-[11.5px] font-mono uppercase tracking-wider text-[var(--global-text-color-light)] mb-2.5">
            Current Focus
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-[95px_1fr] gap-y-2 gap-x-4 text-[14px]">
            {identity.currentFocus.map((item) => (
              <React.Fragment key={item.key}>
                <dt className="font-mono text-[12.5px] text-[var(--global-theme-color)] flex items-center gap-1.5">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--coding-green)]"
                    aria-hidden="true"
                  />
                  {item.key}
                </dt>
                <dd className="text-[var(--global-text-color-secondary)]">{item.text}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
