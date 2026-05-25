"use client";

import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  type StripeAddressElementChangeEvent,
} from "@stripe/stripe-js";
import { useState } from "react";
import { ALLOWED_COUNTRIES } from "@/app/[lang]/shop/_lib/shipping-rate";
import type { Locale } from "@/i18n/settings";
import {
  PaymentSummary,
  type PaymentSummaryTranslations,
} from "./payment-summary";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type Translations = PaymentSummaryTranslations & {
  addressHeading: string;
  paymentHeading: string;
  submit: string;
  submitting: string;
  errorGeneric: string;
};

type Props = {
  orderId: string;
  clientSecret: string;
  locale: Locale;
  productTitle: string;
  subtotalJpy: number;
  initialShippingFeeJpy: number;
  initialTotalJpy: number;
  initialCountry: string;
  translations: Translations;
};

export function PaymentForm(props: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: props.clientSecret,
        locale: props.locale,
        appearance: { theme: "stripe" },
      }}
    >
      <PaymentFormInner {...props} />
    </Elements>
  );
}

function PaymentFormInner({
  orderId,
  clientSecret,
  locale,
  productTitle,
  subtotalJpy,
  initialShippingFeeJpy,
  initialTotalJpy,
  initialCountry,
  translations,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [shippingFeeJpy, setShippingFeeJpy] = useState(initialShippingFeeJpy);
  const [totalJpy, setTotalJpy] = useState(initialTotalJpy);
  const [country, setCountry] = useState(initialCountry);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressChange = async (
    event: StripeAddressElementChangeEvent,
  ) => {
    if (!event.complete) return;
    const next = event.value.address.country;
    if (!next || next === country) return;

    try {
      const res = await fetch(`/api/checkout/${orderId}/update-shipping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: next }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as {
        shippingFeeJpy: number;
        totalJpy: number;
      };
      setShippingFeeJpy(data.shippingFeeJpy);
      setTotalJpy(data.totalJpy);
      setCountry(next);
    } catch {
      // フォールバック: 確定時に送料が再計算されるので致命ではない
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/${locale}/checkout/success/${orderId}`,
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? translations.errorGeneric);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <PaymentSummary
        productTitle={productTitle}
        subtotalJpy={subtotalJpy}
        shippingFeeJpy={shippingFeeJpy}
        totalJpy={totalJpy}
        translations={translations}
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-black text-text-primary">
          {translations.addressHeading}
        </h2>
        <LinkAuthenticationElement />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: [...ALLOWED_COUNTRIES] as string[],
            fields: { phone: "never" },
          }}
          onChange={handleAddressChange}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-black text-text-primary">
          {translations.paymentHeading}
        </h2>
        <PaymentElement />
      </section>

      {error && (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-accent text-white font-black text-base tracking-wide transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? translations.submitting : translations.submit}
      </button>
    </form>
  );
}
