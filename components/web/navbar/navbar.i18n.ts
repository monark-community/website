export type NavbarLink = {
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
        label: "Participate",
        href: "/participate",
        isFolderRoute: true,
        items: [
          { label: "Developer", icon: "code", href: "/developer" },
          { label: "Entrepreneur", icon: "lightbulb", href: "/entrepreneur" },
          { label: "University", icon: "university", href: "/university" },
          { label: "Student", icon: "graduation-cap", href: "/student" },
        ],
      },
      {
        label: "Initiatives",
        href: "/initiative",
        isFolderRoute: true,
        items: [
          {
            label: "Web3 Projects",
            icon: "blocks",
            href: "/project",
            // items: [
            //   { label: "Supply Chain Management", href: "/supply-chain" },
            //   { label: "Ticketing", href: "/ticketing" },
            //   { label: "Timesheet", href: "/timesheet" },
            //   { label: "Vault", href: "/vault" },
            // ],
          },
          { label: "Internships", icon: "book-marked", href: "/internship" },
          {
            label: "Student Blockchain Association",
            icon: "users",
            href: "/student-blockchain-association",
          },
          {
            label: "Blockchain R&D",
            icon: "test-tube-diagonal",
            href: "/blockchain-research",
          },
          {
            label: "University Student Competitions",
            icon: "medal",
            href: "/university-competition",
          },
          { label: "Hackathons", icon: "binary", href: "/hackathon" },
          {
            label: "Meetups & Events",
            icon: "calendar-plus",
            href: "/meetup-and-event",
          },
        ],
      },
      {
        label: "About",
        href: "/about",
        isFolderRoute: true,
        items: [
          { label: "What is Monark", icon: "info", href: "/monark" },
          {
            label: "Governance",
            href: "/governance",
            icon: "vote",
            isFolderRoute: true,
            items: [
              { label: "About Governance", href: "/" },
              { label: "Governance Proposals", href: "/proposal" },
              { label: "Governance Forum", href: "/forum" },
            ],
          },
          {
            label: "DAOs",
            href: "/dao",
            icon: "coins",
            isFolderRoute: true,
            items: [
              { label: "About DAOs", href: "/" },
              { label: "Monark DAOs", href: "/monark" },
              { label: "Module DAOs", href: "/module" },
            ],
          },
        ],
      },
      {
        label: "Learn",
        href: "/learn",
        isFolderRoute: true,
        items: [
          { label: "Docs", icon: "book-open", href: "/docs" },
          { label: "News", icon: "newspaper", href: "/news" },
          { label: "Video Series", icon: "square-play", href: "/video-series" },
          { label: "Podcasts", icon: "podcast", href: "/podcasts" },
        ],
      },
      {
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
        label: "Participer",
        href: "/participate",
        isFolderRoute: true,
        items: [
          { label: "Développeur", icon: "code", href: "/developer" },
          { label: "Entrepreneur", icon: "lightbulb", href: "/entrepreneur" },
          { label: "Université", icon: "university", href: "/university" },
          { label: "Étudiant", icon: "graduation-cap", href: "/student" },
        ],
      },
      {
        label: "Initiatives",
        href: "/initiative",
        isFolderRoute: true,
        items: [
          {
            label: "Projets Web3",
            icon: "blocks",
            href: "/project",
            // items: [
            //   { label: "Gestion de la chaîne d'approvisionnement", href: "/supply-chain" },
            //   { label: "Billetterie", href: "/ticketing" },
            //   { label: "Feuille de temps", href: "/timesheet" },
            //   { label: "Coffre-fort", href: "/vault" },
            // ],
          },
          { label: "Stages", icon: "book-marked", href: "/internship" },
          {
            label: "Association étudiante en blockchain",
            icon: "users",
            href: "/student-blockchain-association",
          },
          {
            label: "R&D Blockchain",
            icon: "test-tube-diagonal",
            href: "/blockchain-research",
          },
          {
            label: "Compétitions universitaires étudiantes",
            icon: "medal",
            href: "/university-competition",
          },
          { label: "Hackathons", icon: "binary", href: "/hackathon" },
          {
            label: "Rencontres et événements",
            icon: "calendar-plus",
            href: "/meetup-and-event",
          },
        ],
      },
      {
        label: "À propos",
        href: "/about",
        isFolderRoute: true,
        items: [
          { label: "Qu'est-ce que Monark", icon: "info", href: "/monark" },
          {
            label: "Gouvernance",
            href: "/governance",
            icon: "vote",
            isFolderRoute: true,
            items: [
              { label: "À propos de la gouvernance", href: "/" },
              {
                label: "Propositions de gouvernance",
                href: "/proposal",
              },
              { label: "Forum de gouvernance", href: "/forum" },
            ],
          },
          {
            label: "DAOs",
            href: "/dao",
            icon: "coins",
            isFolderRoute: true,
            items: [
              { label: "À propos des DAOs", href: "/" },
              { label: "Monark DAOs", href: "/monark" },
              { label: "Module DAOs", href: "/module" },
            ],
          },
        ],
      },
      {
        label: "Apprendre",
        href: "/learn",
        isFolderRoute: true,
        items: [
          { label: "Docs", icon: "book-open", href: "/docs" },
          { label: "Nouvelles", icon: "newspaper", href: "/news" },
          { label: "Série vidéo", icon: "square-play", href: "/video-series" },
          { label: "Podcasts", icon: "podcast", href: "/podcasts" },
        ],
      },
      {
        label: "Feuille de route",
        href: "/roadmap",
      },
    ],
    sign_in: "Connexion",
  },
};
