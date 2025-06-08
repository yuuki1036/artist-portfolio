"use client";

import { useRouter } from "next/navigation";
import { i18n, type Locale } from "@/i18n/settings";

export type LanguageSwitcherProps = {
  currentLang: string;
};

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();

  const handleLanguageChange = () => {
    const currentIndex = i18n.locales.indexOf(currentLang as Locale);
    const nextIndex = (currentIndex + 1) % i18n.locales.length;
    const nextLocale = i18n.locales[nextIndex];
    router.push(`/${nextLocale}`);
  };

  // 次の言語を取得
  const currentIndex = i18n.locales.indexOf(currentLang as Locale);
  const nextIndex = (currentIndex + 1) % i18n.locales.length;
  const nextLocale = i18n.locales[nextIndex];

  return (
    <button
      type="button"
      onClick={handleLanguageChange}
      className="ap-text-sm ap-text-gray-700 hover:ap-text-gray-900 ap-transition-colors ap-font-medium"
      title={`Switch to ${i18n.labels[nextLocale]}`}
    >
      {i18n.labels[currentLang as Locale]}
    </button>
  );
}
