import React from "react";

interface WalletAddressProps {
  address: string;
  className?: string;
  showFull?: boolean; // Force showing full address regardless of length
}

/**
 * Component for displaying wallet addresses with consistent formatting
 * - Short addresses (≤20 chars): Display in full
 * - Long addresses (>20 chars): Display as first8...last6
 */
export const WalletAddress: React.FC<WalletAddressProps> = ({ 
  address, 
  className = "",
  showFull = false 
}) => {
  if (!address) return null;

  const formatAddress = () => {
    // Always show full if requested or if address is short
    if (showFull || address.length <= 20) {
      return address;
    }
    
    // For long addresses, show first 8 and last 6 characters
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  return <span className={className}>{formatAddress()}</span>;
};

export default WalletAddress;