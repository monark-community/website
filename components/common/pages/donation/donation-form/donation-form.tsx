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
import { WalletAddress } from "@/components/common/wallet-address/wallet-address";

export interface DonationNetwork {
  network: string;
  address: string;
  explorerUrl?: string;
}

type Props = {
  locale: Locale;
  donations: DonationNetwork[];
};

function DonationForm({ locale, donations }: Props) {
  const t = i18n[locale].donation_form;
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  // Convert donations to Network format for NetworkSelect with full names
  const networks: Network[] = useMemo(() => {
    const networkList = donations.map(donation => {
      const getNetworkInfo = (network: string) => {
        switch (network) {
          case "ETH": return { name: "Ethereum", symbol: "ETH" };
          case "BTC": return { name: "Bitcoin", symbol: "BTC" };
          case "Solana": return { name: "Solana", symbol: "SOL" };
          case "AVAX": return { name: "Avalanche", symbol: "AVAX" };
          case "SUI": return { name: "Sui", symbol: "SUI" };
          case "TON": return { name: "The Open Network", symbol: "TON" };
          case "TRON": return { name: "Tron", symbol: "TRX" };
          case "HBAR": return { name: "Hedera Hashgraph", symbol: "HBAR" };
          case "VAULTA": return { name: "Vaulta", symbol: "A" };
          default: return { name: network, symbol: network };
        }
      };
      
      const info = getNetworkInfo(donation.network);
      return {
        id: donation.network,
        name: info.name,
        symbol: info.symbol,
      };
    });
    
    // Sort alphabetically by network name
    return networkList.sort((a, b) => a.name.localeCompare(b.name));
  }, [donations]);

  // Generate all available currencies (Crypto only)
  const allCurrencies: Currency[] = useMemo(() => [
    ...generateCryptoCurrencies(networks),
  ], [networks]);

  // Get the symbol for the selected network
  const getNetworkSymbol = (networkId: string): string => {
    const network = networks.find(n => n.id === networkId);
    return network?.symbol || networkId;
  };

  // Set default network to first available option when networks are loaded
  React.useEffect(() => {
    if (networks.length > 0 && !selectedNetwork) {
      setSelectedNetwork(networks[0].id);
    }
  }, [networks, selectedNetwork]);

  // Auto-switch currency to network token when network changes
  React.useEffect(() => {
    if (selectedNetwork) {
      const networkSymbol = getNetworkSymbol(selectedNetwork);
      setSelectedCurrency(networkSymbol);
    }
  }, [selectedNetwork, getNetworkSymbol]);

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
    // No conversion needed since we're only using crypto
    return "";
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
                placeholder={t.amount_placeholder_crypto}
                showConversion={false}
                // Filter to only show selected network's token
                customFilter={(currency) => {
                  const networkSymbol = getNetworkSymbol(selectedNetwork);
                  return currency.id === networkSymbol;
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {t.wallet_label}: <WalletAddress address={donations.find(d => d.network === selectedNetwork)?.address || ''} />
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