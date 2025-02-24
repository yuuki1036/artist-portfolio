# データベース設計とORM

## 技術スタック

- **データベース**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **ホスティング**: Supabase

## Prisma設定

### スキーマ定義

`prisma/schema.prisma`にデータベースのスキーマを定義します。

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  // ... 他のフィールド
}
```

### 命名規則

- モデル名: PascalCase (例: `UserProfile`)
- フィールド名: camelCase (例: `firstName`)
- テーブル名: snake_case (例: `user_profiles`)
- 定数: SCREAMING_SNAKE_CASE (例: `USER_STATUS_ACTIVE`)

### タイムスタンプ

全てのモデルに以下のフィールドを含める：

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

### リレーション

明示的なリレーション定義を使用：

```prisma
model Post {
  id       String @id @default(uuid())
  authorId String
  author   User   @relation(fields: [authorId], references: [id])
}
```

## Prismaクライアント

### インスタンス化

`lib/prisma.ts`でシングルトンとして初期化：

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export { prisma };
```

### 使用方法

#### サーバーコンポーネントでの使用

```typescript
import { prisma } from '@/lib/prisma';

const users = await prisma.user.findMany();
```

#### APIルートでの使用

```typescript
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

## Supabase設定

### 環境変数

必要な環境変数（`.env`）：

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-database-url
```

### セキュリティ

- 環境変数は`.gitignore`に含める
- Row Level Security (RLS)を適切に設定
- 本番環境の認証情報は安全に管理

## データベース操作

### マイグレーション

```bash
# スキーマの変更を反映
npx prisma db push

# マイグレーションファイルの作成と適用
npx prisma migrate dev --name migration_name
```

### 開発ツール

```bash
# Prisma Studioの起動
npx prisma studio
```

## ベストプラクティス

1. **型安全性**
   - Prismaの自動生成された型を活用
   - 明示的な型定義を使用

2. **パフォーマンス**
   - 必要なフィールドのみを選択
   - 適切なインデックスを設定
   - N+1問題を回避

3. **セキュリティ**
   - ユーザー入力のバリデーション
   - プリペアドステートメントの使用
   - 適切なアクセス制御

4. **エラーハンドリング**
   - トランザクションの適切な使用
   - エラーの適切なキャッチと処理

## トラブルシューティング

1. **接続エラー**
   - 環境変数の確認
   - ネットワーク接続の確認
   - Supabaseプロジェクトの状態確認

2. **マイグレーションエラー**
   - スキーマの整合性確認
   - マイグレーション履歴の確認
   - 必要に応じてリセット

3. **パフォーマンス問題**
   - クエリの最適化
   - インデックスの見直し
   - キャッシュの検討 