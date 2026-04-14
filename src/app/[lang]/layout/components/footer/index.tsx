import { InstagramIcon, TikTokIcon } from "@/components/icons";
import type { Translations } from "@/i18n/types";

type Props = {
  translations: Translations;
};

const SNS_LINKS = {
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
};

export function Footer({ translations }: Props) {
  const t = translations.common.footer;

  return (
    <footer className="bg-bg-deep px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <ul className="flex items-center justify-center md:justify-start gap-6">
          <li>
            <a
              href={SNS_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.social.instagram}
              className="text-text-on-deep/70 hover:text-accent transition-colors duration-200 inline-flex"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href={SNS_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.social.tiktok}
              className="text-text-on-deep/70 hover:text-accent transition-colors duration-200 inline-flex"
            >
              <TikTokIcon className="w-6 h-6" />
            </a>
          </li>
        </ul>
        <p className="text-sm text-text-on-deep/60 text-center md:text-right">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
