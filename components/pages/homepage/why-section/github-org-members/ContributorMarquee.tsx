"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Member = {
    login: string;
    avatar_url: string;
    html_url: string;
};

type Props = {
    members: Member[];
    loading: boolean;
    className?: string;
};

const ROWS = 3;
const AVATAR = 56;
// Avatars one copy of a row must hold so a loop never shows a gap, even at the
// widest mobile viewport (md = 768px; 56px avatar + 8px margin = 64px each).
const MIN_PER_COPY = 13;
// Rows 1 and 3 move right, row 2 moves left.
const DIRECTIONS = ["right", "left", "right"] as const;
// Subtle per-row speed differences so the rows don't move in lockstep.
const SPEED = [1, 0.9, 0.8];

/** Round-robin split: balanced rows, each contributor in exactly one. */
function splitRows(members: Member[]): Member[][] {
    const rows: Member[][] = Array.from({ length: ROWS }, () => []);
    members.forEach((m, i) => rows[i % ROWS].push(m));
    return rows.filter((row) => row.length > 0);
}

/**
 * Mobile contributor wall: three single-line rows that loop forever. Each track
 * holds the row twice (half A, half B) and slides by exactly -50%, so the loop
 * is seamless. Only the very first set in half A is real content; every other
 * copy is aria-hidden and out of the tab order. Pauses on hover, press-and-hold
 * and focus-within; under prefers-reduced-motion the rows stand still and only
 * the real set is shown, scrollable sideways (see .avatar-marquee in globals.scss).
 */
export default function ContributorMarquee({ members, loading, className = "" }: Props) {
    const [held, setHeld] = useState(false);

    if (loading) {
        return (
            <div className={`space-y-3 pt-10 pb-12 ${className}`} aria-hidden="true">
                {Array.from({ length: ROWS }).map((_, r) => (
                    <div key={r} className="flex justify-center gap-2 overflow-hidden">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="shrink-0 rounded-full bg-secondary motion-safe:animate-pulse"
                                style={{ width: AVATAR, height: AVATAR }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    if (members.length === 0) return null;

    const rows = splitRows(members);

    return (
        <div
            className={`avatar-marquee-group space-y-2 pt-10 pb-12 ${className}`}
            data-paused={held || undefined}
            onPointerDown={() => setHeld(true)}
            onPointerUp={() => setHeld(false)}
            onPointerCancel={() => setHeld(false)}
            onPointerLeave={() => setHeld(false)}
        >
            {rows.map((row, r) => {
                const repeats = Math.max(1, Math.ceil(MIN_PER_COPY / row.length));
                const perCopy = row.length * repeats;
                const seconds = Math.min(45, Math.max(30, perCopy * 2 * SPEED[r]));
                // Half A and half B: `repeats` copies of the row each.
                const copies = repeats * 2;
                return (
                    <div key={r} className="avatar-marquee">
                        <div
                            className="avatar-marquee-track"
                            data-direction={DIRECTIONS[r]}
                            style={{ "--marquee-duration": `${seconds.toFixed(1)}s` } as CSSProperties}
                        >
                            {Array.from({ length: copies }).flatMap((_, c) =>
                                row.map((member) => (
                                    <Avatar key={`${c}-${member.login}`} member={member} clone={c > 0} />
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function Avatar({ member, clone = false }: { member: Member; clone?: boolean }) {
    const link = (
        <a
            href={member.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mr-2 block shrink-0 rounded-full ${clone ? "avatar-marquee-clone" : ""}`}
            {...(clone ? { "aria-hidden": true, tabIndex: -1 } : {})}
        >
            <Image
                src={member.avatar_url}
                alt={clone ? "" : member.login}
                width={AVATAR}
                height={AVATAR}
                draggable={false}
                className="rounded-full border border-border object-cover"
            />
        </a>
    );

    if (clone) return link;

    return (
        <Tooltip>
            <TooltipTrigger asChild>{link}</TooltipTrigger>
            <TooltipContent>
                <p>{member.login}</p>
            </TooltipContent>
        </Tooltip>
    );
}
