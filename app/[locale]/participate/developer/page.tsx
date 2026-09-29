import { Metadata } from "next";
import { Locale } from "@/i18n.config";
import ParticipatePage, {
  participateMetadata,
} from "@/components/pages/participate/participate-page";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return participateMetadata("developer", locale);
}

export default async function DeveloperPage({ params }: Props) {
  const { locale } = await params;
  return <ParticipatePage slug="developer" locale={locale} />;
}
