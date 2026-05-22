"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, isValidLocale, type Locale } from "@/i18n/settings";
import type { Translations } from "@/i18n/types";
import { getLocaleFromPathname } from "@/i18n/utils";
import enTranslations from "../../../../../public/locales/en.json";
import jaTranslations from "../../../../../public/locales/ja.json";

const translations: Record<Locale, Translations> = {
  ja: jaTranslations as Translations,
  en: enTranslations as Translations,
};

export default function CheckoutNotFound() {
  const pathname = usePathname();
  const rawLang = getLocaleFromPathname(pathname);
  const lang: Locale = isValidLocale(rawLang) ? rawLang : i18n.defaultLocale;
  const t = translations[lang];

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
          {t.checkout.errors.notFoundTitle}
        </h1>
        <p className="text-text-primary/70 mb-8 leading-relaxed">
          {t.checkout.errors.notFoundDescription}
        </p>
        <Link
          href={`/${lang}/shop`}
          className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
        >
          <span aria-hidden>←</span>
          {t.shop.detail.back}
        </Link>
      </div>
    </section>
  );
}
