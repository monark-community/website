/**
 * Shared content shape for the four "Participate" pages (developer,
 * ambassador, industry, university). Each page has its own typed en/fr file
 * in this folder; they all render through ParticipatePage, so the pages read
 * as one family. Icons are Lucide names resolved in participate-icon.tsx.
 */

export type ParticipateSlug = "developer" | "ambassador" | "industry" | "university";

/**
 * Per-page accent, from the theme's chart colours (brand guidelines §3:
 * orange first, then red and brown) plus the muted status green. Accents
 * colour icons, line art and step numbers only: the call to action stays
 * flat orange on every page.
 */
export type ParticipateAccent = "primary" | "chart-2" | "chart-3" | "success";

export type ParticipateIconName =
  | "code"
  | "users"
  | "factory"
  | "graduation-cap"
  | "calendar-range"
  | "repeat"
  | "file-text"
  | "wrench"
  | "presentation"
  | "landmark"
  | "key-round"
  | "piggy-bank"
  | "user-plus"
  | "flask-conical"
  | "eye"
  | "route"
  | "lightbulb"
  | "list-checks"
  | "book-open"
  | "school"
  | "rocket"
  | "megaphone"
  | "map-pin"
  | "heart-handshake"
  | "sprout"
  | "database"
  | "message-square"
  | "puzzle";

export type ParticipateLink = {
  label: string;
  href: string;
  /** Opens outside monark.io (Discord, GitHub): new tab, with an icon. */
  external?: boolean;
};

export type ParticipateItem = {
  icon: ParticipateIconName;
  title: string;
  content: string;
};

/** A track groups several offers under one heading (the university page). */
export type ParticipateTrack = {
  icon: ParticipateIconName;
  title: string;
  intro: string;
  items: string[];
  link?: ParticipateLink;
};

export type ParticipateProofItem = {
  /** Small label above the title, e.g. a project status or a sector. */
  label: string;
  title: string;
  content: string;
  href: string;
};

export type ParticipateFaqItem = { question: string; answer: string };

export interface ParticipateContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    audiences_label: string;
    audiences: string[];
    /** Two or three short facts shown under the lead. */
    highlights?: { value: string; label: string }[];
    /** Optional status line, e.g. a programme that is still taking shape. */
    status?: string;
  };
  offer: {
    eyebrow: string;
    title: string;
    intro?: string;
    items?: ParticipateItem[];
    tracks?: ParticipateTrack[];
    /** Emphasised closing note (left orange rule). */
    note?: { title: string; content: string };
  };
  steps: {
    eyebrow: string;
    title: string;
    intro?: string;
    items: { title: string; content: string }[];
  };
  fit: {
    eyebrow: string;
    title: string;
    intro?: string;
    who_title: string;
    who: string[];
    expect_title: string;
    expect: string[];
  };
  proof: {
    eyebrow: string;
    title: string;
    content: string;
    items: ParticipateProofItem[];
    link: ParticipateLink;
  };
  faq?: {
    eyebrow: string;
    title: string;
    items: ParticipateFaqItem[];
  };
  cta: {
    title: string;
    content: string;
    primary: ParticipateLink;
    secondary?: ParticipateLink;
    /** Short line under the buttons. */
    note?: string;
  };
}
