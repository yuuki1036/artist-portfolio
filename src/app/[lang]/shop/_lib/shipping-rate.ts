// 配送料テーブル（円）。3 段階固定の MVP 仕様。
// 国コードは ISO 3166-1 alpha-2。

const DOMESTIC: readonly string[] = ["JP"];

const ASIA: readonly string[] = [
  "KR",
  "CN",
  "TW",
  "HK",
  "SG",
  "MY",
  "TH",
  "VN",
  "PH",
  "ID",
];

const RATES = {
  domestic: 800,
  asia: 2500,
  rest: 4500,
} as const;

export type ShippingZone = keyof typeof RATES;

export function resolveShippingZone(country: string): ShippingZone {
  const upper = country.toUpperCase();
  if (DOMESTIC.includes(upper)) return "domestic";
  if (ASIA.includes(upper)) return "asia";
  return "rest";
}

export function computeShippingFeeJpy(country: string): number {
  return RATES[resolveShippingZone(country)];
}

// PaymentIntent 作成時の初期値（住所未確定）。
// 最低額（国内）で作成し、AddressElement 確定時に update する。
export const INITIAL_SHIPPING_FEE_JPY = RATES.domestic;

// AddressElement の allowedCountries で利用する。
export const ALLOWED_COUNTRIES: readonly string[] = [
  ...DOMESTIC,
  ...ASIA,
  "US",
  "GB",
  "FR",
  "DE",
  "IT",
  "ES",
  "NL",
  "AU",
  "CA",
];
