import type { Locale } from "./settings";

export async function getTranslations(locale: Locale) {
  try {
    const translations = await import(`../../public/locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return {};
  }
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/");
  const localeSegment = segments[1];
  return localeSegment as Locale;
}
