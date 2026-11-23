"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Mail, Terminal } from "lucide-react";
import { portfolioConfig } from "@/data/portfolio";

const ROLES = ["AI Engineer", "Software Engineer", "Backend Engineer", "LLM Systems Builder"];

function RoleTypewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState(ROLES[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = ROLES[roleIdx];
    let delay = deleting ? 45 : 85;
    if (!deleting && text === full) delay = 1900;
    if (deleting && text === "") delay = 300;

    const timer = window.setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, roleIdx]);

  return (
    <span className="font-mono not-italic text-[var(--global-theme-color)]" aria-hidden="true">
      {text}
      <span className="type-cursor">▍</span>
    </span>
  );
}

export function Hero() {
  const { identity, links } = portfolioConfig;

  const externalLinks = [
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
    { label: "LeetCode", href: links.leetcode },
  ];

  return (
    <section id="top" className="pt-10 pb-8 sm:pt-14 sm:pb-10">
      <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-10">
        <div className="flex-1 min-w-0 hero-stagger">
          {/* Subtle live engineering status line */}
          <div className="inline-flex items-center gap-2 text-[12px] font-mono text-[var(--global-text-color-light)] mb-3">
            <span className="relative inline-flex w-2 h-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--coding-green)] opacity-60 animate-ping" />
              <span className="relative inline-block w-2 h-2 rounded-full bg-[var(--coding-green)]" />
            </span>
            <span>SWE &amp; AI Intern @ Intel · M.Tech AI @ IIT Ropar</span>
          </div>

          {/* Exact reference h1 scale: 40px weight 300 */}
          <h1 className="text-[34px] sm:text-[42px] font-light tracking-tight leading-[1.15] text-[var(--global-text-color)]">
            <span className="font-medium">Aditya</span> Raj
          </h1>

          <p className="mt-1.5 min-h-[1.6em] text-[16px] sm:text-[17px] italic font-light text-[var(--global-text-color-secondary)]">
            <span className="sr-only">{identity.headline}</span>
            <RoleTypewriter />
          </p>

          <p className="mt-5 text-[16px] leading-[1.68] text-[var(--global-text-color)] max-w-[64ch]">
            {identity.heroQuote}
          </p>

          <p className="mt-3 text-[15px] leading-[1.65] text-[var(--global-text-color-light)] max-w-[64ch]">
            {identity.introParagraph}
          </p>

          {/* Compact editorial external links */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[14px]">
            {externalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 dashed-link font-normal"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--global-theme-color)]" aria-hidden="true" />
              </a>
            ))}

            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-1.5 dashed-link font-normal"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--global-theme-color)]" aria-hidden="true" />
              <span>{links.email}</span>
            </a>

            <a
              href={links.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 dashed-link font-normal"
              title="Place your latest PDF at public/resume.pdf"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--global-theme-color)]" aria-hidden="true" />
              <span>Resume (PDF)</span>
            </a>

            <a
              href="#terminal"
              className="inline-flex items-center gap-1.5 font-mono text-[12.5px] px-2.5 py-1 rounded border border-[var(--global-divider-strong)] bg-[var(--term-bg)] text-[var(--global-text-color)] hover:border-[var(--global-theme-color)] hover:text-[var(--global-theme-color)] transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--global-theme-color)]" aria-hidden="true" />
              <span>$ ./cli</span>
            </a>
          </div>
        </div>

        {/* Restrained academic right-hand affiliation card with real logos */}
        <aside
          aria-label="Current affiliations"
          className="hero-aside w-full sm:w-[215px] shrink-0 rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] p-3.5"
        >
          <div className="flex sm:flex-col items-center sm:items-start gap-3.5">
            <img
              src={identity.avatarUrl}
              alt="Portrait of Aditya Raj"
              width={88}
              height={88}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover border border-[var(--global-divider-color)] transition-transform duration-300 hover:scale-[1.04]"
            />
            <div className="font-mono text-[11.5px] leading-[1.5] text-[var(--global-text-color-light)] space-y-1">
              <p className="text-[var(--global-text-color)] font-medium">Affiliation</p>
              <p>Joint Master&apos;s Thesis @ Intel</p>
              <p>M.Tech AI @ IIT Ropar</p>
              <p>ex-@ Accenture</p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[var(--global-divider-color)] grid grid-cols-3 gap-2 items-center logo-strip">
            <div
              className="h-9 rounded bg-white border border-black/10 px-1.5 py-1 flex items-center justify-center"
              title="Intel Corporation"
            >
              <img
                src="/logos/intel.svg"
                alt="Intel Corporation"
                className="max-h-4 w-auto object-contain"
              />
            </div>
            <div
              className="h-9 rounded bg-white border border-black/10 px-1 py-0.5 flex items-center justify-center"
              title="IIT Ropar"
            >
              <img
                src="/logos/iitropar.png"
                alt="IIT Ropar"
                className="max-h-7 w-auto object-contain"
              />
            </div>
            <div
              className="h-9 rounded bg-white border border-black/10 px-1.5 py-1 flex items-center justify-center"
              title="Accenture"
            >
              <img
                src="/logos/accenture.svg"
                alt="Accenture"
                className="max-h-4 w-auto object-contain"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
