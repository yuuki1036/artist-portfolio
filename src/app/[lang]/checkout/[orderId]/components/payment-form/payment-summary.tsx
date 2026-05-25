import { formatJpy } from "@/app/[lang]/shop/_lib/format-price";

export type PaymentSummaryTranslations = {
  summaryHeading: string;
  subtotal: string;
  shippingFee: string;
  total: string;
};

type Props = {
  productTitle: string;
  subtotalJpy: number;
  shippingFeeJpy: number;
  totalJpy: number;
  translations: PaymentSummaryTranslations;
};

export function PaymentSummary({
  productTitle,
  subtotalJpy,
  shippingFeeJpy,
  totalJpy,
  translations,
}: Props) {
  return (
    <section className="border border-text-primary/10 rounded-2xl p-6 bg-white/40">
      <h2 className="text-lg font-black text-text-primary mb-4">
        {translations.summaryHeading}
      </h2>
      <p className="text-text-primary font-bold mb-4">{productTitle}</p>
      <div className="flex justify-between text-sm text-text-primary/70 mb-1">
        <span>{translations.subtotal}</span>
        <span>{formatJpy(subtotalJpy)}</span>
      </div>
      <div className="flex justify-between text-sm text-text-primary/70 mb-3">
        <span>{translations.shippingFee}</span>
        <span>{formatJpy(shippingFeeJpy)}</span>
      </div>
      <div className="flex justify-between text-lg font-black text-accent border-t border-text-primary/10 pt-3">
        <span>{translations.total}</span>
        <span>{formatJpy(totalJpy)}</span>
      </div>
    </section>
  );
}
