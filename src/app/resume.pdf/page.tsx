import React from "react";
import Link from "next/link";

export default function ResumePlaceholderPage() {
  return (
    <div className="max-w-editorial mx-auto px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-wider text-[var(--global-theme-color)]">
        Resume Slot Ready
      </p>
      <h1 className="mt-2 text-2xl font-normal text-[var(--global-text-color)]">
        Add <code className="inline-code">public/resume.pdf</code> to enable direct PDF download
      </h1>
      <p className="mt-3 text-[15px] text-[var(--global-text-color-secondary)] max-w-[60ch]">
        Drop your exported resume PDF into the <code className="inline-code">public/</code> directory named{" "}
        <code className="inline-code">resume.pdf</code>. Next.js will automatically serve the static PDF at{" "}
        <code className="inline-code">/resume.pdf</code> instead of this notice.
      </p>
      <div className="mt-6">
        <Link href="/" className="dashed-link text-sm">
          ← Return to portfolio
        </Link>
      </div>
    </div>
  );
}
