"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { z } from "zod";
import type { Locale } from "@/i18n/settings";

const CheckoutResponse = z.object({ orderId: z.string().min(1) });

type Props = {
  productId: string;
  locale: Locale;
  isSoldOut: boolean;
  labels: {
    buy: string;
    comingSoon: string;
    error: string;
  };
};

export function BuyButton({ productId, locale, isSoldOut, labels }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, locale }),
        });
        if (!res.ok) {
          setError(labels.error);
          return;
        }
        const parsed = CheckoutResponse.safeParse(
          await res.json().catch(() => null),
        );
        if (!parsed.success) {
          setError(labels.error);
          return;
        }
        router.push(`/${locale}/checkout/${parsed.data.orderId}`);
      } catch {
        setError(labels.error);
      }
    });
  };

  const disabled = isSoldOut || isPending;
  const mainLabel = isSoldOut ? labels.comingSoon : labels.buy;

  return (
    <div className="w-full md:w-auto md:self-start flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 rounded-full bg-accent text-white font-black text-base tracking-wide transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{mainLabel}</span>
      </button>
      {error && (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
