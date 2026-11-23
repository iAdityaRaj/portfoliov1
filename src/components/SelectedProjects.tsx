"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Code2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  portfolioConfig,
  type ProjectCategory,
  type ProjectItem,
} from "@/data/portfolio";
import { ProjectArchitectureDiagram } from "@/components/ProjectArchitectureDiagram";

const FILTER_CATEGORIES: ProjectCategory[] = [
  "All",
  "AI/ML",
  "Systems",
  "Backend",
  "Full Stack",
];

interface SelectedProjectsProps {
  externalSelectedSlug?: string | null;
  onClearExternalSlug?: () => void;
}

export function SelectedProjects({
  externalSelectedSlug,
  onClearExternalSlug,
}: SelectedProjectsProps) {
  const { projects } = portfolioConfig;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    projects[0]?.slug ?? null
  );

  useEffect(() => {
    if (externalSelectedSlug) {
      setActiveCategory("All");
      setExpandedSlug(externalSelectedSlug);
      const target = document.getElementById(`project-${externalSelectedSlug}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (onClearExternalSlug) {
        onClearExternalSlug();
      }
    }
  }, [externalSelectedSlug, onClearExternalSlug]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) =>
          (p.filterTags as ProjectCategory[]).includes(activeCategory)
        );

  const toggleProject = (project: ProjectItem) => {
    setExpandedSlug((prev) => (prev === project.slug ? null : project.slug));
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="projects-heading" className="section-rail-label">
          Selected Projects
        </h2>
      </div>

      <div>
        {/* Editorial filter bar */}
        <div
          role="tablist"
          aria-label="Filter projects by engineering domain"
          className="flex flex-wrap items-center gap-1.5 mb-5"
        >
          {FILTER_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(category)}
                className={`font-mono text-[12px] px-2.5 py-1 rounded border transition-colors ${
                  active
                    ? "bg-[var(--global-theme-color)] text-white border-[var(--global-theme-color)]"
                    : "bg-transparent text-[var(--global-text-color-secondary)] border-[var(--global-divider-strong)] hover:border-[var(--global-theme-color)] hover:text-[var(--global-theme-color)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Clean editorial project rows with architecture diagrams */}
        <div className="divide-y divide-[var(--global-divider-color)] border-t border-b border-[var(--global-divider-color)]">
          {filteredProjects.map((project) => {
            const isOpen = expandedSlug === project.slug;
            const detailId = `project-detail-${project.slug}`;

            return (
              <article
                key={project.slug}
                id={`project-${project.slug}`}
                className="py-5 first:pt-4 last:pb-4"
              >
                {/* Metadata row */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] font-mono text-[var(--global-text-color-light)]">
                  <span>{project.categoryLabels.join(" · ")}</span>
                  <span>{project.year}</span>
                </div>

                {/* Title & External links */}
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-[18px] sm:text-[19px] font-medium text-[var(--global-text-color)]">
                    <button
                      type="button"
                      onClick={() => toggleProject(project)}
                      aria-expanded={isOpen}
                      aria-controls={detailId}
                      className="text-left hover:text-[var(--global-theme-color)] transition-colors"
                    >
                      {project.title}
                    </button>
                  </h3>

                  <div className="flex items-center gap-3 text-[13px]">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[12px] px-2 py-0.5 rounded border border-[var(--global-divider-strong)] text-[var(--global-text-color)] hover:border-[var(--global-theme-color)] hover:text-[var(--global-theme-color)] transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}

                    {project.colabUrl && (
                      <a
                        href={project.colabUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[12px] px-2 py-0.5 rounded border border-[var(--global-divider-strong)] text-[var(--global-text-color)] hover:border-[var(--global-theme-color)] hover:text-[var(--global-theme-color)] transition-colors"
                      >
                        <Sparkles className="w-3 h-3" aria-hidden="true" />
                        <span>Colab Demo</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-2 text-[15px] leading-[1.62] text-[var(--global-text-color-secondary)]">
                  {project.summary}
                </p>

                {/* System Architecture Diagram rendered from GitHub repo design */}
                {project.screenshots?.length ? (
                  <div className="mt-3.5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] items-center">
                    <ProjectArchitectureDiagram diagramId={project.diagramId} compact />
                    <figure className="mx-auto">
                      <div className="flex justify-center gap-2.5">
                        {project.screenshots.map((shot) => (
                          <img
                            key={shot.src}
                            src={shot.src}
                            alt={shot.alt}
                            loading="lazy"
                            className="w-[120px] h-auto rounded-[16px] border border-[var(--global-divider-color)] shadow-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-md"
                          />
                        ))}
                      </div>
                      <figcaption className="mt-1.5 text-center font-mono text-[10.5px] text-[var(--global-text-color-light)]">
                        App screenshots
                      </figcaption>
                    </figure>
                  </div>
                ) : (
                  <div className="mt-3.5">
                    <ProjectArchitectureDiagram diagramId={project.diagramId} compact />
                  </div>
                )}

                {/* Tech metadata & Case study toggle */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11.5px] px-2 py-0.5 rounded bg-[var(--global-code-bg-color)] text-[var(--global-theme-color)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleProject(project)}
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    className="inline-flex items-center gap-1 font-mono text-[12px] text-[var(--global-theme-color)] hover:underline"
                  >
                    <span>{isOpen ? "Hide engineering notes" : "Read case study"}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Engineering Case Study */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={detailId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-dashed border-[var(--global-divider-strong)] space-y-4 text-[14.5px] leading-[1.6]">
                        <div>
                          <h4 className="font-mono text-[11.5px] uppercase tracking-wider text-[var(--global-text-color-light)] mb-1">
                            Problem Statement
                          </h4>
                          <p className="text-[var(--global-text-color)]">
                            {project.problemStatement}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-mono text-[11.5px] uppercase tracking-wider text-[var(--global-text-color-light)] mb-1.5">
                              Technical Decisions
                            </h4>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--global-text-color-secondary)]">
                              {project.technicalDecisions.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-mono text-[11.5px] uppercase tracking-wider text-[var(--global-text-color-light)] mb-1.5">
                              Implementation Details
                            </h4>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--global-text-color-secondary)]">
                              {project.implementationDetails.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-mono text-[11.5px] uppercase tracking-wider text-[var(--global-text-color-light)] mb-1.5">
                              Challenges &amp; Lessons
                            </h4>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--global-text-color-secondary)]">
                              {project.challengesAndLessons.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-mono text-[11.5px] uppercase tracking-wider text-[var(--global-text-color-light)] mb-1.5">
                              Verified Outcomes
                            </h4>
                            <ul className="list-disc pl-4 space-y-1 text-[var(--global-text-color)]">
                              {project.verifiedResults.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {project.demoNote && (
                          <p className="text-[12.5px] font-mono text-[var(--global-text-color-light)]">
                            Deployment note: {project.demoNote}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
