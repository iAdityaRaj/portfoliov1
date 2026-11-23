import fallbackData from "@/data/leetcode-fallback.json";

export interface LeetCodeStats {
  totalSolved: number | null;
  easySolved: number | null;
  mediumSolved: number | null;
  hardSolved: number | null;
  streak: number | null;
  totalActiveDays: number | null;
}

export interface LeetCodeCalendarPayload {
  username: string;
  profileUrl: string;
  fetchedAt: string;
  source: "live-graphql" | "fallback-snapshot" | "unavailable";
  stale: boolean;
  message?: string;
  stats: LeetCodeStats;
  /** Map of YYYY-MM-DD (UTC) -> submission count */
  dailyCounts: Record<string, number>;
}

const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

const USER_PROFILE_QUERY = `
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

export function epochMapToDateMap(
  rawCalendar: Record<string, number>
): Record<string, number> {
  const daily: Record<string, number> = {};
  for (const [epochStr, count] of Object.entries(rawCalendar)) {
    const seconds = Number(epochStr);
    if (!Number.isFinite(seconds) || typeof count !== "number") continue;
    const date = new Date(seconds * 1000);
    const key = date.toISOString().slice(0, 10);
    daily[key] = (daily[key] || 0) + count;
  }
  return daily;
}

export async function fetchLeetCodeActivity(
  requestedUsername?: string
): Promise<LeetCodeCalendarPayload> {
  const username =
    requestedUsername?.trim() ||
    process.env.LEETCODE_USERNAME ||
    process.env.NEXT_PUBLIC_LEETCODE_USERNAME ||
    fallbackData.username;

  const profileUrl =
    process.env.NEXT_PUBLIC_LEETCODE_PROFILE_URL ||
    `https://leetcode.com/u/${encodeURIComponent(username)}/`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "AdityaRajPortfolio/1.0",
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username },
      }),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`LeetCode GraphQL returned HTTP ${response.status}`);
    }

    const json = await response.json();
    const matched = json?.data?.matchedUser;

    if (!matched) {
      throw new Error(`No public LeetCode profile matched '${username}'`);
    }

    const acList: Array<{ difficulty: string; count: number }> =
      matched?.submitStatsGlobal?.acSubmissionNum || [];

    const findCount = (diff: string): number | null => {
      const entry = acList.find((x) => x.difficulty === diff);
      return typeof entry?.count === "number" ? entry.count : null;
    };

    const rawCalendarStr: string = matched?.userCalendar?.submissionCalendar || "{}";
    const parsedCalendar: Record<string, number> = JSON.parse(rawCalendarStr);

    return {
      username: matched.username || username,
      profileUrl,
      fetchedAt: new Date().toISOString(),
      source: "live-graphql",
      stale: false,
      stats: {
        totalSolved: findCount("All"),
        easySolved: findCount("Easy"),
        mediumSolved: findCount("Medium"),
        hardSolved: findCount("Hard"),
        streak:
          typeof matched?.userCalendar?.streak === "number"
            ? matched.userCalendar.streak
            : null,
        totalActiveDays:
          typeof matched?.userCalendar?.totalActiveDays === "number"
            ? matched.userCalendar.totalActiveDays
            : null,
      },
      dailyCounts: epochMapToDateMap(parsedCalendar),
    };
  } catch (err) {
    // Only fall back to local snapshot if it belongs to the same configured username
    const isSameUser =
      fallbackData.username.toLowerCase() === username.toLowerCase();

    if (isSameUser) {
      return {
        username: fallbackData.username,
        profileUrl,
        fetchedAt: fallbackData.fetchedAt,
        source: "fallback-snapshot",
        stale: true,
        message:
          err instanceof Error
            ? `Live LeetCode endpoint unreachable (${err.message}); showing cached snapshot.`
            : "Live LeetCode endpoint unreachable; showing cached snapshot.",
        stats: fallbackData.stats,
        dailyCounts: epochMapToDateMap(
          fallbackData.submissionCalendar as Record<string, number>
        ),
      };
    }

    return {
      username,
      profileUrl,
      fetchedAt: new Date().toISOString(),
      source: "unavailable",
      stale: true,
      message:
        err instanceof Error
          ? err.message
          : "Unable to fetch LeetCode submission calendar.",
      stats: {
        totalSolved: null,
        easySolved: null,
        mediumSolved: null,
        hardSolved: null,
        streak: null,
        totalActiveDays: null,
      },
      dailyCounts: {},
    };
  }
}
