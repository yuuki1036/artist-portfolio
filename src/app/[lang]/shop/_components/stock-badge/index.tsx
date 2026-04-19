type Props = {
  label: string;
  variant: "lowStock" | "soldOut";
};

export function StockBadge({ label, variant }: Props) {
  const colorClass =
    variant === "soldOut"
      ? "bg-text-primary/80 text-bg-primary"
      : "bg-accent text-white";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide ${colorClass}`}
    >
      {label}
    </span>
  );
}
