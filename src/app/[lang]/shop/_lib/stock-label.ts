const LOW_STOCK_THRESHOLD = 5;

type StockLabels = {
  soldOut: string;
  lowStock: string;
};

export function resolveStockLabel(
  remaining: number,
  labels: StockLabels,
): string | undefined {
  if (remaining <= 0) return labels.soldOut;
  if (remaining <= LOW_STOCK_THRESHOLD) {
    return labels.lowStock.replace("{count}", String(remaining));
  }
  return undefined;
}
