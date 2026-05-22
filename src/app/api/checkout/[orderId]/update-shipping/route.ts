import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ALLOWED_COUNTRIES,
  computeShippingFeeJpy,
} from "@/app/[lang]/shop/_lib/shipping-rate";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

const BodySchema = z.object({
  country: z
    .string()
    .length(2)
    .transform((s) => s.toUpperCase())
    .refine((c) => ALLOWED_COUNTRIES.includes(c), {
      message: "Unsupported country",
    }),
});

type Params = { params: Promise<{ orderId: string }> };

export async function POST(request: Request, { params }: Params) {
  const { orderId } = await params;
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { country } = parsed.data;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  if (order.status !== "PENDING") {
    return NextResponse.json(
      { error: "Order is no longer editable" },
      { status: 409 },
    );
  }

  const shippingFeeJpy = computeShippingFeeJpy(country);
  const totalJpy = order.subtotalJpy + shippingFeeJpy;

  if (country === order.shippingCountry) {
    return NextResponse.json({ shippingFeeJpy, totalJpy });
  }

  // PI が succeeded / processing になっていると amount 更新は Stripe 側で
  // 弾かれる。Order の DB 状態と PI の状態がずれるレースを 409 で扱う。
  const stripe = getStripe();
  try {
    await stripe.paymentIntents.update(order.stripePaymentIntentId, {
      amount: totalJpy,
    });
  } catch {
    return NextResponse.json(
      { error: "Order is no longer editable" },
      { status: 409 },
    );
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      shippingCountry: country,
      shippingFeeJpy,
      totalJpy,
    },
  });

  return NextResponse.json({ shippingFeeJpy, totalJpy });
}
