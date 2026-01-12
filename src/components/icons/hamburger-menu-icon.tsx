type IconProps = {
  className?: string;
  "aria-label"?: string;
};

export function HamburgerMenuIcon({
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
      aria-label={ariaLabel || "Menu"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}
