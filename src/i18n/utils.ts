import { i18n, isValidLocale, type Locale } from "./settings";
import type { Translations } from "./types";

export async function getTranslations(locale: Locale): Promise<Translations> {
  const translations = await import(`../../public/locales/${locale}.json`);
  return translations.default as Translations;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1] ?? "";
  return isValidLocale(segment) ? segment : i18n.defaultLocale;
}
