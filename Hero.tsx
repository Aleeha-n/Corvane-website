import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Search, Phone } from 'lucide-react';

interface HeroProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onOpenServices: (serviceId?: string) => void;
  onOpenTracking: (query?: string) => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onOpenServices,
  onOpenTracking,
  onOpenContact,
}) => {
  const [quickTrackNumber, setQuickTrackNumber] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleQuoteClick = () => {
    const el = document.getElementById('quote');
    if (el && el.getBoundingClientRect().top > window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenQuote();
    }
  };

  const handleServicesClick = () => {
    const el = document.getElementById('services');
    if (el && el.getBoundingClientRect().top > window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenServices();
    }
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el && el.getBoundingClientRect().top > window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenTracking(quickTrackNumber.trim());
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[100dvh] flex flex-col justify-between bg-white text-[#243673] pt-24 sm:pt-32 lg:pt-36 pb-6 overflow-hidden"
      aria-label="Corvane Freight Hero"
    >
      {/* 1. BACKGROUND: Port footage with a navy scrim over the text side */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {reducedMotion ? (
          <img
            src="/hero-port-poster.jpg"
            alt="Container terminal at dusk with gantry cranes loading a berthed cargo vessel"
            className="w-full h-full object-cover object-center brightness-110 saturate-105 contrast-[1.05]"
            loading="eager"
            decoding="async"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-port-poster.jpg"
            aria-label="Container terminal at dusk with gantry cranes loading a berthed cargo vessel"
            className="w-full h-full object-cover object-center brightness-110 saturate-105 contrast-[1.05]"
          >
            <source src="/hero-port.mp4" type="video/mp4" />
          </video>
        )}

        {/* Left navy scrim protects the headline; right side stays clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A5E] via-[#1B2A5E]/40 to-[#1B2A5E]/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A5E] via-transparent to-[#1B2A5E]/20" />
      </div>

      {/* 2. HEADLINE BLOCK */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto py-4 sm:py-8 lg:py-12">
        <div className="max-w-4xl space-y-5 sm:space-y-7">
          {/* Small text eyebrow — plain type, no decorative dot */}
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            Australian Freight &amp; Logistics
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-fluid-hero-headline text-white tracking-tight">
            20 years. 3 continents.
            <span className="block text-white/90">One accountable forwarder.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-fluid-hero-subtext text-white/85 font-normal max-w-2xl">
            Air, sea, customs &amp; 3PL freight from our Melbourne HQ, with weekly departures on every major trade lane.
          </p>

          {/* CTA Buttons — no hover-lift, no entrance stagger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
            <button
              id="hero-quote-cta-btn"
              type="button"
              onClick={handleQuoteClick}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#FA6000] hover:bg-[#E55400] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-explore-services-btn"
              type="button"
              onClick={handleServicesClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#243673]/60 hover:bg-[#243673]/80 text-white font-semibold text-xs uppercase tracking-wider rounded border border-white/30 hover:border-white/50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-4 h-4 text-white/80" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOWER PORTION: Solid Quick Action Bar */}
      <div className="relative z-10 w-full mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="w-full max-w-4xl bg-[#F4F6FA] border border-[#243673]/15 rounded p-3 sm:p-3.5 shadow-lg">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Action 1: Track Shipment (WebTracker) */}
              <form
                onSubmit={handleQuickTrackSubmit}
                className="flex-1 flex items-center bg-white border border-[#243673]/15 focus-within:border-[#FA6000] rounded px-3 py-2 transition-colors"
              >
                <Search className="w-4 h-4 text-[#C2410C] mr-2.5 flex-shrink-0" />
                <input
                  type="text"
                  value={quickTrackNumber}
                  onChange={(e) => setQuickTrackNumber(e.target.value)}
                  placeholder="Track container or B/L number..."
                  className="bg-transparent border-none text-xs text-[#243673] placeholder:text-slate-500 focus:outline-none w-full font-mono tracking-wide"
                  aria-label="Container or Bill of Lading Number"
                />
                <button
                  type="submit"
                  className="ml-2 text-[10px] font-bold text-white uppercase tracking-wider px-2.5 py-1 rounded bg-[#243673] hover:bg-[#1B2A5E] transition-colors cursor-pointer flex-shrink-0"
                >
                  Track
                </button>
              </form>

              {/* Vertical divider on desktop */}
              <div className="hidden sm:block w-px h-7 bg-[#243673]/10" />

              {/* Action 2: Call the operations desk */}
              <a
                href="tel:+61355501234"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-[#243673]/5 border border-[#243673]/15 text-[#243673] text-xs font-bold uppercase tracking-wider rounded transition-colors flex-shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Call Ops Desk</span>
              </a>

              {/* Action 3: Contact */}
              <button
                type="button"
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-[#243673]/5 border border-[#243673]/15 text-[#243673] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer flex-shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Contact Desk</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
