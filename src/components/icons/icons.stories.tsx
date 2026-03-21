import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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
      defaultValue: "w-5 h-5",
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
    <div className="grid grid-cols-3 lg:grid-cols-5 gap-8 p-4">
      <div className="flex flex-col items-center space-y-2">
        <InstagramIcon {...args} />
        <span className="text-sm text-gray-600 font-medium">InstagramIcon</span>
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
          &lt;InstagramIcon /&gt;
        </code>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <TikTokIcon {...args} />
        <span className="text-sm text-gray-600 font-medium">TikTokIcon</span>
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
          &lt;TikTokIcon /&gt;
        </code>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <ShoppingCartIcon {...args} />
        <span className="text-sm text-gray-600 font-medium">
          ShoppingCartIcon
        </span>
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
          &lt;ShoppingCartIcon /&gt;
        </code>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <HamburgerMenuIcon {...args} />
        <span className="text-sm text-gray-600 font-medium">
          HamburgerMenuIcon
        </span>
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
          &lt;HamburgerMenuIcon /&gt;
        </code>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <CloseIcon {...args} />
        <span className="text-sm text-gray-600 font-medium">CloseIcon</span>
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
          &lt;CloseIcon /&gt;
        </code>
      </div>
    </div>
  ),
  args: {
    className: "w-8 h-8 text-gray-700",
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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-16">Small:</span>
        <InstagramIcon className="w-4 h-4" />
        <TikTokIcon className="w-4 h-4" />
        <ShoppingCartIcon className="w-4 h-4" />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-16">Default:</span>
        <InstagramIcon className="w-5 h-5" />
        <TikTokIcon className="w-5 h-5" />
        <ShoppingCartIcon className="w-5 h-5" />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-16">Large:</span>
        <InstagramIcon className="w-8 h-8" />
        <TikTokIcon className="w-8 h-8" />
        <ShoppingCartIcon className="w-8 h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-16">Extra Large:</span>
        <InstagramIcon className="w-12 h-12" />
        <TikTokIcon className="w-12 h-12" />
        <ShoppingCartIcon className="w-12 h-12" />
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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-20">Gray:</span>
        <InstagramIcon className="w-6 h-6 text-gray-500" />
        <TikTokIcon className="w-6 h-6 text-gray-500" />
        <ShoppingCartIcon className="w-6 h-6 text-gray-500" />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-20">Dark:</span>
        <InstagramIcon className="w-6 h-6 text-gray-900" />
        <TikTokIcon className="w-6 h-6 text-gray-900" />
        <ShoppingCartIcon className="w-6 h-6 text-gray-900" />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-20">Blue:</span>
        <InstagramIcon className="w-6 h-6 text-blue-600" />
        <TikTokIcon className="w-6 h-6 text-blue-600" />
        <ShoppingCartIcon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium w-20">Red:</span>
        <InstagramIcon className="w-6 h-6 text-red-600" />
        <TikTokIcon className="w-6 h-6 text-red-600" />
        <ShoppingCartIcon className="w-6 h-6 text-red-600" />
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
    className: "w-8 h-8 text-gray-700",
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
    className: "w-8 h-8 text-gray-700",
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
    className: "w-8 h-8 text-gray-700",
  },
  parameters: {
    docs: {
      description: {
        story: "Shopping cart icon for e-commerce functionality.",
      },
    },
  },
};
