import type { ReactNode } from "react";
import type { Metadata } from "next";
import { isValidLocale } from "@/i18n/settings";
import { redirect } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

type Props = {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  return {
    title: {
      template: "%s | Artist Portfolio",
      default: "Artist Portfolio",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    redirect("/ja");
  }

  return (
    <div className="ap-relative">
      <LanguageSwitcher currentLang={lang} />
      {children}
    </div>
  );
}
