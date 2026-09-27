import { prisma } from "@/lib/prisma";

// PENDING Order を CANCELED にし、在庫を復元する atomic 処理。
// Webhook (payment_intent.canceled) と TTL cron の両方から呼ばれる。
// 呼び出し側は PI がもう決済できない（canceled）と確定してから呼ぶこと。
// 戻り値: 実際に CANCELED にしたら true、既に CANCELED 等で何もしなかったら false（冪等）。
// findUnique も transaction 内に閉じて TOCTOU を排除する。
export async function releasePendingOrder(orderId: string): Promise<boolean> {
  return prisma.$transaction(async (tx) => {
    const cancelled = await tx.order.updateMany({
      where: { id: orderId, status: "PENDING" },
      data: { status: "CANCELED" },
    });
    if (cancelled.count === 0) {
      return false;
    }
    const items = await tx.orderItem.findMany({
      where: { orderId },
      select: { productId: true, quantity: true },
    });
    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stockRemaining: { increment: item.quantity } },
      });
    }
    return true;
  });
}
