type IconProps = {
  className?: string;
  "aria-label"?: string;
};

export function ShoppingCartIcon({ className = "ap-w-5 ap-h-5", "aria-label": ariaLabel }: IconProps) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      role="img" 
      aria-label={ariaLabel || "Shopping cart"}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M7 13H5" 
      />
    </svg>
  );
}