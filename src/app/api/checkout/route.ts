import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";
import { INITIAL_SHIPPING_FEE_JPY } from "@/app/[lang]/shop/_lib/shipping-rate";
import { isValidLocale } from "@/i18n/settings";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

const BodySchema = z.object({
  productId: z.string().min(1),
  locale: z.string().refine(isValidLocale, {
    message: "Unsupported locale",
  }),
});

export async function POST(request: Request) {
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { productId, locale } = parsed.data;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product || !product.isPublished) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 在庫を CAS 方式で 1 個 reserve する。`updateMany` の where 句で
  // `stockRemaining > 0` を atomic に評価し、count=0 なら同時購入の
  // 競合で売り切れた扱いとして 409 を返す。
  const reservation = await prisma.product.updateMany({
    where: {
      id: productId,
      isPublished: true,
      stockRemaining: { gt: 0 },
    },
    data: { stockRemaining: { decrement: 1 } },
  });
  if (reservation.count === 0) {
    return NextResponse.json({ error: "Out of stock" }, { status: 409 });
  }

  // 以降は失敗時に在庫を返却する義務がある。
  const releaseStock = () =>
    prisma.product
      .update({
        where: { id: productId },
        data: { stockRemaining: { increment: 1 } },
      })
      .catch(() => {});

  const orderId = randomUUID();
  const subtotalJpy = product.priceJpy;
  const shippingFeeJpy = INITIAL_SHIPPING_FEE_JPY;
  const totalJpy = subtotalJpy + shippingFeeJpy;
  const title = locale === "ja" ? product.titleJa : product.titleEn;

  const stripe = getStripe();
  let paymentIntent: Stripe.PaymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: totalJpy,
      currency: "jpy",
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId,
        productId: product.id,
        locale,
      },
    });
  } catch (error) {
    await releaseStock();
    throw error;
  }

  if (!paymentIntent.client_secret) {
    await stripe.paymentIntents.cancel(paymentIntent.id).catch(() => {});
    await releaseStock();
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 502 },
    );
  }

  try {
    await prisma.order.create({
      data: {
        id: orderId,
        stripePaymentIntentId: paymentIntent.id,
        stripeClientSecret: paymentIntent.client_secret,
        customerEmail: "",
        shippingCountry: "JP",
        subtotalJpy,
        shippingFeeJpy,
        totalJpy,
        status: "PENDING",
        locale,
        items: {
          create: {
            productId: product.id,
            titleSnapshot: title,
            priceSnapshot: product.priceJpy,
            quantity: 1,
          },
        },
      },
    });
  } catch (error) {
    await stripe.paymentIntents.cancel(paymentIntent.id).catch(() => {});
    await releaseStock();
    throw error;
  }

  return NextResponse.json({
    orderId,
    clientSecret: paymentIntent.client_secret,
  });
}
