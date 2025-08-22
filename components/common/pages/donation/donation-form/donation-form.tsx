"use client";
import React, { useState, useMemo } from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./donation-form.i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { NetworkSelect, Network } from "@/components/ui/network-select";
import { 
  AmountCurrencyInput, 
  Currency, 
  defaultFiatCurrencies, 
  generateCryptoCurrencies 
} from "@/components/ui/amount-currency-input";
import { toast } from "sonner";

export interface DonationNetwork {
  network: string;
  address: string;
  explorerUrl?: string;
}

type Props = {
  locale: Locale;
  donations: DonationNetwork[];
  prices: { [key: string]: number };
};

function DonationForm({ locale, donations, prices }: Props) {
  const t = i18n[locale].donation_form;
  const [selectedNetwork, setSelectedNetwork] = useState<string>("ETH");
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  // Convert donations to Network format for NetworkSelect with full names
  const networks: Network[] = useMemo(() => 
    donations.map(donation => {
      const getNetworkInfo = (network: string) => {
        switch (network) {
          case "ETH": return { name: "Ethereum", symbol: "ETH" };
          case "BTC": return { name: "Bitcoin", symbol: "BTC" };
          case "Solana": return { name: "Solana", symbol: "SOL" };
          case "AVAX": return { name: "Avalanche", symbol: "AVAX" };
          case "SUI": return { name: "Sui", symbol: "SUI" };
          case "TON": return { name: "TON", symbol: "TON" };
          case "TRON": return { name: "Tron", symbol: "TRX" };
          case "HBAR": return { name: "Hedera Hashgraph", symbol: "HBAR" };
          default: return { name: network, symbol: network };
        }
      };
      
      const info = getNetworkInfo(donation.network);
      return {
        id: donation.network,
        name: info.name,
        symbol: info.symbol,
      };
    }), [donations]
  );

  // Generate all available currencies (FIAT + Crypto)
  const allCurrencies: Currency[] = useMemo(() => [
    ...defaultFiatCurrencies,
    ...generateCryptoCurrencies(networks),
  ], [networks]);

  // Get the symbol for the selected network
  const getNetworkSymbol = (networkId: string): string => {
    const network = networks.find(n => n.id === networkId);
    return network?.symbol || networkId;
  };

  // Auto-switch currency to network token when network changes (if current currency is crypto)
  React.useEffect(() => {
    const selectedCurrencyObj = allCurrencies.find(c => c.id === selectedCurrency);
    if (selectedCurrencyObj?.type === 'CRYPTO') {
      const networkSymbol = getNetworkSymbol(selectedNetwork);
      setSelectedCurrency(networkSymbol);
    }
  }, [selectedNetwork, allCurrencies, selectedCurrency, getNetworkSymbol]);

  const handleCopyAddress = (address: string, network?: string) => {
    navigator.clipboard.writeText(address);
    toast.success(`${network ? network + ' ' : ''}${t.copy_success}`);
  };

  const handleDonate = async () => {
    const selectedDonation = donations.find(d => d.network === selectedNetwork);
    if (!selectedDonation || !donationAmount) return;

    // Copy the address and show a toast
    handleCopyAddress(selectedDonation.address, selectedNetwork);
    const instruction = t.donation_instruction
      .replace('{amount}', donationAmount)
      .replace('{currency}', selectedCurrency);
    toast.info(instruction);
  };

  const convertAmount = () => {
    if (!donationAmount) return "";
    const amount = parseFloat(donationAmount);
    if (isNaN(amount)) return "";
    
    const selectedCurrencyObj = allCurrencies.find(c => c.id === selectedCurrency);
    if (!selectedCurrencyObj) return "";

    if (selectedCurrencyObj.type === 'FIAT') {
      // Convert from FIAT to selected network token
      const tokenPrice = prices[selectedNetwork] || 1;
      const tokenSymbol = networks.find(n => n.id === selectedNetwork)?.symbol || selectedNetwork;
      return `≈ ${(amount / tokenPrice).toFixed(6)} ${tokenSymbol}`;
    } else {
      // Convert from crypto to USD
      const networkPrice = prices[selectedNetwork] || 0;
      return `≈ $${(amount * networkPrice).toFixed(2)} USD`;
    }
  };

  return (
    <Card className="mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{t.title}</h2>
        
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="network">{t.select_network}</Label>
              <NetworkSelect
                value={selectedNetwork}
                onValueChange={setSelectedNetwork}
                networks={networks}
                placeholder={t.select_network}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">{t.amount_label}</Label>
              <AmountCurrencyInput
                amount={donationAmount}
                onAmountChange={setDonationAmount}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
                currencies={allCurrencies}
                placeholder={selectedCurrency === "USD" ? t.amount_placeholder_usd : t.amount_placeholder_crypto}
                showConversion={true}
                conversionText={convertAmount()}
                // Filter crypto to only show selected network's token + all FIAT currencies
                customFilter={(currency) => {
                  if (currency.type === 'FIAT') {
                    return true; // Always show FIAT currencies
                  }
                  // For crypto, only show the selected network's token
                  const networkSymbol = getNetworkSymbol(selectedNetwork);
                  return currency.id === networkSymbol;
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {t.wallet_label}: {donations.find(d => d.network === selectedNetwork)?.address.slice(0, 10)}...
            </div>
            <Button onClick={handleDonate} disabled={!donationAmount}>
              {t.donate_button}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DonationForm;