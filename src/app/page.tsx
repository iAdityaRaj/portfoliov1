import React from "react";
import { fetchLeetCodeActivity } from "@/lib/leetcode";
import { PortfolioClientShell } from "@/components/PortfolioClientShell";

export default async function HomePage() {
  const leetCodeData = await fetchLeetCodeActivity();

  return <PortfolioClientShell initialLeetCode={leetCodeData} />;
}
