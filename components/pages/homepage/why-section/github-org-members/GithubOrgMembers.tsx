"use client";

import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";

type OrgMember = {
    login: string;
    avatar_url: string;
    html_url: string;
};

interface GithubOrgMembersProps {
    repo?: string | string[]; // support string or array of repo names
}

const BLACKLISTED_LOGINS = ["lovable-dev[bot]", "dependabot[bot]", "claude", "TimLethbridge"];

// Module-level cache: deduplicates identical fetches across component instances and re-renders
const fetchCache = new Map<string, Promise<OrgMember[]>>();

function cachedFetch(url: string): Promise<OrgMember[]> {
    const existing = fetchCache.get(url);
    if (existing) return existing;
    const promise = fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
            return res.json() as Promise<OrgMember[]>;
        })
        .catch((err) => {
            fetchCache.delete(url);
            throw err;
        });
    fetchCache.set(url, promise);
    return promise;
}

export default function GithubOrgMembers({ repo }: GithubOrgMembersProps) {
    const [members, setMembers] = useState<OrgMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const normalizeRepoName = (r: string) => {
        try {
            const parts = r.split("/");
            return parts[parts.length - 1];
        } catch {
            return r;
        }
    };

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            setError(null);

            try {
                let repos: string[] = [];
                if (!repo) {
                    repos = [];
                } else if (Array.isArray(repo)) {
                    repos = repo;
                } else {
                    repos = [repo];
                }

                const fetchedMembers: OrgMember[] = [];

                if (repos.length === 0) {
                    const data = await cachedFetch("/api/gh/org_contributors");
                    fetchedMembers.push(...data);
                } else {
                    const results = await Promise.allSettled(
                        repos.map((r) => {
                            const repoName = normalizeRepoName(r);
                            return cachedFetch(`/api/gh/repo_contributors/?repo=${repoName}`);
                        })
                    );

                    const successfulResults = results
                        .filter((r): r is PromiseFulfilledResult<OrgMember[]> => r.status === "fulfilled")
                        .map((r) => r.value)
                        .flat();
                    fetchedMembers.push(...successfulResults);
                }

                // Filter out blacklisted logins
                const filteredMembers = fetchedMembers.filter(
                    (m) => !BLACKLISTED_LOGINS.includes(m.login)
                );

                // Remove duplicates by login
                const uniqueMembers = Array.from(
                    new Map(filteredMembers.map((m) => [m.login, m])).values()
                );

                setMembers(uniqueMembers);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err);
                    setError(err.message);
                } else {
                    console.error("Unknown error", err);
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [repo, BLACKLISTED_LOGINS]);

    if (error) return null;

    // Adjust styling depending on whether repo is provided
    const containerClass = repo
        ? "mt-2 flex flex-wrap gap-1"
        : "flex flex-wrap justify-center gap-2 py-16";

    const avatarSize = repo ? 32 : 64;

    return (
        <TooltipProvider>
            <div className={containerClass}>
                {loading
                    ? Array.from({ length: 32 }).map((_, idx) => (
                        <div
                            key={idx}
                            className={`rounded-full bg-card animate-pulse`}
                            style={{ width: avatarSize, height: avatarSize }}
                        />
                    ))
                    : members.map((member) => (
                        <Tooltip key={member.login}>
                            <TooltipTrigger asChild>
                                <a
                                    href={member.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Image
                                        src={member.avatar_url}
                                        alt={member.login}
                                        width={avatarSize}
                                        height={avatarSize}
                                        className="rounded-full object-cover hover:scale-105 transition-transform"
                                    />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{member.login}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
            </div>
        </TooltipProvider>
    );
}
