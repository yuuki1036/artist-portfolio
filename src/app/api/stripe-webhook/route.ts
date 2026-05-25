import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { releasePendingOrder } from "@/lib/release-pending-order";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentSucceeded(event.data.object);
      break;
    case "payment_intent.payment_failed":
    case "payment_intent.canceled":
      await handlePaymentReleased(event.data.object);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentSucceeded(pi: Stripe.PaymentIntent) {
  const order = await prisma.order.findUnique({
    where: { stripePaymentIntentId: pi.id },
  });
  if (!order || order.status !== "PENDING") {
    return;
  }

  const shipping = pi.shipping ?? null;
  const customerEmail =
    pi.receipt_email ??
    (typeof pi.customer === "object" && pi.customer !== null
      ? ((pi.customer as Stripe.Customer).email ?? "")
      : "");

  // 在庫は /api/checkout で reserve 済みなのでここでは触らない。
  // PENDING 限定の updateMany により冪等性を担保（重複配信時は count=0）。
  await prisma.order.updateMany({
    where: { id: order.id, status: "PENDING" },
    data: {
      status: "PAID",
      paidAt: new Date(),
      customerEmail: customerEmail || order.customerEmail,
      customerName: shipping?.name ?? order.customerName,
      shippingCountry: shipping?.address?.country ?? order.shippingCountry,
      shippingPostalCode:
        shipping?.address?.postal_code ?? order.shippingPostalCode,
      shippingCity: shipping?.address?.city ?? order.shippingCity,
      shippingLine1: shipping?.address?.line1 ?? order.shippingLine1,
      shippingLine2: shipping?.address?.line2 ?? order.shippingLine2,
    },
  });
}

async function handlePaymentReleased(pi: Stripe.PaymentIntent) {
  const order = await prisma.order.findUnique({
    where: { stripePaymentIntentId: pi.id },
    select: { id: true },
  });
  if (!order) {
    return;
  }
  await releasePendingOrder(order.id);
}
