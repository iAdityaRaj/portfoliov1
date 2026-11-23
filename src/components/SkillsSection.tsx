import React from "react";
import { portfolioConfig } from "@/data/portfolio";

export function SkillsSection() {
  const { skills } = portfolioConfig;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="skills-heading" className="section-rail-label">
          Technical Stack
        </h2>
      </div>

      {/* Modelled directly after Peter Holderrieth's .research-stack / .stack-group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {skills.map((group) => (
          <div key={group.id}>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.05em] text-[var(--global-text-color)] mb-1.5">
              {group.category}
            </h3>
            <p className="text-[14.5px] leading-[1.6] text-[var(--global-text-color-secondary)]">
              {group.items.map((item, idx) => (
                <React.Fragment key={item}>
                  <span>{item}</span>
                  {idx < group.items.length - 1 && (
                    <span className="text-[var(--global-text-color-light)]"> · </span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
