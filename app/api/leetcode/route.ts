import { NextResponse } from "next/server";

export const revalidate = 3600;

const LEETCODE_USERNAME = "AqifAhmed";

const USER_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: USER_QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`LeetCode API responded with ${res.status}`);
    }

    const json = await res.json();
    const user = json.data?.matchedUser;
    const allQuestions = json.data?.allQuestionsCount;

    if (!user) {
      throw new Error("User not found");
    }

    const submissions: { difficulty: string; count: number }[] =
      user.submitStats?.acSubmissionNum ?? [];
    const totalQuestions: { difficulty: string; count: number }[] =
      allQuestions ?? [];

    const getSolved = (diff: string) =>
      submissions.find((s) => s.difficulty === diff)?.count ?? 0;
    const getTotal = (diff: string) =>
      totalQuestions.find((q) => q.difficulty === diff)?.count ?? 0;

    const totalSolved = getSolved("All");
    const easySolved = getSolved("Easy");
    const mediumSolved = getSolved("Medium");
    const hardSolved = getSolved("Hard");

    const totalAll = getTotal("All");
    const totalEasy = getTotal("Easy");
    const totalMedium = getTotal("Medium");
    const totalHard = getTotal("Hard");

    const ranking = user.profile?.ranking ?? 0;

    return NextResponse.json({
      totalSolved,
      easy: { solved: easySolved, total: totalEasy },
      medium: { solved: mediumSolved, total: totalMedium },
      hard: { solved: hardSolved, total: totalHard },
      totalQuestions: totalAll,
      ranking,
      username: LEETCODE_USERNAME,
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      {
        totalSolved: 0,
        easy: { solved: 0, total: 0 },
        medium: { solved: 0, total: 0 },
        hard: { solved: 0, total: 0 },
        totalQuestions: 0,
        ranking: 0,
        username: LEETCODE_USERNAME,
        error: true,
      },
      { status: 500 }
    );
  }
}
