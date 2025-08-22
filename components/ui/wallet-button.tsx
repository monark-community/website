"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  WalletMetamask,
  WalletRainbow,
  WalletTrust,
  WalletPhantom,
  WalletCoinbase,
  WalletOkx,
} from "@web3icons/react";
import { WalletOption } from "@/lib/donation-constants";
import { useWallet } from "@/providers/wallet.provider";
import { toast } from "sonner";

interface WalletButtonProps {
  option: WalletOption;
  network: string;
  address: string;
  amount?: string;
  disabled?: boolean;
  className?: string;
}

// Get wallet icon component
const getWalletIcon = (walletType: string, className: string = "w-4 h-4") => {
  const iconProps = { className, variant: "background" as const };
  
  switch (walletType) {
    case "MetaMask":
      return <WalletMetamask {...iconProps} />;
    case "Rainbow":
      return <WalletRainbow {...iconProps} />;
    case "Trust Wallet":
      return <WalletTrust {...iconProps} />;
    case "Phantom":
      return <WalletPhantom {...iconProps} />;
    case "Coinbase":
      return <WalletCoinbase {...iconProps} />;
    case "OKX":
      return <WalletOkx {...iconProps} />;
    default:
      return null;
  }
};

export const WalletButton: React.FC<WalletButtonProps> = ({
  option,
  network,
  address,
  amount,
  disabled = false,
  className,
}) => {
  const { connectWallet, isWalletSupported } = useWallet();
  
  const isSupported = isWalletSupported(option.type);
  const canConnect = option.supportsBrowserExtension && isSupported;
  
  const handleClick = async () => {
    if (canConnect) {
      try {
        const txHash = await connectWallet(option.type, network, address, amount);
        if (txHash) {
          toast.success(`Transaction sent: ${txHash.slice(0, 10)}...`);
        }
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
      }
    } else if (option.supportsMobile) {
      toast.info(`${option.name} mobile app required`);
    } else {
      toast.warning(`${option.name} not available for this network`);
    }
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className={`justify-start ${className}`}
      onClick={handleClick}
      disabled={disabled || (!canConnect && !option.supportsMobile)}
    >
      {getWalletIcon(option.type)}
      <span className="ml-2">{option.name}</span>
    </Button>
  );
};