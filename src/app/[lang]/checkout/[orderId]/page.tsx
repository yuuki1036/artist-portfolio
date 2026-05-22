import { notFound, redirect } from "next/navigation";
import { i18n, isValidLocale } from "@/i18n/settings";
import { getTranslations } from "@/i18n/utils";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { PaymentForm } from "./components/payment-form";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ lang: string; orderId: string }>;
};

export default async function CheckoutPage({ params }: Props) {
  const { lang, orderId } = await params;
  if (!isValidLocale(lang)) {
    redirect(`/${i18n.defaultLocale}`);
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) {
    notFound();
  }
  if (order.status !== "PENDING") {
    redirect(`/${lang}/checkout/success/${orderId}`);
  }

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(
    order.stripePaymentIntentId,
  );
  if (!paymentIntent.client_secret) {
    notFound();
  }

  const t = await getTranslations(lang);
  const productTitle = order.items[0]?.titleSnapshot ?? "";

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-12 tracking-tight">
          {t.checkout.title}
        </h1>
        <PaymentForm
          orderId={order.id}
          clientSecret={paymentIntent.client_secret}
          locale={lang}
          productTitle={productTitle}
          subtotalJpy={order.subtotalJpy}
          initialShippingFeeJpy={order.shippingFeeJpy}
          initialTotalJpy={order.totalJpy}
          initialCountry={order.shippingCountry}
          translations={{
            summaryHeading: t.checkout.summaryHeading,
            subtotal: t.checkout.subtotal,
            shippingFee: t.checkout.shippingFee,
            total: t.checkout.total,
            addressHeading: t.checkout.addressHeading,
            paymentHeading: t.checkout.paymentHeading,
            submit: t.checkout.submit,
            submitting: t.checkout.submitting,
            errorGeneric: t.checkout.errors.generic,
          }}
        />
      </div>
    </section>
  );
}
