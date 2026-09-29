"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n.config";
import * as i18n from "./page.i18n";
import DonationForm from "@/components/pages/donation/donation-form/donation-form";
import DonationLeaderboard from "@/components/pages/donation/donation-leaderboard/donation-leaderboard";
import { MONARK_WALLET_ADDRESSES } from "@/lib/donation-constants";
import Photo from "@/components/common/photo/photo";

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
    <div className="site-container relative pt-12 pb-16 md:pt-16 md:pb-24">
      {/* The photo shows who donations support; on phones it is left out so
          the form stays close to the top. */}
      <div className="mb-10 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_20rem] lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="min-w-0">
          <h1>{t.title}</h1>
          <p className="lead mt-4 max-w-[36rem]">{t.description}</p>
        </div>
        <Photo
          photo="builders-at-work-table"
          locale={locale}
          priority
          sizes="(min-width: 1024px) 26rem, 20rem"
          className="hidden aspect-[16/10] md:block"
          imgClassName="object-[50%_45%]"
        />
      </div>
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
