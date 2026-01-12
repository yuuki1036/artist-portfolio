import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  InstagramIcon,
  TikTokIcon,
  ShoppingCartIcon,
  HamburgerMenuIcon,
  CloseIcon,
} from "./index";

const meta: Meta = {
  title: "Components/Icons",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icon components used throughout the application. All icons support className and aria-label props.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "CSS classes to apply to the icon",
      defaultValue: "ap-w-5 ap-h-5",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Icon catalog showing all icons
export const IconCatalog: Story = {
  render: (args) => (
    <div className="ap-grid ap-grid-cols-3 lg:ap-grid-cols-5 ap-gap-8 ap-p-4">
      <div className="ap-flex ap-flex-col ap-items-center ap-space-y-2">
        <InstagramIcon {...args} />
        <span className="ap-text-sm ap-text-gray-600 ap-font-medium">
          InstagramIcon
        </span>
        <code className="ap-text-xs ap-bg-gray-100 ap-px-2 ap-py-1 ap-rounded">
          &lt;InstagramIcon /&gt;
        </code>
      </div>
      <div className="ap-flex ap-flex-col ap-items-center ap-space-y-2">
        <TikTokIcon {...args} />
        <span className="ap-text-sm ap-text-gray-600 ap-font-medium">
          TikTokIcon
        </span>
        <code className="ap-text-xs ap-bg-gray-100 ap-px-2 ap-py-1 ap-rounded">
          &lt;TikTokIcon /&gt;
        </code>
      </div>
      <div className="ap-flex ap-flex-col ap-items-center ap-space-y-2">
        <ShoppingCartIcon {...args} />
        <span className="ap-text-sm ap-text-gray-600 ap-font-medium">
          ShoppingCartIcon
        </span>
        <code className="ap-text-xs ap-bg-gray-100 ap-px-2 ap-py-1 ap-rounded">
          &lt;ShoppingCartIcon /&gt;
        </code>
      </div>
      <div className="ap-flex ap-flex-col ap-items-center ap-space-y-2">
        <HamburgerMenuIcon {...args} />
        <span className="ap-text-sm ap-text-gray-600 ap-font-medium">
          HamburgerMenuIcon
        </span>
        <code className="ap-text-xs ap-bg-gray-100 ap-px-2 ap-py-1 ap-rounded">
          &lt;HamburgerMenuIcon /&gt;
        </code>
      </div>
      <div className="ap-flex ap-flex-col ap-items-center ap-space-y-2">
        <CloseIcon {...args} />
        <span className="ap-text-sm ap-text-gray-600 ap-font-medium">
          CloseIcon
        </span>
        <code className="ap-text-xs ap-bg-gray-100 ap-px-2 ap-py-1 ap-rounded">
          &lt;CloseIcon /&gt;
        </code>
      </div>
    </div>
  ),
  args: {
    className: "ap-w-8 ap-h-8 ap-text-gray-700",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete catalog of all available icons with their component names and usage examples.",
      },
    },
  },
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className="ap-space-y-6">
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-16">Small:</span>
        <InstagramIcon className="ap-w-4 ap-h-4" />
        <TikTokIcon className="ap-w-4 ap-h-4" />
        <ShoppingCartIcon className="ap-w-4 ap-h-4" />
      </div>
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-16">Default:</span>
        <InstagramIcon className="ap-w-5 ap-h-5" />
        <TikTokIcon className="ap-w-5 ap-h-5" />
        <ShoppingCartIcon className="ap-w-5 ap-h-5" />
      </div>
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-16">Large:</span>
        <InstagramIcon className="ap-w-8 ap-h-8" />
        <TikTokIcon className="ap-w-8 ap-h-8" />
        <ShoppingCartIcon className="ap-w-8 ap-h-8" />
      </div>
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-16">Extra Large:</span>
        <InstagramIcon className="ap-w-12 ap-h-12" />
        <TikTokIcon className="ap-w-12 ap-h-12" />
        <ShoppingCartIcon className="ap-w-12 ap-h-12" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icons in different sizes using Tailwind CSS width and height classes.",
      },
    },
  },
};

// Color variations
export const Colors: Story = {
  render: () => (
    <div className="ap-space-y-6">
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-20">Gray:</span>
        <InstagramIcon className="ap-w-6 ap-h-6 ap-text-gray-500" />
        <TikTokIcon className="ap-w-6 ap-h-6 ap-text-gray-500" />
        <ShoppingCartIcon className="ap-w-6 ap-h-6 ap-text-gray-500" />
      </div>
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-20">Dark:</span>
        <InstagramIcon className="ap-w-6 ap-h-6 ap-text-gray-900" />
        <TikTokIcon className="ap-w-6 ap-h-6 ap-text-gray-900" />
        <ShoppingCartIcon className="ap-w-6 ap-h-6 ap-text-gray-900" />
      </div>
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-20">Blue:</span>
        <InstagramIcon className="ap-w-6 ap-h-6 ap-text-blue-600" />
        <TikTokIcon className="ap-w-6 ap-h-6 ap-text-blue-600" />
        <ShoppingCartIcon className="ap-w-6 ap-h-6 ap-text-blue-600" />
      </div>
      <div className="ap-flex ap-items-center ap-space-x-4">
        <span className="ap-text-sm ap-font-medium ap-w-20">Red:</span>
        <InstagramIcon className="ap-w-6 ap-h-6 ap-text-red-600" />
        <TikTokIcon className="ap-w-6 ap-h-6 ap-text-red-600" />
        <ShoppingCartIcon className="ap-w-6 ap-h-6 ap-text-red-600" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icons with different colors using Tailwind CSS text color classes. All icons inherit the current text color.",
      },
    },
  },
};

// Individual icon stories
export const Instagram: Story = {
  render: (args) => <InstagramIcon {...args} />,
  args: {
    className: "ap-w-8 ap-h-8 ap-text-gray-700",
  },
  parameters: {
    docs: {
      description: {
        story: "Instagram social media icon.",
      },
    },
  },
};

export const TikTok: Story = {
  render: (args) => <TikTokIcon {...args} />,
  args: {
    className: "ap-w-8 ap-h-8 ap-text-gray-700",
  },
  parameters: {
    docs: {
      description: {
        story: "TikTok social media icon.",
      },
    },
  },
};

export const ShoppingCart: Story = {
  render: (args) => <ShoppingCartIcon {...args} />,
  args: {
    className: "ap-w-8 ap-h-8 ap-text-gray-700",
  },
  parameters: {
    docs: {
      description: {
        story: "Shopping cart icon for e-commerce functionality.",
      },
    },
  },
};
