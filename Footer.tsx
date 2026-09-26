import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CORVANE_SERVICES, CORVANE_INFO } from '../data/corvaneData';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenQuote: (service?: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onSelectService,
}) => {
  return (
    <footer className="bg-[#243673] text-white/70 text-xs">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-white/60 text-xs leading-relaxed max-w-sm">
              Australian freight forwarder: air, sea, customs, transport &amp; 3PL.
            </p>
          </div>

          {/* Services (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {CORVANE_SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.id)}
                    className="text-white/60 hover:text-[#FF8A42] transition-colors text-left cursor-pointer"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-1 text-white/60">
              <p><span className="text-white font-semibold">Melbourne HQ,</span> Unit 4, 18 Freight Way, Port Melbourne VIC</p>
              <a href="tel:+61355501234" className="text-white hover:text-[#FF8A42] font-mono py-2.5 -my-1 inline-flex items-center min-h-[44px]">
                +61 3 5550 1234
              </a>
              <p className="pt-1"><span className="text-white font-semibold">Sydney,</span> Level 9, 25 Cargo Lane, Sydney NSW</p>
              <a href="tel:+61255500187" className="text-white hover:text-[#FF8A42] font-mono py-2.5 -my-1 inline-flex items-center min-h-[44px]">
                +61 2 5550 0187
              </a>
            </div>
            <button
              onClick={onOpenTracking}
              className="inline-flex items-center gap-1.5 text-[#FF8A42] hover:text-[#FF8A42] transition-colors cursor-pointer py-3 -my-2 min-h-[44px]"
            >
              <span>Track your shipment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-white/10 py-5 px-4 sm:px-8 bg-[#1B2A5E] text-[11px] text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} {CORVANE_INFO.legalName}. Standard Trading Conditions Apply.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white/60 hover:text-[#FF8A42] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
