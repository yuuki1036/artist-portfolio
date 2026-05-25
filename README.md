# Artist Portfolio (yasu224)

イラストレータのポートフォリオ + EC サイト。Next.js 16 (App Router) / TypeScript / Tailwind CSS v4 / Prisma + Supabase / Stripe 決済。

## セットアップ

```bash
npm install
cp .env.example .env.local
# .env.local の各キーを埋める（取得手順は下記「環境変数」セクション参照）
```

## 開発コマンド

```bash
npm run dev            # 開発サーバー（Turbopack）
npm run build          # ビルド
npm start              # 本番サーバー
npm run lint           # OxLint チェック
npm run lint:fix       # OxLint 自動修正
npm run format         # Oxfmt チェック
npm run format:fix     # Oxfmt 自動修正
npm run tsc            # 型チェック
npm run storybook      # Storybook 起動
```

## 環境変数

`.env.example` を参照。主なキー:

| キー                                                       | 用途                                        | 取得先                                                                                        |
| ---------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                                             | Prisma 接続文字列                           | Supabase Dashboard → Project Settings → Database                                              |
| `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY`                   | Supabase Storage（画像）参照                | Supabase Dashboard → API                                                                      |
| `NEXT_PUBLIC_SITE_URL`                                     | OG / JSON-LD / Stripe return_url の絶対 URL | ローカルは `http://localhost:3000`、本番は Vercel の URL                                      |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe API                                  | Stripe Dashboard → Developers → API keys（ローカルは test mode の `sk_test_*` / `pk_test_*`） |
| `STRIPE_WEBHOOK_SECRET`                                    | Webhook 署名検証                            | 下記「Stripe Webhook をローカルで受信する」参照                                               |
| `CRON_SECRET`                                              | TTL クリーンアップ cron の Bearer トークン  | 任意の長いランダム文字列（`openssl rand -hex 32` など）                                       |

## Stripe Webhook をローカルで受信する

`/api/stripe-webhook` を実装しているため、ローカル開発で webhook を受け取るには Stripe CLI を使う。

```bash
# 1. Stripe CLI のインストール（初回のみ）
brew install stripe/stripe-cli/stripe

# 2. Stripe アカウントにログイン（初回のみ）
stripe login

# 3. 別ターミナルで dev server を起動
npm run dev

# 4. さらに別ターミナルで webhook を forward
stripe listen --forward-to localhost:3000/api/stripe-webhook
# → 表示される whsec_xxx を .env.local の STRIPE_WEBHOOK_SECRET に貼る

# 5. 動作確認: 別ターミナルでテストイベントを発火
stripe trigger payment_intent.succeeded
```

`stripe listen` を起動している間だけ Stripe Dashboard 上のイベントがローカルに転送される。本番環境（Vercel）では Stripe Dashboard → Developers → Webhooks にエンドポイントを登録し、その signing secret を Vercel の環境変数 `STRIPE_WEBHOOK_SECRET` に設定する。

## PENDING Order の TTL クリーンアップ (cron)

`/api/cron/cleanup-pending-orders` は 30 分以上 PENDING のままの Order を CANCELED にし、Stripe PaymentIntent を cancel して在庫を復元する。

- スケジュール: `.github/workflows/cleanup-pending-orders.yml`（GitHub Actions schedule, 30 分間隔）
- 認証: `Authorization: Bearer ${CRON_SECRET}`
- 必要な GitHub Repo Secrets: `CRON_SECRET`, `SITE_URL`

ローカルから手動で叩く場合:

```bash
curl -H "Authorization: Bearer ${CRON_SECRET}" \
  http://localhost:3000/api/cron/cleanup-pending-orders
```

## Prisma

```bash
npx prisma generate    # クライアント生成
npx prisma db push     # スキーマを Supabase に反映
npx prisma studio      # DB GUI
```

## デプロイ

Vercel に main ブランチを連携。`.env.example` に記載した環境変数を Vercel Dashboard に登録すること。
