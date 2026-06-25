# CLAUDE.md

イラストレータのポートフォリオサイト開発用のガイドライン。

## プロジェクト概要

- **目的**: イラストレータのポートフォリオ + ECサイト
- **主な機能**: 作品展示、商品販売（Stripe）、問い合わせ
- **多言語対応**: 日本語（デフォルト）/ 英語
- **タスク管理**: indie-workflow（`.claude/indie/yas/`）
- **設計ドキュメント**: `.claude/indie/yas/project.md`

## 開発コマンド

```bash
# 開発サーバー（Turbopack）
npm run dev

# ビルド
npm run build

# 本番サーバー
npm start

# Lint（OxLint）/ Format（Oxfmt）
npm run lint          # チェック
npm run lint:fix      # 自動修正
npm run format        # フォーマットチェック
npm run format:fix    # 自動修正

# 型チェック
npm run tsc

# Storybook
npm run storybook
npm run build-storybook

# Prisma
npx prisma generate   # クライアント生成
npx prisma db push    # スキーマをDBに反映
npx prisma studio     # DB GUI
```

## 技術スタック

| カテゴリ    | 技術                     |
| ----------- | ------------------------ |
| Framework   | Next.js 16 (App Router)  |
| Language    | TypeScript (strict mode) |
| Styling     | Tailwind CSS v4          |
| CMS         | Sanity（予定）           |
| 決済        | Stripe（予定）           |
| DB          | Prisma + Supabase        |
| Lint/Format | OxLint + Oxfmt           |
| Testing     | Storybook                |
| Hosting     | Vercel                   |

## アーキテクチャ

### ディレクトリ構成

```
src/
├── app/
│   ├── [lang]/              # i18nルーティング
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Home
│   │   └── layout/_components/
│   │       ├── navigation/         # ナビゲーション
│   │       ├── language-switcher/  # 言語切替
│   │       └── footer/             # フッター
│   ├── globals.css
│   └── layout.tsx           # ルートレイアウト
├── components/              # 共通コンポーネント
│   └── icons/               # SVGアイコン群
├── i18n/
│   ├── settings.ts          # 言語設定
│   └── utils.ts
└── proxy.ts                 # プロキシ設定
```

### i18n（多言語対応）

- ルート: `/ja/...`, `/en/...`
- デフォルト: 日本語（`/` → `/ja` にリダイレクト）
- 翻訳ファイル: `public/locales/[lang].json`
- 設定: `src/i18n/settings.ts`

### デザイン

**フォント**

```css
font-family: "Zen Kaku Gothic New", system-ui, sans-serif;
```

- 英語: システムフォント（San Francisco等）
- 日本語: Zen Kaku Gothic New（角ゴシック）

**レスポンシブ**: スマートフォンファースト

## コーディング規約

### OxLint + Oxfmt 設定

- **Oxfmt**: ダブルクォート、スペース2インデント、printWidth 80
- **OxLint**: `no-unused-vars: error`、recommended ルール有効

### 命名規則

| 対象                   | 規則       | 例                       |
| ---------------------- | ---------- | ------------------------ |
| コンポーネントファイル | kebab-case | `language-switcher.tsx`  |
| DBモデル               | PascalCase | `UserProfile`            |
| DBフィールド           | camelCase  | `createdAt`              |
| DBテーブル             | snake_case | `@@map("user_profiles")` |

### ファイル配置

- **共通コンポーネント**: `src/components/`
- **機能固有コンポーネント**: `src/app/[feature]/_components/`（App Router の private folder convention に従い `_` prefix で統一し、route segment 化を防ぐ）
- **Package by Feature** パターンを採用
- **Storybook**: コンポーネントと同じディレクトリに `*.stories.tsx` を配置（コロケーション）

### DB（Prisma）

```typescript
import { prisma } from "@/lib/prisma";
```

- 全モデルに `createdAt` / `updatedAt` 必須
- モデル: User, Work, Project, Contact（`prisma/schema.prisma`）

## 環境変数

```env
# DB / Supabase
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=          # 商品画像の public URL 構築にも使用
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe（決済）
STRIPE_SECRET_KEY=                 # サーバー: PaymentIntent 作成等
STRIPE_WEBHOOK_SECRET=             # /api/stripe-webhook の署名検証
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # クライアント: Payment Element

# サイト / 運用
NEXT_PUBLIC_SITE_URL=              # 絶対 URL（metadataBase / sitemap / JSON-LD）
CRON_SECRET=                       # /api/cron/* の Bearer 認証
```

## ページ構成（予定）

| ページ  | パス       | 内容                |
| ------- | ---------- | ------------------- |
| Home    | `/`        | ヒーロー + 新着作品 |
| Works   | `/works`   | 作品一覧            |
| Shop    | `/shop`    | 商品一覧            |
| About   | `/about`   | プロフィール        |
| Contact | `/contact` | 問い合わせ          |
