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
      <section className="bg-bg-warm px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
              {t.home.sections.works}
            </h2>
            <span className="h-1 flex-1 bg-text-primary/10 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
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
        topColor="var(--color-bg-warm)"
        bottomColor="var(--color-bg-deep)"
      />

      {/* Shop Section */}
      <section className="bg-bg-deep px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-text-on-deep tracking-tight">
              {t.home.sections.shop}
            </h2>
            <span className="h-1 flex-1 bg-text-on-deep/15 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {shopItems.map((item) => (
              <div
                key={item.title}
                className="bg-bg-primary/10 backdrop-blur-xs rounded-2xl p-8 text-center border border-text-on-deep/10 transition-all duration-300 hover:bg-bg-primary/20 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-primary/15 flex items-center justify-center">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-text-on-deep mb-2">
                  {item.title}
                </h3>
                <p className="text-2xl font-black text-accent">{item.price}</p>
                <p className="text-sm text-text-on-deep/60 mt-3">Coming Soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
