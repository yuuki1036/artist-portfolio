import type { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { i18n } from "@/i18n/settings";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  // OG / alternates の相対 URL を絶対化するための基点（未設定時は省略）。
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "Artist Portfolio",
  description: "Welcome to my portfolio",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // proxy が付与する x-locale から現在のロケールを取得し <html lang> を正す。
  const lang = (await headers()).get("x-locale") ?? i18n.defaultLocale;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={zenKakuGothicNew.className}>{children}</body>
    </html>
  );
}
