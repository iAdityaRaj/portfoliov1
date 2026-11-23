"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, FileText, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolio";

export function FeaturedCaseStudy() {
  const { featuredProject } = portfolioConfig;
  const [activeStageId, setActiveStageId] = useState<string>(featuredProject.stages[2].id);
  const [openSectionId, setOpenSectionId] = useState<string | null>("problem");

  const activeStage =
    featuredProject.stages.find((s) => s.id === activeStageId) || featuredProject.stages[0];

  const statusColor = (status: string) => {
    if (status === "Implemented") {
      return "text-[var(--coding-green)] border-[var(--coding-green)]/40 bg-[var(--coding-green)]/5";
    }
    if (status === "Experimented") {
      return "text-[var(--global-theme-color)] border-[var(--global-theme-color)]/40 bg-[var(--global-code-bg-color)]";
    }
    return "text-[var(--global-text-color-light)] border-[var(--global-divider-strong)] bg-[var(--term-bg)]";
  };

  return (
    <section
      id="featured-project"
      aria-labelledby="featured-project-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="featured-project-heading" className="section-rail-label">
          Master&apos;s Thesis
        </h2>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-wider text-[var(--global-theme-color)]">
            <span>{featuredProject.contextTag}</span>
          </div>

          {featuredProject.paperUrl && (
            <a
              href={featuredProject.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] px-2.5 py-1 rounded border border-[var(--global-theme-color)] text-[var(--global-theme-color)] hover:bg-[var(--global-theme-color)] hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Paper / Thesis Report</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </div>

        <h3 className="mt-1.5 text-[23px] sm:text-[26px] font-normal tracking-tight text-[var(--global-text-color)]">
          {featuredProject.title}
        </h3>

        <p className="mt-2 text-[15.5px] leading-[1.65] text-[var(--global-text-color-secondary)]">
          {featuredProject.shortDescription}
        </p>

        {/* Interactive 5-stage pipeline diagram */}
        <div className="mt-5 rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono text-[11.5px] text-[var(--global-text-color-light)]">
              Interactive Retrieval Pipeline — select any stage to inspect mechanics
            </span>
            <span className="font-mono text-[11px] text-[var(--global-text-color-light)]">
              BM25 + SBERT + Expert Fusion
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Defect-to-Test-Case pipeline stages"
            className="grid grid-cols-1 sm:grid-cols-5 gap-2"
          >
            {featuredProject.stages.map((stage, idx) => {
              const selected = stage.id === activeStage.id;
              return (
                <div key={stage.id} className="flex items-stretch gap-1.5">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`stage-detail-${stage.id}`}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`w-full text-left p-2.5 rounded border transition-all ${
                      selected
                        ? "border-[var(--global-theme-color)] bg-[var(--global-card-bg-color)] shadow-sm"
                        : "border-[var(--global-divider-color)] bg-[var(--global-card-bg-color)]/60 hover:border-[var(--global-divider-strong)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[var(--global-theme-color)] font-medium">
                        {stage.step}
                      </span>
                      {idx < featuredProject.stages.length - 1 && (
                        <ArrowRight
                          className="w-3 h-3 text-[var(--global-text-color-light)] hidden sm:inline"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-1 text-[13px] font-medium text-[var(--global-text-color)] leading-tight">
                      {stage.title}
                    </div>
                    <div className="mt-1 text-[11px] text-[var(--global-text-color-light)] leading-snug">
                      {stage.subtitle}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Stage Inspection Panel */}
          <div
            id={`stage-detail-${activeStage.id}`}
            role="tabpanel"
            className="mt-3 pt-3 border-t border-[var(--global-divider-color)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-[14px] font-medium text-[var(--global-text-color)]">
                Stage {activeStage.step}: {activeStage.title}
              </div>
              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded border ${statusColor(
                  activeStage.status
                )}`}
              >
                {activeStage.status}
              </span>
            </div>

            <p className="mt-1.5 text-[14px] leading-[1.6] text-[var(--global-text-color-secondary)]">
              {activeStage.details}
            </p>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {activeStage.techniques.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--global-card-bg-color)] border border-[var(--global-divider-color)] text-[var(--global-text-color-secondary)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Expandable Case-Study Deep Dive Sections */}
        <div className="mt-4 divide-y divide-[var(--global-divider-color)] border-t border-b border-[var(--global-divider-color)]">
          {featuredProject.sections.map((section) => {
            const isOpen = openSectionId === section.id;
            return (
              <div key={section.id}>
                <button
                  type="button"
                  onClick={() => setOpenSectionId(isOpen ? null : section.id)}
                  aria-expanded={isOpen}
                  className="w-full py-3 flex items-center justify-between text-left gap-3 hover:text-[var(--global-theme-color)] transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[15px] font-normal text-[var(--global-text-color)]">
                      {section.title}
                    </span>
                    {section.badge && (
                      <span className="font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-[var(--term-bg)] border border-[var(--global-divider-color)] text-[var(--global-text-color-light)]">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 shrink-0 text-[var(--global-text-color-light)] transition-transform duration-150 ${
                      isOpen ? "rotate-180 text-[var(--global-theme-color)]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.16 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3.5 space-y-2.5 text-[14.5px] leading-[1.62] text-[var(--global-text-color-secondary)]">
                        {section.paragraphs.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-[12px] italic text-[var(--global-text-color-light)]">
          {featuredProject.publicSafetyNote}
        </p>
      </div>
    </section>
  );
}
