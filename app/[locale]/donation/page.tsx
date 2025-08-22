"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n.config";
import * as i18n from "./page.i18n";
import DonationForm from "@/components/common/pages/donation/donation-form/donation-form";
import DonationLeaderboard from "@/components/common/pages/donation/donation-leaderboard/donation-leaderboard";

interface Donation {
  network: string;
  address: string;
  balance?: number;
  explorerUrl?: string;
}

const blockExplorers: { [key: string]: string } = {
  Solana: "https://solscan.io/account/",
  SUI: "https://suiscan.xyz/mainnet/account/",
  TON: "https://tonviewer.com/",
  TRON: "https://tronscan.org/#/address/",
  AVAX: "https://snowtrace.io/address/",
  ETH: "https://etherscan.io/address/",
  BTC: "https://btcscan.org/address/",
  HBAR: "https://hashscan.io/mainnet/account/",
  VAULTA: "https://eosflare.io/account/",
};

const initialDonations: Donation[] = [
  {
    network: "Solana",
    address: "4enXL4gz4ytFtCkL5V2YzU5VfFtFnUkHdWYv8jX28LyW",
    explorerUrl: `${blockExplorers["Solana"]}4enXL4gz4ytFtCkL5V2YzU5VfFtFnUkHdWYv8jX28LyW`,
  },
  {
    network: "SUI",
    address:
      "0x90ea46396a8c22be6d800142972061bbe84399a6205b1a4bf4c963c971d5795f",
    explorerUrl: `${blockExplorers["SUI"]}0x90ea46396a8c22be6d800142972061bbe84399a6205b1a4bf4c963c971d5795f`,
  },
  {
    network: "TON",
    address: "UQDuqiVlh40OOpeufMZzesOC7WrsC98m1Gah2T7-kJ7-Y8zw",
    explorerUrl: `${blockExplorers["TON"]}UQDuqiVlh40OOpeufMZzesOC7WrsC98m1Gah2T7-kJ7-Y8zw`,
  },
  {
    network: "TRON",
    address: "TJD4KYYewNwNe5YBurZPRKr16h87iQnHCh",
    explorerUrl: `${blockExplorers["TRON"]}TJD4KYYewNwNe5YBurZPRKr16h87iQnHCh`,
  },
  {
    network: "AVAX",
    address: "0x9771876B04E0f3008cc7733C5f23E1C76650E139",
    explorerUrl: `${blockExplorers["AVAX"]}0x9771876B04E0f3008cc7733C5f23E1C76650E139`,
  },
  {
    network: "ETH",
    address: "0x9771876B04E0f3008cc7733C5f23E1C76650E139",
    explorerUrl: `${blockExplorers["ETH"]}0x9771876B04E0f3008cc7733C5f23E1C76650E139`,
  },
  {
    network: "BTC",
    address: "bc1pxpg6xr0mj8w0qdym9tfg4suqcz5av0nnyr7xckcnssd5hxxk6weqa3n87y",
    explorerUrl: `${blockExplorers["BTC"]}bc1pxpg6xr0mj8w0qdym9tfg4suqcz5av0nnyr7xckcnssd5hxxk6weqa3n87y`,
  },
  {
    network: "HBAR",
    address: "0x000000000000000000000000000000000092fcc7",
    explorerUrl: `${blockExplorers["HBAR"]}0x000000000000000000000000000000000092fcc7`,
  },
  {
    network: "VAULTA",
    address: "monark",
    explorerUrl: `${blockExplorers["VAULTA"]}monark`,
  },
];

// Helper function to fetch balances using Pinax Network Token API
const fetchBalance = async (donation: Donation): Promise<Donation> => {
  const balance = 0;
  return { ...donation, balance };
};

const DonationPage = () => {
  const params = useParams();
  const locale = (params?.locale || "en") as Locale;
  const t = i18n[locale].donation_page;

  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBalances = async () => {
      setLoading(true);
      try {
        const donationsWithBalances = await Promise.all(
          initialDonations.map(fetchBalance)
        );

        // Sort alphabetically by network name
        const sortedDonations = donationsWithBalances.sort(
          (a, b) => a.network.localeCompare(b.network)
        );

        setDonations(sortedDonations);
      } catch (error) {
        console.error("Error loading balances:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBalances();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
      <p className="mb-8 text-muted-foreground max-w-[475px]">
        {t.description}
      </p>
      <DonationForm locale={locale} donations={donations} />
      <DonationLeaderboard
        locale={locale}
        donations={donations}
        loading={loading}
      />
    </div>
  );
};

export default DonationPage;
