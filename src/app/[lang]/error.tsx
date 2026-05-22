"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { i18n, isValidLocale, type Locale } from "@/i18n/settings";
import type { Translations } from "@/i18n/types";
import { getLocaleFromPathname } from "@/i18n/utils";
import enTranslations from "../../../public/locales/en.json";
import jaTranslations from "../../../public/locales/ja.json";

const translations: Record<Locale, Translations> = {
  ja: jaTranslations as Translations,
  en: enTranslations as Translations,
};

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LangErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const pathname = usePathname();
  const rawLang = getLocaleFromPathname(pathname);
  const lang: Locale = isValidLocale(rawLang) ? rawLang : i18n.defaultLocale;
  const t = translations[lang];

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
          {t.common.error.title}
        </h1>
        <p className="text-text-primary/70 mb-8 leading-relaxed">
          {t.common.error.description}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-black text-sm tracking-wide"
          >
            {t.common.error.retry}
          </button>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-text-primary/20 text-text-primary font-black text-sm tracking-wide"
          >
            {t.common.error.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
