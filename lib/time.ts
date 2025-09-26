import { Locale as LocalLocale } from "@/i18n.config";
import { intervalToDuration, formatDuration as fnsFormatDuration } from "date-fns";
import { enUS, frCA } from "date-fns/locale";

function mapLocaleToDateFns(locale: LocalLocale) {
  const toFnsMap = {
    en: enUS,
    fr: frCA,
  };
  return toFnsMap[locale];
}

function formatDuration(totalSeconds: number, locale: LocalLocale = "en"): string {
  const duration = intervalToDuration({ start: 0, end: totalSeconds * 1000 });
  return fnsFormatDuration(duration, { locale: mapLocaleToDateFns(locale) });
}

export { mapLocaleToDateFns, formatDuration };