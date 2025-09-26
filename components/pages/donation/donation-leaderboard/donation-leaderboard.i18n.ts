export interface I18n {
  donation_leaderboard: {
    title: string;
    rank_header: string;
    network_header: string;
    address_header: string;
    balance_header: string;
    usd_value_header: string;
    loading: string;
    copy_success: string;
    stats: {
      top_network: string;
      networks_supported: string;
      total_raised: string;
    };
  };
}

export const en: I18n = {
  donation_leaderboard: {
    title: "Available Donation Networks",
    rank_header: "#",
    network_header: "Network",
    address_header: "Address",
    balance_header: "Balance",
    usd_value_header: "USD Value",
    loading: "Loading...",
    copy_success: "address copied to clipboard!",
    stats: {
      top_network: "Top Network",
      networks_supported: "Networks Supported",
      total_raised: "Total Raised",
    },
  },
};

export const fr: I18n = {
  donation_leaderboard: {
    title: "Réseaux disponibles pour les dons",
    rank_header: "#",
    network_header: "Réseau",
    address_header: "Adresse",
    balance_header: "Solde",
    usd_value_header: "Valeur USD",
    loading: "Chargement...",
    copy_success: "adresse copiée dans le presse-papiers!",
    stats: {
      top_network: "Réseau principal",
      networks_supported: "Réseaux supportés",
      total_raised: "Total collecté",
    },
  },
};