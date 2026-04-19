export function formatJpy(priceJpy: number): string {
  return `¥${priceJpy.toLocaleString("ja-JP")}`;
}
