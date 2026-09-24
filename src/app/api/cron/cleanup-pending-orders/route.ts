import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { releasePendingOrder } from "@/lib/release-pending-order";
import { getStripe } from "@/lib/stripe";

const PENDING_ORDER_TTL_MS = 30 * 60 * 1000;

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured" },
      { status: 500 },
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const threshold = new Date(Date.now() - PENDING_ORDER_TTL_MS);
  const staleOrders = await prisma.order.findMany({
    where: {
      status: "PENDING",
      createdAt: { lt: threshold },
    },
    select: { id: true, stripePaymentIntentId: true },
  });

  const stripe = getStripe();
  let released = 0;

  for (const order of staleOrders) {
    // 在庫を返してよいのは PI がもう決済できない（canceled）と確定したときだけ。
    // cancel が一時障害で落ちた PI は requires_payment_method 等のまま決済可能で、
    // ここで解放すると後から succeeded が届いても Order は PENDING でなく PAID にできない
    // （課金済みなのに注文は CANCELED・在庫も返却済みになる）。確定できなければ次回に回す。
    let shouldRelease = true;
    try {
      await stripe.paymentIntents.cancel(order.stripePaymentIntentId);
    } catch (err) {
      // payment_intent_unexpected_state は想定内（既に canceled/succeeded で
      // cancel 不可なケース）。それ以外は障害の可能性があるのでログに残す
      const code = (err as { code?: string }).code;
      if (code !== "payment_intent_unexpected_state") {
        console.error(
          `[cron] stripe.cancel failed for PI ${order.stripePaymentIntentId}:`,
          err,
        );
      }
      const pi = await stripe.paymentIntents
        .retrieve(order.stripePaymentIntentId)
        .catch(() => null);
      if (pi?.status !== "canceled") {
        shouldRelease = false;
      }
    }

    if (!shouldRelease) continue;

    const didRelease = await releasePendingOrder(order.id);
    if (didRelease) {
      released += 1;
    }
  }

  return NextResponse.json({
    scanned: staleOrders.length,
    released,
  });
}
