import React from "react";
import {
  NetworkSolana,
  NetworkSui,
  NetworkTron,
  TokenTON,
  NetworkAvalanche,
  NetworkEthereum,
  NetworkBitcoin,
  NetworkHederaHashgraph,
  NetworkVaulta,
  NetworkIconProps,
} from "@web3icons/react";

interface NetworkDisplayProps {
  networkId: string;
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  showSymbol?: boolean;
}

// Network configuration with full names and symbols
const networkConfig: Record<
  string,
  {
    name: string;
    symbol: string;
    Icon: React.FC<Omit<NetworkIconProps, "ref">>;
  }
> = {
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    Icon: NetworkEthereum,
  },
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    Icon: NetworkBitcoin,
  },
  Solana: {
    name: "Solana",
    symbol: "SOL",
    Icon: NetworkSolana,
  },
  AVAX: {
    name: "Avalanche",
    symbol: "AVAX",
    Icon: NetworkAvalanche,
  },
  SUI: {
    name: "Sui",
    symbol: "SUI",
    Icon: NetworkSui,
  },
  TON: {
    name: "The Open Network",
    symbol: "TON",
    Icon: TokenTON,
  },
  TRON: {
    name: "Tron",
    symbol: "TRX",
    Icon: NetworkTron,
  },
  HBAR: {
    name: "Hedera",
    symbol: "HBAR",
    Icon: NetworkHederaHashgraph,
  },
  VAULTA: {
    name: "Vaulta",
    symbol: "A",
    Icon: NetworkVaulta,
  },
};

/**
 * Component for displaying network information consistently
 * Shows: Icon (rounded, background variant) + Network Name + (Symbol in muted)
 */
export const NetworkDisplay: React.FC<NetworkDisplayProps> = ({
  networkId,
  className = "",
  iconSize = "md",
  showSymbol = true,
}) => {
  const network = networkConfig[networkId];

  if (!network) {
    // Fallback for unknown networks
    return <span className={className}>{networkId}</span>;
  }

  const { name, symbol, Icon } = network;

  // Icon size classes
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon
        className={`${iconSizes[iconSize]} rounded-full`}
        variant="background"
      />
      <span className="font-medium">{name}</span>
      {showSymbol && symbol !== name && (
        <span className="text-muted-foreground">({symbol})</span>
      )}
    </div>
  );
};

export default NetworkDisplay;
