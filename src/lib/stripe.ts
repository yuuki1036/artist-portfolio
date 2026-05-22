import Stripe from "stripe";

// prisma.ts と同じく、HMR でインスタンスが複製されるのを防ぐため
// グローバルに保持する。
const globalForStripe = globalThis as unknown as {
  stripe: Stripe | undefined;
};

export function getStripe(): Stripe {
  if (!globalForStripe.stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    globalForStripe.stripe = new Stripe(secretKey, {
      typescript: true,
    });
  }
  return globalForStripe.stripe;
}
