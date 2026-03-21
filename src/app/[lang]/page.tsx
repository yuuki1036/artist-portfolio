import type { Metadata } from "next";
import { getTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/settings";
import { isValidLocale, i18n } from "@/i18n/settings";
import { redirect } from "next/navigation";
import { HeroSection } from "./components/hero-section";
import { WaveDivider } from "@/components/wave-divider";
import { WorkCard } from "./components/work-card";

const works = [
  { src: "/images/works/work-1.png", title: "RED CAR IS GOOD", rotation: -1.5 },
  { src: "/images/works/work-2.png", title: "Trattoria Vue", rotation: 1 },
  {
    src: "/images/works/work-3.png",
    title: "Marriage Reception",
    rotation: -0.5,
  },
  { src: "/images/works/work-4.png", title: "A Happy Marriage", rotation: 1.5 },
];

const shopItems = [
  { title: "Art Print A3", price: "¥3,500" },
  { title: "Sticker Set", price: "¥800" },
  { title: "Tote Bag", price: "¥2,800" },
];

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  const t = await getTranslations(lang as Locale);
  return {
    title: t.common.title,
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    redirect(`/${i18n.defaultLocale}`);
  }

  const t = await getTranslations(lang as Locale);

  return (
    <>
      {/* Hero */}
      <HeroSection name={t.home.hero.name} />

      {/* Hero → Works */}
      <WaveDivider variant="playful" />

      {/* Works Section */}
      <section className="ap-bg-bg-warm ap-px-6 ap-py-24">
        <div className="ap-max-w-6xl ap-mx-auto">
          <div className="ap-flex ap-items-baseline ap-gap-4 ap-mb-16">
            <h2 className="ap-text-4xl md:ap-text-5xl ap-font-black ap-text-text-primary ap-tracking-tight">
              {t.home.sections.works}
            </h2>
            <span className="ap-h-1 ap-flex-1 ap-bg-text-primary/10 ap-rounded-full" />
          </div>
          <div className="ap-grid ap-grid-cols-2 md:ap-grid-cols-4 ap-gap-6 md:ap-gap-8 ap-items-start">
            {works.map((work) => (
              <WorkCard
                key={work.src}
                src={work.src}
                title={work.title}
                rotation={work.rotation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Works → Shop */}
      <WaveDivider
        topColor="rgb(var(--color-bg-warm))"
        bottomColor="rgb(var(--color-bg-deep))"
      />

      {/* Shop Section */}
      <section className="ap-bg-bg-deep ap-px-6 ap-py-24">
        <div className="ap-max-w-6xl ap-mx-auto">
          <div className="ap-flex ap-items-baseline ap-gap-4 ap-mb-16">
            <h2 className="ap-text-4xl md:ap-text-5xl ap-font-black ap-text-text-on-deep ap-tracking-tight">
              {t.home.sections.shop}
            </h2>
            <span className="ap-h-1 ap-flex-1 ap-bg-text-on-deep/15 ap-rounded-full" />
          </div>
          <div className="ap-grid ap-grid-cols-1 sm:ap-grid-cols-3 ap-gap-6">
            {shopItems.map((item) => (
              <div
                key={item.title}
                className="ap-bg-bg-primary/10 ap-backdrop-blur-sm ap-rounded-2xl ap-p-8 ap-text-center ap-border ap-border-text-on-deep/10 ap-transition-all ap-duration-300 hover:ap-bg-bg-primary/20 hover:ap-scale-105 hover:ap-shadow-xl"
              >
                <div className="ap-w-20 ap-h-20 ap-mx-auto ap-mb-6 ap-rounded-full ap-bg-bg-primary/15 ap-flex ap-items-center ap-justify-center">
                  <span className="ap-text-3xl">🎨</span>
                </div>
                <h3 className="ap-text-xl ap-font-bold ap-text-text-on-deep ap-mb-2">
                  {item.title}
                </h3>
                <p className="ap-text-2xl ap-font-black ap-text-accent">
                  {item.price}
                </p>
                <p className="ap-text-sm ap-text-text-on-deep/60 ap-mt-3">
                  Coming Soon
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
