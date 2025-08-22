"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NetworkSolana,
  NetworkSui,
  NetworkTron,
  TokenTON,
  NetworkAvalanche,
  NetworkEthereum,
  NetworkBitcoin,
  NetworkHederaHashgraph,
} from "@web3icons/react";

export interface Network {
  id: string;
  name: string;
  symbol: string;
  icon?: React.ReactNode;
}

// Map network names to their corresponding icons
const getNetworkIcon = (network: string, className: string = "w-5 h-5") => {
  switch (network.toLowerCase()) {
    case "solana":
    case "sol":
      return <NetworkSolana className={className} />;
    case "sui":
      return <NetworkSui className={className} />;
    case "ton":
      return <TokenTON className={className} />;
    case "tron":
    case "trx":
      return <NetworkTron className={className} />;
    case "avalanche":
    case "avax":
      return <NetworkAvalanche className={className} />;
    case "ethereum":
    case "eth":
      return <NetworkEthereum className={className} />;
    case "bitcoin":
    case "btc":
      return <NetworkBitcoin className={className} />;
    case "hedera":
    case "hbar":
      return <NetworkHederaHashgraph className={className} />;
    default:
      return null;
  }
};

export const defaultNetworks: Network[] = [
  { id: "ETH", name: "Ethereum", symbol: "ETH" },
  { id: "BTC", name: "Bitcoin", symbol: "BTC" },
  { id: "Solana", name: "Solana", symbol: "SOL" },
  { id: "AVAX", name: "Avalanche", symbol: "AVAX" },
  { id: "SUI", name: "Sui", symbol: "SUI" },
  { id: "TON", name: "TON", symbol: "TON" },
  { id: "TRON", name: "Tron", symbol: "TRX" },
  { id: "HBAR", name: "Hedera Hashgraph", symbol: "HBAR" },
];

interface NetworkSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  networks?: Network[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function NetworkSelect({
  value,
  onValueChange,
  networks = defaultNetworks,
  placeholder = "Select network",
  className,
  disabled = false,
}: NetworkSelectProps) {
  const networksWithIcons = networks.map(network => ({
    ...network,
    icon: network.icon || getNetworkIcon(network.id),
  }));

  const selectedNetwork = networksWithIcons.find(n => n.id === value);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {selectedNetwork && (
            <div className="flex items-center gap-2">
              {selectedNetwork.icon}
              <span>{selectedNetwork.name}</span>
              <span className="text-muted-foreground text-sm">
                ({selectedNetwork.symbol})
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {networksWithIcons.map((network) => (
          <SelectItem key={network.id} value={network.id}>
            <div className="flex items-center gap-2">
              {network.icon}
              <span>{network.name}</span>
              <span className="text-muted-foreground text-sm">
                ({network.symbol})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}