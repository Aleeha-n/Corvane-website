import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

interface DarkVisualBreakProps {
  onOpenQuote: () => void;
  className?: string;
}

export const DarkVisualBreak: React.FC<DarkVisualBreakProps> = ({
  onOpenQuote,
  className = '',
}) => {
  return (
    <section
      id="final-cta-banner"
      className={`relative bg-[#243673] text-white py-12 sm:py-16 overflow-hidden ${className}`}
      aria-label="Corvane Freight Freight Consultation"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left Column: Heading & Description */}
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
              Got freight to move? Let&apos;s price it today.
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Tell us what you&apos;re shipping. We&apos;ll come back with a clear rate within one business day.
            </p>
          </div>

          {/* Right Column: Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#FA6000] hover:bg-[#E55400] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+61355501234"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/25 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors"
              title="Call Melbourne Forwarding Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF8A42]" />
              <span>+61 3 5550 1234</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
