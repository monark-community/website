"use client";

import { ReactNode, useState } from "react";
import { RoadmapStage, stageOf } from "./roadmap-stage";

export interface RoadmapMilestone {
  file: string;
  title: string;
  status: string;
  /** First slot on the timeline (1-based). Defaults to right after the previous phase. */
  start?: number;
  /** Number of slots the phase covers. Defaults to 1. */
  span?: number;
  /** Description, rendered from MDX on the server. */
  content: ReactNode;
}

interface Props {
  milestones: RoadmapMilestone[];
  labels: {
    done: string;
    current: string;
    upcoming: string;
    now: string;
    progress: string;
    in_progress: string;
    phase: string;
    select_hint: string;
  };
  /** Status badges, pre-rendered on the server, keyed by milestone file. */
  badges: Record<string, ReactNode>;
}

const barClass: Record<RoadmapStage, string> = {
  done: "bg-success",
  current: "bg-warning bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgb(255_255_255/0.22)_6px_12px)]",
  upcoming: "border-2 border-dashed border-foreground/25 bg-transparent",
};

const dotClass: Record<RoadmapStage, string> = {
  done: "bg-success",
  current: "bg-warning",
  upcoming: "border-2 border-foreground/30",
};

// Label column and bar area share this template in every row.
const ROW_COLS = "grid-cols-[minmax(9rem,15rem)_1fr]";

/**
 * Dateless Gantt chart: each phase is a row and the horizontal axis is the
 * order of work in slots. Phases may overlap through `start` and `span`.
 * Selecting a row shows its description under the chart.
 */
export default function ProjectRoadmap({ milestones, labels, badges }: Props) {
  // Explicit start/span win; otherwise phases run one after another.
  let cursor = 1;
  const bars = milestones.map((m) => {
    const start = Math.max(1, m.start ?? cursor);
    const span = Math.max(1, m.span ?? 1);
    cursor = start + span;
    return { ...m, start, span, stage: stageOf(m.status) };
  });
  const slots = Math.max(...bars.map((b) => b.start + b.span - 1));

  // "Now" sits at the start of the earliest phase in progress, else at the
  // end of the last delivered phase, else at the very beginning.
  const current = bars.filter((b) => b.stage === "current");
  const done = bars.filter((b) => b.stage === "done");
  const nowSlot = current.length
    ? Math.min(...current.map((b) => b.start)) - 1
    : done.length
      ? Math.max(...done.map((b) => b.start + b.span - 1))
      : 0;
  const nowPct = (nowSlot / slots) * 100;

  const firstOpen = current[0] ?? bars.find((b) => b.stage === "upcoming") ?? bars[0];
  const [selected, setSelected] = useState(firstOpen?.file);
  const activeIndex = bars.findIndex((b) => b.file === selected);
  const active = bars[activeIndex];
  const slotTemplate = { gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))` };

  return (
    <div className="rounded-2xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b px-5 py-3 text-sm">
        <p className="m-0 max-w-none font-semibold text-foreground">
          {labels.progress.replace("{done}", String(done.length)).replace("{total}", String(bars.length))}
          {current.length > 0 && (
            <span className="font-normal text-muted-foreground"> · {labels.in_progress.replace("{n}", String(current.length))}</span>
          )}
        </p>
        <ul className="m-0 flex max-w-none list-none flex-wrap gap-x-4 gap-y-1 p-0 text-muted-foreground">
          {(["done", "current", "upcoming"] as const).map((stage) => (
            <li key={stage} className="m-0 flex items-center gap-1.5">
              <span aria-hidden="true" className={`size-2.5 rounded-full ${dotClass[stage]}`} />
              {labels[stage]}
            </li>
          ))}
        </ul>
      </div>

      {/* Scrolls sideways on narrow screens; rows are capped in height. */}
      <div className="overflow-x-auto">
        <div className="min-w-[36rem] px-5 pb-2 pt-4">
          <div aria-hidden="true" className={`grid ${ROW_COLS} gap-x-4`}>
            <span />
            <span className="relative mb-2 grid text-xs font-semibold text-muted-foreground" style={slotTemplate}>
              {Array.from({ length: slots }, (_, i) => (
                <span key={i} className="border-l border-border pl-1.5">{i + 1}</span>
              ))}
            </span>
          </div>

          <div className="relative max-h-80 overflow-y-auto">
            <ol className="m-0 max-w-none list-none p-0">
              {bars.map((bar, i) => {
                const isActive = bar.file === selected;
                return (
                  <li key={bar.file} className="m-0">
                    <button
                      type="button"
                      onClick={() => setSelected(bar.file)}
                      aria-pressed={isActive}
                      className={`grid w-full ${ROW_COLS} items-center gap-x-4 rounded-lg py-1.5 text-left transition-colors ${
                        isActive ? "bg-secondary" : "hover:bg-secondary/60"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2 pl-2 text-sm">
                        <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${dotClass[bar.stage]}`} />
                        <span className="shrink-0 font-semibold text-muted-foreground">{i + 1}</span>
                        <span className={`truncate text-foreground ${isActive ? "font-semibold" : ""}`}>{bar.title}</span>
                      </span>
                      <span className="relative grid h-7" style={slotTemplate}>
                        {Array.from({ length: slots }, (_, s) => (
                          <span key={s} aria-hidden="true" className="row-start-1 border-l border-border/70" style={{ gridColumn: s + 1 }} />
                        ))}
                        <span
                          className={`row-start-1 mx-0.5 self-center rounded-full ${barClass[bar.stage]} ${
                            isActive ? "h-6 ring-2 ring-foreground/70 ring-offset-1 ring-offset-card" : "h-5"
                          }`}
                          style={{ gridColumn: `${bar.start} / span ${bar.span}` }}
                        >
                          <span className="sr-only">{labels[bar.stage]}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div aria-hidden="true" className={`pointer-events-none absolute inset-0 grid ${ROW_COLS} gap-x-4`}>
              <span />
              <span className="relative">
                <span className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-primary" style={{ left: `${nowPct}%` }} />
              </span>
            </div>
          </div>

          <div aria-hidden="true" className={`grid ${ROW_COLS} gap-x-4`}>
            <span />
            <span className="relative h-7">
              <span
                className="absolute top-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-primary-foreground"
                style={{ left: `clamp(2rem, ${nowPct}%, calc(100% - 2rem))` }}
              >
                {labels.now}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t px-5 py-4" aria-live="polite">
        {active ? (
          <>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="eyebrow !mb-0 !text-muted-foreground">
                {labels.phase} {activeIndex + 1}
              </span>
              {badges[active.file]}
            </div>
            <h3 className="mb-1 mt-2 text-lg">{active.title}</h3>
            <div className="text-sm text-muted-foreground [&_p]:m-0 [&_p]:max-w-none">{active.content}</div>
          </>
        ) : (
          <p className="m-0 text-sm text-muted-foreground">{labels.select_hint}</p>
        )}
      </div>
    </div>
  );
}
