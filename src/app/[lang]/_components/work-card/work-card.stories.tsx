import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkCard } from "./index";

const meta: Meta<typeof WorkCard> = {
  title: "Pages/Home/WorkCard",
  component: WorkCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WorkCard>;

export const Default: Story = {
  args: {
    src: "/images/works/work-1.png",
    title: "RED CAR IS GOOD",
  },
};

export const WithRotation: Story = {
  args: {
    src: "/images/works/work-1.png",
    title: "RED CAR IS GOOD",
    rotation: -1.5,
  },
};
