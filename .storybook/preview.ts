import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  globalTypes: {
    locale: {
      description: "Internationalization locale",
      toolbar: {
        title: "Language",
        icon: "globe",
        items: [
          { value: "ja", title: "🇯🇵 日本語" },
          { value: "en", title: "🇺🇸 English" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: "ja",
  },
};

export default preview;
