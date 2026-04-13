import type { Locale } from "./settings";
import type { Translations } from "./types";

export async function getTranslations(locale: Locale): Promise<Translations> {
  const translations = await import(`../../public/locales/${locale}.json`);
  return translations.default as Translations;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/");
  const localeSegment = segments[1];
  return localeSegment as Locale;
}
