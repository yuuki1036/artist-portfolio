"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getErrorMessages } from "@/i18n/error-messages";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LangErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const { lang, messages } = getErrorMessages(usePathname());

  return (
    <section className="bg-bg-primary px-6 py-24 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
          {messages.title}
        </h1>
        <p className="text-text-primary/70 mb-8 leading-relaxed">
          {messages.description}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-black text-sm tracking-wide"
          >
            {messages.retry}
          </button>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-text-primary/20 text-text-primary font-black text-sm tracking-wide"
          >
            {messages.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
