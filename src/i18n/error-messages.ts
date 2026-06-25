import { i18n, isValidLocale, type Locale } from "./settings";

// error boundary は client component のため getTranslations（async dynamic import）が
// 使えず、全 locale JSON を import するとエラーチャンクに全翻訳が同梱されてしまう。
// ここでは表示に必要な最小文言のみを保持する。
// （public/locales/{ja,en}.json の common.error と同期させること）
const errorMessages = {
  ja: {
    title: "問題が発生しました",
    description:
      "予期しないエラーが発生しました。しばらくしてからもう一度お試しください。",
    retry: "再試行",
    home: "ホームに戻る",
  },
  en: {
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again in a moment.",
    retry: "Try again",
    home: "Back to home",
  },
} as const;

export function getErrorMessages(pathname: string): {
  lang: Locale;
  messages: (typeof errorMessages)[Locale];
} {
  const segment = pathname.split("/")[1] ?? "";
  const lang: Locale = isValidLocale(segment) ? segment : i18n.defaultLocale;
  return { lang, messages: errorMessages[lang] };
}
