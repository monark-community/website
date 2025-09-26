"use client";

import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type OrgMember = {
    login: string;
    avatar_url: string;
    html_url: string;
};

export default function GithubOrgMembers() {
    const [members, setMembers] = useState<OrgMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch("/api/gh/org_members");
                if (!res.ok) throw new Error("Failed to fetch members");
                const data: OrgMember[] = await res.json();
                setMembers(data);
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
    }, []);

    if (error) return null; // render nothing on error

    return (
        <TooltipProvider>
            <div className="flex flex-wrap justify-center gap-2 md:px-16 lg:px-48 py-16">
                {loading
                    ? Array.from({ length: 8 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"
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
                                    <img
                                        src={member.avatar_url}
                                        alt={member.login}
                                        className="w-16 h-16 rounded-full object-cover hover:scale-105 transition-transform"
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
