type NavbarLink = {
  icon?: string;
  label: string;
  href: string;
  // If true, the link is a folder route and has no associated page.
  isFolderRoute?: boolean;
  items?: NavbarLink[];
};

export interface I18n {
  navbar: {
    links: NavbarLink[];
    sign_in: string;
  };
}

export const en: I18n = {
  navbar: {
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
            href: "/research",
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
            icon: "vote",
            href: "/governance",
            items: [
              { label: "Governance Proposals", href: "/proposal" },
              { label: "Governance Forum", href: "/forum" },
            ],
          },
          {
            label: "DAOs",
            icon: "coins",
            href: "/dao",
            items: [
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
    sign_in: "Sign in with GitHub",
  },
};

export const fr: I18n = {
  navbar: {
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
            href: "/research",
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
            icon: "vote",
            href: "/governance",
            items: [
              {
                label: "Propositions de gouvernance",
                href: "/proposal",
              },
              { label: "Forum de gouvernance", href: "/forum" },
            ],
          },
          {
            label: "DAOs",
            icon: "coins",
            href: "/dao",
            items: [
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
    sign_in: "Se connecter avec GitHub",
  },
};
