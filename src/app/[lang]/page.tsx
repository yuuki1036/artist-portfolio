import type { Metadata } from "next";
import { getTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/settings";
import { isValidLocale, i18n } from "@/i18n/settings";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  const t = await getTranslations(lang as Locale);
  return {
    title: t.common.title,
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    redirect(`/${i18n.defaultLocale}`);
  }

  const t = await getTranslations(lang as Locale);

  return (
    <main className="ap-min-h-screen ap-p-8">
      <h1 className="ap-text-4xl ap-font-bold ap-mb-8">{t.common.title}</h1>
      <nav>
        <ul className="ap-flex ap-gap-4">
          <li>
            <Link
              href={`/${lang}`}
              className="ap-text-blue-600 hover:ap-text-blue-800"
            >
              {t.common.menu.home}
            </Link>
          </li>
          <li>
            <Link
              href={`/${lang}/works`}
              className="ap-text-blue-600 hover:ap-text-blue-800"
            >
              {t.common.menu.works}
            </Link>
          </li>
          <li>
            <Link
              href={`/${lang}/about`}
              className="ap-text-blue-600 hover:ap-text-blue-800"
            >
              {t.common.menu.about}
            </Link>
          </li>
          <li>
            <Link
              href={`/${lang}/contact`}
              className="ap-text-blue-600 hover:ap-text-blue-800"
            >
              {t.common.menu.contact}
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
