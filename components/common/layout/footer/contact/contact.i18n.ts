export interface I18n {
  contact: {
    tagline: string;
    title: string;
    action: string;
  };
}

export const en: I18n = {
  contact: {
    tagline: "Are your questions left unanswered?",
    title: "Let's talk!",
    action: "Contact us",
  },
};

export const fr: I18n = {
  contact: {
    tagline: "Vos questions sont-elles restées sans réponse?",
    title: "Parlons-en!",
    action: "Contactez-nous",
  },
};
