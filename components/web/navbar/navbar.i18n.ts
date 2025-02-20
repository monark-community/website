type NavbarLink = {
  label: string;
  href: string;
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
        items: [
          { label: "Developer", href: "/participate/developer" },
          { label: "Enthusiast", href: "/participate/enthusiast" },
          { label: "Entrepreneur", href: "/participate/entrepreneur" },
          { label: "University", href: "/participate/university" },
          { label: "Student", href: "/participate/student" },
        ],
      },
      {
        label: "Build",
        href: "/build",
        items: [
          { label: "Events", href: "/build/events" },
          { label: "Modules", href: "/build/modules" },
          { label: "Products", href: "/build/products" },
        ],
      },
      {
        label: "Learn",
        href: "/learn",
        items: [
          { label: "Onboarding", href: "/learn/onboarding" },
          { label: "Documentation", href: "/learn/docs" },
          { label: "Guides", href: "/learn/guides" },
          { label: "Roadmap", href: "/participate/roadmap" },
        ],
      },
      {
        label: "Resources",
        href: "/resources",
        items: [
          { label: "Administrative Documents", href: "/resources/admin-docs" },
          { label: "Blog", href: "/resources/blog" },
          { label: "Brand Assets", href: "/resources/brand-assets" },
          { label: "FAQ", href: "/resources/faq" },
        ],
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
        href: "/participer",
        items: [
          { label: "Développeur", href: "/participer/developpeur" },
          { label: "Enthousiaste", href: "/participer/enthousiaste" },
          { label: "Entrepreneur", href: "/participer/entrepreneur" },
          { label: "Université", href: "/participer/universite" },
          { label: "Étudiant", href: "/participer/etudiant" },
        ],
      },
      {
        label: "Construire",
        href: "/construire",
        items: [
          { label: "Événements", href: "/construire/evenements" },
          { label: "Modules", href: "/construire/modules" },
          { label: "Produits", href: "/construire/produits" },
        ],
      },
      {
        label: "Apprendre",
        href: "/apprendre",
        items: [
          { label: "Onboarding", href: "/apprendre/onboarding" },
          { label: "Documentation", href: "/apprendre/docs" },
          { label: "Guides", href: "/apprendre/guides" },
          { label: "Feuille de route", href: "/participer/feuille-de-route" },
        ],
      },
      {
        label: "Ressources",
        href: "/ressources",
        items: [
          { label: "Documents administratifs", href: "/ressources/docs-admin" },
          { label: "Blog", href: "/ressources/blog" },
          { label: "Actifs de marque", href: "/ressources/actifs-de-marque" },
          { label: "FAQ", href: "/ressources/faq" },
        ],
      },
    ],
    sign_in: "Se connecter avec GitHub",
  },
};
