import { NextResponse } from "next/server";

export const revalidate = 3600;

const GITHUB_USERNAME = "AqifAhmed";

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } } // cache for 1 hour
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const data = await res.json();

    // Extract total contributions
    const total: number = data.total?.lastYear ?? 0;

    // Get last 12 weeks of weekly contribution totals for the bar chart
    const contributions: { date: string; count: number; level: number }[] =
      data.contributions ?? [];

    // Group by week (7-day chunks from the end) and take last 12 weeks
    const weeks: number[] = [];
    for (let i = contributions.length; i > 0; i -= 7) {
      const weekSlice = contributions.slice(Math.max(i - 7, 0), i);
      const weekTotal = weekSlice.reduce((sum, d) => sum + d.count, 0);
      weeks.unshift(weekTotal);
    }
    const recentWeeks = weeks.slice(-12);
    const maxWeek = Math.max(...recentWeeks, 1);
    const barHeights = recentWeeks.map((w) =>
      Math.round((w / maxWeek) * 100)
    );

    return NextResponse.json({
      total,
      barHeights,
      username: GITHUB_USERNAME,
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { total: 0, barHeights: [], username: GITHUB_USERNAME, error: true },
      { status: 500 }
    );
  }
}
