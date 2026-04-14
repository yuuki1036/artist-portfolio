import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./index";
import jaTranslations from "../../../../../../public/locales/ja.json";
import enTranslations from "../../../../../../public/locales/en.json";
import type { Translations } from "@/i18n/types";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Japanese: Story = {
  args: {
    translations: jaTranslations as Translations,
  },
};

export const English: Story = {
  args: {
    translations: enTranslations as Translations,
  },
};
