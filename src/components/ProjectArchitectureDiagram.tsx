"use client";

import React from "react";
import type { ProjectDiagramId } from "@/data/portfolio";

interface ProjectArchitectureDiagramProps {
  diagramId: ProjectDiagramId;
  compact?: boolean;
}

export function ProjectArchitectureDiagram({
  diagramId,
  compact = false,
}: ProjectArchitectureDiagramProps) {
  const heightClass = compact ? "w-full h-auto" : "w-full h-auto";

  switch (diagramId) {
    case "samwise":
      return (
        <div className="w-full rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] p-3 sm:p-4 overflow-x-auto thin-scrollbar">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--global-text-color-light)] mb-2">
            <span>pipeline :: hindi_prompt + video_frames → tracked_masks + edge_explanation</span>
            <span className="hidden sm:inline">SAM2 · RoBERTa · Qwen2.5-1.5B (4-bit)</span>
          </div>
          <svg
            viewBox="0 0 760 215"
            className={`${heightClass} min-w-[560px]`}
            role="img"
            aria-label="SAMWISE Multilingual architecture diagram showing video frames entering SAM2 visual backbone and Hindi text prompts entering RoBERTa encoder, fusing into spatial-temporal masks, with CME threshold triggering local 4-bit Qwen2.5-1.5B explanations."
          >
            <defs>
              <marker id="arrow-sam" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-text-color-light)" />
              </marker>
              <marker id="arrow-sam-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-theme-color)" />
              </marker>
            </defs>

            {/* Input 1: Video Frames */}
            <rect x="14" y="24" width="138" height="62" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="26" y="45" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">VIDEO STREAM</text>
            <text x="26" y="62" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">RGB Clip {`{I_t}`}</text>
            <text x="26" y="77" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">processed_clip.mp4</text>

            {/* Input 2: Hindi Prompt */}
            <rect x="14" y="122" width="138" height="68" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-theme-color)" strokeWidth="1.2" />
            <text x="26" y="142" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">HINDI PROMPT</text>
            <text x="26" y="160" fontSize="11" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">&quot;बिल्ली पेड़ पर...&quot;</text>
            <text x="26" y="177" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Multilingual query</text>

            {/* Encoder 1: SAM2 */}
            <line x1="152" y1="55" x2="188" y2="55" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-sam)" />
            <rect x="192" y="24" width="152" height="62" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="204" y="45" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">VISUAL BACKBONE</text>
            <text x="204" y="62" fontSize="12" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">SAM 2 Hierarchical</text>
            <text x="204" y="77" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Spatial-temporal feats</text>

            {/* Encoder 2: RoBERTa */}
            <line x1="152" y1="156" x2="188" y2="156" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-sam-accent)" />
            <rect x="192" y="122" width="152" height="68" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="204" y="142" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">TEXT ENCODER</text>
            <text x="204" y="160" fontSize="12" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Hindi-RoBERTa Base</text>
            <text x="204" y="177" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Patched Py3.12 engine</text>

            {/* Early Multimodal Fusion */}
            <path d="M 344 55 L 372 55 L 372 95 L 392 95" fill="none" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-sam)" />
            <path d="M 344 156 L 372 156 L 372 112 L 392 112" fill="none" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-sam-accent)" />

            <rect x="396" y="66" width="156" height="78" rx="4" fill="var(--global-code-bg-color)" stroke="var(--global-theme-color)" strokeWidth="1.3" />
            <text x="408" y="87" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">EARLY FUSION + CME</text>
            <text x="408" y="105" fontSize="12" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Cross-Modal Adapter</text>
            <text x="408" y="121" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Memory bank + CME</text>
            <text x="408" y="135" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">motion shift detector</text>

            {/* Output 1: Segmented Video */}
            <path d="M 552 86 L 588 55" fill="none" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-sam)" />
            <rect x="592" y="22" width="154" height="66" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="604" y="42" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--coding-green)" fontWeight="600">MASK TRACKING</text>
            <text x="604" y="59" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Grounded RVOS Masks</text>
            <text x="604" y="75" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">demo_output/*.mp4</text>

            {/* Output 2: Edge LLM Reasoning */}
            <path d="M 552 122 L 588 152" fill="none" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-sam-accent)" />
            <rect x="592" y="122" width="154" height="72" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-theme-color)" strokeDasharray="4 2" />
            <text x="604" y="142" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">EDGE-LLM REASONING</text>
            <text x="604" y="159" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Qwen2.5-1.5B (4-bit)</text>
            <text x="604" y="176" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Local shift explanation</text>
          </svg>
        </div>
      );

    case "habitat-vln":
      return (
        <div className="w-full rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] p-3 sm:p-4 overflow-x-auto thin-scrollbar">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--global-text-color-light)] mb-2">
            <span>agent_step :: (rgb_256x256, instruction) → discrete_action</span>
            <span className="hidden sm:inline">CLIP · GRU · Cross-Attention</span>
          </div>
          <svg
            viewBox="0 0 760 205"
            className={`${heightClass} min-w-[560px]`}
            role="img"
            aria-label="Habitat Vision-Language Navigation architecture diagram showing RGB 256x256 frame and natural language instruction encoded by CLIP ViT-B/32 into 512-d vectors, fused via cross-attention into a 512-unit GRU state encoder and linear policy head outputting discrete actions."
          >
            <defs>
              <marker id="arrow-vln" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-text-color-light)" />
              </marker>
              <marker id="arrow-vln-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-theme-color)" />
              </marker>
            </defs>

            {/* Inputs */}
            <rect x="14" y="22" width="145" height="62" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="25" y="42" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">HABITAT-SIM RGB</text>
            <text x="25" y="59" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Egocentric Frame</text>
            <text x="25" y="74" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">256 × 256 × 3 (.glb)</text>

            <rect x="14" y="118" width="145" height="62" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="25" y="138" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">R2R INSTRUCTION</text>
            <text x="25" y="155" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">&quot;Go to corridor...&quot;</text>
            <text x="25" y="170" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">No map · No GPS</text>

            {/* CLIP Encoders */}
            <line x1="159" y1="53" x2="191" y2="53" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-vln)" />
            <rect x="195" y="22" width="142" height="62" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="206" y="42" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">CLIP IMAGE</text>
            <text x="206" y="59" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">ViT-B/32 Encoder</text>
            <text x="206" y="74" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">→ 512-d embedding</text>

            <line x1="159" y1="149" x2="191" y2="149" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-vln)" />
            <rect x="195" y="118" width="142" height="62" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="206" y="138" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">CLIP TEXT</text>
            <text x="206" y="155" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Transformer</text>
            <text x="206" y="170" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">→ 512-d embedding</text>

            {/* Fusion + GRU */}
            <path d="M 337 53 L 362 53 L 362 92 L 380 92" fill="none" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-vln-accent)" />
            <path d="M 337 149 L 362 149 L 362 110 L 380 110" fill="none" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-vln-accent)" />

            <rect x="384" y="58" width="174" height="86" rx="4" fill="var(--global-code-bg-color)" stroke="var(--global-theme-color)" strokeWidth="1.3" />
            <text x="396" y="79" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">MULTIMODAL + MEMORY</text>
            <text x="396" y="97" fontSize="12" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Cross-Attention + GRU</text>
            <text x="396" y="114" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">1024-d aligned fusion</text>
            <text x="396" y="129" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">512-d recurrent state h_t</text>

            {/* Policy Head & Actions */}
            <line x1="558" y1="101" x2="588" y2="101" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-vln-accent)" />
            <rect x="592" y="42" width="154" height="118" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="604" y="62" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--coding-green)" fontWeight="600">POLICY HEAD (BC)</text>
            <text x="604" y="81" fontSize="11" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">• MOVE_FORWARD</text>
            <text x="604" y="99" fontSize="11" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">• TURN_LEFT</text>
            <text x="604" y="117" fontSize="11" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">• TURN_RIGHT</text>
            <text x="604" y="135" fontSize="11" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">• STOP</text>
            <text x="604" y="151" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Evaluated: SR · SPL · NE</text>
          </svg>
        </div>
      );

    case "serverless-go":
      return (
        <div className="w-full rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] p-3 sm:p-4 overflow-x-auto thin-scrollbar">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--global-text-color-light)] mb-2">
            <span>golambda :: HTTP API → bounded_chan[100] → goroutine_pool[N] → docker run --rm</span>
            <span className="hidden sm:inline">AWS EC2 · Go Concurrency</span>
          </div>
          <svg
            viewBox="0 0 760 205"
            className={`${heightClass} min-w-[560px]`}
            role="img"
            aria-label="Serverless Runtime GO architecture diagram showing HTTP API Gateway endpoints (/deploy, /invoke/:name, /metrics), thread-safe registry and atomic counters, bounded channel queue with goroutine worker pool, Runtime interface, and ephemeral Docker containers."
          >
            <defs>
              <marker id="arrow-go" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-text-color-light)" />
              </marker>
              <marker id="arrow-go-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-theme-color)" />
              </marker>
            </defs>

            {/* API Gateway */}
            <rect x="14" y="26" width="164" height="148" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="26" y="46" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">REST API GATEWAY</text>
            <text x="26" y="68" fontSize="10.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">POST /deploy</text>
            <text x="26" y="83" fontSize="9.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color-light)">Compile + RWMutex Reg</text>
            <text x="26" y="108" fontSize="10.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">POST /invoke/:name</text>
            <text x="26" y="123" fontSize="9.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color-light)">Enqueue or HTTP 429</text>
            <text x="26" y="148" fontSize="10.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--coding-green)">GET  /metrics</text>
            <text x="26" y="163" fontSize="9.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color-light)">sync/atomic snapshot</text>

            {/* Scheduler & Worker Pool */}
            <line x1="178" y1="100" x2="210" y2="100" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-go-accent)" />
            <rect x="214" y="26" width="184" height="148" rx="4" fill="var(--global-code-bg-color)" stroke="var(--global-theme-color)" strokeWidth="1.3" />
            <text x="226" y="46" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">SCHEDULER &amp; POOL</text>
            <rect x="226" y="56" width="160" height="32" rx="3" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="236" y="76" fontSize="10.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">chan InvocationJob</text>
            <rect x="226" y="98" width="76" height="30" rx="3" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="235" y="117" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">Worker 1</text>
            <rect x="310" y="98" width="76" height="30" rx="3" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="319" y="117" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">Worker N</text>
            <text x="226" y="150" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">context.WithTimeout(30s)</text>
            <text x="226" y="164" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Warm persistent goroutines</text>

            {/* Runtime Abstraction */}
            <line x1="398" y1="100" x2="430" y2="100" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-go)" />
            <rect x="434" y="52" width="136" height="96" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="445" y="73" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">ABSTRACTION</text>
            <text x="445" y="93" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Runtime Interface</text>
            <text x="445" y="112" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)">DockerRuntime</text>
            <text x="445" y="130" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Run(ctx, fn)</text>

            {/* Ephemeral Docker Containers */}
            <line x1="570" y1="100" x2="602" y2="100" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-go-accent)" />
            <rect x="606" y="26" width="140" height="148" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" strokeDasharray="4 2" />
            <text x="618" y="46" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--coding-green)" fontWeight="600">DOCKER DAEMON</text>
            <rect x="618" y="58" width="116" height="32" rx="3" fill="var(--global-surface-subtle)" stroke="var(--global-divider-color)" />
            <text x="626" y="78" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">fn: hello (--rm)</text>
            <rect x="618" y="98" width="116" height="32" rx="3" fill="var(--global-surface-subtle)" stroke="var(--global-divider-color)" />
            <text x="626" y="118" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">fn: compute (--rm)</text>
            <text x="618" y="150" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Isolated FS &amp; PID</text>
            <text x="618" y="164" fontSize="9.5" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Kill on deadline</text>
          </svg>
        </div>
      );

    case "uniswap":
      return (
        <div className="w-full rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] p-3 sm:p-4 overflow-x-auto thin-scrollbar">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--global-text-color-light)] mb-2">
            <span>uniswap :: @iitrpr.ac.in OTP → listings &amp; chat proposals → TrustScore(100 ± 20)</span>
            <span className="hidden sm:inline">100+ Campus Users</span>
          </div>
          <svg
            viewBox="0 0 760 195"
            className={`${heightClass} min-w-[560px]`}
            role="img"
            aria-label="UniSwap Campus Rental Marketplace architecture showing mobile/web client authenticated via institute email OTP, communicating with Node.js and Firebase Cloud Functions, syncing real-time chat proposals and TrustScore reputation in Firestore, and triggering scheduled SendGrid reminders."
          >
            <defs>
              <marker id="arrow-uni" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-text-color-light)" />
              </marker>
              <marker id="arrow-uni-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--global-theme-color)" />
              </marker>
            </defs>

            <rect x="14" y="34" width="150" height="124" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="26" y="55" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">STUDENT CLIENT</text>
            <text x="26" y="75" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">React Native / Web</text>
            <text x="26" y="96" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">• Item listings</text>
            <text x="26" y="113" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">• In-chat proposals</text>
            <text x="26" y="130" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">• Profile TrustScore</text>

            <line x1="164" y1="96" x2="196" y2="96" stroke="var(--global-theme-color)" strokeWidth="1.2" markerEnd="url(#arrow-uni-accent)" />

            <rect x="200" y="34" width="166" height="124" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="212" y="55" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">ACCESS &amp; BACKEND</text>
            <text x="212" y="75" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Node.js + Functions</text>
            <text x="212" y="96" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)">@iitrpr.ac.in OTP</text>
            <text x="212" y="114" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Proposal state machine</text>
            <text x="212" y="131" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Owner return confirm</text>

            <line x1="366" y1="96" x2="398" y2="96" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-uni)" />

            <rect x="402" y="34" width="166" height="124" rx="4" fill="var(--global-code-bg-color)" stroke="var(--global-theme-color)" strokeWidth="1.3" />
            <text x="414" y="55" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-theme-color)" fontWeight="600">REAL-TIME DATA</text>
            <text x="414" y="75" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">Cloud Firestore</text>
            <text x="414" y="96" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color)">TrustScore: 100 base</text>
            <text x="414" y="113" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--coding-green)">+20 on-time return</text>
            <text x="414" y="130" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">-20 overdue penalty</text>

            <line x1="568" y1="96" x2="600" y2="96" stroke="var(--global-text-color-light)" strokeWidth="1.2" markerEnd="url(#arrow-uni)" />

            <rect x="604" y="44" width="142" height="104" rx="4" fill="var(--global-card-bg-color)" stroke="var(--global-divider-strong)" />
            <text x="616" y="65" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">AUTOMATED CRON</text>
            <text x="616" y="85" fontSize="11.5" fontFamily="var(--font-roboto), sans-serif" fill="var(--global-text-color)" fontWeight="500">00:00 IST Worker</text>
            <text x="616" y="105" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">Due-date scan</text>
            <text x="616" y="122" fontSize="10" fontFamily="var(--font-ibm-mono), monospace" fill="var(--global-text-color-light)">SendGrid alerts</text>
          </svg>
        </div>
      );

    case "defect-tcd":
    default:
      return null;
  }
}
