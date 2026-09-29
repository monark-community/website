import React from "react";
import { accentClasses, ParticipateIcon } from "./participate-icon";
import { ParticipateAccent, ParticipateIconName } from "./participate.types";

type Props = {
  icon: ParticipateIconName;
  accent: ParticipateAccent;
  className?: string;
};

// Node positions on the two orbits (degrees). The same composition on every
// participate page keeps them a family; the icon and the accent change.
const outer = [-150, -35, 70, 160];
const inner = [-95, 20, 125];

function point(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: 140 + r * Math.cos(a), y: 120 + r * Math.sin(a) };
}

/**
 * Hero line art: the page's icon at the centre of two orbits of nodes, drawn
 * as flat strokes with rounded caps (brand guidelines §6), in the accent.
 * Purely decorative.
 */
function ParticipateArt({ icon, accent, className = "" }: Props) {
  const tone = accentClasses[accent].text;
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[7/6] select-none ${tone} ${className}`}
    >
      <svg
        viewBox="0 0 280 240"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="absolute inset-0 size-full"
      >
        <circle cx="140" cy="120" r="104" strokeOpacity={0.3} />
        <circle cx="140" cy="120" r="70" strokeOpacity={0.55} strokeDasharray="2 7" />
        {outer.map((deg) => {
          const from = point(44, deg);
          const to = point(98, deg);
          return (
            <line
              key={`l${deg}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              strokeOpacity={0.45}
            />
          );
        })}
        <circle cx="140" cy="120" r="40" className="fill-card" />
        {outer.map((deg) => {
          const p = point(104, deg);
          return (
            <circle key={`o${deg}`} cx={p.x} cy={p.y} r="7" className="fill-background" />
          );
        })}
        {inner.map((deg) => {
          const p = point(70, deg);
          return <circle key={`i${deg}`} cx={p.x} cy={p.y} r="4" fill="currentColor" stroke="none" />;
        })}
      </svg>
      <ParticipateIcon
        name={icon}
        strokeWidth={1.5}
        className="absolute left-1/2 top-1/2 size-[17%] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export default ParticipateArt;
