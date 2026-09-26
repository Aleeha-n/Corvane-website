import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  showSubtitle = true,
}) => {
  // 'dark' = navy mark for light surfaces, 'light' = white mark for navy surfaces
  const ink = variant === 'dark' ? '#243673' : '#FFFFFF';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 sm:h-11 lg:h-12 w-auto flex-shrink-0"
        role="img"
        aria-label="Corvane Freight"
      >
        <path
          d="M26 12C24.2 10.5 21.8 9.5 19 9.5C13.2 9.5 8.5 14.2 8.5 20C8.5 25.8 13.2 30.5 19 30.5C21.8 30.5 24.2 29.5 26 28"
          stroke={ink}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M17 15L29 15M29 15L23 21M29 15L29 25"
          stroke="#EA580C"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="15" r="2.2" fill="#EA580C" />
      </svg>

      <div className="flex flex-col leading-tight whitespace-nowrap">
        <span className="font-display text-sm sm:text-base font-bold tracking-tight" style={{ color: ink }}>
          Corvane Freight
        </span>
        {showSubtitle && (
          <span
            className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.22em] font-semibold mt-0.5"
            style={{ color: variant === 'dark' ? '#64748B' : 'rgba(255,255,255,0.7)' }}
          >
            Australia · Global Freight
          </span>
        )}
      </div>
    </div>
  );
};
