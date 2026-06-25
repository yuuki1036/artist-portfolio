import type { MetadataRoute } from "next";
import { i18n } from "@/i18n/settings";
import { prisma } from "@/lib/prisma";

// 公開商品をランタイムで反映するため動的生成にする（在庫・公開状態が変わるため）。
export const dynamic = "force-dynamic";

const STATIC_PATHS = ["", "/original", "/shop", "/about", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  // 絶対 URL が必須のため、サイト URL 未設定なら空を返す。
  if (!base) {
    return [];
  }

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of i18n.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${base}/${locale}${path}` });
    }
  }

  // 公開商品の詳細ページを追加（DB 取得失敗時は静的ページ分だけ返す）。
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    for (const locale of i18n.locales) {
      for (const product of products) {
        entries.push({
          url: `${base}/${locale}/shop/${product.slug}`,
          lastModified: product.updatedAt,
        });
      }
    }
  } catch (error) {
    console.warn("sitemap: 公開商品の取得に失敗しました", error);
  }

  return entries;
}
