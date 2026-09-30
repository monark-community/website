import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRightIcon, HomeIcon } from "lucide-react";
import { defaultLocale, isLocale } from "@/i18n.config";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import * as i18n from "./errors.i18n";
import type { ErrorCode } from "./errors.i18n";

type Params = Promise<{ locale: string; code: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/** Unknown codes fall back to 500, as before. */
function resolve(params: { locale: string; code: string }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = i18n[locale];
  const code: ErrorCode =
    Object.hasOwn(t.error_definitions, params.code) ?(params.code as ErrorCode) : "500";
  return { t, code, copy: t.error_definitions[code] };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { code, copy } = resolve(await params);
  return {
    title: `${code} · ${copy.title} • Monark`,
    description: copy.message,
    robots: { index: false, follow: true },
  };
}

export default async function ErrorPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { t, code, copy } = resolve(await params);
  const { route } = await searchParams;
  const requestedRoute =
    code === "404" && typeof route === "string" && route.startsWith("/")
      ? route
      : undefined;

  return (
    <div className="site-container">
      <section
        aria-labelledby="error-title"
        className="relative isolate grid items-center gap-8 overflow-hidden py-14 md:py-20 lg:min-h-[calc(100dvh-4rem-8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12 lg:overflow-visible"
      >
        <div className="max-w-[36rem]">
          <p className="eyebrow">
            {t.eyebrow} {code}
          </p>
          {/* The numeral is decorative; the eyebrow above carries the code. */}
          <p
            aria-hidden="true"
            className="font-extrabold leading-[0.85] tracking-[-0.045em] text-primary-ink tabular-nums"
            style={{ fontSize: "clamp(6.5rem, 3rem + 14vw, 12.5rem)" }}
          >
            {code}
          </p>
          <h1 id="error-title" className="mt-6">
            {copy.title}
          </h1>
          <p className="lead mt-4 max-w-[34rem]">{copy.message}</p>

          {requestedRoute && (
            <p className="mt-5 text-sm text-muted-foreground">
              {t.requested_route}{" "}
              <code className="break-all rounded-md border bg-secondary px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
                {requestedRoute}
              </code>
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <NavLink href="/">
                <HomeIcon aria-hidden="true" />
                {t.actions.home}
              </NavLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <NavLink href="/project">
                {t.actions.projects}
                <ArrowRightIcon aria-hidden="true" />
              </NavLink>
            </Button>
          </div>
        </div>

        {/* Monark line art: the mesh butterfly, flat strokes, partly cropped on phones. */}
        <Image
          src="/vectors/decorative/monark-mesh.svg"
          alt=""
          aria-hidden="true"
          width={569}
          height={571}
          priority
          className="pointer-events-none absolute -right-24 top-6 -z-10 w-[280px] select-none opacity-20 sm:-right-16 sm:w-[360px] sm:opacity-25 lg:static lg:z-auto lg:w-full lg:max-w-[460px] lg:justify-self-end lg:opacity-60 dark:lg:opacity-50"
        />
      </section>
    </div>
  );
}
