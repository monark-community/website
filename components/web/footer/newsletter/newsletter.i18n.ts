export interface I18n {
  newsletter: {
    placeholder: string;
    subscribe: string;
    invalidEmail: string;
  };
}

export const en: I18n = {
  newsletter: {
    placeholder: "Subscribe to our newsletter",
    subscribe: "Subscribe",
    invalidEmail: "Please enter a valid email address.",
  },
};

export const fr: I18n = {
  newsletter: {
    placeholder: "S'abonner à notre newsletter",
    subscribe: "S'abonner",
    invalidEmail: "Veuillez entrer une adresse email valide.",
  },
};
