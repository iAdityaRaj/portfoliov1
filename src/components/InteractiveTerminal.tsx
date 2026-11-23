"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioConfig } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";

interface TerminalEntry {
  id: number;
  cwd: string;
  command: string;
  output: React.ReactNode;
}

const BASE_COMMANDS = [
  "help",
  "whoami",
  "pwd",
  "ls",
  "cd",
  "cat",
  "open",
  "grep",
  "uname",
  "skills",
  "experience",
  "education",
  "achievements",
  "hobbies",
  "status",
  "contact",
  "resume",
  "theme",
  "clear",
];

interface InteractiveTerminalProps {
  onSelectProjectSlug?: (slug: string) => void;
}

export function InteractiveTerminal({
  onSelectProjectSlug,
}: InteractiveTerminalProps) {
  const { setTheme, theme } = useTheme();
  const [cwd, setCwd] = useState<string>("~");
  const [input, setInput] = useState<string>("");
  const [cmdHistory, setCmdHistory] = useState<string[]>(["whoami"]);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const renderWhoami = () => (
    <dl className="grid grid-cols-[95px_1fr] gap-y-1 gap-x-3 text-[12.5px]">
      <dt className="text-[var(--global-text-color-light)]">name</dt>
      <dd className="text-[var(--global-text-color)] font-medium">
        {portfolioConfig.identity.name}
      </dd>
      <dt className="text-[var(--global-text-color-light)]">role</dt>
      <dd className="text-[var(--global-text-color)]">
        SWE &amp; AI Intern @ Intel Corporation
      </dd>
      <dt className="text-[var(--global-text-color-light)]">degree</dt>
      <dd className="text-[var(--global-text-color)]">
        M.Tech in Artificial Intelligence, IIT Ropar (2025–2027)
      </dd>
      <dt className="text-[var(--global-text-color-light)]">focus</dt>
      <dd className="text-[var(--global-text-color)]">
        LLM orchestration, ML &amp; multimodal machine learning pipelines, semantic retrieval, MCP skills, reliable backend systems
      </dd>
      <dt className="text-[var(--global-text-color-light)]">off-duty</dt>
      <dd className="text-[var(--global-text-color-secondary)]">
        Hybrid athlete · 100 kg bench press PR · MMA &amp; kickboxing · COD Mobile when AFK
      </dd>
    </dl>
  );

  const [entries, setEntries] = useState<TerminalEntry[]>(() => [
    {
      id: 1,
      cwd: "~",
      command: "whoami",
      output: renderWhoami(),
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const virtualFiles: Record<string, string[]> = {
    "~": [
      "about.md",
      "experience.log",
      "skills.txt",
      "education.txt",
      "hobbies.txt",
      "contact.txt",
      "projects/",
    ],
    "~/projects": [
      "defect-tcd.md",
      ...portfolioConfig.projects.map((p) => `${p.cliAlias}.md`),
    ],
  };

  const resolveProject = (query: string) => {
    const q = query.replace(/\.md$/i, "").toLowerCase();
    return portfolioConfig.projects.find(
      (p) =>
        p.cliAlias.toLowerCase() === q ||
        p.slug.toLowerCase().includes(q) ||
        p.shortTitle.toLowerCase().includes(q)
    );
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryCursor(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(" ");

    if (cmd === "clear") {
      setEntries([]);
      return;
    }

    let output: React.ReactNode = null;
    let nextCwd = cwd;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-[12.5px]">
            <div className="grid grid-cols-1 sm:grid-cols-[175px_1fr] gap-y-1 gap-x-3">
              <span className="text-[var(--global-theme-color)]">whoami</span>
              <span className="text-[var(--global-text-color-secondary)]">
                concise engineering profile
              </span>
              <span className="text-[var(--global-theme-color)]">ls [projects]</span>
              <span className="text-[var(--global-text-color-secondary)]">
                list directory contents or engineering projects
              </span>
              <span className="text-[var(--global-theme-color)]">cd &lt;dir&gt; / pwd</span>
              <span className="text-[var(--global-text-color-secondary)]">
                navigate virtual filesystem (~, ~/projects)
              </span>
              <span className="text-[var(--global-theme-color)]">cat &lt;file|project&gt;</span>
              <span className="text-[var(--global-text-color-secondary)]">
                inspect file or project (e.g. cat samwise, cat golambda, cat hobbies.txt)
              </span>
              <span className="text-[var(--global-theme-color)]">open &lt;project|section&gt;</span>
              <span className="text-[var(--global-text-color-secondary)]">
                jump to &amp; expand project case study or section
              </span>
              <span className="text-[var(--global-theme-color)]">grep &lt;keyword&gt;</span>
              <span className="text-[var(--global-text-color-secondary)]">
                search across experience, projects, and skills
              </span>
              <span className="text-[var(--global-theme-color)]">
                skills | experience | status
              </span>
              <span className="text-[var(--global-text-color-secondary)]">
                print structured engineering summaries
              </span>
              <span className="text-[var(--global-theme-color)]">
                education | hobbies | contact
              </span>
              <span className="text-[var(--global-text-color-secondary)]">
                academic degrees, training &amp; off-duty notes, social links
              </span>
              <span className="text-[var(--global-theme-color)]">
                uname -a | theme [light|dark] | clear
              </span>
              <span className="text-[var(--global-text-color-secondary)]">
                system info, switch colour mode, or clear buffer
              </span>
            </div>
            <div className="text-[11.5px] text-[var(--global-text-color-light)] pt-1">
              tip: Tab autocompletes commands &amp; filenames · ↑ / ↓ cycle history
            </div>
          </div>
        );
        break;

      case "whoami":
        output = renderWhoami();
        break;

      case "pwd":
        output = (
          <span>
            {cwd === "~" ? "/home/aditya" : "/home/aditya/projects"}
          </span>
        );
        break;

      case "uname":
        output = (
          <span>
            Linux portfolio-node 6.8.0-ai-systems #1 SMP PREEMPT_DYNAMIC x86_64
            (LangGraph/Go/PyTorch) GNU/Linux
          </span>
        );
        break;

      case "ls": {
        const target = argStr.replace(/^-+a?l?\s*/, "").trim();
        if (
          target === "projects" ||
          target === "projects/" ||
          target === "~/projects" ||
          (target === "" && cwd === "~/projects")
        ) {
          output = (
            <div className="space-y-1">
              <div>
                <span className="text-[var(--global-theme-color)] font-medium">
                  defect-tcd.md
                </span>{" "}
                <span className="text-[var(--global-text-color-light)]">
                  — Joint Master&apos;s Thesis @ Intel: Defect-to-Test-Case Recommendation
                </span>
              </div>
              {portfolioConfig.projects.map((p) => (
                <div key={p.slug}>
                  <span className="text-[var(--global-theme-color)] font-medium">
                    {p.cliAlias}.md
                  </span>{" "}
                  <span className="text-[var(--global-text-color-light)]">
                    — {p.title} [{p.categoryLabels[0]}]
                  </span>
                </div>
              ))}
            </div>
          );
        } else {
          const items = virtualFiles[cwd] || virtualFiles["~"];
          output = (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {items.map((f) => (
                <span
                  key={f}
                  className={
                    f.endsWith("/")
                      ? "text-[var(--global-theme-color)] font-medium"
                      : "text-[var(--global-text-color)]"
                  }
                >
                  {f}
                </span>
              ))}
            </div>
          );
        }
        break;
      }

      case "cd": {
        if (!argStr || argStr === "~" || argStr === "/home/aditya") {
          nextCwd = "~";
          setCwd("~");
          output = null;
        } else if (argStr === ".." && cwd === "~/projects") {
          nextCwd = "~";
          setCwd("~");
          output = null;
        } else if (
          argStr === "projects" ||
          argStr === "projects/" ||
          argStr === "~/projects"
        ) {
          nextCwd = "~/projects";
          setCwd("~/projects");
          output = null;
        } else {
          output = (
            <span className="text-[var(--global-text-color-light)]">
              cd: no such directory: {argStr} (available: ~, ~/projects)
            </span>
          );
        }
        break;
      }

      case "cat": {
        const target = argStr.toLowerCase();
        if (!target) {
          output = (
            <span className="text-[var(--global-text-color-light)]">
              usage: cat &lt;filename | project-alias&gt; (try: cat samwise, cat golambda, cat skills.txt)
            </span>
          );
          break;
        }

        if (target.includes("about")) {
          output = (
            <div className="space-y-1.5">
              {portfolioConfig.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p>{portfolioConfig.about.interestsIntro}</p>
              {portfolioConfig.about.interests.map((i) => (
                <p key={i.label} className="pl-2">
                  <span className="text-[var(--global-theme-color)]">- {i.label}:</span> {i.items}
                </p>
              ))}
              {portfolioConfig.about.closingParagraphs.map((p, idx) => (
                <p key={`closing-${idx}`}>{p}</p>
              ))}
            </div>
          );
          break;
        }

        if (target.includes("skill")) {
          output = (
            <div className="space-y-1">
              {portfolioConfig.skills.map((g) => (
                <div key={g.id}>
                  <span className="text-[var(--global-theme-color)] font-medium">
                    [{g.category}]
                  </span>{" "}
                  <span>{g.items.join(", ")}</span>
                </div>
              ))}
            </div>
          );
          break;
        }

        if (target.includes("exp")) {
          output = (
            <div className="space-y-1.5">
              {portfolioConfig.experience.map((e) => (
                <div key={e.id}>
                  <span className="text-[var(--global-theme-color)] font-medium">
                    {e.organization}
                  </span>{" "}
                  — {e.role} ({e.dates})
                </div>
              ))}
            </div>
          );
          break;
        }

        if (target.includes("edu")) {
          output = (
            <div className="space-y-1">
              {portfolioConfig.education.map((ed) => (
                <div key={ed.id}>
                  <span className="text-[var(--global-theme-color)] font-medium">
                    {ed.degree}
                  </span>{" "}
                  — {ed.institution} ({ed.dates}) · CGPA: {ed.cgpa}
                </div>
              ))}
            </div>
          );
          break;
        }

        if (target.includes("hobb") || target.includes("outside")) {
          output = (
            <div className="space-y-1">
              {portfolioConfig.outsideTerminal.items.map((h) => (
                <div key={h.id}>
                  <span className="text-[var(--global-theme-color)]">• {h.label}:</span>{" "}
                  <span>{h.detail}</span>
                </div>
              ))}
            </div>
          );
          break;
        }

        if (target.includes("contact")) {
          output = (
            <div className="space-y-1">
              <div>email: {portfolioConfig.links.email}</div>
              <div>github: {portfolioConfig.links.github}</div>
              <div>linkedin: {portfolioConfig.links.linkedin}</div>
              <div>leetcode: {portfolioConfig.links.leetcode}</div>
              <div>instagram: {portfolioConfig.links.instagram} ({portfolioConfig.links.instagramHandle})</div>
            </div>
          );
          break;
        }

        if (target.includes("defect") || target.includes("thesis")) {
          output = (
            <div className="space-y-1">
              <div className="font-medium text-[var(--global-theme-color)]">
                {portfolioConfig.featuredProject.title} — {portfolioConfig.featuredProject.contextTag}
              </div>
              <p>{portfolioConfig.featuredProject.shortDescription}</p>
              <div className="text-[var(--global-text-color-light)]">
                stack: {portfolioConfig.featuredProject.technologies.join(", ")}
              </div>
              {portfolioConfig.featuredProject.paperUrl && (
                <div>
                  paper:{" "}
                  <a
                    href={portfolioConfig.featuredProject.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[var(--global-theme-color)]"
                  >
                    {portfolioConfig.featuredProject.paperUrl}
                  </a>
                </div>
              )}
            </div>
          );
          break;
        }

        const matchedProj = resolveProject(target);
        if (matchedProj) {
          output = (
            <div className="space-y-1">
              <div className="font-medium text-[var(--global-theme-color)]">
                {matchedProj.title} ({matchedProj.year})
              </div>
              <p>{matchedProj.summary}</p>
              <div className="text-[var(--global-text-color-light)]">
                stack: {matchedProj.technologies.join(", ")}
              </div>
              {matchedProj.githubUrl && (
                <div>
                  repo:{" "}
                  <a
                    href={matchedProj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[var(--global-theme-color)]"
                  >
                    {matchedProj.githubUrl}
                  </a>
                </div>
              )}
            </div>
          );
        } else {
          output = (
            <span className="text-[var(--global-text-color-light)]">
              cat: {argStr}: No such file or project. Try `ls` or `ls projects`.
            </span>
          );
        }
        break;
      }

      case "open": {
        const q = argStr.toLowerCase();
        if (!q) {
          output = (
            <span className="text-[var(--global-text-color-light)]">
              usage: open &lt;samwise | habitat | golambda | uniswap | defect | github | linkedin | leetcode&gt;
            </span>
          );
          break;
        }

        if (q === "github") {
          window.open(portfolioConfig.links.github, "_blank", "noopener,noreferrer");
          output = <span>Opening GitHub profile in a new tab...</span>;
          break;
        }
        if (q === "linkedin") {
          window.open(portfolioConfig.links.linkedin, "_blank", "noopener,noreferrer");
          output = <span>Opening LinkedIn profile in a new tab...</span>;
          break;
        }
        if (q === "leetcode") {
          document.getElementById("leetcode")?.scrollIntoView({ behavior: "smooth" });
          output = <span>Scrolled to LeetCode contribution calendar.</span>;
          break;
        }
        if (q === "paper" && portfolioConfig.featuredProject.paperUrl) {
          window.open(
            portfolioConfig.featuredProject.paperUrl,
            "_blank",
            "noopener,noreferrer"
          );
          output = <span>Opening Joint Master&apos;s Thesis paper in a new tab...</span>;
          break;
        }
        if (q.includes("defect") || q.includes("case") || q.includes("thesis")) {
          document
            .getElementById("featured-project")
            ?.scrollIntoView({ behavior: "smooth" });
          output = (
            <span>
              Scrolled to Joint Master&apos;s Thesis at Intel (Defect-to-Test-Case Recommendation).
            </span>
          );
          break;
        }

        const proj = resolveProject(q);
        if (proj) {
          onSelectProjectSlug?.(proj.slug);
          output = (
            <span>
              Expanded project case study: <strong>{proj.title}</strong>
            </span>
          );
        } else {
          const sectionEl = document.getElementById(q);
          if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: "smooth" });
            output = <span>Navigated to #{q}.</span>;
          } else {
            output = (
              <span className="text-[var(--global-text-color-light)]">
                open: could not match &apos;{argStr}&apos;. Try `open samwise` or `open golambda`.
              </span>
            );
          }
        }
        break;
      }

      case "skills":
        output = (
          <div className="space-y-1">
            {portfolioConfig.skills.map((g) => (
              <div key={g.id}>
                <span className="text-[var(--global-theme-color)] font-medium">
                  {g.category}:
                </span>{" "}
                <span>{g.items.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-1.5">
            {portfolioConfig.experience.map((e) => (
              <div key={e.id}>
                <span className="text-[var(--global-theme-color)] font-medium">
                  {e.role}
                </span>{" "}
                @ {e.organization} ·{" "}
                <span className="text-[var(--global-text-color-light)]">
                  {e.dates}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-1">
            {portfolioConfig.education.map((ed) => (
              <div key={ed.id}>
                <span className="text-[var(--global-theme-color)] font-medium">
                  {ed.degree}
                </span>{" "}
                — {ed.institution} ({ed.dates}) · CGPA {ed.cgpa}
              </div>
            ))}
          </div>
        );
        break;

      case "achievements":
      case "awards":
        output = (
          <div className="space-y-1">
            {portfolioConfig.achievements.map((a) => (
              <div key={a.id}>
                • <span className="font-medium">{a.title}</span> — {a.detail}
              </div>
            ))}
          </div>
        );
        break;

      case "hobbies":
        output = (
          <div className="space-y-1">
            {portfolioConfig.outsideTerminal.items.map((h) => (
              <div key={h.id}>
                •{" "}
                <span className="text-[var(--global-theme-color)] font-medium">
                  {h.label}
                </span>
                : {h.detail}
              </div>
            ))}
          </div>
        );
        break;

      case "status":
      case "systemctl":
        output = (
          <div className="space-y-1">
            {portfolioConfig.identity.currentFocus.map((f) => (
              <div key={f.key}>
                <span className="text-[var(--coding-green)]">●</span>{" "}
                <span className="text-[var(--global-theme-color)] font-medium">
                  {f.key}
                </span>{" "}
                — {f.text}
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1">
            <div>
              email:{" "}
              <a
                href={`mailto:${portfolioConfig.links.email}`}
                className="underline text-[var(--global-theme-color)]"
              >
                {portfolioConfig.links.email}
              </a>
            </div>
            <div>
              github:{" "}
              <a
                href={portfolioConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--global-theme-color)]"
              >
                {portfolioConfig.links.github}
              </a>
            </div>
            <div>
              linkedin:{" "}
              <a
                href={portfolioConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--global-theme-color)]"
              >
                {portfolioConfig.links.linkedin}
              </a>
            </div>
            <div>
              instagram:{" "}
              <a
                href={portfolioConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--global-theme-color)]"
              >
                {portfolioConfig.links.instagramHandle}
              </a>
            </div>
          </div>
        );
        break;

      case "resume":
        window.open(portfolioConfig.links.resumePath, "_blank", "noopener,noreferrer");
        output = <span>Opening resume.pdf...</span>;
        break;

      case "grep":
      case "search": {
        if (!argStr) {
          output = (
            <span className="text-[var(--global-text-color-light)]">
              usage: grep &lt;keyword&gt; (e.g. grep pgvector, grep go, grep clip)
            </span>
          );
          break;
        }
        const needle = argStr.toLowerCase();
        const hits: string[] = [];

        portfolioConfig.experience.forEach((e) => {
          if (
            `${e.organization} ${e.role} ${e.summary} ${e.technologies.join(" ")}`
              .toLowerCase()
              .includes(needle)
          ) {
            hits.push(`experience/${e.id}: ${e.role} @ ${e.organization}`);
          }
        });

        portfolioConfig.projects.forEach((p) => {
          if (
            `${p.title} ${p.summary} ${p.technologies.join(" ")}`
              .toLowerCase()
              .includes(needle)
          ) {
            hits.push(`projects/${p.cliAlias}.md: ${p.title}`);
          }
        });

        portfolioConfig.skills.forEach((s) => {
          const matchingItems = s.items.filter((i) =>
            i.toLowerCase().includes(needle)
          );
          if (matchingItems.length > 0) {
            hits.push(`skills/${s.id}: ${matchingItems.join(", ")}`);
          }
        });

        output =
          hits.length > 0 ? (
            <div className="space-y-1">
              {hits.map((h, idx) => (
                <div key={idx}>{h}</div>
              ))}
            </div>
          ) : (
            <span className="text-[var(--global-text-color-light)]">
              grep: no matches for &apos;{argStr}&apos;
            </span>
          );
        break;
      }

      case "theme": {
        const mode = args[0]?.toLowerCase();
        if (mode === "dark" || mode === "light") {
          setTheme(mode);
          output = <span>Switched portfolio theme to {mode}.</span>;
        } else {
          const next = theme === "light" ? "dark" : "light";
          setTheme(next);
          output = <span>Toggled theme to {next}.</span>;
        }
        break;
      }

      case "sudo":
        output = (
          <span className="text-[var(--global-text-color-light)]">
            aditya is not in the sudoers file. Production changes require unit tests and peer review.
          </span>
        );
        break;

      default:
        output = (
          <span className="text-[var(--global-text-color-light)]">
            bash: {cmd}: command not found. Type{" "}
            <span className="text-[var(--global-theme-color)]">help</span> for available commands.
          </span>
        );
    }

    setEntries((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        cwd,
        command: trimmed,
        output,
      },
    ]);
    void nextCwd;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const current = input;
      setInput("");
      runCommand(current);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx =
        historyCursor === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyCursor - 1);
      setHistoryCursor(nextIdx);
      setInput(cmdHistory[nextIdx]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyCursor === -1) return;
      if (historyCursor >= cmdHistory.length - 1) {
        setHistoryCursor(-1);
        setInput("");
      } else {
        const nextIdx = historyCursor + 1;
        setHistoryCursor(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const tokens = input.split(/\s+/);
      if (tokens.length <= 1) {
        const prefix = tokens[0].toLowerCase();
        const match = BASE_COMMANDS.find((c) => c.startsWith(prefix));
        if (match) setInput(match + " ");
      } else {
        const last = tokens[tokens.length - 1].toLowerCase();
        const candidates = [
          ...(virtualFiles[cwd] || []),
          ...portfolioConfig.projects.map((p) => p.cliAlias),
          "defect",
          "projects",
        ];
        const match = candidates.find((c) => c.toLowerCase().startsWith(last));
        if (match) {
          tokens[tokens.length - 1] = match;
          setInput(tokens.join(" "));
        }
      }
    }
  };

  const quickCommands = [
    "help",
    "ls projects",
    "cat samwise",
    "cat golambda",
    "hobbies",
    "status",
  ];

  return (
    <section
      id="terminal"
      aria-labelledby="terminal-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="terminal-heading" className="section-rail-label">
          Interactive CLI
        </h2>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <p className="text-[14px] text-[var(--global-text-color-light)]">
            Inspect projects, stack, and system status using standard shell commands.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickCommands.map((qc) => (
              <button
                key={qc}
                type="button"
                onClick={() => {
                  runCommand(qc);
                  inputRef.current?.focus();
                }}
                className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] text-[var(--global-text-color-secondary)] hover:border-[var(--global-theme-color)] hover:text-[var(--global-theme-color)] transition-colors"
              >
                $ {qc}
              </button>
            ))}
          </div>
        </div>

        <div
          onClick={() => inputRef.current?.focus()}
          className="rounded border border-[var(--term-border)] bg-[var(--term-bg)] overflow-hidden font-mono text-[12.5px]"
        >
          {/* Minimal terminal titlebar */}
          <div className="px-3.5 py-2 bg-[var(--term-header-bg)] border-b border-[var(--term-border)] flex items-center justify-between text-[11.5px] text-[var(--global-text-color-light)]">
            <span>
              {portfolioConfig.identity.handle}: {cwd}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--coding-green)]"
                aria-hidden="true"
              />
              <span>interactive bash</span>
            </span>
          </div>

          {/* Scrollable log output */}
          <div
            ref={scrollRef}
            role="log"
            aria-label="Interactive portfolio terminal output"
            aria-live="polite"
            className="p-3.5 max-h-[290px] overflow-y-auto thin-scrollbar space-y-3"
          >
            {entries.map((entry) => (
              <div key={entry.id} className="space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--global-text-color)]">
                  <span className="text-[var(--term-prompt)] font-medium">
                    aditya@portfolio:{entry.cwd}$
                  </span>
                  <span>{entry.command}</span>
                </div>
                {entry.output && (
                  <div className="pl-0 sm:pl-2 text-[var(--global-text-color-secondary)] leading-[1.55]">
                    {entry.output}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Active prompt input */}
          <div className="px-3.5 py-2.5 border-t border-[var(--global-divider-color)] flex items-center gap-2 bg-[var(--global-card-bg-color)]/50">
            <label
              htmlFor="portfolio-cli-input"
              className="text-[var(--term-prompt)] font-medium shrink-0 select-none"
            >
              aditya@portfolio:{cwd}$
            </label>
            <input
              ref={inputRef}
              id="portfolio-cli-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="type 'help' and press Enter (Tab autocompletes)"
              className="w-full bg-transparent text-[var(--global-text-color)] placeholder:text-[var(--global-text-color-light)]/60 focus:outline-none text-[12.5px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
