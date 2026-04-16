import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isValidLocale, i18n } from "@/i18n/settings";
import { getTranslations } from "@/i18n/utils";
import { ProductCard } from "./components/product-card";

// 商品在庫・公開状態がランタイムで変わるため、静的生成せず
// リクエストごとにレンダリングする。
export const dynamic = "force-dynamic";

const LOW_STOCK_THRESHOLD = 5;

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

  const t = await getTranslations(lang);
  return {
    title: t.shop.title,
  };
}

export default async function ShopPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    redirect(`/${i18n.defaultLocale}`);
  }

  const t = await getTranslations(lang);

  const products = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  const resolveStockLabel = (remaining: number): string | undefined => {
    if (remaining <= 0) return t.shop.soldOut;
    if (remaining <= LOW_STOCK_THRESHOLD) {
      return t.shop.lowStock.replace("{count}", String(remaining));
    }
    return undefined;
  };

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
            {t.shop.title}
          </h1>
          <span className="h-1 flex-1 bg-text-primary/10 rounded-full" />
        </div>

        {products.length === 0 ? (
          <p className="text-text-primary/60 text-center py-24">
            {t.shop.empty}
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => {
              const title = lang === "ja" ? product.titleJa : product.titleEn;
              const imageUrl = product.imageUrls[0] ?? "";
              const isSoldOut = product.stockRemaining <= 0;
              return (
                <li key={product.id}>
                  <ProductCard
                    slug={product.slug}
                    lang={lang}
                    title={title}
                    imageUrl={imageUrl}
                    priceJpy={product.priceJpy}
                    stockLabel={resolveStockLabel(product.stockRemaining)}
                    isSoldOut={isSoldOut}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
