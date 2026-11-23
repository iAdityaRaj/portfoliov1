export type ProjectCategory = "All" | "AI/ML" | "Systems" | "Backend" | "Full Stack";

export type ProjectDiagramId = "defect-tcd" | "samwise" | "habitat-vln" | "serverless-go" | "uniswap";

export interface SocialLinks {
  github: string;
  linkedin: string;
  leetcode: string;
  leetcodeUsername: string;
  instagram: string;
  instagramHandle: string;
  email: string;
  resumePath: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  dates: string;
  datesNote?: string;
  location: string;
  logo: string;
  logoAlt: string;
  current?: boolean;
  summary: string;
  contributions: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  dates: string;
  location: string;
  cgpa: string;
  logo: string;
  logoAlt: string;
  highlights?: string[];
}

export interface CaseStudyStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  status: "Implemented" | "Experimented" | "Ongoing";
  details: string;
  techniques: string[];
}

export interface ExpandableSection {
  id: string;
  title: string;
  badge?: "Implemented" | "Experimented" | "Ongoing / Future";
  paragraphs: string[];
  bullets?: string[];
}

export interface FeaturedCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  contextTag: string;
  paperUrl?: string;
  shortDescription: string;
  diagramId: ProjectDiagramId;
  stages: CaseStudyStage[];
  sections: ExpandableSection[];
  technologies: string[];
  publicSafetyNote: string;
}

