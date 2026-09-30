export type ErrorCode =
  | "400"
  | "401"
  | "403"
  | "404"
  | "405"
  | "408"
  | "409"
  | "410"
  | "418"
  | "429"
  | "500"
  | "501"
  | "502"
  | "503"
  | "504";

export interface ErrorCopy {
  title: string;
  message: string;
}

export interface I18n {
  /** Small label above the numeral, followed by the code ("Error 404"). */
  eyebrow: string;
  /** Label for the address that could not be found (404 only). */
  requested_route: string;
  actions: {
    home: string;
    projects: string;
  };
  error_definitions: Record<ErrorCode, ErrorCopy>;
}

export const en: I18n = {
  eyebrow: "Error",
  requested_route: "Requested address",
  actions: {
    home: "Go back home",
    projects: "Browse projects",
  },
  error_definitions: {
    "400": {
      title: "Bad Request",
      message:
        "We couldn't read that request. Check the link or the form, then try again.",
    },
    "401": {
      title: "Sign-In Needed",
      message: "This page is for signed-in members. Sign in, then come back.",
    },
    "403": {
      title: "Access Restricted",
      message:
        "Your account doesn't have access to this page. If you think it should, let us know.",
    },
    "404": {
      title: "Page Not Found",
      message:
        "This page doesn't exist or has moved. Start again from the home page, or have a look at the projects our community is building.",
    },
    "405": {
      title: "Action Not Allowed",
      message: "This page doesn't accept that kind of request.",
    },
    "408": {
      title: "Request Timed Out",
      message:
        "The page took too long to answer. Check your connection and try again.",
    },
    "409": {
      title: "Conflicting Change",
      message:
        "Your change clashed with another one. Reload the page and try again.",
    },
    "410": {
      title: "Page Removed",
      message: "This page has been taken down for good.",
    },
    "418": {
      title: "I'm a Teapot",
      message: "This server brews tea, not coffee. Try another request.",
    },
    "429": {
      title: "Too Many Requests",
      message:
        "You've sent a lot of requests in a short time. Wait a minute, then try again.",
    },
    "500": {
      title: "Something Went Wrong",
      message:
        "An error happened on our side. Try again in a moment, and tell us if it keeps happening.",
    },
    "501": {
      title: "Not Available Yet",
      message: "This part of the site isn't built yet. Check back later.",
    },
    "502": {
      title: "Bad Gateway",
      message:
        "A service we rely on sent back an invalid answer. Try again in a moment.",
    },
    "503": {
      title: "Temporarily Unavailable",
      message: "The site is under maintenance or very busy. Check back soon.",
    },
    "504": {
      title: "Gateway Timeout",
      message:
        "A service we rely on took too long to answer. Try again in a moment.",
    },
  },
};

export const fr: I18n = {
  eyebrow: "Erreur",
  requested_route: "Adresse demandée",
  actions: {
    home: "Retour à l'accueil",
    projects: "Parcourir les projets",
  },
  error_definitions: {
    "400": {
      title: "Requête invalide",
      message:
        "Nous n'avons pas pu lire cette demande. Vérifiez le lien ou le formulaire, puis réessayez.",
    },
    "401": {
      title: "Connexion requise",
      message:
        "Cette page est réservée aux membres connectés. Connectez-vous, puis revenez.",
    },
    "403": {
      title: "Accès restreint",
      message:
        "Votre compte n'a pas accès à cette page. Si c'est une erreur, dites-le-nous.",
    },
    "404": {
      title: "Page introuvable",
      message:
        "Cette page n'existe pas ou a changé d'adresse. Repartez de l'accueil, ou découvrez les projets que bâtit notre communauté.",
    },
    "405": {
      title: "Action non permise",
      message: "Cette page n'accepte pas ce type de requête.",
    },
    "408": {
      title: "Délai dépassé",
      message:
        "La page a mis trop de temps à répondre. Vérifiez votre connexion et réessayez.",
    },
    "409": {
      title: "Modification en conflit",
      message:
        "Votre modification entre en conflit avec une autre. Rechargez la page et réessayez.",
    },
    "410": {
      title: "Page retirée",
      message: "Cette page a été retirée pour de bon.",
    },
    "418": {
      title: "Je suis une théière",
      message: "Ce serveur fait du thé, pas du café. Essayez une autre requête.",
    },
    "429": {
      title: "Trop de requêtes",
      message:
        "Vous avez envoyé beaucoup de requêtes en peu de temps. Patientez une minute, puis réessayez.",
    },
    "500": {
      title: "Un problème est survenu",
      message:
        "Une erreur s'est produite de notre côté. Réessayez dans un instant et prévenez-nous si elle persiste.",
    },
    "501": {
      title: "Pas encore disponible",
      message:
        "Cette partie du site n'est pas encore prête. Revenez un peu plus tard.",
    },
    "502": {
      title: "Passerelle défaillante",
      message:
        "Un service dont nous dépendons a renvoyé une réponse invalide. Réessayez dans un instant.",
    },
    "503": {
      title: "Service momentanément indisponible",
      message:
        "Le site est en maintenance ou très sollicité. Revenez d'ici peu.",
    },
    "504": {
      title: "Délai de passerelle dépassé",
      message:
        "Un service dont nous dépendons a mis trop de temps à répondre. Réessayez dans un instant.",
    },
  },
};
