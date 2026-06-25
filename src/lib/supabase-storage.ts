// 商品画像（Supabase Storage）の URL を組み立てるヘルパー。
//
// バケット運用ルール（knowledge/ec-architecture.md §4 準拠）:
//   - バケット名: products（public bucket）
//   - パス規則: products/{productId}/{index}.{ext}
//   - public URL: {NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/{path}
//
// public bucket なので読み取りに anon key は不要で、URL は決定的に組み立てられる。
// そのため supabase-js クライアントを介さず純粋な文字列構築で完結させる
// （RSC / メタデータ生成からも追加依存なく呼べる）。

const PRODUCT_BUCKET = "products";

function getStoragePublicBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }
  return `${base.replace(/\/+$/, "")}/storage/v1/object/public`;
}

/**
 * products バケット内のパスを組み立てる。
 * 例: buildProductImagePath("abc", 0, "webp") → "abc/0.webp"
 */
export function buildProductImagePath(
  productId: string,
  index: number,
  ext: string,
): string {
  const cleanExt = ext.replace(/^\.+/, "");
  return `${productId}/${index}.${cleanExt}`;
}

/**
 * 商品画像の public URL を返す。
 *
 * - すでに http(s) で始まるフル URL の場合はそのまま返す
 *   （Prisma に URL を直接貼る既存の運用・データとの後方互換）。
 * - それ以外は products バケット内パスとみなし public URL を構築する。
 *
 * 空文字は呼び出し側でフォールバック表示するため、そのまま空文字を返す。
 */
export function getProductImageUrl(pathOrUrl: string): string {
  if (pathOrUrl === "") {
    return "";
  }
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }
  const path = pathOrUrl.replace(/^\/+/, "");
  return `${getStoragePublicBaseUrl()}/${PRODUCT_BUCKET}/${path}`;
}
