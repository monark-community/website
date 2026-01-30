import { NextResponse } from "next/server";
import { Octokit } from "octokit";

type MinimalUserType = {
    login: string;
    avatar_url: string;
    html_url: string;
    user_view_type?: string;
};

export async function GET() {

    try {
        const octokit = new Octokit({
            auth: process.env.GITHUB_API_KEY,
        });

        const members = await octokit.paginate(
            "GET /orgs/{org}/members",
            {
                org: process.env.GITHUB_ORG!,
                per_page: 100,
            }
        );

        const simplifiedData = members
            .filter((user: MinimalUserType) => user.user_view_type === "public")
            .map((user: MinimalUserType) => ({
                login: user.login,
                avatar_url: user.avatar_url,
                html_url: user.html_url,
            }));

        return NextResponse.json(simplifiedData, { status: 200 });
    } catch (err) {
        console.error("Error retrieving Github Organization members:", err);
        return NextResponse.json(
            { error: "Failed to load project data" },
            { status: 500 }
        );
    }

}