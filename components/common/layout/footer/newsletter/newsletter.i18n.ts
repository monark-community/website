export interface I18n {
  newsletter: {
    placeholder: string;
    subscribe: string;
    invalidEmail: string;
    successMessage: string;
    errorMessage: string;
  };
  newsletterPopup: {
    title: string;
    description: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subscribeButton: string;
    subscribing: string;
    maybeLater: string;
    privacyNote: string;
    legalNotice: string;
    termsOfUse: string;
    and: string;
    privacyPolicy: string;
    errorTitle: string;
    invalidEmail: string;
    successTitle: string;
    successMessage: string;
    identity_label: string;
    identity_placeholder: string;
    self_identify: {
      student: string;
      university_staff: string;
      ambassador: string;
      web3_enthusiast: string;
      web3_business: string;
      prefer_not_to_say: string;
    }
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
    title: "Stay in the loop!",
    description: "Subscribe to our newsletter and get the latest updates delivered straight to your inbox.",
    emailPlaceholder: "Enter your email address",
    subscribeButton: "Subscribe",
    maybeLater: "Maybe later",
    subscribing: "Subscribing...",
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'First name (optional)',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'Last name (optional)',
    emailLabel: 'Email Address',
    legalNotice: 'By subscribing, you agree to beehiiv\'s',
    termsOfUse: 'Terms of Use',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    privacyNote: 'We respect your privacy, unsubscribe anytime.',
    errorTitle: "Oops!",
    invalidEmail: "Invalid email.",
    successTitle: "Welcome to the flutter!",
    successMessage: "Thanks for subscribing! We'll get in touch soon!",
    identity_label: "I am a...",
    identity_placeholder: "Please choose what best describes you",
    self_identify: {
      student: "Student",
      university_staff: "University Staff",
      ambassador: "Ambassador",
      web3_enthusiast: "Web3 Enthusiast",
      web3_business: "Web3 Business",
      prefer_not_to_say: "Prefer not to say",
    }
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
    title: "Restez informé !",
    description: "Abonnez-vous à notre newsletter et recevez les dernières mises à jour directement dans votre boîte de réception.",
    emailPlaceholder: "Entrez votre adresse email",
    subscribeButton: "S'abonner",
    maybeLater: "Plus tard",
    subscribing: "Abonnement en cours...",
    firstNameLabel: 'Prénom',
    firstNamePlaceholder: 'Prénom (optionnel)',
    lastNameLabel: 'Nom',
    lastNamePlaceholder: 'Nom (optionnel)',
    emailLabel: 'Adresse e-mail',
    legalNotice: 'En vous abonnant, vous acceptez les',
    termsOfUse: 'Conditions d\'utilisation',
    and: 'et la',
    privacyPolicy: 'Politique de confidentialité',
    privacyNote: 'Nous respectons votre vie privée, désabonnez-vous à tout moment.',
    errorTitle: "Oups!",
    invalidEmail: "Le courriel est invalide.",
    successTitle: "Bienvenue dans la volée!",
    successMessage: "Merci pour l'abonnement! Nous vous contacterons bientôt!",
    identity_label: "Je suis...",
    identity_placeholder: "Veuillez sélectionner votre groupe d'appartenance",
    self_identify: {
      student: "Étudiant",
      university_staff: "Personnel universitaire",
      ambassador: "Ambassadeur",
      web3_enthusiast: "Passionné de Web3",
      web3_business: "Entreprise Web3",
      prefer_not_to_say: "Je préfère ne pas le dire",
    }
  },
};