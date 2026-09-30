import { Metadata } from "next";
import { Locale } from "@/i18n.config";
import ParticipatePage, {
  participateMetadata,
} from "@/components/pages/participate/participate-page";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return participateMetadata("university", locale);
}

export default async function UniversityPage({ params }: Props) {
  const { locale } = await params;
  return <ParticipatePage slug="university" locale={locale} />;
}
