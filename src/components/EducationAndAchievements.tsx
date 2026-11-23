import React from "react";
import { portfolioConfig } from "@/data/portfolio";

export function EducationAndAchievements() {
  const { education, achievements } = portfolioConfig;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="education-heading" className="section-rail-label">
          Education &amp; Highlights
        </h2>
      </div>

      <div className="space-y-6">
        {/* Academic Degrees with Institution Logos */}
        <div className="grid grid-cols-1 gap-3.5">
          {education.map((ed) => (
            <div
              key={ed.id}
              className="hover-lift p-4 rounded border border-[var(--global-divider-color)] bg-[var(--global-card-bg-color)] flex items-start gap-3.5"
            >
              <div className="w-12 h-12 rounded bg-white border border-black/10 p-1 shrink-0 flex items-center justify-center">
                <img
                  src={ed.logo}
                  alt={ed.logoAlt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[16px] font-medium text-[var(--global-text-color)]">
                    {ed.degree}
                  </h3>
                  <span className="font-mono text-[12px] text-[var(--global-text-color-light)]">
                    {ed.dates}
                  </span>
                </div>

                <div className="mt-0.5 text-[14.5px] text-[var(--global-text-color-secondary)]">
                  {ed.institution} ·{" "}
                  <span className="text-[var(--global-text-color-light)]">
                    {ed.location}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="stat-highlight font-mono text-[12px]">
                    CGPA: {ed.cgpa}
                  </span>
                </div>

                {ed.highlights && ed.highlights.length > 0 && (
                  <ul className="mt-2 list-disc pl-4 space-y-0.5 text-[13.5px] text-[var(--global-text-color-secondary)]">
                    {ed.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Compact Achievements & Certifications */}
        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.05em] text-[var(--global-text-color)] mb-2.5">
            Achievements &amp; Certifications
          </h3>

          <ul className="divide-y divide-[var(--global-divider-color)] border-t border-b border-[var(--global-divider-color)]">
            {achievements.map((item) => (
              <li key={item.id} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <span className="text-[14.5px] font-medium text-[var(--global-text-color)]">
                    {item.title}
                  </span>
                  <span className="text-[14px] text-[var(--global-text-color-secondary)]">
                    {" "}
                    — {item.detail}
                  </span>
                </div>
                {item.sourceNote && (
                  <span className="font-mono text-[11px] text-[var(--global-text-color-light)] shrink-0">
                    {item.sourceNote}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
