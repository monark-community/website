import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate a project score based on its metadata scores
// The higher the score, the higher the project's potential
import { ProjectMetadata } from "@/types/project.types";

export function calculateProjectScore(
  metadata: Pick<
    ProjectMetadata,
    | "complexity_score"
    | "effort_score"
    | "adoption_score"
    | "blockchain_score"
    | "revenue_score"
  >
): number {
  // You can adjust the formula as needed. Here, we simply sum the scores.
  return (
    metadata.complexity_score +
    metadata.effort_score +
    metadata.adoption_score +
    metadata.blockchain_score +
    metadata.revenue_score
  );
}
