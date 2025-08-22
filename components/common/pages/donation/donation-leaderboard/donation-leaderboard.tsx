"use client";
import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./donation-leaderboard.i18n";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ExternalLink, TrendingUp, Copy } from "lucide-react";
import { toast } from "sonner";
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

export interface DonationData {
  network: string;
  address: string;
  balance?: number;
  usdValue?: number;
  explorerUrl?: string;
}

type Props = {
  locale: Locale;
  donations: DonationData[];
  loading: boolean;
};

// Map network names to their corresponding icons
const NetworkIcon = ({ network }: { network: string }) => {
  switch (network.toLowerCase()) {
    case "solana":
      return <NetworkSolana className="w-8 h-8" />;
    case "sui":
      return <NetworkSui className="w-8 h-8" />;
    case "ton":
      return <TokenTON className="w-8 h-8" />;
    case "tron":
      return <NetworkTron className="w-8 h-8" />;
    case "avax":
      return <NetworkAvalanche className="w-8 h-8" />;
    case "eth":
      return <NetworkEthereum className="w-8 h-8" />;
    case "btc":
      return <NetworkBitcoin className="w-8 h-8" />;
    case "hbar":
      return <NetworkHederaHashgraph className="w-8 h-8" />;
    default:
      return null;
  }
};

function DonationLeaderboard({ locale, donations, loading }: Props) {
  const t = i18n[locale].donation_leaderboard;

  const handleCopyAddress = (address: string, network?: string) => {
    navigator.clipboard.writeText(address);
    toast.success(`${network ? network + ' ' : ''}${t.copy_success}`);
  };

  const totalRaised = donations.reduce((sum, d) => sum + (d.usdValue || 0), 0);

  return (
    <>
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="p-4">
            <div className="text-sm text-muted-foreground">{t.stats.top_network}</div>
            <div className="text-2xl font-bold">
              {donations[0]?.network || t.loading}
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-sm text-muted-foreground">{t.stats.networks_supported}</div>
            <div className="text-2xl font-bold">{donations.length}</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-sm text-muted-foreground">{t.stats.total_raised}</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              ${totalRaised.toFixed(2)}
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t.title}</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">{t.rank_header}</TableHead>
                <TableHead>{t.network_header}</TableHead>
                <TableHead>{t.address_header}</TableHead>
                <TableHead>{t.balance_header}</TableHead>
                <TableHead>{t.usd_value_header}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation, index) => (
                <TableRow key={donation.network}>
                  <TableCell className="font-medium">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <NetworkIcon network={donation.network} />
                      <span className="font-medium">{donation.network}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopyAddress(donation.address, donation.network)}
                        className="p-1 h-auto"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <a
                        href={donation.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                      >
                        <code className="text-xs">
                          {donation.address.slice(0, 8)}...{donation.address.slice(-6)}
                        </code>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    {loading ? (
                      <span className="text-muted-foreground">{t.loading}</span>
                    ) : (
                      <span>{donation.balance?.toFixed(4) || "0.0000"}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {loading ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      <span className="font-medium">
                        ${donation.usdValue?.toFixed(2) || "0.00"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

export default DonationLeaderboard;