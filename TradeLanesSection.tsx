import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CORVANE_TRADE_LANES } from '../data/corvaneData';

interface TradeLanesSectionProps {
  className?: string;
}

/**
 * Global Trade Lanes — compact route cards driven by CORVANE_TRADE_LANES.
 * Visual-first: big transit number, route line, ports line. Minimal text.
 */
export const TradeLanesSection: React.FC<TradeLanesSectionProps> = ({
  className = '',
}) => {
  // Split corridor "Australia ⇄ East Asia & China" into readable halves
  const halves = (corridor: string) => {
    const parts = corridor.split('⇄').map((p) => p.trim());
    return { from: parts[0] ?? corridor, to: parts[1] ?? '' };
  };
  // Extract the headline number e.g. "Ocean (14–22 days)" -> "14–22"
  const days = (mode: string) =>
    (mode.match(/\(([^)]+)\)/)?.[1] ?? '').replace(/\s*days?/i, '').trim();

  return (
    <section
      id="trade-lanes"
      className={`relative bg-[#243673] text-white py-12 sm:py-16 overflow-hidden ${className}`}
      aria-label="Corvane Global Trade Lanes and Transit Times"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-6 sm:mb-10">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-[1.15]">
            Transit windows you can plan around.
          </h2>
        </div>

        {/* Route cards — solid, flat, no glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {CORVANE_TRADE_LANES.map((lane) => {
            const { from, to } = halves(lane.corridor);
            const ocean = lane.modes.split('|').find((m) => m.trim().toLowerCase().startsWith('ocean'));
            const air = lane.modes.split('|').find((m) => m.trim().toLowerCase().startsWith('air'));
            return (
              <div
                key={lane.corridor}
                className="rounded border border-white/20 bg-[#1B2A5E] hover:bg-[#16234f] px-4 py-3.5 sm:px-6 sm:py-5 transition-colors duration-150"
              >
                {/* Route line */}
                <div className="flex items-center gap-2 text-[13px] sm:text-sm font-semibold text-white/90 mb-2 sm:mb-4">
                  <span className="truncate">{from}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF8A42] flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{to}</span>
                </div>

                {/* Transit numbers — ocean hero + air inline, one row */}
                <div className="flex items-baseline gap-1.5">
                  {ocean && (
                    <>
                      <span className="font-display text-[2rem] sm:text-[2.6rem] font-bold text-white tracking-tight leading-none">
                        {days(ocean)}
                      </span>
                      <span className="text-sm text-white/70 font-semibold self-center mr-2 sm:mr-3">d</span>
                    </>
                  )}
                  {air && (
                    <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-white/70 font-mono uppercase tracking-wider">
                      {days(air)} d air
                    </span>
                  )}
                </div>

                {/* Ports line */}
                <p className="pt-2.5 sm:pt-4 text-[10px] sm:text-[11px] text-white/60 font-mono leading-relaxed line-clamp-1 sm:line-clamp-2">
                  {lane.ports}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