export interface ProjectItem {
  slug: string;
  cliAlias: string;
  title: string;
  shortTitle: string;
  categoryLabels: string[];
  filterTags: Exclude<ProjectCategory, "All">[];
  year: string;
  summary: string;
  diagramId: ProjectDiagramId;
  diagramCaption: string;
  screenshots?: { src: string; alt: string }[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  demoNote?: string;
  colabUrl?: string;
  problemStatement: string;
  technicalDecisions: string[];
  implementationDetails: string[];
  challengesAndLessons: string[];
  verifiedResults: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  note?: string;
  items: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  detail: string;
  sourceNote?: string;
}

export interface HobbyItem {
  id: string;
  label: string;
  detail: string;
}

export const portfolioConfig = {
  identity: {
    name: "Aditya Raj",
    handle: "aditya@portfolio",
    headline: "AI Engineer · Software Engineer",
    subheadline: "SWE & AI Intern at Intel · M.Tech in Artificial Intelligence at IIT Ropar",
    location: "Bengaluru / Rupnagar, India",
    avatarUrl: "/logos/avatar.png",
    heroQuote:
      "I work at the intersection of intelligent systems and reliable software — building LLM-powered workflows, semantic retrieval systems, and dependable backend services.",
    introParagraph:
      "I build intelligent systems and reliable software. My work spans LLM orchestration, semantic retrieval, backend engineering, and production reliability, with a focus on turning complex engineering problems into practical systems.",
    currentFocus: [
      {
        key: "building",
        text: "Hybrid LangGraph orchestration, MCP engineering tools, and Defect-to-Test-Case retrieval at Intel",
      },
      {
        key: "studying",
        text: "M.Tech in Artificial Intelligence at IIT Ropar (2025–2027)",
      },
      {
        key: "exploring",
        text: "Machine learning, multimodal machine learning pipelines, vision-language systems, and semantic ranking",
      },
    ],
  },

  links: {
    github: "https://github.com/iAdityaRaj",
    linkedin: "https://linkedin.com/in/aditya-raj-7204a8167",
    leetcode:
      process.env.NEXT_PUBLIC_LEETCODE_PROFILE_URL || "https://leetcode.com/u/aaediie/",
    leetcodeUsername: process.env.NEXT_PUBLIC_LEETCODE_USERNAME || "aaediie",
    instagram: "https://www.instagram.com/add1tyaraj/",
    instagramHandle: "@add1tyaraj",
    email: "raj229488@gmail.com",
    resumePath: "/resume.pdf",
  } satisfies SocialLinks,

  about: {
    paragraphs: [
      "I'm a Software Engineer and AI enthusiast pursuing my M.Tech in Artificial Intelligence at IIT Ropar, with industry experience spanning backend engineering, distributed systems, and applied AI.",
      "Currently, I'm working as an AI Engineer Intern at Intel, where I contribute to building intelligent systems for platform validation. My work involves developing MCP servers and tools, integrating LLM-powered workflows, and building agentic systems.",
      "Previously, I worked as a Software Engineer at Accenture, where I contributed to backend development, legacy system modernization, automation, and operational reliability using Java, Spring Boot, SQL, and Linux.",
    ],
    interestsIntro: "My technical interests lie at the intersection of:",
    interests: [
      {
        label: "AI & LLMs",
        items: "RAG, Agentic AI, LLM Orchestration, LangGraph, MCP, Semantic Search, NLP",
      },
      {
        label: "Backend Engineering",
        items: "Python, Java, Spring Boot, FastAPI, REST APIs, Microservices",
      },
      {
        label: "Machine Learning",
        items: "Sentence Transformers, SBERT, Fine-tuning, Information Retrieval, Model Evaluation",
      },
      {
        label: "Systems & Infrastructure",
        items: "Distributed Systems, Linux, Docker, CI/CD, Cloud Technologies",
      },
    ],
    closingParagraphs: [
      "I enjoy building systems that bridge the gap between research and real-world engineering — from intelligent retrieval pipelines to scalable backend services.",
      "Open to collaborating on AI Engineering, Applied ML, LLM Systems, and Software Engineering.",
    ],
  },

  experience: [
    {
      id: "intel",
      organization: "Intel Corporation",
      role: "Software Engineering & AI Intern",
      dates: "June 2026 – Present",
      location: "Bengaluru, India",
      logo: "/logos/intel.svg",
      logoAlt: "Intel Corporation logo",
      current: true,
      summary:
        "Building hybrid LLM agent orchestration, pgvector-backed episodic memory, reusable FastAPI MCP skills, and multi-stage semantic retrieval pipelines for engineering workflows.",
      contributions: [
        "Enhanced a hybrid LangGraph-based agent orchestration framework with intent detection, query routing, query rephrasing, and modular execution across database-backed and API-backed MCP skills.",
        "Built an episodic memory system for LLM orchestration using PostgreSQL and pgvector for persistent, semantic retrieval of conversational context.",
        "Worked on a multi-stage Defect-to-Test-Case recommendation pipeline involving direct linkage, BM25 lexical matching, SBERT semantic retrieval, expert ranking, and LLM reranking.",
        "Designed reusable MCP skills using Python and FastAPI to integrate API-based and database-backed engineering workflows cleanly.",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "LangGraph",
        "MCP",
        "PostgreSQL",
        "pgvector",
        "BM25",
        "SBERT",
        "LLM Applications",
      ],
    },
    {
      id: "iit-ropar-ta",
      organization: "Indian Institute of Technology Ropar",
      role: "Teaching Assistant — Software Engineering (Course C305)",
      dates: "2025 – Present (Editable)",
      datesNote: "Editable date range in src/data/portfolio.ts",
      location: "Rupnagar, Punjab, India",
      logo: "/logos/iitropar.png",
      logoAlt: "IIT Ropar official emblem",
      current: true,
      summary:
        "Supporting course instruction, laboratory sessions, and student engineering projects in core software engineering principles and collaborative development.",
      contributions: [
        "Assisted faculty with academic support and project mentoring for Course C305 (Software Engineering).",
        "Guided students on modular design, testing practices, version control workflows, and software engineering fundamentals.",
        "Collaborated on assignment evaluation, code reviews, and technical discussions.",
      ],
      technologies: [
        "Software Engineering",
        "System Design",
        "Testing & Code Quality",
        "Git Workflows",
      ],
    },
    {
      id: "accenture",
      organization: "Accenture",
      role: "Associate Software Engineer",
      dates: "October 2023 – August 2025",
      location: "Noida, India",
      logo: "/logos/accenture.svg",
      logoAlt: "Accenture logo",
      current: false,
      summary:
        "Foundation in enterprise backend modernization, microservice migration, test quality engineering, incident RCA, and automated production reliability.",
      contributions: [
        "Contributed to backend modernization for a Healthcare StoreOps platform, including microservice migration from legacy Documentum storage to Google AlloyDB.",
        "Developed automated self-healing operational jobs that reduced recurring production issues by 35% (as reported in resume).",
        "Handled high-priority production incidents, performing structured root cause analysis and service recovery.",
        "Improved backend code quality and test coverage using SonarQube, JUnit, and Mockito.",
        "Automated repetitive team onboarding workflows using Selenium-based web automation.",
        "Monitored service health, log streams, and operational SLAs with Splunk and Grafana.",
      ],
      technologies: [
        "Java",
        "Microservices",
        "Google AlloyDB",
        "Documentum",
        "JUnit",
        "Mockito",
        "SonarQube",
        "Selenium",
        "Splunk",
        "Grafana",
      ],
    },
    {
      id: "ltimindtree",
      organization: "LTIMindtree",
      role: "Software Engineering Intern",
      dates: "February 2023 – July 2023",
      location: "India",
      logo: "/logos/ltimindtree.png",
      logoAlt: "LTIMindtree logo",
      current: false,
      summary:
        "Software engineering internship on the LTIMindtree Edu-Tech Platform, completed alongside the LTIMindtree Ignite training program.",
      contributions: [
        "Worked on the LTIMindtree Edu-Tech Platform.",
        "Completed LTIMindtree Ignite training with an 86% overall score across all 3 milestone exams.",
      ],
      technologies: ["Software Engineering", "Web Development"],
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      id: "mtech-iitrpr",
      institution: "Indian Institute of Technology Ropar",
      degree: "M.Tech in Artificial Intelligence",
      dates: "2025 – 2027",
      location: "Rupnagar, Punjab",
      cgpa: "7.85",
      logo: "/logos/iitropar.png",
      logoAlt: "Indian Institute of Technology Ropar logo",
      highlights: [
        "Coursework: Data Structures & Algorithms, Advanced Operating Systems, Computer Networks, Computer Systems, Introduction to Artificial Intelligence, Machine Learning, Deep Learning",
        "Teaching Assistant for Software Engineering (Course C305)",
      ],
    },
    {
      id: "btech-gehu",
      institution: "Graphic Era Hill University",
      degree: "B.Tech in Computer Science and Engineering",
      dates: "2019 – 2023",
      location: "Dehradun, Uttarakhand",
      cgpa: "8.73",
      logo: "/logos/gehu.png",
      logoAlt: "Graphic Era Hill University logo",
      highlights: [
        "Core coursework in Data Structures & Algorithms, Operating Systems, DBMS, and Computer Networks",
      ],
    },
  ] satisfies EducationItem[],

  featuredProject: {
    slug: "defect-to-test-case-recommendation",
    title: "Defect-to-Test-Case Recommendation",
    subtitle: "Multi-Stage Lexical, Semantic, and Expert Ranking Pipeline",
    contextTag: "Joint Master's Thesis at Intel · IIT Ropar",
    paperUrl:
      "https://drive.google.com/file/d/1Pdjzf-ws9ekJHMgoxo1BtQ9EhU_Zgzbq/view?usp=drive_link",
    shortDescription:
      "Joint Master's thesis work at Intel Corporation (with IIT Ropar): a semantic retrieval and ranking pipeline that recommends relevant validation test cases or related engineering verification artifacts from noisy software defect descriptions.",
    diagramId: "defect-tcd",
    publicSafetyNote:
      "Public-safe architectural overview: describes general information-retrieval design patterns without referencing confidential datasets, internal schemas, or proprietary product details.",
    technologies: [
      "Python",
      "BM25",
      "SBERT",
      "Cross-Field Scoring",
      "LLM Reranking",
      "Retrieval Evaluation",
      "FastAPI",
    ],
    stages: [
      {
        id: "stage-1",
        step: "01",
        title: "Defect Description",
        subtitle: "Unstructured bug reports & failure logs",
        status: "Implemented",
        details:
          "Ingests raw software defect titles, reproduction notes, component tags, and failure symptoms. Applies text normalization and noise stripping so stack traces or boilerplate templates do not dominate similarity scores.",
        techniques: ["Field extraction", "Log noise filtering", "Domain token preservation"],
      },
      {
        id: "stage-2",
        step: "02",
        title: "Query Representation",
        subtitle: "Structured metadata + dense embeddings",
        status: "Implemented",
        details:
          "Constructs complementary lexical and dense representations: tokenized technical terms for exact identifier matching alongside SBERT dense vector embeddings that capture functional equivalence across different phrasing.",
        techniques: ["Technical tokenization", "SBERT dense encoding", "Metadata scoping"],
      },
      {
        id: "stage-3",
        step: "03",
        title: "Candidate Retrieval",
        subtitle: "Direct linkage + BM25 + SBERT recall",
        status: "Implemented",
        details:
          "Combines deterministic direct linkage (historical feature/component associations), BM25 sparse lexical retrieval for exact symbol/register terms, and SBERT vector search to maximize candidate recall before heavier scoring.",
        techniques: ["Historical direct linkage", "BM25 lexical search", "Dense ANN candidate pool"],
      },
      {
        id: "stage-4",
        step: "04",
        title: "Semantic & Expert Ranking",
        subtitle: "Multi-signal fusion & LLM reranking trials",
        status: "Experimented",
        details:
          "Fuses lexical overlap, dense cosine similarity, and domain-aware expert heuristics. Evaluated LLM-based listwise/pointwise reranking experiments over top-K candidates to test reasoning over subtle edge cases.",
        techniques: ["Hybrid score fusion", "Expert heuristic weighting", "LLM reranking experiments"],
      },
      {
        id: "stage-5",
        step: "05",
        title: "Final Recommendations",
        subtitle: "Ranked test cases with traceable rationale",
        status: "Ongoing",
        details:
          "Outputs a prioritized top-K shortlist of validation test cases with retrieval provenance (direct link vs. lexical vs. semantic match) so engineers can audit why each candidate was surfaced.",
        techniques: ["Top-K shortlist", "Match provenance tags", "Offline recall/MRR evaluation"],
      },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem & Motivation",
        badge: "Implemented",
        paragraphs: [
          "When a software or platform defect is reported, validation engineers must quickly identify whether existing test cases cover the regression scenario or require updates. Searching large test repositories manually is slow because defect reports describe symptoms and logs, whereas test cases describe preconditions and verification steps.",
          "Pure keyword search misses semantically equivalent tests written with different terminology, while pure dense retrieval can overlook exact technical identifiers. A hybrid, multi-stage pipeline bridges this vocabulary gap.",
        ],
      },
      {
        id: "pipeline",
        title: "Retrieval Pipeline Architecture",
        badge: "Implemented",
        paragraphs: [
          "The architecture separates high-recall candidate generation from precision-oriented ranking. First, deterministic direct links and metadata filters narrow the search space where reliable relationships exist. In parallel, BM25 retrieves lexically sharp matches and SBERT retrieves semantically aligned test descriptions.",
          "Candidate pools are deduplicated and passed to a unified scoring layer that preserves provenance signals from every stage.",
        ],
      },
      {
        id: "models",
        title: "Models & Ranking Strategies",
        badge: "Experimented",
        paragraphs: [
          "Implemented BM25 for sparse term-frequency matching alongside sentence-transformer (SBERT) bi-encoders for fast dense retrieval. On top of hybrid retrieval, an expert ranking stage incorporates structured domain signals such as component alignment and historical linkage.",
          "Conducted controlled LLM-based reranking experiments on top-K candidates to evaluate whether prompt-driven reasoning improves ordering when defect descriptions are terse or ambiguous.",
        ],
      },
      {
        id: "evaluation",
        title: "Dataset Preparation & Retrieval Evaluation",
        badge: "Implemented",
        paragraphs: [
          "Curated ground-truth evaluation pairs from historical defect-to-test associations, cleaning noisy or incomplete entries to ensure fair offline evaluation.",
          "Evaluated stages incrementally across top-K retrieval quality, comparing standalone lexical search, standalone dense search, hybrid expert fusion, and LLM reranking trade-offs in latency versus ranking quality.",
        ],
      },
      {
        id: "limitations",
        title: "Challenges, Limitations & Next Steps",
        badge: "Ongoing / Future",
        paragraphs: [
          "Key challenges include severe terminology mismatch between terse bug summaries and structured test steps, noisy log snippets, and the latency/cost overhead of invoking LLMs during reranking.",
          "Ongoing and future directions focus on finer domain adaptation of dense encoders, calibration of hybrid fusion weights, and human-in-the-loop feedback loops where engineer selections refine future rankings.",
        ],
      },
    ],
  } satisfies FeaturedCaseStudy,

