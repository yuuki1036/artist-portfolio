import { StockBadge } from "../../../_components/stock-badge";
import { formatJpy } from "../../../_lib/format-price";

type Props = {
  title: string;
  description: string;
  priceJpy: number;
  sizeLabel?: string;
  stockLabel?: string;
  isSoldOut: boolean;
  translations: {
    descriptionHeading: string;
    sizeHeading: string;
  };
};

export function ProductInfo({
  title,
  description,
  priceJpy,
  sizeLabel,
  stockLabel,
  isSoldOut,
  translations,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <p className="text-3xl font-black text-accent">{formatJpy(priceJpy)}</p>
        {stockLabel ? (
          <StockBadge
            label={stockLabel}
            variant={isSoldOut ? "soldOut" : "lowStock"}
          />
        ) : null}
      </div>

      {sizeLabel ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-text-primary/60">
            {translations.sizeHeading}
          </span>
          <span className="inline-block px-3 py-1 rounded-full bg-bg-warm text-sm font-medium text-text-primary">
            {sizeLabel}
          </span>
        </div>
      ) : null}

      <div>
        <h2 className="text-sm font-bold text-text-primary/60 mb-2">
          {translations.descriptionHeading}
        </h2>
        <p className="text-base text-text-primary leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}
