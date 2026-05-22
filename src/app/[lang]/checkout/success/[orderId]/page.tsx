import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { i18n, isValidLocale } from "@/i18n/settings";
import { getTranslations } from "@/i18n/utils";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ lang: string; orderId: string }>;
};

export default async function CheckoutSuccessPage({ params }: Props) {
  const { lang, orderId } = await params;
  if (!isValidLocale(lang)) {
    redirect(`/${i18n.defaultLocale}`);
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    notFound();
  }

  const t = await getTranslations(lang);
  const isPaid = order.status === "PAID";
  const title = isPaid
    ? t.checkout.success.title
    : t.checkout.success.processingTitle;
  const description = isPaid
    ? t.checkout.success.description.replace(
        "{email}",
        order.customerEmail || "",
      )
    : t.checkout.success.processingDescription;

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
          {title}
        </h1>
        <p className="text-text-primary/70 mb-6 leading-relaxed">
          {description}
        </p>
        <p className="text-xs text-text-primary/60 mb-8">
          {t.checkout.success.orderId}:{" "}
          <code className="font-mono">{order.id}</code>
        </p>
        <Link
          href={`/${lang}/shop`}
          className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
        >
          <span aria-hidden>←</span>
          {t.checkout.success.backToShop}
        </Link>
      </div>
    </section>
  );
}
