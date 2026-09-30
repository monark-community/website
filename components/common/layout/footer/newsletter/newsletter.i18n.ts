export interface I18n {
  newsletter: {
    placeholder: string;
    subscribe: string;
    invalidEmail: string;
    successMessage: string;
    errorMessage: string;
  };
  /** The card that slides in a few seconds after the home page loads. */
  newsletterPopup: {
    title: string;
    /** One line (20 words or fewer): what subscribers get. */
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    subscribeButton: string;
    subscribing: string;
    retryButton: string;
    close: string;
    /** "No spam…" line, followed by beehiiv's terms and privacy links. */
    privacyNote: string;
    termsOfUse: string;
    privacyPolicy: string;
    invalidEmail: string;
    errorMessage: string;
    successTitle: string;
    successMessage: string;
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
  newsletterPopup: {
    title: "Stay in the Loop",
    description: "Monark news, new projects and ways to take part, sent to your inbox.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    subscribeButton: "Subscribe",
    subscribing: "Subscribing…",
    retryButton: "Try again",
    close: "Close",
    privacyNote: "No spam, unsubscribe anytime. Sent with beehiiv:",
    termsOfUse: "terms",
    privacyPolicy: "privacy",
    invalidEmail: "Enter a valid email address.",
    errorMessage: "We couldn't subscribe you. Please try again.",
    successTitle: "You're Subscribed",
    successMessage: "Thanks! The next Monark news will land in your inbox.",
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
  newsletterPopup: {
    title: "Restez au courant",
    description: "Les nouvelles de Monark, les nouveaux projets et les façons de participer, dans votre boîte courriel.",
    emailLabel: "Adresse courriel",
    emailPlaceholder: "vous@exemple.com",
    subscribeButton: "S'abonner",
    subscribing: "Abonnement…",
    retryButton: "Réessayer",
    close: "Fermer",
    privacyNote: "Aucun pourriel, désabonnement en tout temps. Envoyé avec beehiiv :",
    termsOfUse: "conditions",
    privacyPolicy: "confidentialité",
    invalidEmail: "Entrez une adresse courriel valide.",
    errorMessage: "L'abonnement n'a pas fonctionné. Veuillez réessayer.",
    successTitle: "C'est fait !",
    successMessage: "Merci ! Les prochaines nouvelles de Monark arriveront dans votre boîte courriel.",
  },
};