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
  usdValue?: number;
  explorerUrl?: string;
}

const blockExplorers: { [key: string]: string } = {
  Solana: "https://solscan.io/account/",
  SUI: "https://suiscan.xyz/mainnet/account/",
  TON: "https://tonviewer.com/",
  TRON: "https://tronscan.org/#/address/",
  AVAX: "https://snowtrace.io/address/",
  ETH: "https://etherscan.io/address/",
  BTC: "https://blockchair.com/bitcoin/address/",
  HBAR: "https://hashscan.io/mainnet/account/",
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
    address: "0.0.1234567", // Replace with your actual Hedera account ID
    explorerUrl: `${blockExplorers["HBAR"]}0.0.1234567`,
  },
];

// Helper function to fetch balances using Pinax Network Token API
const fetchBalance = async (donation: Donation): Promise<Donation> => {
  try {
    let balance = 0;
    let usdValue = 0;

    // Map network names to chain types for Pinax API
    const networkMapping: {
      [key: string]: { type: string; chainId?: string };
    } = {
      ETH: { type: "evm", chainId: "eth" },
      AVAX: { type: "evm", chainId: "avax" },
      Solana: { type: "svn" },
      SUI: { type: "move" },
      TON: { type: "ton" },
      TRON: { type: "tron" },
      BTC: { type: "btc" },
      HBAR: { type: "hedera" },
    };

    const networkConfig = networkMapping[donation.network];

    if (
      networkConfig &&
      (networkConfig.type === "evm" || networkConfig.type === "svn")
    ) {
      try {
        // Use Pinax Token API for EVM and Solana chains
        const apiEndpoint =
          networkConfig.type === "evm"
            ? `https://token-api.thegraph.com/balances/evm/${donation.address}`
            : `https://token-api.thegraph.com/balances/svn/${donation.address}`;

        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            // Note: In production, you would need to add your JWT token here
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Parse the balance from the response
          if (data && data.balances) {
            const nativeToken = data.balances.find(
              (b: any) => b.symbol === donation.network || b.isNative === true
            );
            if (nativeToken) {
              balance = parseFloat(nativeToken.balance) || 0;
            }
          }
        }
      } catch (apiError) {
        console.error(`Pinax API error for ${donation.network}:`, apiError);
      }
    }

    // Fallback to direct blockchain APIs for networks not supported by Pinax
    if (balance === 0) {
      switch (donation.network.toLowerCase()) {
        case "btc":
          try {
            const btcResponse = await fetch(
              `https://blockchain.info/q/addressbalance/${donation.address}`
            );
            const btcSatoshis = await btcResponse.text();
            balance = parseFloat(btcSatoshis || "0") / 1e8;
          } catch (e) {
            console.error("BTC fetch error:", e);
          }
          break;

        case "tron":
          try {
            const tronResponse = await fetch(
              `https://api.trongrid.io/v1/accounts/${donation.address}`
            );
            const tronData = await tronResponse.json();
            balance = (tronData.data?.[0]?.balance || 0) / 1e6;
          } catch (e) {
            console.error("TRON fetch error:", e);
          }
          break;
      }
    }

    // Fetch current prices
    const prices: { [key: string]: number } = {
      BTC: 45000,
      ETH: 2500,
      AVAX: 35,
      Solana: 100,
      SUI: 1.5,
      TON: 2.5,
      TRON: 0.1,
      HBAR: 0.05,
    };

    usdValue = balance * (prices[donation.network] || 0);

    return { ...donation, balance, usdValue };
  } catch (error) {
    console.error(`Error fetching balance for ${donation.network}:`, error);
    return { ...donation, balance: 0, usdValue: 0 };
  }
};

const DonationPage = () => {
  const params = useParams();
  const locale = (params?.locale || "en") as Locale;
  const t = i18n[locale].donation_page;

  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [loading, setLoading] = useState(true);

  const prices: { [key: string]: number } = {
    BTC: 45000,
    ETH: 2500,
    AVAX: 35,
    Solana: 100,
    SUI: 1.5,
    TON: 2.5,
    TRON: 0.1,
    HBAR: 0.05,
  };

  useEffect(() => {
    const loadBalances = async () => {
      setLoading(true);
      try {
        const donationsWithBalances = await Promise.all(
          initialDonations.map(fetchBalance)
        );

        // Sort by USD value (highest first)
        const sortedDonations = donationsWithBalances.sort(
          (a, b) => (b.usdValue || 0) - (a.usdValue || 0)
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
      <p className="mb-8 text-muted-foreground">{t.description}</p>
      WORK IN PROGRESS
      <DonationForm locale={locale} donations={donations} prices={prices} />
      <DonationLeaderboard
        locale={locale}
        donations={donations}
        loading={loading}
      />
    </div>
  );
};

export default DonationPage;
