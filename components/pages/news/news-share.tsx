"use client";
import React, { useEffect, useState } from "react";
import { CheckIcon, LinkIcon } from "lucide-react";
import SOCIALS from "@/components/common/socials/socials";
import SocialIcon from "@/components/common/socials/social-icon";
import { cn } from "@/lib/utils";

type Props = {
  /** Path of the article, e.g. /en/learn/news/some-id. */
  path: string;
  title: string;
  labels: {
    share: string;
    copy: string;
    copied: string;
    /** "Share on {network}" per network, keyed by social id. */
    networks: Record<string, string>;
  };
  className?: string;
};

// Networks from socials.ts that expose a share URL (LinkedIn, X).
const NETWORKS = SOCIALS.filter((social) => social.shareUrl);

const pill =
  "inline-flex h-10 items-center gap-2 rounded-full border bg-card px-4 text-sm font-semibold text-foreground no-underline transition-colors duration-150 hover:bg-secondary";

/** Share row: LinkedIn, X and copy link. The absolute URL is read after mount. */
function NewsShare({ path, title, labels, className }: Props) {
  const [url, setUrl] = useState(path);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard unavailable (insecure context): leave the button as is.
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <p className="m-0 mr-1 text-sm font-semibold text-foreground">
        {labels.share}
      </p>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {NETWORKS.map((network) => {
          const shareHref =
            network.id === "twitter"
              ? `${network.shareUrl}${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
              : `${network.shareUrl}${encodeURIComponent(url)}`;
          const label = labels.networks[network.id] ?? network.name;
          return (
            <li key={network.id} className="m-0">
              <a
                href={shareHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={pill}
              >
                <SocialIcon id={network.id} className="size-4" />
                <span>{network.id === "twitter" ? "X" : network.name}</span>
              </a>
            </li>
          );
        })}
        <li className="m-0">
          <button type="button" onClick={copy} className={pill}>
            {copied ? (
              <CheckIcon aria-hidden="true" className="size-4 text-success" />
            ) : (
              <LinkIcon aria-hidden="true" className="size-4" />
            )}
            <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NewsShare;
