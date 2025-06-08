import type { Meta, StoryObj } from '@storybook/nextjs';
import { Navigation } from './index';

// Translation data
const translations = {
  ja: {
    common: {
      menu: {
        home: 'ホーム',
        works: '作品',
        about: 'プロフィール',
        contact: 'お問い合わせ',
      },
    },
  },
  en: {
    common: {
      menu: {
        home: 'Home',
        works: 'Works',
        about: 'About',
        contact: 'Contact',
      },
    },
  },
};

const meta: Meta<typeof Navigation> = {
  title: 'Layout/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    currentLang: {
      control: { type: 'select' },
      options: ['ja', 'en'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLang: 'ja',
    translations: translations.ja,
  },
  render: (args, { globals }) => {
    const locale = globals.locale || 'ja';
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
    currentLang: 'ja',
    translations: translations.ja,
  },
};

export const English: Story = {
  args: {
    currentLang: 'en',
    translations: translations.en,
  },
};