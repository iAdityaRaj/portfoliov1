#!/usr/bin/env node
/**
 * Syncs live LeetCode submission calendar & solved counts into
 * src/data/leetcode-fallback.json so offline/static builds stay fresh.
 *
 * Usage:
 *   LEETCODE_USERNAME=your_handle node scripts/sync-leetcode.mjs
 */

import fs from "node:fs";
import path from "node:path";

const username =
  process.env.LEETCODE_USERNAME ||
  process.env.NEXT_PUBLIC_LEETCODE_USERNAME ||
  "aaediie";

const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

async function main() {
  console.log(`Fetching LeetCode profile for '${username}'...`);
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables: { username } }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const json = await res.json();
  const matched = json?.data?.matchedUser;
  if (!matched) {
    throw new Error(`No LeetCode user found for '${username}'`);
  }

  const ac = matched.submitStatsGlobal?.acSubmissionNum || [];
  const getCount = (d) => ac.find((x) => x.difficulty === d)?.count ?? null;

  const payload = {
    username: matched.username || username,
    profileUrl: `https://leetcode.com/u/${matched.username || username}/`,
    fetchedAt: new Date().toISOString(),
    source: "fallback-snapshot",
    stats: {
      totalSolved: getCount("All"),
      easySolved: getCount("Easy"),
      mediumSolved: getCount("Medium"),
      hardSolved: getCount("Hard"),
      streak: matched.userCalendar?.streak ?? null,
      totalActiveDays: matched.userCalendar?.totalActiveDays ?? null,
    },
    submissionCalendar: JSON.parse(
      matched.userCalendar?.submissionCalendar || "{}"
    ),
  };

  const outPath = path.join(
    process.cwd(),
    "src",
    "data",
    "leetcode-fallback.json"
  );
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`Saved snapshot to ${outPath}`);
}

main().catch((err) => {
  console.error("Failed to sync LeetCode snapshot:", err.message);
  process.exit(1);
});
