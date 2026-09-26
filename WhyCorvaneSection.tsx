import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface WhyCorvaneSectionProps {
  onOpenQuote?: () => void;
  className?: string;
}

export const WhyCorvaneSection: React.FC<WhyCorvaneSectionProps> = ({
  onOpenQuote,
  className = '',
}) => {
  const highlights = [
    {
      number: '01',
      title: 'Built around your cargo',
      explanation:
        'Route, carrier and equipment chosen for your cargo, not a template.',
    },
    {
      number: '02',
      title: 'We watch your shipment',
      explanation:
        'Delays get fixed at overseas ports before they ever reach you.',
    },
    {
      number: '03',
      title: 'Heavy lift specialists',
      explanation:
        'Machinery and out-of-gauge loads, handled with the right rigging.',
    },
    {
      number: '04',
      title: 'Fast local decisions',
      explanation:
        'Senior staff answer your call. Quotes confirmed quickly.',
    },
  ];

  return (
    <section
      id="why-corvane"
      className={`relative bg-white text-[#243673] py-20 sm:py-24 lg:py-28 overflow-hidden border-b border-[#243673]/10 ${className}`}
      aria-label="Why Partner with Corvane Freight"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* LEFT COLUMN: Intro & Photography */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C2410C]">
              Why Corvane
            </p>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#243673] tracking-tight leading-[1.12]">
              Why shippers stay with Corvane.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Space protected on every major trade lane, one point of contact, and rates that hold. Simple as that.
            </p>

            {/* Operations photography with a plain caption bar */}
            <div className="rounded overflow-hidden border border-[#243673]/15 shadow-sm bg-slate-900">
              <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                <img
                  src="/images/whycorvane-ops.webp"
                  alt="Commercial freight and container vessel operations"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              <div className="p-4 bg-[#F4F6FA] border-t border-[#243673]/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C2410C]" />
                <span className="font-mono text-xs text-slate-700 font-semibold uppercase tracking-wider">
                  Port &amp; wharf operations — Melbourne HQ
                </span>
              </div>
            </div>

            {onOpenQuote && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 bg-[#FA6000] hover:bg-[#E55400] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA6000]"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Numbered highlights */}
          <div className="lg:col-span-7">
            <div className="border-t border-[#243673]/15 divide-y divide-[#243673]/15">
              {highlights.map((item) => (
                <div key={item.number} className="py-8 sm:py-10">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-mono text-sm font-bold text-[#C2410C] pt-1.5 select-none">
                      {item.number}
                    </span>

                    <div className="space-y-2 flex-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#243673] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
