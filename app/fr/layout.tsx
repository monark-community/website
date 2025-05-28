import { WebLayoutCentered } from "@/components/web/web.layout";
import { defaultLocale, Locale } from "@/i18n.config";
import { cookies } from "next/headers";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  return (
    <WebLayoutCentered locale={locale}>
      <article className="px-4 py-8">{children}</article>
    </WebLayoutCentered>
  );
}
 