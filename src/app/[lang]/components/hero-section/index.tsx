import Image from "next/image";

type Props = {
  name: string;
};

export function HeroSection({ name }: Props) {
  return (
    <section className="bg-bg-primary relative overflow-hidden min-h-[70vh] flex items-center justify-center px-6 py-20">
      {/* Decorative floating circles */}
      <div
        className="absolute top-[12%] left-[8%] w-16 h-16 rounded-full bg-accent/10 animate-bounce"
        style={{ animationDuration: "4s", animationDelay: "0s" }}
      />
      <div
        className="absolute top-[20%] right-[12%] w-10 h-10 rounded-full bg-bg-deep/15 animate-bounce"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[18%] left-[15%] w-8 h-8 rounded-full bg-bg-warm animate-bounce"
        style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-[25%] right-[8%] w-14 h-14 rounded-full bg-accent/10 animate-bounce"
        style={{ animationDuration: "4.5s", animationDelay: "2s" }}
      />
      <div
        className="absolute top-[50%] left-[3%] w-6 h-6 rounded-full bg-bg-deep/10 animate-bounce"
        style={{ animationDuration: "6s", animationDelay: "1.5s" }}
      />

      <div className="relative text-center">
        {/* Avatar with accent ring */}
        <div className="relative inline-block mb-8">
          <div
            className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-accent to-bg-deep animate-spin"
            style={{ animationDuration: "12s" }}
          />
          <Image
            src="/images/avatar.jpeg"
            alt="yasu224"
            width={180}
            height={180}
            className="relative rounded-full border-4 border-bg-primary"
            priority
          />
        </div>

        {/* Name with large playful typography */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-text-primary tracking-tighter leading-none">
          {name}
        </h1>

        {/* Accent underline decoration */}
        <div className="mt-4 mx-auto flex items-center justify-center gap-2">
          <span className="block h-1 w-12 rounded-full bg-accent" />
          <span className="block h-1 w-6 rounded-full bg-bg-deep" />
          <span className="block h-1 w-3 rounded-full bg-accent/40" />
        </div>
      </div>
    </section>
  );
}
