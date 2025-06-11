"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { cn } from "@/lib/utils";
import "nprogress/nprogress.css";
import "./loader-page.scss";

// Disable the default spinner
NProgress.configure({ showSpinner: false });

export default function LoaderPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    NProgress.start();

    const timer = setTimeout(() => {
      setLoading(false);
      NProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
      setLoading(false);
      NProgress.done();
    };
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-1 bg-primary transition-opacity",
        loading ? "opacity-100" : "opacity-0",
        "animate-[fadeIn_0.2s_ease-out]"
      )}
    />
  );
}