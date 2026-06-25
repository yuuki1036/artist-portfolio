import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Translations } from "@/i18n/types";
import enJson from "../../../../../../../public/locales/en.json";
import jaJson from "../../../../../../../public/locales/ja.json";
import { PaymentSummary } from "./payment-summary";

const ja = jaJson as Translations;
const en = enJson as Translations;

const meta: Meta<typeof PaymentSummary> = {
  title: "Pages/Checkout/PaymentSummary",
  component: PaymentSummary,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const jaTranslations = {
  summaryHeading: ja.checkout.summaryHeading,
  subtotal: ja.checkout.subtotal,
  shippingFee: ja.checkout.shippingFee,
  total: ja.checkout.total,
};

const enTranslations = {
  summaryHeading: en.checkout.summaryHeading,
  subtotal: en.checkout.subtotal,
  shippingFee: en.checkout.shippingFee,
  total: en.checkout.total,
};

const baseArgs = {
  productTitle: "RED CAR IS GOOD - A3 Art Print",
  subtotalJpy: 3500,
  shippingFeeJpy: 800,
  totalJpy: 4300,
  translations: jaTranslations,
};

export const DomesticShipping: Story = {
  args: baseArgs,
};

export const InternationalShipping: Story = {
  args: {
    ...baseArgs,
    shippingFeeJpy: 2000,
    totalJpy: 5500,
  },
};

export const English: Story = {
  args: {
    ...baseArgs,
    translations: enTranslations,
  },
};
