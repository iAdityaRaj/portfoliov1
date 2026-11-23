"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolio";

export function ExperienceTimeline() {
  const { experience } = portfolioConfig;
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    intel: true,
    accenture: false,
    "iit-ropar-ta": false,
  });

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allExpanded = experience.every((item) => expandedIds[item.id]);

  const toggleAll = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    experience.forEach((item) => {
      updated[item.id] = nextState;
    });
    setExpandedIds(updated);
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="experience-heading" className="section-rail-label">
          Experience
        </h2>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] text-[var(--global-text-color-light)]">
            Select an entry to inspect engineering contributions and stack.
          </p>
          <button
            type="button"
            onClick={toggleAll}
            className="text-[12px] font-mono text-[var(--global-theme-color)] hover:underline shrink-0 ml-3"
          >
            {allExpanded ? "[collapse all]" : "[expand all]"}
          </button>
        </div>

        {/* Clean vertical timeline with thin line and restrained markers */}
        <ol className="relative border-l border-[var(--global-divider-strong)] ml-3 space-y-6">
          {experience.map((item) => {
            const isOpen = !!expandedIds[item.id];
            const panelId = `exp-panel-${item.id}`;

            return (
              <li key={item.id} className="pl-6 relative">
                {/* Timeline marker */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5.5px] top-2 w-[10px] h-[10px] rounded-full border transition-colors ${
                    item.current
                      ? "marker-pulse bg-[var(--global-theme-color)] border-[var(--global-theme-color)]"
                      : "bg-[var(--global-bg-color)] border-[var(--global-muted-raw)]"
                  }`}
                />

                <div className="hover-lift rounded border border-[var(--global-divider-color)] bg-[var(--global-card-bg-color)] transition-colors hover:border-[var(--global-divider-strong)]">
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left p-4 flex items-start gap-3.5 justify-between"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded bg-white border border-black/10 p-1.5 shrink-0 flex items-center justify-center">
                        <img
                          src={item.logo}
                          alt={item.logoAlt}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <h3 className="text-[16px] font-medium text-[var(--global-text-color)] leading-snug">
                            {item.role}
                          </h3>
                          {item.current && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--stat-highlight-bg)] text-[var(--global-theme-color)]">
                              active
                            </span>
                          )}
                        </div>

                        <div className="mt-0.5 text-[14px] text-[var(--global-text-color-secondary)] font-normal">
                          {item.organization} ·{" "}
                          <span className="text-[var(--global-text-color-light)] font-light">
                            {item.location}
                          </span>
                        </div>

                        <div className="mt-1 font-mono text-[12px] text-[var(--global-text-color-light)]">
                          {item.dates}
                        </div>

                        <p className="mt-2 text-[14.5px] leading-[1.58] text-[var(--global-text-color-secondary)]">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      aria-hidden="true"
                      className={`w-4 h-4 mt-1 shrink-0 text-[var(--global-text-color-light)] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--global-theme-color)]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-2 border-t border-[var(--global-divider-color)] ml-0 sm:ml-[58px]">
                          <ul className="list-disc pl-4 space-y-1.5 text-[14.5px] leading-[1.6] text-[var(--global-text-color)]">
                            {item.contributions.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>

                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="font-mono text-[11.5px] px-2 py-0.5 rounded bg-[var(--global-code-bg-color)] text-[var(--global-theme-color)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
