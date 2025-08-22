"use client";
import React, { useState, useMemo } from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./donation-form.i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { NetworkSelect, Network } from "@/components/ui/network-select";
import { WalletAddress } from "@/components/common/wallet-address/wallet-address";
import { DonationModal } from "../donation-modal/donation-modal";
import { getNetworkInfo, getNetworkToken } from "@/lib/donation-constants";
import { DonationAmountInput } from "@/components/ui/donation-amount-input";

export interface DonationNetwork {
  network: string;
  address: string;
}

type Props = {
  locale: Locale;
  donations: DonationNetwork[];
};

function DonationForm({ locale, donations }: Props) {
  const t = i18n[locale].donation_form;
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<string>("1");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [isAddressAnimating, setIsAddressAnimating] = useState(false);

  // Convert donations to Network format for NetworkSelect with full names
  const networks: Network[] = useMemo(() => {
    const networkList = donations.map((donation) => {
      const info = getNetworkInfo(donation.network);
      return {
        id: donation.network,
        name: info?.name || donation.network,
        symbol: info?.symbol || donation.network,
      };
    });

    // Sort alphabetically by network name
    return networkList.sort((a, b) => a.name.localeCompare(b.name));
  }, [donations]);

  // Get the symbol for the selected network
  const getNetworkSymbol = (networkId: string): string => {
    return getNetworkToken(networkId);
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
  
  // Trigger animation when network changes
  React.useEffect(() => {
    if (selectedNetwork) {
      // Start animation immediately
      setIsAddressAnimating(true);
      
      // Stop animation after duration
      const timer = setTimeout(() => {
        setIsAddressAnimating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedNetwork]);

  const handleDonate = async () => {
    const selectedDonation = donations.find(
      (d) => d.network === selectedNetwork
    );
    if (!selectedDonation || !donationAmount) return;

    // Open the donation modal with QR code
    setShowModal(true);
  };

  return (
    <>
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
                <DonationAmountInput
                  amount={donationAmount}
                  onAmountChange={setDonationAmount}
                  network={selectedNetwork}
                  placeholder={t.amount_placeholder_crypto}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{t.view_on_explorer}</span>
                <div
                  className={`inline-block transition-all duration-300 ease-out ${
                    isAddressAnimating 
                      ? "scale-105 font-bold text-primary" 
                      : "scale-100"
                  }`}
                  key={selectedNetwork}
                >
                  <WalletAddress
                    address={
                      donations.find((d) => d.network === selectedNetwork)
                        ?.address || ""
                    }
                    network={selectedNetwork}
                    showExplorerLink
                  />
                </div>
              </div>
              <Button onClick={handleDonate} disabled={!donationAmount}>
                {t.donate_button}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Donation Modal */}
      <DonationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        network={selectedNetwork}
        address={
          donations.find((d) => d.network === selectedNetwork)?.address || ""
        }
        amount={donationAmount}
        currency={selectedCurrency}
        locale={locale}
      />
    </>
  );
}

export default DonationForm;
