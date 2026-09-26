import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onOpenQuote?: () => void;
  onOpenServices?: () => void;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenQuote,
  onOpenServices,
  className = '',
}) => {
  return (
    <section
      id="about"
      className={`relative bg-[#F4F6FA] text-[#243673] py-20 sm:py-24 lg:py-28 overflow-hidden border-b border-slate-200 ${className}`}
      aria-label="About Corvane Freight"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* LEFT COLUMN: Text */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#243673] tracking-tight leading-[1.15]">
              Freight, handled like it&apos;s ours.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              <p>
                Air, sea, customs and door delivery under one roof. Corvane runs your freight like an extension of your own business: careful with deadlines, straight with costs.
              </p>
            </div>

            {/* Operational principles */}
            <div className="pt-2 space-y-4 border-t border-slate-200">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#C2410C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#243673] tracking-tight">
                    One person, accountable
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    A named forwarder handles your shipment end to end, so you always know who to call.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#C2410C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#243673] tracking-tight">
                    Customs done right
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Licensed brokers lodge directly via EDI, so your cargo clears the border without surprises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#C2410C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#243673] tracking-tight">
                    Straight answers
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Clear quotes, honest transit times, and updates the moment something changes.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {onOpenQuote && (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 bg-[#FA6000] hover:bg-[#E55400] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA6000]"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {onOpenServices && (
                <button
                  type="button"
                  onClick={onOpenServices}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#243673] hover:text-[#C2410C] transition-colors py-3.5 px-3 min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FA6000] rounded"
                >
                  Explore Capabilities &rarr;
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Photography with a simple caption bar */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
              <img
                src="/images/about-facility.webp"
                alt="High-bay Australian logistics warehousing and distribution operations"
                className="w-full h-[380px] sm:h-[480px] lg:h-[540px] object-cover object-center"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-[#243673] flex items-center justify-between border-t border-[#243673]/10 bg-[#F4F6FA]">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700 font-semibold">
                    Australian Logistics Operations
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Melbourne HQ &amp; Sydney commercial operations
                  </p>
                </div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest hidden sm:inline">
                  Melbourne HQ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
