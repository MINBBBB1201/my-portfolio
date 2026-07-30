import { NextResponse } from "next/server";

const REVALIDATE_SECONDS = 60 * 60 * 6; // 6 hours

const REPOS = [
  "COSMOS-Aero-Engineering/Rocket-Thrust-Test-Stand",
  "COSMOS-Aero-Engineering/COSMOS-Aeroview-Windtunnel",
];

interface RepoActivity {
  repo: string;
  owner: string;
  description: string | null;
  stars: number | null;
  commitCount: number | null;
  lastCommitDate: string | null;
  url: string;
}

function parseLastPageFromLinkHeader(linkHeader: string | null): number | null {
  if (!linkHeader) return null;
  const match = linkHeader.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
  return match ? parseInt(match[1], 10) : null;
}

async function getRepoActivity(fullName: string): Promise<RepoActivity> {
  const [owner, repo] = fullName.split("/");
  const headers = { Accept: "application/vnd.github+json" };

  const result: RepoActivity = {
    repo,
    owner,
    description: null,
    stars: null,
    commitCount: null,
    lastCommitDate: null,
    url: `https://github.com/${fullName}`,
  };

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${fullName}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers,
    });
    if (repoRes.ok) {
      const repoData = (await repoRes.json()) as {
        description?: string | null;
        stargazers_count?: number;
      };
      result.description = repoData.description ?? null;
      result.stars =
        typeof repoData.stargazers_count === "number"
          ? repoData.stargazers_count
          : null;
    }
  } catch {
    // ignore, defaults stay null
  }

  try {
    const commitsRes = await fetch(
      `https://api.github.com/repos/${fullName}/commits?per_page=1`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
        headers,
      }
    );
    if (commitsRes.ok) {
      const lastPage = parseLastPageFromLinkHeader(
        commitsRes.headers.get("link")
      );
      const commits = (await commitsRes.json()) as Array<{
        commit?: { author?: { date?: string } };
      }>;
      result.commitCount = lastPage ?? (commits.length > 0 ? 1 : 0);
      result.lastCommitDate = commits[0]?.commit?.author?.date ?? null;
    }
  } catch {
    // ignore, defaults stay null
  }

  return result;
}

export async function GET() {
  const activity = await Promise.all(REPOS.map(getRepoActivity));
  return NextResponse.json({ repos: activity });
}
