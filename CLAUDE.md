# CLAUDE.md

イラストレータのポートフォリオサイト開発用のガイドライン。

## プロジェクト概要

- **目的**: イラストレータのポートフォリオ + ECサイト
- **主な機能**: 作品展示、商品販売（Stripe）、問い合わせ
- **多言語対応**: 日本語（デフォルト）/ 英語
- **設計ドキュメント**: `.claude/structure/base.md`

## 開発コマンド

```bash
# 開発サーバー（Turbopack）
npm run dev

# ビルド
npm run build

# 本番サーバー
npm start

# Lint / Format（Biome）
npm run lint          # チェック
npm run lint:fix      # 自動修正
npm run format        # フォーマットチェック
npm run format:fix    # 自動修正

# 型チェック
npm run tsc

# Storybook
npm run storybook
npm run build-storybook
```

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | styled-components |
| CMS | Sanity（予定） |
| 決済 | Stripe（予定） |
| DB | Prisma + Supabase |
| Lint/Format | Biome |
| Testing | Storybook |
| Hosting | Vercel |

## アーキテクチャ

### ディレクトリ構成

```
src/
├── app/
│   ├── [lang]/              # i18nルーティング
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Home
│   │   └── layout/components/  # レイアウト固有コンポーネント
│   ├── globals.css
│   └── layout.tsx
├── components/              # 共通コンポーネント
│   └── icons/
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
font-family: 'Zen Kaku Gothic New', system-ui, sans-serif;
```
- 英語: システムフォント（San Francisco等）
- 日本語: Zen Kaku Gothic New（角ゴシック）

**レスポンシブ**: スマートフォンファースト

## コーディング規約

### 命名規則

| 対象 | 規則 | 例 |
|------|------|-----|
| コンポーネントファイル | kebab-case | `language-switcher.tsx` |
| DBモデル | PascalCase | `UserProfile` |
| DBフィールド | camelCase | `createdAt` |
| DBテーブル | snake_case | `@@map("user_profiles")` |

### ファイル配置

- **共通コンポーネント**: `src/components/`
- **機能固有コンポーネント**: `src/app/[feature]/components/`
- **Package by Feature** パターンを採用

### DB（Prisma）

```typescript
import { prisma } from '@/lib/prisma'
```

- 全モデルに `createdAt` / `updatedAt` 必須

## 環境変数

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
```

## ページ構成（予定）

| ページ | パス | 内容 |
|--------|------|------|
| Home | `/` | ヒーロー + 新着作品 |
| Works | `/works` | 作品一覧 |
| Shop | `/shop` | 商品一覧 |
| About | `/about` | プロフィール |
| Contact | `/contact` | 問い合わせ |
