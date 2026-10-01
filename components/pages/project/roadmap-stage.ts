export type RoadmapStage = "done" | "current" | "upcoming";

// Statuses that mean a phase has shipped something usable.
const DONE = new Set(["prototype_available", "production", "market_validation"]);

/** Where a milestone status sits on the roadmap. Shared by server and client code. */
export function stageOf(status: string): RoadmapStage {
  if (DONE.has(status)) return "done";
  if (status === "in_progress") return "current";
  return "upcoming";
}
