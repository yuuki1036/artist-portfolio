import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Translations } from "@/i18n/types";
import { Navigation } from "./index";
import jaTranslations from "../../../../../../public/locales/ja.json";
import enTranslations from "../../../../../../public/locales/en.json";

const translations: Record<"ja" | "en", Translations> = {
  ja: jaTranslations as Translations,
  en: enTranslations as Translations,
};

const meta: Meta<typeof Navigation> = {
  title: "Layout/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    currentLang: {
      control: { type: "select" },
      options: ["ja", "en"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLang: "ja",
    translations: translations.ja,
  },
  render: (args, { globals }) => {
    const locale = globals.locale || "ja";
    return (
      <Navigation
        {...args}
        currentLang={locale}
        translations={translations[locale as keyof typeof translations]}
      />
    );
  },
};

export const Japanese: Story = {
  args: {
    currentLang: "ja",
    translations: translations.ja,
  },
};

export const English: Story = {
  args: {
    currentLang: "en",
    translations: translations.en,
  },
};
