"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  imageUrls: string[];
  alt: string;
};

export function ProductGallery({ imageUrls, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainUrl = imageUrls[activeIndex] ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-bg-warm">
        {mainUrl ? (
          <Image
            src={mainUrl}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
            className="object-cover"
          />
        ) : null}
      </div>
      {imageUrls.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2">
          {imageUrls.map((url, index) => (
            <li key={url}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative block aspect-square w-full overflow-hidden rounded-md bg-bg-warm transition-opacity ${
                  index === activeIndex
                    ? "ring-2 ring-accent opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`${alt} - ${index + 1}`}
                aria-pressed={index === activeIndex}
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 25vw, 15vw"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
