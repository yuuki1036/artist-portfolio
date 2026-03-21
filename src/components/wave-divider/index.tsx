type WaveVariant = "gentle" | "playful";

type Props = {
  /** 波の上側の色（CSS色値 or CSS変数） */
  topColor?: string;
  /** 波の下側の色（CSS色値 or CSS変数） */
  bottomColor?: string;
  /** 上下反転 */
  flip?: boolean;
  /** 波のバリエーション */
  variant?: WaveVariant;
  className?: string;
};

const paths: Record<WaveVariant, string> = {
  gentle:
    "M0,64 C120,20 240,100 480,64 C720,28 840,90 960,64 C1080,38 1200,80 1440,64 L1440,150 L0,150 Z",
  playful:
    "M0,80 C100,30 200,100 360,55 C520,10 600,95 780,60 C960,25 1100,90 1280,50 C1360,35 1400,70 1440,60 L1440,150 L0,150 Z",
};

export function WaveDivider({
  topColor = "var(--color-bg-primary)",
  bottomColor = "var(--color-bg-warm)",
  flip = false,
  variant = "gentle",
  className,
}: Props) {
  return (
    <div
      className={className}
      style={{
        background: flip ? topColor : bottomColor,
        lineHeight: 0,
        overflow: "hidden",
        transform: flip ? "rotate(180deg)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          display: "block",
          width: "100%",
          height: "clamp(40px, 6vw, 80px)",
        }}
      >
        <path d={paths[variant]} fill={flip ? bottomColor : topColor} />
      </svg>
    </div>
  );
}
