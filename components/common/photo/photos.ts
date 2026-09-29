/**
 * The site's photographs: real people collaborating, all from Unsplash under
 * the free Unsplash License (never Unsplash+). Sources, photographers and
 * where each photo is used are listed in docs/assets.md; keep both in sync.
 *
 * Static imports give next/image the intrinsic size (no layout shift) and a
 * blurred placeholder in the photo's own warm tones.
 */
import type { StaticImageData } from "next/image";
import { Locale } from "@/i18n.config";
import studentsLectureHall from "@/public/images/people/students-lecture-hall.jpg";
import developersPairingWorkshop from "@/public/images/people/developers-pairing-workshop.jpg";
import communityMeetupDiscussion from "@/public/images/people/community-meetup-discussion.jpg";
import teamPlanningStudio from "@/public/images/people/team-planning-studio.jpg";
import studentsAroundLaptop from "@/public/images/people/students-around-laptop.jpg";
import friendsTalkingCafe from "@/public/images/people/friends-talking-cafe.jpg";
import buildersAtWorkTable from "@/public/images/people/builders-at-work-table.jpg";

export type PhotoKey =
  | "students-lecture-hall"
  | "developers-pairing-workshop"
  | "community-meetup-discussion"
  | "team-planning-studio"
  | "students-around-laptop"
  | "friends-talking-cafe"
  | "builders-at-work-table";

export type PhotoEntry = {
  src: StaticImageData;
  alt: Record<Locale, string>;
};

export const photos: Record<PhotoKey, PhotoEntry> = {
  "students-lecture-hall": {
    src: studentsLectureHall,
    alt: {
      en: "Students talking and laughing at their desks in a university lecture hall",
      fr: "Des étudiants discutent et rient à leur pupitre dans un amphithéâtre universitaire",
    },
  },
  "developers-pairing-workshop": {
    src: developersPairingWorkshop,
    alt: {
      en: "Two developers work through a problem on one laptop during a coding workshop",
      fr: "Deux développeurs cherchent une solution sur le même ordinateur pendant un atelier de programmation",
    },
  },
  "community-meetup-discussion": {
    src: communityMeetupDiscussion,
    alt: {
      en: "A participant asks a question during an evening community meetup",
      fr: "Un participant pose une question lors d'une rencontre communautaire en soirée",
    },
  },
  "team-planning-studio": {
    src: teamPlanningStudio,
    alt: {
      en: "A small business team plans a project around a table in their studio",
      fr: "Une petite équipe d'entreprise planifie un projet autour d'une table dans son atelier",
    },
  },
  "students-around-laptop": {
    src: studentsAroundLaptop,
    alt: {
      en: "A group of students gathered around one laptop in a lecture hall",
      fr: "Un groupe d'étudiants réunis autour d'un même ordinateur dans un amphithéâtre",
    },
  },
  "friends-talking-cafe": {
    src: friendsTalkingCafe,
    alt: {
      en: "Four people sharing ideas around a café table",
      fr: "Quatre personnes échangent des idées autour d'une table de café",
    },
  },
  "builders-at-work-table": {
    src: buildersAtWorkTable,
    alt: {
      en: "Three people working on laptops at a shared wooden table",
      fr: "Trois personnes travaillent sur leur ordinateur à une grande table en bois",
    },
  },
};
