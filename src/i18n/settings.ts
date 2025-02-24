export const i18n = {
  defaultLocale: "ja",
  locales: ["ja", "en"],
  labels: {
    ja: "日本語",
    en: "English",
  },
} as const;

export type Locale = (typeof i18n)["locales"][number];

export function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}
