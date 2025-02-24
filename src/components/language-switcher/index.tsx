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
      className="ap-fixed ap-top-4 ap-right-4 ap-px-4 ap-py-2 ap-bg-white ap-border ap-border-gray-200 ap-rounded-md ap-shadow-sm hover:ap-bg-gray-50 ap-text-gray-700"
    >
      {i18n.labels[nextLocale]}
    </button>
  );
}
