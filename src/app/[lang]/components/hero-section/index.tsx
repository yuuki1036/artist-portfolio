import Image from "next/image";

type Props = {
  name: string;
};

export function HeroSection({ name }: Props) {
  return (
    <section className="ap-bg-bg-primary ap-relative ap-overflow-hidden ap-min-h-[70vh] ap-flex ap-items-center ap-justify-center ap-px-6 ap-py-20">
      {/* Decorative floating circles */}
      <div
        className="ap-absolute ap-top-[12%] ap-left-[8%] ap-w-16 ap-h-16 ap-rounded-full ap-bg-accent/10 ap-animate-bounce"
        style={{ animationDuration: "4s", animationDelay: "0s" }}
      />
      <div
        className="ap-absolute ap-top-[20%] ap-right-[12%] ap-w-10 ap-h-10 ap-rounded-full ap-bg-bg-deep/15 ap-animate-bounce"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      />
      <div
        className="ap-absolute ap-bottom-[18%] ap-left-[15%] ap-w-8 ap-h-8 ap-rounded-full ap-bg-bg-warm ap-animate-bounce"
        style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
      />
      <div
        className="ap-absolute ap-bottom-[25%] ap-right-[8%] ap-w-14 ap-h-14 ap-rounded-full ap-bg-accent/10 ap-animate-bounce"
        style={{ animationDuration: "4.5s", animationDelay: "2s" }}
      />
      <div
        className="ap-absolute ap-top-[50%] ap-left-[3%] ap-w-6 ap-h-6 ap-rounded-full ap-bg-bg-deep/10 ap-animate-bounce"
        style={{ animationDuration: "6s", animationDelay: "1.5s" }}
      />

      <div className="ap-relative ap-text-center">
        {/* Avatar with accent ring */}
        <div className="ap-relative ap-inline-block ap-mb-8">
          <div
            className="ap-absolute ap-inset-[-6px] ap-rounded-full ap-bg-gradient-to-br ap-from-accent ap-to-bg-deep ap-animate-spin"
            style={{ animationDuration: "12s" }}
          />
          <Image
            src="/images/avatar.jpeg"
            alt="yasu224"
            width={180}
            height={180}
            className="ap-relative ap-rounded-full ap-border-4 ap-border-bg-primary"
            priority
          />
        </div>

        {/* Name with large playful typography */}
        <h1 className="ap-text-6xl md:ap-text-8xl lg:ap-text-9xl ap-font-black ap-text-text-primary ap-tracking-tighter ap-leading-none">
          {name}
        </h1>

        {/* Accent underline decoration */}
        <div className="ap-mt-4 ap-mx-auto ap-flex ap-items-center ap-justify-center ap-gap-2">
          <span className="ap-block ap-h-1 ap-w-12 ap-rounded-full ap-bg-accent" />
          <span className="ap-block ap-h-1 ap-w-6 ap-rounded-full ap-bg-bg-deep" />
          <span className="ap-block ap-h-1 ap-w-3 ap-rounded-full ap-bg-accent/40" />
        </div>
      </div>
    </section>
  );
}
