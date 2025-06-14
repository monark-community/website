type FooterLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

type FooterLinks = FooterLink[];

export interface I18n {
  footer_links: {
    primary: FooterLinks;
    secondary: {
      left: FooterLinks;
      right: FooterLinks;
    };
  };
}

export const en: I18n = {
  footer_links: {
    primary: [
      { label: "Home", href: "/" },
      { label: "News", href: "/learn/news" },
    ],
    secondary: {
      left: [
        { label: "About", href: "/about" },
        { label: "Brand Assets", href: "/brand-assets", disabled: true },
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
          label: "Terms of Service",
          href: "/legal/terms-of-service",
          disabled: true,
        },
      ],
    },
  },
};

export const fr: I18n = {
  footer_links: {
    primary: [
      { label: "Accueil", href: "/" },
      { label: "Nouvelles", href: "/learn/news" },
    ],
    secondary: {
      left: [
        { label: "À propos", href: "/about" },
        {
          label: "Ressources de marque",
          href: "/brand-assets",
          disabled: true,
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
