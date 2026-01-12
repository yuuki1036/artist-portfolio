import type { Metadata } from "next";
import { getTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/settings";
import { isValidLocale, i18n } from "@/i18n/settings";
import { redirect } from "next/navigation";

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

  return <main className="ap-min-h-screen ap-p-8" />;
}
