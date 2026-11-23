"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import type { LeetCodeCalendarPayload } from "@/lib/leetcode";
import { portfolioConfig } from "@/data/portfolio";

interface DayCell {
  dateStr: string;
  label: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  inRange: boolean;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function computeIntensity(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

function buildYearGrid(dailyCounts: Record<string, number>) {
  // Anchor end date to latest date in dataset if ahead of system clock, or today UTC
  const now = new Date();
  const todayUtc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  // Start 52 weeks back aligned to Sunday
  const startUtc = new Date(todayUtc);
  startUtc.setUTCDate(todayUtc.getUTCDate() - 364);
  const startDayOfWeek = startUtc.getUTCDay();
  startUtc.setUTCDate(startUtc.getUTCDate() - startDayOfWeek);

  const weeks: DayCell[][] = [];
  const monthLabels: Array<{ weekIndex: number; label: string }> = [];

  const cursor = new Date(startUtc);
  let lastMonth = -1;
  let weekIdx = 0;

  while (cursor <= todayUtc) {
    const week: DayCell[] = [];
    for (let d = 0; d < 7; d++) {
      const inRange = cursor <= todayUtc;
      const dateStr = cursor.toISOString().slice(0, 10);
      const count = inRange ? dailyCounts[dateStr] || 0 : 0;
      const month = cursor.getUTCMonth();

      if (d === 0 && month !== lastMonth && inRange) {
        monthLabels.push({ weekIndex: weekIdx, label: MONTH_NAMES[month] });
        lastMonth = month;
      }

      const formattedDate = cursor.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });

      week.push({
        dateStr,
        label: formattedDate,
        count,
        level: computeIntensity(count),
        inRange,
      });

      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
    weekIdx += 1;
  }

  return { weeks, monthLabels };
}

export function LeetCodeHeatmap({
  initialData,
}: {
  initialData?: LeetCodeCalendarPayload;
}) {
  const [data, setData] = useState<LeetCodeCalendarPayload | null>(
    initialData ?? null
  );
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<DayCell | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leetcode");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json: LeetCodeCalendarPayload = await res.json();
      setData(json);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load LeetCode data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      refreshData();
    }
  }, [initialData]);

  const { weeks, monthLabels } = useMemo(
    () => buildYearGrid(data?.dailyCounts || {}),
    [data]
  );

  const totalSubmissionsYear = useMemo(() => {
    if (!data?.dailyCounts) return 0;
    return Object.values(data.dailyCounts).reduce((acc, v) => acc + v, 0);
  }, [data]);

  const levelBgClass: Record<0 | 1 | 2 | 3 | 4, string> = {
    0: "bg-[var(--lc-level-0)]",
    1: "bg-[var(--lc-level-1)]",
    2: "bg-[var(--lc-level-2)]",
    3: "bg-[var(--lc-level-3)]",
    4: "bg-[var(--lc-level-4)]",
  };

  const formattedUpdated = data?.fetchedAt
    ? new Date(data.fetchedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section
      id="leetcode"
      aria-labelledby="leetcode-heading"
      className="editorial-section"
    >
      <div className="section-rail">
        <h2 id="leetcode-heading" className="section-rail-label">
          LeetCode Activity
        </h2>
      </div>

      <div className="min-w-0">
        {/* Top summary line */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <div>
            <p className="text-[15px] text-[var(--global-text-color)]">
              Algorithmic practice &amp; submission history ·{" "}
              <span className="stat-highlight">1700+ Max Contest Rating</span> ·{" "}
              <span className="stat-highlight">950+ Problems Solved</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-[13px]">
            <a
              href={data?.profileUrl || portfolioConfig.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 dashed-link font-mono text-[12px]"
            >
              <span>@{data?.username || portfolioConfig.links.leetcodeUsername}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--global-theme-color)]" />
            </a>

            <button
              type="button"
              onClick={refreshData}
              disabled={loading}
              aria-label="Refresh LeetCode activity"
              className="inline-flex items-center gap-1 font-mono text-[11.5px] text-[var(--global-text-color-light)] hover:text-[var(--global-theme-color)] disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3 h-3 ${loading ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              <span>sync</span>
            </button>
          </div>
        </div>

        {/* Verified live profile statistics row */}
        {data && data.source !== "unavailable" && (
          <div className="mb-3.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[12px] text-[var(--global-text-color-secondary)]">
            {data.stats.totalSolved !== null && (
              <span>
                Solved:{" "}
                <strong className="font-medium text-[var(--global-text-color)]">
                  {data.stats.totalSolved}
                </strong>
              </span>
            )}
            {data.stats.easySolved !== null && (
              <span>
                Easy:{" "}
                <strong className="font-medium text-[var(--coding-green)]">
                  {data.stats.easySolved}
                </strong>
              </span>
            )}
            {data.stats.mediumSolved !== null && (
              <span>
                Medium:{" "}
                <strong className="font-medium text-[var(--global-text-color)]">
                  {data.stats.mediumSolved}
                </strong>
              </span>
            )}
            {data.stats.hardSolved !== null && (
              <span>
                Hard:{" "}
                <strong className="font-medium text-[var(--global-text-color)]">
                  {data.stats.hardSolved}
                </strong>
              </span>
            )}
            {data.stats.totalActiveDays !== null && (
              <span>Active days: {data.stats.totalActiveDays}</span>
            )}
            {data.stats.streak !== null && data.stats.streak > 0 && (
              <span>Streak: {data.stats.streak}d</span>
            )}
            <span>Submissions (12m): {totalSubmissionsYear}</span>
          </div>
        )}

        {/* Contribution calendar container */}
        <div className="rounded border border-[var(--global-divider-color)] bg-[var(--term-bg)] p-3.5 sm:p-4">
          {loading && !data ? (
            <div className="py-8 text-center font-mono text-[12.5px] text-[var(--global-text-color-light)]">
              Loading LeetCode submission calendar...
            </div>
          ) : error && !data ? (
            <div className="py-6 text-center text-[13.5px] text-[var(--global-text-color-light)]">
              Could not retrieve LeetCode calendar ({error}). Configure{" "}
              <code className="inline-code">NEXT_PUBLIC_LEETCODE_USERNAME</code>{" "}
              or run <code className="inline-code">npm run sync:leetcode</code>.
            </div>
          ) : data?.source === "unavailable" ? (
            <div className="py-6 text-center text-[13.5px] text-[var(--global-text-color-light)]">
              No public calendar returned for{" "}
              <code className="inline-code">{data.username}</code>.{" "}
              {data.message}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto thin-scrollbar pb-1.5">
                <div className="inline-block min-w-max">
                  {/* Month Labels */}
                  <div className="relative h-4 ml-7 mb-1 text-[10px] font-mono text-[var(--global-text-color-light)]">
                    {monthLabels.map((m, idx) => (
                      <span
                        key={`${m.label}-${idx}`}
                        style={{ left: `${m.weekIndex * 13}px` }}
                        className="absolute top-0"
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-start gap-1.5">
                    {/* Weekday Labels */}
                    <div
                      aria-hidden="true"
                      className="grid grid-rows-7 gap-[3px] text-[9.5px] font-mono text-[var(--global-text-color-light)] pr-1 leading-[10px]"
                    >
                      <span className="h-[10px]" />
                      <span className="h-[10px]">Mon</span>
                      <span className="h-[10px]" />
                      <span className="h-[10px]">Wed</span>
                      <span className="h-[10px]" />
                      <span className="h-[10px]">Fri</span>
                      <span className="h-[10px]" />
                    </div>

                    {/* 53-week x 7-day grid */}
                    <div
                      role="grid"
                      aria-label={`LeetCode submission calendar for ${data?.username}`}
                      className="flex gap-[3px]"
                    >
                      {weeks.map((week, wIdx) => (
                        <div
                          key={wIdx}
                          role="row"
                          className="grid grid-rows-7 gap-[3px]"
                        >
                          {week.map((cell) =>
                            cell.inRange ? (
                              <button
                                key={cell.dateStr}
                                type="button"
                                role="gridcell"
                                onMouseEnter={() => setActiveTooltip(cell)}
                                onFocus={() => setActiveTooltip(cell)}
                                onMouseLeave={() => setActiveTooltip(null)}
                                onBlur={() => setActiveTooltip(null)}
                                aria-label={`${cell.count} ${
                                  cell.count === 1
                                    ? "submission"
                                    : "submissions"
                                } on ${cell.label}`}
                                className={`w-[10px] h-[10px] rounded-[2px] ${
                                  levelBgClass[cell.level]
                                } border border-black/[0.04] dark:border-white/[0.04] transition-transform hover:scale-125 focus:scale-125`}
                              />
                            ) : (
                              <span
                                key={cell.dateStr}
                                aria-hidden="true"
                                className="w-[10px] h-[10px] rounded-[2px] opacity-0 pointer-events-none"
                              />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer bar: Hover/Focus readout + Intensity Legend + Last updated */}
              <div className="mt-2.5 pt-2 border-t border-[var(--global-divider-color)] flex flex-wrap items-center justify-between gap-2 text-[11.5px] font-mono text-[var(--global-text-color-light)]">
                <div aria-live="polite" className="min-h-[18px]">
                  {activeTooltip ? (
                    <span className="text-[var(--global-text-color)]">
                      <strong>{activeTooltip.count}</strong>{" "}
                      {activeTooltip.count === 1 ? "submission" : "submissions"}{" "}
                      on {activeTooltip.label}
                    </span>
                  ) : (
                    <span>
                      {data?.source === "live-graphql"
                        ? `Live data · updated ${formattedUpdated}`
                        : `Cached snapshot (${formattedUpdated})`}
                    </span>
                  )}
                </div>

                <div
                  className="flex items-center gap-1"
                  aria-label="Activity intensity legend"
                >
                  <span>Less</span>
                  {([0, 1, 2, 3, 4] as const).map((lvl) => (
                    <span
                      key={lvl}
                      className={`inline-block w-[10px] h-[10px] rounded-[2px] ${levelBgClass[lvl]} border border-black/[0.05]`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>

              {data?.stale && data.message && (
                <p className="mt-1.5 text-[11px] font-mono text-[var(--global-text-color-light)]">
                  Note: {data.message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
