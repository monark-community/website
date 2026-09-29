"use client";
import React from "react";
import { GoogleAnalytics as GA } from "@next/third-parties/google";

/**
 * Google Analytics is optional: it only loads in production builds that were
 * given a NEXT_PUBLIC_GA_MEASUREMENT_ID. Without one it renders nothing and
 * calls nothing (it used to throw, which crashed the whole client tree).
 */
function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) {
    return null;
  }

  return <GA gaId={GA_MEASUREMENT_ID} />;
}

export default GoogleAnalytics;
