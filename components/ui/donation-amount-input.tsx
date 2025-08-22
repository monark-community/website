"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface DonationAmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  network: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Get token symbol for network
const getNetworkToken = (network: string): string => {
  switch (network) {
    case "ETH":
      return "ETH";
    case "BTC":
      return "BTC";
    case "SOL":
      return "SOL";
    case "AVAX":
      return "AVAX";
    case "TRON":
      return "TRX";
    case "SUI":
      return "SUI";
    case "TON":
      return "TON";
    case "HBAR":
      return "HBAR";
    case "VAULTA":
      return "A";
    default:
      return network;
  }
};

export function DonationAmountInput({
  amount,
  onAmountChange,
  network,
  placeholder = "0.00",
  className,
  disabled = false,
}: DonationAmountInputProps) {
  const tokenSymbol = getNetworkToken(network);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Combined Input and Token Display */}
      <div className="flex relative border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {/* Amount Input */}
        <Input
          type="number"
          placeholder={placeholder}
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={disabled}
          step="any"
          min="0"
          className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
        />
        
        {/* Token Symbol Display */}
        <div className="border-l border-input px-3 py-2 bg-muted/30 rounded-r-md min-w-[80px] flex items-center justify-center">
          <span className="font-medium text-sm">{tokenSymbol}</span>
        </div>
      </div>
    </div>
  );
}