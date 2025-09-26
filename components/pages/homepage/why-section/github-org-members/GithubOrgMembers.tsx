"use client";

import { useEffect, useState } from "react";

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
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) return <p>Loading members...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-wrap justify-center gap-2 md:px-16 lg:px-48 py-16">
            {members.map((member) => (
                <a
                    key={member.login}
                    href={member.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={member.login}
                    className="block"
                >
                    <img
                        src={member.avatar_url}
                        alt={member.login}
                        className="w-16 h-16 rounded-full object-cover hover:scale-105 transition-transform"
                    />
                </a>
            ))}
        </div>
    );
}
