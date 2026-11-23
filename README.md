# Aditya Raj — Personal Engineering Portfolio

An editorial, academic-inspired AI/ML & Software Engineering portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Design & Architecture Overview

- **Editorial Visual Identity**: Grounded directly in [Peter Holderrieth's design system](https://www.peterholderrieth.com/) (`al-folio` SCSS variables & typography):
  - **Typography**: `Roboto` (weights 300, 400, 500, 700), `Roboto Slab`, and `IBM Plex Mono` bundled locally via `@fontsource` (zero runtime external font-blocking).
  - **Color System**: Light mode (`#ffffff` background, `#000000` primary text, `#828282` metadata, `#b509ac` theme accent, `rgba(0,0,0,0.1)` hairline dividers) and Dark mode (`#1c1c1d` background, `#212529` card surface, `#2698ba` cyan accent).
  - **Layout**: Centered `840px` editorial container with sticky `132px` uppercase section rails (`2px` accent border) that collapse cleanly on mobile viewports.
- **Interactive Engineering Components**:
  - **Expandable Career Timeline**: Organization logos (`Intel`, `IIT Ropar`, `Accenture`) with expandable engineering contribution drawers.
  - **Featured System Case Study**: Interactive 5-stage pipeline explorer for *Defect-to-Test-Case Recommendation* distinguishing implemented functionality, experiments, and ongoing research.
  - **Selected Projects + System Architecture Diagrams**: Filterable project rows (`AI/ML`, `Systems`, `Backend`, `Full Stack`) with custom responsive SVG architecture diagrams grounded in each GitHub repository (`SAMWISE Multilingual`, `Habitat VLN`, `Serverless Runtime GO`, `UniSwap`) and expandable case studies.
  - **Real LeetCode Contribution Calendar**: Dedicated server-side GraphQL adapter (`src/lib/leetcode.ts` + `/api/leetcode`) with 1-hour ISR caching, keyboard-focusable green intensity cells, hover/focus readouts, solved difficulty breakdown, and offline JSON fallback (`src/data/leetcode-fallback.json`).
  - **Interactive Linux CLI (`aditya@portfolio:~`)**: Supports `help`, `whoami`, `ls`, `ls projects`, `cd`, `pwd`, `cat <file|project>`, `open <project>`, `grep <keyword>`, `skills`, `experience`, `education`, `hobbies`, `status`, `contact`, `theme [light|dark]`, `uname`, and `clear`, with `Tab` autocomplete and `↑`/`↓` command history.

---

## Local Setup

### Prerequisites
- **Node.js** `>= 18.18` (verified on Node `v24.x`)
- **npm** `>= 9`

*(If working behind a corporate network proxy, set `HTTP_PROXY` and `HTTPS_PROXY` before running `npm install`.)*

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 3. Production build & verification
```bash
npm run build
npm run start
```

---

## Customization Guide

All profile content, timeline entries, case studies, projects, skills, achievements, and off-duty interests live in a single typed source of truth:

- **Content & Links**: [src/data/portfolio.ts](src/data/portfolio.ts)
- **Project Architecture Diagrams**: [src/components/ProjectArchitectureDiagram.tsx](src/components/ProjectArchitectureDiagram.tsx)
- **Organization Logos**: `public/logos/` (`intel.svg`, `accenture.svg`, `iitropar.png`, `gehu.png`)

### Adding Your Downloadable Resume PDF
Place your latest PDF resume at:
```text
public/resume.pdf
```
The **Resume (PDF)** link in the hero, footer, and CLI `resume` command automatically resolves `/resume.pdf`.

### Configuring LeetCode Data & Syncing Offline Fallback
1. Copy `.env.example` to `.env.local` and set your handle if it changes:
   ```env
   NEXT_PUBLIC_LEETCODE_USERNAME=aaediie
   NEXT_PUBLIC_LEETCODE_PROFILE_URL=https://leetcode.com/u/aaediie/
   ```
2. On Vercel/Node servers, `/api/leetcode` queries LeetCode's public GraphQL endpoint (`matchedUser.userCalendar` + `submitStatsGlobal`) and caches responses for 1 hour (`revalidate = 3600`) with zero client-side secrets.
3. To refresh the local fallback snapshot (`src/data/leetcode-fallback.json`) at any time:
   ```bash
   npm run sync:leetcode
   ```
   **Limitations**: LeetCode's public `submissionCalendar` returns rolling daily submission counts for the past year; if LeetCode rate-limits an edge IP or is temporarily unreachable, the adapter transparently serves `src/data/leetcode-fallback.json` and labels the timestamp as a cached snapshot.

### Adding Future Projects
Append a new `ProjectItem` object to `portfolioConfig.projects` in `src/data/portfolio.ts`. Both the **Selected Projects** filterable view and the **Interactive CLI** (`ls projects`, `cat <cliAlias>`, `open <cliAlias>`, `grep`) automatically pick up new entries without modifying UI components.

---

## GitHub Repository & Deployment Steps

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Aditya Raj engineering portfolio"
git branch -M main
git remote add origin https://github.com/iAdityaRaj/<your-portfolio-repo>.git
git push -u origin main
```

### Deploy on Vercel (Recommended — supports live `/api/leetcode` ISR)
1. Sign in to [vercel.com](https://vercel.com/) with GitHub and click **Add New → Project**.
2. Import `iAdityaRaj/<your-portfolio-repo>`.
3. Framework Preset will auto-detect **Next.js**.
4. *(Optional)* Add environment variables from `.env.example` (`NEXT_PUBLIC_LEETCODE_USERNAME`, `NEXT_PUBLIC_LEETCODE_PROFILE_URL`).
5. Click **Deploy**. Every push to `main` triggers an automatic production deployment.

### Static Export Option (GitHub Pages)
If you ever prefer pure static hosting on GitHub Pages (`iAdityaRaj.github.io`), run `npm run sync:leetcode` in a scheduled GitHub Action, remove `src/app/api/leetcode/route.ts`, and add `output: "export"` in `next.config.ts`. Vercel is recommended because it keeps the server-side LeetCode GraphQL adapter live without scheduled rebuilds.
