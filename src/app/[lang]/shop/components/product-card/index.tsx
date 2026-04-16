import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  lang: string;
  title: string;
  imageUrl: string;
  priceJpy: number;
  stockLabel?: string;
  isSoldOut?: boolean;
};

export function ProductCard({
  slug,
  lang,
  title,
  imageUrl,
  priceJpy,
  stockLabel,
  isSoldOut = false,
}: Props) {
  const formattedPrice = `¥${priceJpy.toLocaleString("ja-JP")}`;

  return (
    <Link
      href={`/${lang}/shop/${slug}`}
      className="group block"
      aria-disabled={isSoldOut}
    >
      <div className="relative overflow-hidden rounded-xl bg-bg-warm shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              isSoldOut ? "opacity-60" : ""
            }`}
          />
          {stockLabel ? (
            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                isSoldOut
                  ? "bg-text-primary/80 text-bg-primary"
                  : "bg-accent text-white"
              }`}
            >
              {stockLabel}
            </span>
          ) : null}
        </div>
        <div className="p-5">
          <h3 className="text-base font-bold text-text-primary line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-xl font-black text-accent">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  );
}
