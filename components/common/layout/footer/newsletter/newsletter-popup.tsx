"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { getCookie, setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Locale } from "@/i18n.config";
import headerPhoto from "@/public/images/people/learn-students-laughing-laptops.webp";
import * as i18n from "./newsletter.i18n";
import { validateEmail } from "./newsletter.utils";

interface NewsletterPopupProps {
  /** Locale for translations (en or fr) */
  locale: Locale;
  /** Delay in milliseconds before showing the card (default: 15000) */
  delay?: number;
  /** Number of days to remember a dismissal (default: 30) */
  cookieExpiryDays?: number;
  /** UTM parameters for tracking */
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  /** Callback when the visitor subscribes successfully */
  onSubscribe?: (data: { email: string }) => void;
  /** Callback when the card is dismissed */
  onDismiss?: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

const COOKIE_NAME = "newsletter-popup-dismissed";
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Newsletter card: slides in a few seconds after the page loads, bottom-right
 * on desktop and as a bottom sheet on phones. It doesn't block the page, but
 * while focus is inside it Tab cycles within the card; Escape and the close
 * button dismiss it and give focus back. A dismissal is remembered in a
 * cookie for `cookieExpiryDays`; a subscription for good.
 */
export default function NewsletterPopup({
  locale,
  delay = 15000,
  cookieExpiryDays = 30,
  utm = { source: "website", medium: "popup", campaign: "newsletter_signup" },
  onSubscribe,
  onDismiss,
}: NewsletterPopupProps) {
  const t = (i18n[locale] ?? i18n.en).newsletterPopup;
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (getCookie(COOKIE_NAME) === "true") return;
    const timer = setTimeout(() => setIsOpen(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Move focus into the card when it opens (the card itself, so screen
  // readers announce its title), and remember where it came from.
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    cardRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  const dismiss = useCallback(
    (subscribed = false) => {
      setIsOpen(false);
      setCookie(COOKIE_NAME, "true", {
        // A subscription is remembered for good; a dismissal for a while.
        ...(subscribed ? {} : { maxAge: cookieExpiryDays * 24 * 60 * 60 }),
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      const target = returnFocusRef.current;
      if (target && document.contains(target)) target.focus({ preventScroll: true });
      onDismiss?.();
    },
    [cookieExpiryDays, onDismiss]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      dismiss(status === "success");
      return;
    }
    if (e.key !== "Tab" || !cardRef.current) return;
    const items = Array.from(cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === cardRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!validateEmail(value)) {
      setErrorMessage(t.invalidEmail);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: { email: value },
          utm: {
            source: utm.source || "website",
            medium: utm.medium || "popup",
            campaign: utm.campaign || "newsletter_signup",
          },
        }),
      });
      if (!response.ok) throw new Error(`Subscription failed (${response.status})`);
      setStatus("success");
      onSubscribe?.({ email: value });
      setTimeout(() => dismiss(true), 4000);
    } catch (error) {
      console.error("Subscription failed:", error);
      setErrorMessage(t.errorMessage);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  const loading = status === "loading";
  const failed = status === "error" && errorMessage === t.errorMessage;

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="newsletter-title"
      aria-describedby="newsletter-description"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="fixed inset-x-0 bottom-0 z-50 overflow-hidden rounded-t-2xl border border-b-0 bg-card text-card-foreground shadow-lg outline-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[23rem] sm:rounded-2xl sm:border-b motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-300"
    >
      <div className="relative aspect-[2/1] w-full sm:aspect-[16/9]">
        <Image
          src={headerPhoto}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 640px) 23rem, 100vw"
          className="object-cover object-[50%_38%]"
        />
        <button
          type="button"
          onClick={() => dismiss(status === "success")}
          aria-label={t.close}
          className="absolute right-2 top-2 inline-flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-5">
        {status === "success" ? (
          <div role="status" className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-4" aria-hidden="true" />
            </span>
            <div>
              <h2 id="newsletter-title" className="text-xl">
                {t.successTitle}
              </h2>
              <p id="newsletter-description" className="mt-1 text-sm text-muted-foreground">
                {t.successMessage}
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 id="newsletter-title" className="text-xl">
              {t.title}
            </h2>
            <p id="newsletter-description" className="mt-1 text-sm text-muted-foreground">
              {t.description}
            </p>
            <form onSubmit={subscribe} noValidate className="mt-4 flex flex-col gap-2 min-[400px]:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                {t.emailLabel}
              </label>
              <Input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                aria-invalid={status === "error" || undefined}
                aria-describedby={status === "error" ? "newsletter-error" : undefined}
                disabled={loading}
                className="h-11 min-w-0 flex-1 rounded-full"
              />
              <Button type="submit" disabled={loading || !email} className="h-11 shrink-0 rounded-full px-5">
                {loading ? t.subscribing : failed ? t.retryButton : t.subscribeButton}
              </Button>
            </form>
            {status === "error" && (
              <p id="newsletter-error" role="alert" className="mt-2 text-sm font-semibold text-destructive">
                {errorMessage}
              </p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              {t.privacyNote}{" "}
              <a
                href="https://www.beehiiv.com/tou"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t.termsOfUse}
              </a>
              {" · "}
              <a
                href="https://www.beehiiv.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t.privacyPolicy}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
