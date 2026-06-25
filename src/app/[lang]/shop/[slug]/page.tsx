import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getProductImageUrl } from "@/lib/supabase-storage";
import { i18n, isValidLocale } from "@/i18n/settings";
import { getTranslations } from "@/i18n/utils";
import { resolveStockLabel } from "../_lib/stock-label";
import { BuyButton } from "./_components/buy-button";
import { ProductGallery } from "./_components/product-gallery";
import { ProductInfo } from "./_components/product-info";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

const fetchPublishedProduct = cache(async (slug: string) => {
  return prisma.product.findFirst({
    where: { slug, isPublished: true },
  });
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  const product = await fetchPublishedProduct(slug);
  if (!product) {
    return {};
  }

  const title = lang === "ja" ? product.titleJa : product.titleEn;
  const description =
    lang === "ja" ? product.descriptionJa : product.descriptionEn;
  const firstImage = product.imageUrls[0];
  const ogImage = firstImage ? getProductImageUrl(firstImage) : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) {
    redirect(`/${i18n.defaultLocale}`);
  }

  const t = await getTranslations(lang);
  const product = await fetchPublishedProduct(slug);

  if (!product) {
    notFound();
  }

  const title = lang === "ja" ? product.titleJa : product.titleEn;
  const description =
    lang === "ja" ? product.descriptionJa : product.descriptionEn;
  const imageUrls = product.imageUrls.map(getProductImageUrl);
  const isSoldOut = product.stockRemaining <= 0;
  const stockLabel = resolveStockLabel(product.stockRemaining, {
    soldOut: t.shop.soldOut,
    lowStock: t.shop.lowStock,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image: imageUrls,
    offers: {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: product.priceJpy,
      availability: isSoldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: `${siteUrl}/${lang}/shop/${slug}`,
    },
  };
  const safeJsonLd = JSON.stringify(productJsonLd).replace(/</g, "\\u003c");

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link
          href={`/${lang}/shop`}
          className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-text-primary/60 hover:text-accent transition-colors"
        >
          <span aria-hidden>←</span>
          {t.shop.detail.back}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <ProductGallery imageUrls={imageUrls} alt={title} />
          <div className="flex flex-col gap-8">
            <ProductInfo
              title={title}
              description={description}
              priceJpy={product.priceJpy}
              sizeLabel={product.sizeLabel ?? undefined}
              stockLabel={stockLabel}
              isSoldOut={isSoldOut}
              translations={{
                descriptionHeading: t.shop.detail.descriptionHeading,
                sizeHeading: t.shop.detail.sizeHeading,
              }}
            />
            <BuyButton
              productId={product.id}
              locale={lang}
              isSoldOut={isSoldOut}
              labels={{
                buy: t.shop.detail.buy,
                comingSoon: t.shop.detail.comingSoon,
                error: t.checkout.errors.generic,
              }}
            />
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
      </div>
    </section>
  );
}
