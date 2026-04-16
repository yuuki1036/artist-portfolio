import { PrismaClient } from "@prisma/client";

// Next.js の HMR でインスタンスが複製されるのを防ぐため、
// グローバルに保持して再利用する。
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
