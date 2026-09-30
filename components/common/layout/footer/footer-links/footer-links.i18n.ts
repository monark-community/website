type FooterLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

type FooterLinks = FooterLink[];

export interface I18n {
  footer_links: {
    label: string;
    tagline: string;
    primary: FooterLinks;
    secondary: {
      left: FooterLinks;
      right: FooterLinks;
    };
  };
}

export const en: I18n = {
  footer_links: {
    label: "Footer",
    tagline: "Fostering Collaboration within the Web3 Community",
    primary: [
      { label: "Home", href: "/" },
      { label: "News", href: "/learn/news" },
    ],
    secondary: {
      left: [
        { label: "About", href: "/about" },
        { label: "Brand assets", href: "/brand" },
        { label: "Contact", href: "mailto:contact@monark.io" },
      ],
      right: [
        {
          label: "Cookies",
          href: "/legal/cookie-policy",
          disabled: true,
        },
        {
          label: "Privacy",
          href: "/legal/privacy-policy",
          disabled: true,
        },
        {
          label: "Terms of service",
          href: "/legal/terms-of-service",
          disabled: true,
        },
      ],
    },
  },
};

export const fr: I18n = {
  footer_links: {
    label: "Pied de page",
    tagline: "Favoriser la collaboration au sein de la communauté Web3",
    primary: [
      { label: "Accueil", href: "/" },
      { label: "Nouvelles", href: "/learn/news" },
    ],
    secondary: {
      left: [
        { label: "À propos", href: "/about" },
        {
          label: "Ressources de marque",
          href: "/brand",
        },
        { label: "Contact", href: "mailto:contact@monark.io" },
      ],
      right: [
        {
          label: "Cookies",
          href: "/legal/cookie-policy",
          disabled: true,
        },
        {
          label: "Confidentialité",
          href: "/legal/privacy-policy",
          disabled: true,
        },
        {
          label: "Conditions d'utilisation",
          href: "/legal/terms-of-service",
          disabled: true,
        },
      ],
    },
  },
};
