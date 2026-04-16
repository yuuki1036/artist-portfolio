import { PrismaClient } from "@prisma/client";

// Next.js の HMR でインスタンスが複製されるのを防ぐため、
// グローバルに保持して再利用する。
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

// Proxy で実インスタンスへのアクセスを遅延させる。module load 時に
// PrismaClient() を呼ばないので、DATABASE_URL 未設定の build 環境
// （Next.js の page data collection フェーズなど）でも import が失敗しない。
// 実際のクエリ発行時にコンストラクトされ、ランタイムで DATABASE_URL を参照する。
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
