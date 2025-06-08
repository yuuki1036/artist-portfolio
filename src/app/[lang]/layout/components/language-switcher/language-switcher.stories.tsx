import type { Meta, StoryObj } from "@storybook/nextjs";
import { LanguageSwitcher } from "./index";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "Layout/LanguageSwitcher",
  component: LanguageSwitcher,
  parameters: {
    layout: "centered",
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
  },
  render: (args, { globals }) => {
    const locale = globals.locale || "ja";
    return <LanguageSwitcher {...args} currentLang={locale} />;
  },
};

export const Japanese: Story = {
  args: {
    currentLang: "ja",
  },
};

export const English: Story = {
  args: {
    currentLang: "en",
  },
};