  // Note: db-pilot intentionally excluded per user instruction.
  projects: [
    {
      slug: "samwise-multilingual-rvos",
      cliAlias: "samwise",
      title: "SAMWISE — Multilingual Referring Video Object Segmentation",
      shortTitle: "SAMWISE Multilingual RVOS",
      categoryLabels: ["AI/ML", "Computer Vision", "Multimodal AI"],
      filterTags: ["AI/ML"],
      year: "2026",
      summary:
        "Extended the SAMWISE referring video object segmentation architecture with Hindi-RoBERTa early fusion and a quantized local Edge-LLM (Qwen2.5-1.5B) for explainable spatial tracking from Hindi prompts.",
      diagramId: "samwise",
      diagramCaption:
        "Architecture from iAdityaRaj/Language-Aligned-Video-Object-Segmentation-with-Multilingual-Prompts: Hindi prompt encoding via RoBERTa Base fused with SAM2 visual features, monitored by CME + 4-bit Qwen2.5-1.5B local reasoning.",
      technologies: [
        "Python",
        "PyTorch",
        "SAM2",
        "Hindi-RoBERTa",
        "Qwen2.5-1.5B (4-bit)",
        "Multimodal Fusion",
        "CUDA",
      ],
      githubUrl:
        "https://github.com/iAdityaRaj/Language-Aligned-Video-Object-Segmentation-with-Multilingual-Prompts",
      colabUrl:
        "https://colab.research.google.com/github/iAdityaRaj/Language-Aligned-Video-Object-Segmentation-with-Multilingual-Prompts/blob/main/demo.ipynb",
      problemStatement:
        "Standard early-fusion Referring Video Object Segmentation (RVOS) pipelines are constrained by English-only text encoders and behave as opaque black boxes when temporal motion shifts cause mask drift.",
      technicalDecisions: [
        "Replaced the English-only text bottleneck by routing localized Hindi instructions (e.g., 'बिल्ली पेड़ पर चढ़ रही है') through multilingual/Hindi RoBERTa representations aligned with the SAM2 visual backbone.",
        "Integrated a 4-bit quantized Qwen2.5-1.5B-Instruct edge model directly inside the local inference loop rather than calling external cloud LLM APIs.",
        "Patched Fairseq text-encoder dependencies for clean, memory-safe execution on modern Python 3.12 runtimes.",
      ],
      implementationDetails: [
        "Engineered multimodal early-fusion adapters connecting text embeddings to SAM2 spatial-temporal memory masks.",
        "Monitored Common Movement Estimation (CME) thresholds across video frames to detect behavioral transitions (such as running to climbing) and trigger localized natural-language explanations.",
        "Packaged a reproducible one-click Colab inference pipeline (`inference_demo.py` & `demo.ipynb`) generating tracked mask video outputs.",
      ],
      challengesAndLessons: [
        "Aligning non-English token embeddings with pre-trained visual segmentation features without degrading temporal mask consistency.",
        "Keeping quantized edge-LLM reasoning within GPU memory budgets alongside SAM2 frame propagation.",
      ],
      verifiedResults: [
        "End-to-end Hindi-prompted video object localization and tracking pipeline verified on multi-frame clips.",
        "Fully local inference and explainability generation without external cloud LLM API dependency.",
      ],
    },
    {
      slug: "habitat-vision-language-navigation",
      cliAlias: "habitat",
      title: "Vision-Language Navigation in Habitat",
      shortTitle: "Habitat VLN Agent",
      categoryLabels: ["AI/ML", "Embodied AI"],
      filterTags: ["AI/ML"],
      year: "2026",
      summary:
        "Developed an embodied vision-language navigation agent in Habitat-Lab using CLIP (ViT-B/32), GRU temporal state encoding, cross-attention fusion, and behavior cloning across indoor 3D scenes.",
      diagramId: "habitat-vln",
      diagramCaption:
        "Architecture from iAdityaRaj/habitat-vln-project: 256×256 RGB frames + natural-language instructions encoded via CLIP ViT-B/32 (512-d each), fused with cross-attention + GRU memory to predict discrete Habitat actions.",
      technologies: [
        "Python",
        "PyTorch",
        "Habitat-Lab",
        "Habitat-Sim",
        "CLIP (ViT-B/32)",
        "GRU",
        "Behavior Cloning",
      ],
      githubUrl: "https://github.com/iAdityaRaj/habitat-vln-project",
      problemStatement:
        "Embodied indoor agents must follow free-form natural-language navigation instructions (such as 'Turn left at the corridor and stop near the elevator') purely from egocentric RGB camera frames, with no pre-built map or GPS.",
      technicalDecisions: [
        "Replaced separate ResNet-50 + GloVe/LSTM encoders with unified CLIP (ViT-B/32) image and text encoders so visual observations and language instructions start in a shared 512-dim embedding space.",
        "Maintained step-by-step trajectory history with a 512-unit GRU state encoder over fused multimodal representations.",
        "Extended baseline concatenation fusion with cross-attention to sharpen alignment between instruction tokens and visual landmarks.",
      ],
      implementationDetails: [
        "Configured Habitat-Sim and Habitat-Lab 0.3.3 with Matterport3D-format `.glb` indoor scenes and R2R trajectory episodes.",
        "Trained the policy head via imitation learning (behavior cloning) over discrete navigation actions (`MOVE_FORWARD`, `TURN_LEFT`, `TURN_RIGHT`, `STOP`).",
        "Evaluated navigation trajectories across seen and unseen environments using Success Rate (SR), Success weighted by Path Length (SPL), and Navigation Error (NE).",
      ],
      challengesAndLessons: [
        "Building Habitat-Sim headless from source and managing 3D scene memory throughput during episode rollouts.",
        "Mitigating compounding distribution shift under behavior cloning in unseen indoor layouts.",
      ],
      verifiedResults: [
        "Evaluated in seen and unseen indoor environments tracking SR, SPL, and Navigation Error.",
      ],
    },
    {
      slug: "serverless-runtime-go",
      cliAlias: "golambda",
      title: "Serverless Runtime GO (GoLambda)",
      shortTitle: "Serverless Runtime GO",
      categoryLabels: ["Systems", "Backend", "Cloud"],
      filterTags: ["Systems", "Backend"],
      year: "2026",
      summary:
        "Built a lightweight AWS Lambda-style Function-as-a-Service platform in Go featuring isolated Docker container execution, bounded goroutine worker pools, timeout enforcement, and real-time telemetry on AWS EC2.",
      diagramId: "serverless-go",
      diagramCaption:
        "Architecture from iAdityaRaj/serverless-runtime-mini-aws-lambda: REST API Gateway (/deploy, /invoke/:name, /metrics) → Buffered Channel Queue & Goroutine Worker Pool → Runtime Interface → Ephemeral Docker Containers.",
      technologies: [
        "Go",
        "Docker",
        "AWS EC2",
        "REST APIs",
        "Goroutines & Channels",
        "Atomic Telemetry",
      ],
      githubUrl: "https://github.com/iAdityaRaj/serverless-runtime-mini-aws-lambda",
      demoNote: "Deployed on AWS EC2 (HTTP API endpoints documented in GitHub repository)",
      problemStatement:
        "Managed serverless platforms abstract infrastructure at the cost of opacity. This project builds a FaaS compute substrate from first principles to address process/filesystem isolation, bounded concurrent scheduling, and cold-start observability.",
      technicalDecisions: [
        "Kept the part that schedules work separate from the part that actually runs code, so the way functions are executed can be swapped later without rewriting the rest of the system.",
        "Used a fixed team of workers and a waiting line with a size limit — when the line is full, new requests are politely told to try again instead of overloading the server.",
        "Gave every function a time limit; if it runs too long it is stopped and cleaned up automatically, so one slow or stuck function can't block everyone else.",
      ],
      implementationDetails: [
        "Deploy: users upload their code, and the platform prepares it and saves it under a name so it can be run anytime.",
        "Run: calling a function by name runs it in its own isolated, disposable container and returns the result.",
        "Monitor: a live stats page shows how many functions ran, how many failed, how busy the workers are, how long the waiting line is, and how fast things run.",
      ],
      challengesAndLessons: [
        "Quantifying ephemeral container spin-up overhead (cold-start latency vs. sub-millisecond warm goroutine queue dispatch).",
        "Ensuring clean container cleanup and accurate atomic rolling averages under concurrent load on AWS EC2.",
      ],
      verifiedResults: [
        "Deployed publicly on AWS EC2 with end-to-end source deployment, isolated Docker invocation, and live JSON telemetry.",
        "Zero external queue or database dependencies — pure Go standard library concurrency + Docker Engine.",
      ],
    },
    {
      slug: "uniswap-campus-marketplace",
      cliAlias: "uniswap",
      title: "UniSwap — Campus Rental Marketplace",
      shortTitle: "UniSwap Marketplace",
      categoryLabels: ["Full Stack", "Product Engineering"],
      filterTags: ["Full Stack", "Backend"],
      year: "2025",
      summary:
        "Developed a peer-to-peer campus rental marketplace for books, electronics, and student equipment with institute-verified onboarding, real-time chat proposals, and a TrustScore reputation engine.",
      diagramId: "uniswap",
      diagramCaption:
        "Architecture from iAdityaRaj/uniswap: Client App (React Native / React) → Institute OTP Auth (@iitrpr.ac.in) → Node.js & Firebase Cloud Functions → Firestore real-time sync, TrustScore engine, and scheduled reminder cron.",
      screenshots: [
        {
          src: "/projects/uniswap-app-2.jpeg",
          alt: "UniSwap onboarding screen: Borrow, Swap & Connect with the IIT Ropar community",
        },
        {
          src: "/projects/uniswap-app.jpeg",
          alt: "UniSwap mobile app login screen with IIT Ropar email sign-in",
        },
      ],
      technologies: [
        "React Native",
        "Node.js",
        "Firebase",
        "Firestore",
        "Cloud Functions",
        "SendGrid",
      ],
      githubUrl: "https://github.com/iAdityaRaj/uniswap",
      problemStatement:
        "Campus students frequently need textbooks, electronics, and lab tools short-term, but informal messaging groups lack availability tracking, borrower accountability, and structured return reminders.",
      technicalDecisions: [
        "Restricted registration to verified `@iitrpr.ac.in` institute email addresses with OTP verification to establish a trusted campus-only boundary.",
        "Embedded structured rental date/price proposals directly inside real-time in-app messaging threads backed by Firestore.",
        "Designed a deterministic TrustScore reputation system (starting at 100, updated upon owner-confirmed on-time or overdue returns) to incentivize reliability.",
      ],
      implementationDetails: [
        "Built item listing flows across categories (Books, Electronics, Tools, Campus Gear) with photo uploads and availability windows.",
        "Implemented Node.js + Firebase Cloud Functions triggers and a scheduled midnight (`Asia/Kolkata`) cron job to flag overdue rentals and dispatch automated email reminders.",
        "Synchronized active rental states, chat histories, and user reputation profiles in real time.",
      ],
      challengesAndLessons: [
        "Preventing reputation gaming by gating TrustScore updates on verified transaction lifecycle states.",
        "Handling email delivery quotas and asynchronous notification reliability during peak student usage.",
      ],
      verifiedResults: [
        "Onboarded more than 100 student users on campus (108+ registered campus users documented in repository).",
      ],
    },
  ] satisfies ProjectItem[],

