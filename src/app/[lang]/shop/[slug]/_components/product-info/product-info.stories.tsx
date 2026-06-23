import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Translations } from "@/i18n/types";
import enJson from "../../../../../../../public/locales/en.json";
import jaJson from "../../../../../../../public/locales/ja.json";
import { ProductInfo } from "./index";

const ja = jaJson as Translations;
const en = enJson as Translations;

const meta: Meta<typeof ProductInfo> = {
  title: "Pages/Shop/ProductInfo",
  component: ProductInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const jaTranslations = {
  descriptionHeading: ja.shop.detail.descriptionHeading,
  sizeHeading: ja.shop.detail.sizeHeading,
};

const enTranslations = {
  descriptionHeading: en.shop.detail.descriptionHeading,
  sizeHeading: en.shop.detail.sizeHeading,
};

const baseArgs = {
  title: "RED CAR IS GOOD - A3 Art Print",
  description:
    "限定数で制作したジクレー版画。色の再現性に優れた顔料インクを使用し、長期保管に適した美術用紙にプリント。\n\n額装なしでお届けします。",
  priceJpy: 3500,
  isSoldOut: false,
  translations: jaTranslations,
};

export const Default: Story = {
  args: baseArgs,
};

export const WithSizeLabel: Story = {
  args: {
    ...baseArgs,
    sizeLabel: "A3 (297×420mm)",
  },
};

export const LowStock: Story = {
  args: {
    ...baseArgs,
    sizeLabel: "A3 (297×420mm)",
    stockLabel: ja.shop.lowStock.replace("{count}", "3"),
  },
};

export const SoldOut: Story = {
  args: {
    ...baseArgs,
    sizeLabel: "A3 (297×420mm)",
    stockLabel: ja.shop.soldOut,
    isSoldOut: true,
  },
};

export const English: Story = {
  args: {
    ...baseArgs,
    title: "RED CAR IS GOOD - A3 Art Print",
    description:
      "Limited edition giclée print. Pigment ink for color accuracy, printed on archival-quality fine art paper.\n\nShipped without frame.",
    sizeLabel: "A3 (297×420mm)",
    stockLabel: en.shop.lowStock.replace("{count}", "3"),
    translations: enTranslations,
  },
};
