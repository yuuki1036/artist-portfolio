import type { ReactNode } from "react";
import type { Metadata } from "next";
import { isValidLocale } from "@/i18n/settings";
import { redirect } from "next/navigation";
import { Navigation } from "./layout/components/navigation";
import { Footer } from "./layout/components/footer";
import { getTranslations } from "@/i18n/utils";

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

  const translations = await getTranslations(lang);

  return (
    <div className="relative min-h-screen">
      <Navigation currentLang={lang} translations={translations} />
      <main>{children}</main>
      <Footer translations={translations} />
    </div>
  );
}