  skills: [
    {
      id: "ai-ml",
      category: "AI & Machine Learning",
      items: [
        "Python",
        "PyTorch",
        "Transformers",
        "NLP",
        "SBERT",
        "CLIP",
        "BM25",
        "Semantic Retrieval",
        "Multimodal AI",
        "Vision-Language Models",
        "LLM Applications",
      ],
    },
    {
      id: "llm-orchestration",
      category: "LLM Systems & Orchestration",
      items: [
        "LangGraph",
        "Model Context Protocol (MCP)",
        "Agent Orchestration",
        "Intent Detection",
        "Query Routing",
        "Tool Integration",
        "Episodic Memory",
      ],
    },
    {
      id: "backend-systems",
      category: "Backend & Systems",
      items: [
        "C/C++",
        "Go",
        "Python",
        "FastAPI",
        "REST APIs",
        "Docker",
        "Microservices",
        "PostgreSQL",
        "pgvector",
        "AWS EC2",
        "Git",
      ],
    },
    {
      id: "reliability",
      category: "Production Reliability & Engineering",
      items: [
        "Legacy Modernization",
        "Selenium Automation",
        "Root Cause Analysis",
        "Self-Healing Jobs",
        "Grafana",
        "Splunk",
        "SonarQube",
        "JUnit",
        "Mockito",
      ],
    },
  ] satisfies SkillGroup[],

