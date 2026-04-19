import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductGallery } from "./index";

const meta: Meta<typeof ProductGallery> = {
  title: "Pages/Shop/ProductGallery",
  component: ProductGallery,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImages = [
  "/images/works/work-1.png",
  "/images/works/work-2.png",
  "/images/works/work-3.png",
  "/images/works/work-4.png",
];

export const SingleImage: Story = {
  args: {
    imageUrls: [sampleImages[0]],
    alt: "Sample artwork",
  },
};

export const MultipleImages: Story = {
  args: {
    imageUrls: sampleImages,
    alt: "Sample artwork with multiple views",
  },
};

export const Empty: Story = {
  args: {
    imageUrls: [],
    alt: "No image",
  },
};
