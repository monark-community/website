export enum ProjectStatus {
  MarketValidation = "market_validation",
  Idea = "planned",
  InProgress = "in_progress",
  OnHold = "on_hold",
  PrototypeAvailable = "prototype_available",
  Production = "production",
}

/**
 * Who a project belongs to.
 * - monark: Monark's own tooling for its community (Monark-branded).
 * - incubated: incubated to become an independent venture with its own brand.
 */
export enum ProjectOwnership {
  Monark = "monark",
  Incubated = "incubated",
}

/**
 * Topic group a project is shown under on the projects list (the `category`
 * frontmatter field). Labels live in components/pages/project/projects-list.i18n.ts.
 */
export enum ProjectCategory {
  Payments = "payments",
  Holdings = "holdings",
  Trust = "trust",
  Commerce = "commerce",
  DeFi = "defi",
  Governance = "governance",
}

export interface ProjectMetadata {
  id: string;
  title: string;
  status: string;
  /** Optional: projects without a value are shown without a badge and only under "all". */
  ownership?: `${ProjectOwnership}`;
  /** Optional: projects without a value are listed under "Other projects". */
  category?: `${ProjectCategory}`;
  description: string;
  /**
   * One sentence (at most 12 words) stating the project's core value for its
   * users. Shown on the projects list cards; the project page keeps `description`.
   */
  tagline?: string;
  accronym: string;
  img: string;
  img_alt: string;
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