  achievements: [
    {
      id: "leetcode-rating",
      title: "LeetCode: 1700+ Max Contest Rating",
      detail: "Solved more than 950 problems on LeetCode across data structures, graphs, dynamic programming, and competitive programming.",
    },
    {
      id: "ta-iitrpr",
      title: "Teaching Assistant — Software Engineering (C305)",
      detail: "Indian Institute of Technology Ropar · Academic mentoring and software engineering coursework support.",
    },
    {
      id: "flipkart-grid",
      title: "Semi-Finalist — Flipkart GRiD 8.0",
      detail: "National engineering campus challenge recognition.",
    },
    {
      id: "gcp-certs",
      title: "Google Cloud Computing Foundations Certifications",
      detail: "Completed tracks including Data, ML, and AI foundations.",
    },
  ] satisfies AchievementItem[] as AchievementItem[],

  outsideTerminal: {
    title: "Outside the terminal",
    intro:
      "Away from code, I train as a hybrid athlete combining heavy strength work, endurance running, and combat sports — alongside the occasional online FPS session.",
    items: [
      {
        id: "hybrid-athlete",
        label: "Hybrid Athlete & Running",
        detail: "Balancing endurance running blocks with structured strength and conditioning.",
      },
      {
        id: "strength-lifting",
        label: "Power Lifting (100 kg Bench Press PR)",
        detail: "Consistent compound strength training with a 100 kg bench press PR.",
      },
      {
        id: "combat-sports",
        label: "Exploring MMA & Kickboxing",
        detail: "Training striking fundamentals, footwork, and mixed martial arts conditioning.",
      },
      {
        id: "cod",
        label: "COD Mobile (When AFK)",
        detail: "Sometimes binge-playing Call of Duty: Mobile online when AFK.",
      },
    ] satisfies HobbyItem[],
  },
};
