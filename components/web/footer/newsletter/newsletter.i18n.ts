export interface I18n {
  newsletter: {
    placeholder: string;
    subscribe: string;
    invalidEmail: string;
    successMessage: string;
    errorMessage: string;
  };
}

export const en: I18n = {
  newsletter: {
    placeholder: "Subscribe to our newsletter",
    subscribe: "Subscribe",
    invalidEmail: "Please enter a valid email address.",
    successMessage: "Successfully subscribed to the newsletter!",
    errorMessage: "Failed to subscribe to the newsletter. Please try again.",
  },
};

export const fr: I18n = {
  newsletter: {
    placeholder: "S'abonner à notre newsletter",
    subscribe: "S'abonner",
    invalidEmail: "Veuillez entrer une adresse email valide.",
    successMessage: "Abonnement à la newsletter réussi!",
    errorMessage: "Échec de l'abonnement à la newsletter. Veuillez réessayer.",
  },
};
