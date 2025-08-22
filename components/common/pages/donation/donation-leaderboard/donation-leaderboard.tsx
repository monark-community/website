"use client";
import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./donation-leaderboard.i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { WalletAddress } from "@/components/common/wallet-address/wallet-address";
import { NetworkDisplay } from "@/components/common/network-display/network-display";

export interface DonationData {
  network: string;
  address: string;
  balance?: number;
}

type Props = {
  locale: Locale;
  donations: DonationData[];
  loading: boolean;
};


function DonationLeaderboard({ locale, donations }: Props) {
  const t = i18n[locale].donation_leaderboard;


  // const totalBalances = donations.reduce((sum, d) => sum + (d.balance || 0), 0);

  return (
    <>
      {/* Stats Summary */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
              {totalBalances.toFixed(4)}
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </Card>
      </div> */}

      {/* Leaderboard Table */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t.title}</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-12">{t.rank_header}</TableHead> */}
                <TableHead>{t.network_header}</TableHead>
                <TableHead>{t.address_header}</TableHead>
                {/* <TableHead>{t.balance_header}</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.network}>
                  {/* <TableCell className="font-medium">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && index + 1}
                  </TableCell> */}
                  <TableCell>
                    <NetworkDisplay networkId={donation.network} />
                  </TableCell>
                  <TableCell>
                    <WalletAddress 
                      address={donation.address}
                      network={donation.network}
                      showCopyButton
                      showExplorerLink
                      className="text-xs"
                      copyButtonTitle={t.copy_success}
                    />
                  </TableCell>
                  {/* <TableCell>
                    {loading ? (
                      <span className="text-muted-foreground">{t.loading}</span>
                    ) : (
                      <span>{donation.balance?.toFixed(4) || "0.0000"}</span>
                    )}
                  </TableCell> */}
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