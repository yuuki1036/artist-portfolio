"use client";

import { useRouter, usePathname } from "next/navigation";
import { i18n, type Locale } from "@/i18n/settings";

export type LanguageSwitcherProps = {
  currentLang: Locale;
};

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 次の言語を取得
  const currentIndex = i18n.locales.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % i18n.locales.length;
  const nextLocale = i18n.locales[nextIndex];

  const handleLanguageChange = () => {
    const localePattern = new RegExp(`^/(?:${i18n.locales.join("|")})(?=/|$)`);
    const newPath =
      pathname.replace(localePattern, `/${nextLocale}`) || `/${nextLocale}`;
    router.push(newPath);
  };

  return (
    <button
      type="button"
      onClick={handleLanguageChange}
      className="text-sm text-text-primary hover:text-text-primary/70 transition-colors font-medium"
      title={`Switch to ${i18n.labels[nextLocale]}`}
    >
      {i18n.labels[nextLocale]}
    </button>
  );
}
