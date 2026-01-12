type IconProps = {
  className?: string;
  "aria-label"?: string;
};

export function CloseIcon({
  className = "ap-w-6 ap-h-6",
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      role="img"
      aria-label={ariaLabel || "Close"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
