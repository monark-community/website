export type NavbarLink = {
  id: string;
  icon?: string;
  label: string;
  href: string;
  // If true, the link is a folder route and has no associated page.
  isFolderRoute?: boolean;
  items?: NavbarLink[];
};

export interface I18n {
  navbar: {
    soon: string;
    links: NavbarLink[];
    sign_in: string;
  };
}

export const en: I18n = {
  navbar: {
    soon: "Coming soon",
    links: [
      {
        id: "participate",
        label: "Participate",
        href: "/participate",
        isFolderRoute: true,
        items: [
          { id: "developer", label: "Developer", icon: "code", href: "/developer" },
          { id: "entrepreneur", label: "Entrepreneur", icon: "lightbulb", href: "/entrepreneur" },
          { id: "university", label: "University", icon: "university", href: "/university" },
          { id: "student", label: "Student", icon: "graduation-cap", href: "/student" },
        ],
      },
      {
        id: "initiatives",
        label: "Initiatives",
        href: "/initiative",
        isFolderRoute: true,
        items: [
          {
            id: "web3-projects",
            label: "Web3 Projects",
            icon: "blocks",
            href: "/project",
          },
          { id: "internships", label: "Internships", icon: "book-marked", href: "/internship" },
          {
            id: "student-blockchain-association",
            label: "Student Blockchain Association",
            icon: "users",
            href: "/student-blockchain-association",
          },
          {
            id: "blockchain-research",
            label: "Blockchain R&D",
            icon: "test-tube-diagonal",
            href: "/blockchain-research",
          },
          {
            id: "university-competition",
            label: "University Student Competitions",
            icon: "medal",
            href: "/university-competition",
          },
          { id: "hackathons", label: "Hackathons", icon: "binary", href: "/hackathon" },
          {
            id: "meetup-and-event",
            label: "Meetups & Events",
            icon: "calendar-plus",
            href: "/meetup-and-event",
          },
        ],
      },
      {
        id: "about",
        label: "About",
        href: "/about",
        isFolderRoute: true,
        items: [
          { id: "monark", label: "What is Monark", icon: "info", href: "/monark" },
          {
            id: "governance",
            label: "Governance",
            href: "/governance",
            icon: "vote",
            isFolderRoute: true,
            items: [
              { id: "about-governance", label: "About Governance", href: "/" },
              { id: "governance-proposals", label: "Governance Proposals", href: "/proposal" },
              { id: "governance-forum", label: "Governance Forum", href: "/forum" },
            ],
          },
          {
            id: "dao",
            label: "DAOs",
            href: "/dao",
            icon: "coins",
            isFolderRoute: true,
            items: [
              { id: "about-dao", label: "About DAOs", href: "/" },
              { id: "monark-dao", label: "Monark DAOs", href: "/monark" },
              { id: "module-dao", label: "Module DAOs", href: "/module" },
            ],
          },
        ],
      },
      {
        id: "learn",
        label: "Learn",
        href: "/learn",
        isFolderRoute: true,
        items: [
          { id: "docs", label: "Docs", icon: "book-open", href: "/docs" },
          { id: "news", label: "News", icon: "newspaper", href: "/news" },
          { id: "video-series", label: "Video Series", icon: "square-play", href: "/video-series" },
          { id: "podcasts", label: "Podcasts", icon: "podcast", href: "/podcasts" },
        ],
      },
      {
        id: "roadmap",
        label: "Roadmap",
        href: "/roadmap",
      },
    ],
    sign_in: "Sign in",
  },
};

export const fr: I18n = {
  navbar: {
    soon: "Bientôt disponible",
    links: [
      {
        id: "participer",
        label: "Participer",
        href: "/participate",
        isFolderRoute: true,
        items: [
          { id: "developpeur", label: "Développeur", icon: "code", href: "/developer" },
          { id: "entrepreneur", label: "Entrepreneur", icon: "lightbulb", href: "/entrepreneur" },
          { id: "universite", label: "Université", icon: "university", href: "/university" },
          { id: "etudiant", label: "Étudiant", icon: "graduation-cap", href: "/student" },
        ],
      },
      {
        id: "initiatives",
        label: "Initiatives",
        href: "/initiative",
        isFolderRoute: true,
        items: [
          {
            id: "projets-web3",
            label: "Projets Web3",
            icon: "blocks",
            href: "/project",
          },
          { id: "stages", label: "Stages", icon: "book-marked", href: "/internship" },
          {
            id: "association-etudiante-blockchain",
            label: "Association étudiante en blockchain",
            icon: "users",
            href: "/student-blockchain-association",
          },
          {
            id: "recherche-blockchain",
            label: "R&D Blockchain",
            icon: "test-tube-diagonal",
            href: "/blockchain-research",
          },
          {
            id: "competition-universitaire",
            label: "Compétitions universitaires étudiantes",
            icon: "medal",
            href: "/university-competition",
          },
          { id: "hackathons", label: "Hackathons", icon: "binary", href: "/hackathon" },
          {
            id: "rencontres-evenements",
            label: "Rencontres et événements",
            icon: "calendar-plus",
            href: "/meetup-and-event",
          },
        ],
      },
      {
        id: "a-propos",
        label: "À propos",
        href: "/about",
        isFolderRoute: true,
        items: [
          { id: "monark", label: "Qu'est-ce que Monark", icon: "info", href: "/monark" },
          {
            id: "gouvernance",
            label: "Gouvernance",
            href: "/governance",
            icon: "vote",
            isFolderRoute: true,
            items: [
              { id: "a-propos-gouvernance", label: "À propos de la gouvernance", href: "/" },
              {
                id: "propositions-gouvernance",
                label: "Propositions de gouvernance",
                href: "/proposal",
              },
              { id: "forum-gouvernance", label: "Forum de gouvernance", href: "/forum" },
            ],
          },
          {
            id: "dao",
            label: "DAOs",
            href: "/dao",
            icon: "coins",
            isFolderRoute: true,
            items: [
              { id: "a-propos-dao", label: "À propos des DAOs", href: "/" },
              { id: "monark-dao", label: "Monark DAOs", href: "/monark" },
              { id: "module-dao", label: "Module DAOs", href: "/module" },
            ],
          },
        ],
      },
      {
        id: "apprendre",
        label: "Apprendre",
        href: "/learn",
        isFolderRoute: true,
        items: [
          { id: "docs", label: "Docs", icon: "book-open", href: "/docs" },
          { id: "nouvelles", label: "Nouvelles", icon: "newspaper", href: "/news" },
          { id: "serie-video", label: "Série vidéo", icon: "square-play", href: "/video-series" },
          { id: "podcasts", label: "Podcasts", icon: "podcast", href: "/podcasts" },
        ],
      },
      {
        id: "feuille-de-route",
        label: "Feuille de route",
        href: "/roadmap",
      },
    ],
    sign_in: "Connexion",
  },
};
