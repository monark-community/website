/**
 * Strings shared by the four participate pages: the "other ways to
 * participate" strip and small UI labels. Keep en and fr equivalent.
 */
import { ParticipateAccent, ParticipateIconName, ParticipateSlug } from "./participate.types";
import type { PhotoKey } from "@/components/common/photo/photos";

/** Monark's community Discord: the main way in for every participate page. */
export const DISCORD_URL = "https://discord.gg/TvhrbFCp8T";

export type ParticipateRole = {
  slug: ParticipateSlug;
  icon: ParticipateIconName;
  accent: ParticipateAccent;
  title: string;
  content: string;
  href: string;
};

export interface SharedI18n {
  participate_shared: {
    /** Screen-reader suffix for links that open in a new tab. */
    new_tab: string;
    /** Hero link that jumps to the "How it works" section. */
    how_link: string;
    others: {
      title: string;
      roles: ParticipateRole[];
    };
  };
}

// Icon and accent per role; the same on every page and in both languages.
const roleStyle: Record<ParticipateSlug, { icon: ParticipateIconName; accent: ParticipateAccent }> = {
  developer: { icon: "code", accent: "primary" },
  university: { icon: "graduation-cap", accent: "chart-2" },
  industry: { icon: "factory", accent: "chart-3" },
  ambassador: { icon: "megaphone", accent: "success" },
};

export function roleAppearance(slug: ParticipateSlug) {
  return roleStyle[slug];
}

/**
 * One photo per role, shown in the page's hero and on the home page's
 * audience cards, so a role always has the same face. `focus` keeps the
 * people in frame when the photo is cropped square or wide.
 */
const rolePhotos: Record<ParticipateSlug, { photo: PhotoKey; focus: string }> = {
  developer: { photo: "developers-pairing-workshop", focus: "object-[60%_50%]" },
  university: { photo: "students-lecture-hall", focus: "object-[25%_50%]" },
  industry: { photo: "team-planning-studio", focus: "object-[60%_45%]" },
  ambassador: { photo: "community-meetup-discussion", focus: "object-[52%_50%]" },
};

export function rolePhoto(slug: ParticipateSlug) {
  return rolePhotos[slug];
}

export const en: SharedI18n = {
  participate_shared: {
    new_tab: "(opens in a new tab)",
    how_link: "See how it works",
    others: {
      title: "Other ways to participate",
      roles: [
        {
          slug: "developer",
          ...roleStyle.developer,
          title: "Developer",
          content: "Take your Web3 idea from prototype to a fundable product.",
          href: "/participate/developer",
        },
        {
          slug: "university",
          ...roleStyle.university,
          title: "University",
          content: "End-of-degree projects and support for blockchain clubs.",
          href: "/participate/university",
        },
        {
          slug: "industry",
          ...roleStyle.industry,
          title: "Industry representative",
          content: "Test a Web3 idea from your sector with a student-led team.",
          href: "/participate/industry",
        },
        {
          slug: "ambassador",
          ...roleStyle.ambassador,
          title: "Ambassador",
          content: "Represent Monark where you live and grow the community.",
          href: "/participate/ambassador",
        },
      ],
    },
  },
};

export const fr: SharedI18n = {
  participate_shared: {
    new_tab: "(s'ouvre dans un nouvel onglet)",
    how_link: "Voir comment ça marche",
    others: {
      title: "D'autres façons de participer",
      roles: [
        {
          slug: "developer",
          ...roleStyle.developer,
          title: "Développeur",
          content: "Faites passer votre idée Web3 du prototype à un produit finançable.",
          href: "/participate/developer",
        },
        {
          slug: "university",
          ...roleStyle.university,
          title: "Université",
          content: "Projets de fin d'études et soutien aux clubs blockchain.",
          href: "/participate/university",
        },
        {
          slug: "industry",
          ...roleStyle.industry,
          title: "Représentant d'industrie",
          content: "Testez une idée Web3 de votre secteur avec une équipe étudiante.",
          href: "/participate/industry",
        },
        {
          slug: "ambassador",
          ...roleStyle.ambassador,
          title: "Ambassadeur",
          content: "Représentez Monark là où vous vivez et faites grandir la communauté.",
          href: "/participate/ambassador",
        },
      ],
    },
  },
};
