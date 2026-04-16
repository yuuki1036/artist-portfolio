import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCard } from "./index";

const meta: Meta<typeof ProductCard> = {
  title: "Pages/Shop/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const baseArgs = {
  slug: "art-print-a3",
  lang: "ja",
  title: "RED CAR IS GOOD - A3 Art Print",
  imageUrl: "/images/works/work-1.png",
  priceJpy: 3500,
};

export const Default: Story = {
  args: baseArgs,
};

export const LowStock: Story = {
  args: {
    ...baseArgs,
    stockLabel: "残り3点",
  },
};

export const LowStockEn: Story = {
  args: {
    ...baseArgs,
    lang: "en",
    title: "RED CAR IS GOOD - A3 Art Print",
    stockLabel: "Only 3 left",
  },
};

export const SoldOut: Story = {
  args: {
    ...baseArgs,
    stockLabel: "売り切れ",
    isSoldOut: true,
  },
};

export const HighPrice: Story = {
  args: {
    ...baseArgs,
    title: "Large Framed Giclée Print — Limited Edition",
    priceJpy: 58000,
  },
};
