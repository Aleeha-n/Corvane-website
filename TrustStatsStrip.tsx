import React from 'react';

interface TrustStatsStripProps {
  className?: string;
}

export const TrustStatsStrip: React.FC<TrustStatsStripProps> = ({ className = '' }) => {
  return (
    <section
      id="trust-strip"
      className={`relative z-10 bg-white border-t border-b border-[#243673]/10 text-[#243673] py-14 sm:py-16 overflow-hidden select-none ${className}`}
      aria-label="Corvane Freight Operational Credentials"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-around gap-10 sm:gap-14 md:gap-16">
          {/* STAT 1: 20+ YEARS */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-baseline font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#243673]">
              <span>20</span>
              <span className="text-[#C2410C] ml-1 font-sans">+</span>
            </div>
            <span className="mt-2 sm:mt-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
              Years of Experience
            </span>
          </div>

          {/* THIN EDITORIAL SEPARATOR */}
          <div
            className="hidden md:block w-px h-20 lg:h-24 bg-[#243673]/15"
            aria-hidden="true"
          />
          <div
            className="block md:hidden w-20 h-px bg-[#243673]/15"
            aria-hidden="true"
          />

          {/* STAT 2: 3 CONTINENTS */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-baseline font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#243673]">
              <span>3</span>
            </div>
            <span className="mt-2 sm:mt-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
              Continents
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
