import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection } from "./index";

const meta: Meta<typeof HeroSection> = {
  title: "Pages/Home/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    name: "yasu224",
  },
};
