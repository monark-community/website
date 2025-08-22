"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n.config";
import * as i18n from "./page.i18n";
import DonationForm from "@/components/common/pages/donation/donation-form/donation-form";
import DonationLeaderboard from "@/components/common/pages/donation/donation-leaderboard/donation-leaderboard";
import { MONARK_WALLET_ADDRESSES } from "@/lib/donation-constants";

interface Donation {
  network: string;
  address: string;
  balance?: number;
}

// Use the wallet addresses from constants
const initialDonations: Donation[] = MONARK_WALLET_ADDRESSES.map(wallet => ({
  network: wallet.network,
  address: wallet.address,
}));

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
