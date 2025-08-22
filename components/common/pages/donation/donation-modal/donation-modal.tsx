"use client";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DonationAmountInput } from "@/components/ui/donation-amount-input";
import { NetworkSelect, defaultNetworks } from "@/components/ui/network-select";
import { Locale } from "@/i18n.config";
import * as i18n from "./donation-modal.i18n";
import { getMonarkWalletAddress, getWalletOptionsForNetwork, getNetworkToken } from "@/lib/donation-constants";
import { WalletButton } from "@/components/ui/wallet-button";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  network?: string;
  address?: string;
  amount?: string;
  currency?: string;
  locale: Locale;
}

// Generate deep links for different wallet types
const generateDeepLink = (network: string, address: string, amount?: string): string | null => {
  const amountInWei = amount ? (parseFloat(amount) * 1e18).toString() : undefined;
  
  switch (network) {
    case "ETH":
      // Ethereum deep link format
      return `ethereum:${address}${amountInWei ? `?value=${amountInWei}` : ''}`;
    
    case "BTC":
      // Bitcoin URI format
      return `bitcoin:${address}${amount ? `?amount=${amount}` : ''}`;
    
    case "Solana":
      // Solana Pay format
      return `solana:${address}${amount ? `?amount=${amount}` : ''}`;
    
    case "TRON":
      // TronLink format
      return `tron:${address}${amount ? `?amount=${amount}` : ''}`;
      
    case "AVAX":
      // Avalanche uses same format as Ethereum
      return `ethereum:${address}${amountInWei ? `?value=${amountInWei}` : ''}`;
    
    default:
      return null;
  }
};


export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  network: initialNetwork = "ETH",
  address: initialAddress = "",
  amount: initialAmount = "1",
  currency: initialCurrency = "ETH",
  locale,
}) => {
  const [network, setNetwork] = useState(initialNetwork);
  const [address, setAddress] = useState(initialAddress || getMonarkWalletAddress(initialNetwork));
  const [amount, setAmount] = useState(initialAmount);
  const [currency, setCurrency] = useState(initialCurrency);
  
  // Update state when props change (when modal is opened with new values)
  React.useEffect(() => {
    if (isOpen) {
      setNetwork(initialNetwork);
      setAmount(initialAmount);
      setCurrency(initialCurrency);
      setAddress(initialAddress || getMonarkWalletAddress(initialNetwork));
    }
  }, [isOpen, initialNetwork, initialAmount, initialCurrency, initialAddress]);
  
  // Initialize address if not provided
  React.useEffect(() => {
    if (!initialAddress) {
      setAddress(getMonarkWalletAddress(network));
    }
  }, [network, initialAddress]);
  
  const t = i18n[locale].donation_modal;
  const deepLink = generateDeepLink(network, address, amount);
  const walletOptions = getWalletOptionsForNetwork(network);
  
  const currentToken = currency || getNetworkToken(network);
  
  
  const handleNetworkChange = (newNetwork: string) => {
    setNetwork(newNetwork);
    // Set Monark's wallet address for the selected network
    setAddress(getMonarkWalletAddress(newNetwork));
    // Update currency to match network
    setCurrency(getNetworkToken(newNetwork));
  };
  
  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
  };
  
  
  
  
  // Generate QR code data
  const qrData = address ? (deepLink || address) : "";
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md fixed top-[10vh] left-1/2 transform -translate-x-1/2 translate-y-0 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {amount 
              ? t.description.replace('{amount}', amount).replace('{currency}', currentToken)
              : t.description_no_amount
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* QR Code - show when address is provided */}
          {address && (
            <div className="flex justify-center px-4 bg-muted/10 rounded-lg">
              <QRCodeSVG 
                value={qrData} 
                size={200}
                level="H"
                includeMargin={true}
                fgColor="hsl(var(--primary))"
                bgColor="transparent"
              />
            </div>
          )}
          
          {/* Editable Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.network}</label>
              <NetworkSelect
                value={network}
                onValueChange={handleNetworkChange}
                networks={defaultNetworks}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.amount}</label>
              <DonationAmountInput
                amount={amount}
                onAmountChange={handleAmountChange}
                network={network}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.wallet_address}</label>
              <Input
                type="text"
                value={address}
                disabled
                readOnly
                className="text-xs font-mono"
              />
            </div>
          </div>
          
          
          
          {/* Wallet Connection */}
          {address && walletOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.open_in_wallet}</label>
              <div className="grid grid-cols-2 gap-2">
                {walletOptions.map((option) => (
                  <WalletButton
                    key={option.name}
                    option={option}
                    network={network}
                    address={address}
                    amount={amount}
                  />
                ))}
              </div>
            </div>
          )}
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;