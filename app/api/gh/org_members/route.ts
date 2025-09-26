import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

type MinimalUserType = {
    login: string;
    avatar_url: string;
    html_url: string;
    user_view_type: string;
};

export async function GET(request: NextRequest) {

    const octokit = new Octokit({
        auth: process.env.GITHUB_API_KEY
    });

    return await octokit.request(`GET /orgs/${process.env.GITHUB_ORG}/members`, {
        org: 'ORG',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then((res) => {
        let simplifiedData = res.data.map((user: MinimalUserType) => {
            if (user.user_view_type === "public") {
                return {
                    login: user.login,
                    avatar_url: user.avatar_url,
                    html_url: user.html_url
                }
            }
        });
        return NextResponse.json(simplifiedData, { status: 200 });
    }).catch((err) => {
        console.error(`Error retrieving Github Organization members:`, err);
        return NextResponse.json(
            { error: "Failed to load project data" },
            { status: 500 }
        );
    });

}