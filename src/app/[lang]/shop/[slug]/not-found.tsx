import Link from "next/link";
import { headers } from "next/headers";
import { i18n, isValidLocale, type Locale } from "@/i18n/settings";
import { getTranslations } from "@/i18n/utils";

export default async function ProductNotFound() {
  // proxy が付与する x-locale から現在ロケールを取得（server component なので
  // 全 locale JSON を import せず getTranslations で単一ロケールだけ読み込む）。
  const headerLocale = (await headers()).get("x-locale") ?? "";
  const lang: Locale = isValidLocale(headerLocale)
    ? headerLocale
    : i18n.defaultLocale;
  const t = await getTranslations(lang);

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
          {t.shop.detail.notFoundTitle}
        </h1>
        <p className="text-text-primary/70 mb-8 leading-relaxed">
          {t.shop.detail.notFoundDescription}
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
