import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Translations } from "@/i18n/types";
import { Navigation } from "./index";

// Translation data
const translations: Record<"ja" | "en", Translations> = {
  ja: {
    common: {
      title: "yasu224",
      menu: {
        original: "Original",
        shop: "Shop",
        about: "プロフィール",
        contact: "お問い合わせ",
      },
    },
    home: {
      hero: {
        greeting: "こんにちは、",
        name: "yasu224",
        tagline: "イラストで、日常をちょっと楽しく。",
      },
      sections: { works: "Works", shop: "Shop" },
    },
  },
  en: {
    common: {
      title: "yasu224",
      menu: {
        original: "Original",
        shop: "Shop",
        about: "About",
        contact: "Contact",
      },
    },
    home: {
      hero: {
        greeting: "Hello, I'm",
        name: "yasu224",
        tagline: "Making everyday life a little more fun with illustration.",
      },
      sections: { works: "Works", shop: "Shop" },
    },
  },
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
