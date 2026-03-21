import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-onboarding", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const tailwindcss = await import("@tailwindcss/vite");
    return mergeConfig(config, {
      plugins: [tailwindcss.default()],
    });
  },
};
export default config;
