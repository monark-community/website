"use client";
import React from "react";
import { GoogleAnalytics as GA } from "@next/third-parties/google";

function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const NODE_ENV = process.env.NODE_ENV;

  const useGA = NODE_ENV === "production";
  if (!useGA) {
    console.log(
      "Google Analytics will not be loaded because NODE_ENV is not production."
    );
  }

  if (useGA && !GA_MEASUREMENT_ID) {
    throw new Error(
      "NEXT_PUBLIC_GA_MEASUREMENT_ID not configured in environment variables"
    );
  }

  return useGA && GA_MEASUREMENT_ID && <GA gaId={GA_MEASUREMENT_ID} />;
}

export default GoogleAnalytics;
