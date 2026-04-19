type Props = {
  isSoldOut: boolean;
  labels: {
    buy: string;
    comingSoon: string;
  };
};

export function BuyButton({ isSoldOut, labels }: Props) {
  const mainLabel = isSoldOut ? labels.comingSoon : labels.buy;

  return (
    <button
      type="button"
      disabled
      className="inline-flex items-center justify-center gap-2 w-full md:w-auto md:self-start px-10 py-4 rounded-full bg-accent text-white font-black text-base tracking-wide transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{mainLabel}</span>
      <span className="text-xs font-bold opacity-80">
        ({labels.comingSoon})
      </span>
    </button>
  );
}
