import React from "react";
import Link from "next/link";
import { ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getExplorerUrlForNetwork } from "@/lib/donation-constants";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WalletAddressProps {
  address: string;
  network?: string;
  className?: string;
  showFull?: boolean;
  showCopyButton?: boolean;
  showExplorerLink?: boolean;
  copyButtonTitle?: string;
}

/**
 * Component for displaying wallet addresses with consistent formatting and actions
 * - Short addresses (≤20 chars): Display in full
 * - Long addresses (>20 chars): Display as first8...last6
 * - Optional copy button and explorer link
 */
export const WalletAddress: React.FC<WalletAddressProps> = ({ 
  address, 
  network,
  className = "",
  showFull = false,
  showCopyButton = false,
  showExplorerLink = false,
  copyButtonTitle = "Copy address"
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

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard!");
  };

  const explorerUrl = network ? getExplorerUrlForNetwork(network) : null;

  // Address content with optional explorer link
  const addressContent = () => {
    if (showExplorerLink && explorerUrl) {
      return (
        <Link 
          href={explorerUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>{formatAddress()}</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      );
    }
    return <span>{formatAddress()}</span>;
  };

  // If showing copy button, wrap in a container
  if (showCopyButton) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <code className="flex-1 text-xs break-all">
          {addressContent()}
        </code>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="shrink-0"
          title={copyButtonTitle}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Simple address display
  return (
    <span className={className}>
      {addressContent()}
    </span>
  );
};

export default WalletAddress;