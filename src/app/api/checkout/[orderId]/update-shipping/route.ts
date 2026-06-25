import { timingSafeEqual } from "node:crypto";
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
  // 注文の所有証明。正規の購入者だけが持つ clientSecret を照合し、orderId だけ
  // 知る第三者による配送先・金額の改ざん（IDOR）を防ぐ。
  clientSecret: z.string().min(1),
});

function secretsMatch(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

type Params = { params: Promise<{ orderId: string }> };

export async function POST(request: Request, { params }: Params) {
  const { orderId } = await params;
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { country, clientSecret } = parsed.data;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  // 所有証明: clientSecret が一致しない（または未保存の）注文は操作不可。
  if (
    !order.stripeClientSecret ||
    !secretsMatch(order.stripeClientSecret, clientSecret)
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
