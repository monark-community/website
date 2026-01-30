import { NextResponse } from "next/server";
import { Octokit } from "octokit";

type ContributorType = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const repo = url.searchParams.get("repo"); // ?repo=repository-name
  const org = process.env.GITHUB_ORG;

  if (!repo) {
    return NextResponse.json(
      { error: "Missing repo query parameter" },
      { status: 400 }
    );
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY
  });

  try {
    const res = await octokit.request(`GET /repos/${org}/${repo}/contributors`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    const simplifiedData = res.data.map((contributor: ContributorType) => ({
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions
    }));

    return NextResponse.json(simplifiedData, { status: 200 });
  } catch (err) {
    console.error("Error retrieving contributors for %s/%s:", org, repo, err);
    return NextResponse.json(
      { error: "Failed to load contributor data" },
      { status: 500 }
    );
  }
}
