import { i18n, type Locale } from "./settings";

type LanguageAlternates = {
  canonical: string;
  languages: Record<string, string>;
};

/**
 * hreflang / canonical 用の alternates を組み立てる。
 *
 * - `pathWithoutLocale` はロケールを除いたパス（home は ""、例: "/shop"、"/shop/foo"）。
 * - canonical は現在ロケールの自己参照 URL。
 * - languages に全ロケール + `x-default`（デフォルトロケール）を含める。
 * - 相対パスを返し、絶対 URL への解決は root layout の `metadataBase` に委ねる。
 */
export function buildLanguageAlternates(
  locale: Locale,
  pathWithoutLocale: string,
): LanguageAlternates {
  const languages: Record<string, string> = {};
  for (const l of i18n.locales) {
    languages[l] = `/${l}${pathWithoutLocale}`;
  }
  languages["x-default"] = `/${i18n.defaultLocale}${pathWithoutLocale}`;

  return {
    canonical: `/${locale}${pathWithoutLocale}`,
    languages,
  };
}
