export enum ProjectStatus {
  Idea = "idea",
  PrototypeAvailable = "prototype_available",
  InProgress = "in_progress",
  MarketValidation = "market_validation",
  Live = "live",
}

export interface ProjectMetadata {
  id: string;
  title: string;
  status: string;
  description: string;
  industry_tags: string[];
  keyword_tags: string[];
  complexity_score: number;
  effort_score: number;
  adoption_score: number;
  blockchain_score: number;
  revenue_score: number;
}

export interface DatedProjectMetadata extends ProjectMetadata {
  hash: string;
  last_updated: string;
}
