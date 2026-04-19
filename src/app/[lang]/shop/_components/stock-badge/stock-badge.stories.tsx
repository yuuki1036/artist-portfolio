import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Translations } from "@/i18n/types";
import enJson from "../../../../../../public/locales/en.json";
import jaJson from "../../../../../../public/locales/ja.json";
import { StockBadge } from "./index";

const ja = jaJson as Translations;
const en = enJson as Translations;

const meta: Meta<typeof StockBadge> = {
  title: "Pages/Shop/StockBadge",
  component: StockBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LowStock: Story = {
  args: {
    label: ja.shop.lowStock.replace("{count}", "3"),
    variant: "lowStock",
  },
};

export const SoldOut: Story = {
  args: {
    label: ja.shop.soldOut,
    variant: "soldOut",
  },
};

export const LowStockEn: Story = {
  args: {
    label: en.shop.lowStock.replace("{count}", "3"),
    variant: "lowStock",
  },
};
