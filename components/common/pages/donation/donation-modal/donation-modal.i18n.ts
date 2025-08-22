export interface I18n {
  donation_modal: {
    title: string;
    description: string;
    description_no_amount: string;
    network: string;
    amount: string;
    wallet_address: string;
    copy_address: string;
    address_copied: string;
    open_in_wallet: string;
    open_wallet_app: string;
    scan_qr_code: string;
    generate_qr_code: string;
  };
}

export const en: I18n = {
  donation_modal: {
    title: "Make a Donation",
    description: "Scan the QR code or use your wallet app to send {amount} {currency}.",
    description_no_amount: "Scan the QR code or use your wallet app to send your donation.",
    network: "Network",
    amount: "Amount",
    wallet_address: "Wallet Address",
    copy_address: "Copy Address",
    address_copied: "Address copied to clipboard!",
    open_in_wallet: "Open in wallet",
    open_wallet_app: "Open in Wallet App",
    scan_qr_code: "Scan QR Code",
    generate_qr_code: "Generate QR Code",
  },
};

export const fr: I18n = {
  donation_modal: {
    title: "Faire un don",
    description: "Scannez le code QR ou utilisez votre application de portefeuille pour envoyer {amount} {currency}.",
    description_no_amount: "Scannez le code QR ou utilisez votre application de portefeuille pour envoyer votre don.",
    network: "Réseau",
    amount: "Montant",
    wallet_address: "Adresse du portefeuille",
    copy_address: "Copier l'adresse",
    address_copied: "Adresse copiée dans le presse-papiers!",
    open_in_wallet: "Ouvrir dans le portefeuille",
    open_wallet_app: "Ouvrir dans l'app Wallet",
    scan_qr_code: "Scanner le code QR",
    generate_qr_code: "Générer le code QR",
  },
};