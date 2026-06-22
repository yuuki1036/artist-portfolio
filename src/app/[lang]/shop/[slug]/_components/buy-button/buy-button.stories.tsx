import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Translations } from "@/i18n/types";
import enJson from "../../../../../../../public/locales/en.json";
import jaJson from "../../../../../../../public/locales/ja.json";
import { BuyButton } from "./index";

const ja = jaJson as Translations;
const en = enJson as Translations;

const meta: Meta<typeof BuyButton> = {
  title: "Pages/Shop/BuyButton",
  component: BuyButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const jaLabels = {
  buy: ja.shop.detail.buy,
  comingSoon: ja.shop.detail.comingSoon,
  error: ja.checkout.errors.generic,
};

const enLabels = {
  buy: en.shop.detail.buy,
  comingSoon: en.shop.detail.comingSoon,
  error: en.checkout.errors.generic,
};

const productId = "00000000-0000-0000-0000-000000000000";

export const Default: Story = {
  args: {
    productId,
    locale: "ja",
    isSoldOut: false,
    labels: jaLabels,
  },
};

export const SoldOut: Story = {
  args: {
    productId,
    locale: "ja",
    isSoldOut: true,
    labels: jaLabels,
  },
};

export const English: Story = {
  args: {
    productId,
    locale: "en",
    isSoldOut: false,
    labels: enLabels,
  },
};
