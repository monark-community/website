export interface I18n {
  donation_form: {
    title: string;
    select_network: string;
    amount_label: string;
    currency_label: string;
    view_on_explorer: string;
    donate_button: string;
    copy_success: string;
    donation_instruction: string;
    amount_placeholder_usd: string;
    amount_placeholder_crypto: string;
  };
}

export const en: I18n = {
  donation_form: {
    title: "Make a Donation",
    select_network: "Select Network",
    amount_label: "Amount",
    currency_label: "Currency",
    view_on_explorer: "View on Explorer",
    donate_button: "Donate Now",
    copy_success: "address copied to clipboard!",
    donation_instruction: "Please send {amount} {currency} to the copied address",
    amount_placeholder_usd: "100.00",
    amount_placeholder_crypto: "0.001",
  },
};

export const fr: I18n = {
  donation_form: {
    title: "Faire un don",
    select_network: "Sélectionner le réseau",
    amount_label: "Montant",
    currency_label: "Devise",
    view_on_explorer: "Voir sur l'explorateur",
    donate_button: "Faire un don",
    copy_success: "adresse copiée dans le presse-papiers!",
    donation_instruction: "Veuillez envoyer {amount} {currency} à l'adresse copiée",
    amount_placeholder_usd: "100.00",
    amount_placeholder_crypto: "0.001",
  },
};