import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n/settings";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ルートパスへのアクセスをデフォルト言語にリダイレクト
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}`, request.url),
    );
  }

  // 言語パスが含まれていない場合はデフォルト言語にリダイレクト
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

// 静的ファイルやAPI以外のすべてのリクエストに対してproxyを実行
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.jsの内部ファイル)
     * - 静的ファイル (拡張子を持つファイル)
     */
    "/((?!api|_next|.*\\..*).*)",
  ],
};
