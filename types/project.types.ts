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

/** One slide of the project page carousel; `src` is relative to /images/project/. */
export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectFeature {
  /** Lucide icon name in kebab case, e.g. "shield-check". */
  icon?: string;
  title: string;
  description: string;
}

export interface ProjectUseCase {
  title: string;
  description: string;
}

export type ProjectResourceType =
  | "business_plan"
  | "technical_docs"
  | "slide_deck"
  | "financials"
  | "legal"
  | "design"
  | "other";

/**
 * A project document. Locked unless `href` is set: locked resources are
 * listed publicly but open only in the Monark app after sign-in.
 */
export interface ProjectResource {
  id: string;
  type: ProjectResourceType;
  title: string;
  description?: string;
  /** Short format label, e.g. "PDF", "Slides", "Docs". */
  format?: string;
  /** Public link; when set the resource is not locked. */
  href?: string;
  /** Section it is listed under. Defaults from `type`. */
  group?: ProjectResourceGroup;
}

export type ProjectResourceGroup = "business" | "product" | "builders";

/**
 * Optional product-page fields in a project's page.mdx frontmatter. Every
 * field is optional: a project without them falls back to `title`, `img`
 * and `description`.
 */
export interface ProjectProductFrontmatter {
  tagline?: string;
  /** Live demo link. Defaults to https://<accronym>.monark.io. */
  demo_url?: string;
  images?: ProjectImage[];
  value_proposition?: {
    headline: string;
    body: string;
  };
  features?: ProjectFeature[];
  use_cases?: ProjectUseCase[];
  resources?: ProjectResource[];
  /** Intro to the documentation section: what building the project involves. */
  builders_intro?: string;
  code_repositories?: string[];
  /** Amount Monark has invested, in USD. Shown only when the project has code_repositories. */
  monark_investment?: number;
}

export interface DatedProjectMetadata extends ProjectMetadata {
  hash: string;
  last_updated: string;
}
