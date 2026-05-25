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
    // 支払い完了直後に cron が起動し Webhook より先に PI を CANCELED にしてしまう race を防ぐ。
    // cancel が失敗したら PI の現在状態を retrieve し、succeeded/processing なら一切触らない。
    let shouldRelease = true;
    try {
      await stripe.paymentIntents.cancel(order.stripePaymentIntentId);
    } catch {
      const pi = await stripe.paymentIntents
        .retrieve(order.stripePaymentIntentId)
        .catch(() => null);
      if (!pi || pi.status === "succeeded" || pi.status === "processing") {
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
