"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { FeaturedCaseStudy } from "@/components/FeaturedCaseStudy";
import { SelectedProjects } from "@/components/SelectedProjects";
import { LeetCodeHeatmap } from "@/components/LeetCodeHeatmap";
import { SkillsSection } from "@/components/SkillsSection";
import { EducationAndAchievements } from "@/components/EducationAndAchievements";
import { OutsideTerminalSection } from "@/components/OutsideTerminalSection";
import { Footer } from "@/components/Footer";
import type { LeetCodeCalendarPayload } from "@/lib/leetcode";

export function PortfolioClientShell({
  initialLeetCode,
}: {
  initialLeetCode: LeetCodeCalendarPayload;
}) {
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section:not(#top)")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    // Only hide sections that start below the fold, so nothing visible flashes on load
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top > window.innerHeight) {
        section.classList.add("reveal");
        observer.observe(section);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="max-w-editorial mx-auto px-5 sm:px-6 pb-8"
      >
        <Hero />
        <AboutSection />
        <ExperienceTimeline />
        <FeaturedCaseStudy />
        <SelectedProjects
          externalSelectedSlug={selectedProjectSlug}
          onClearExternalSlug={() => setSelectedProjectSlug(null)}
        />
        <LeetCodeHeatmap initialData={initialLeetCode} />
        <InteractiveTerminal
          onSelectProjectSlug={(slug) => setSelectedProjectSlug(slug)}
        />
        <SkillsSection />
        <EducationAndAchievements />
        <OutsideTerminalSection />
        <Footer />
      </main>
    </>
  );
}
