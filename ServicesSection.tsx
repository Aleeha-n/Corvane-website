import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { CORVANE_SERVICES } from '../data/corvaneData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  selectedServiceId?: string;
  onSelectService: (serviceId: string) => void;
  onOpenDetailModal?: (service: ServiceItem) => void;
  onOpenQuote?: (serviceTitle?: string) => void;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceId,
  onSelectService,
  onOpenDetailModal,
  onOpenQuote,
  className = '',
}) => {
  // Track currently active service (for image preview) and hovered service (for desktop expansion)
  const [activeId, setActiveId] = useState<string>(
    selectedServiceId || CORVANE_SERVICES[0].id
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mobile accordion state
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);

  // Sync when a service is selected externally (e.g. footer links)
  useEffect(() => {
    if (selectedServiceId) {
      setActiveId(selectedServiceId);
    }
  }, [selectedServiceId]);

  const activeService =
    CORVANE_SERVICES.find((s) => s.id === (hoveredId || activeId)) || CORVANE_SERVICES[0];

  const handleRowClick = (service: ServiceItem) => {
    setActiveId(service.id);
    onSelectService(service.id);
    if (onOpenDetailModal) {
      onOpenDetailModal(service);
    }
  };

  const handleMobileToggle = (serviceId: string) => {
    setExpandedMobileId((prev) => (prev === serviceId ? null : serviceId));
    setActiveId(serviceId);
    onSelectService(serviceId);
  };

  return (
    <section
      id="services"
      className={`relative bg-white text-[#243673] py-20 sm:py-24 lg:py-28 overflow-hidden border-b border-[#243673]/10 ${className}`}
      aria-label="Corvane Freight Freight Services Directory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* LEFT SIDE: Header & Sticky Preview */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C2410C]">
              Our Services
            </p>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#243673] tracking-tight leading-[1.12]">
              Every leg of your freight, handled in-house.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Eight services, one team. We book it, track it, clear it and deliver it.
            </p>

            {/* Desktop preview card for the hovered/active service */}
            <div className="hidden lg:block pt-2 lg:sticky lg:top-28">
              <div className="rounded overflow-hidden border border-[#243673]/15 bg-white shadow-md">
                <div className="relative h-64 xl:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    key={activeService.id}
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Navy scrim at the base so the category tag stays legible */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#243673]/80 to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[11px] font-bold text-white bg-[#243673] px-2.5 py-1 rounded-sm tracking-widest uppercase">
                    {activeService.number} &middot; {activeService.category}
                  </span>
                </div>

                <div className="p-6 bg-white border-t border-[#243673]/10 space-y-4">
                  <div>
                    <span
                      className="font-display text-xl font-bold text-[#243673] tracking-tight block"
                      aria-hidden="true"
                    >
                      {activeService.title}
                    </span>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-2">
                      {activeService.summary}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#243673]/10">
                    {onOpenQuote && (
                      <button
                        type="button"
                        onClick={() => onOpenQuote(activeService.title)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FA6000] hover:bg-[#E55400] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                      >
                        <span>Quote {activeService.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {onOpenDetailModal && (
                      <button
                        type="button"
                        onClick={() => onOpenDetailModal(activeService)}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#C2410C] font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer py-1 px-2"
                        aria-label={`Open details for ${activeService.title}`}
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-4 h-4 text-[#C2410C]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Service Directory */}
          <div className="lg:col-span-7">

            {/* DESKTOP: plain rows, hover highlights the row */}
            <div
              className="hidden lg:block border-t border-[#243673]/15"
              onMouseLeave={() => setHoveredId(null)}
            >
              {CORVANE_SERVICES.map((service) => {
                const isHovered = hoveredId === service.id;
                const displayTitle = service.title;

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => {
                      setHoveredId(service.id);
                      setActiveId(service.id);
                    }}
                    className={`border-b border-[#243673]/15 transition-colors duration-150 ${
                      isHovered ? 'bg-slate-50' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleRowClick(service)}
                      onFocus={() => {
                        setHoveredId(service.id);
                        setActiveId(service.id);
                      }}
                      onBlur={() => setHoveredId(null)}
                      className="w-full text-left py-7 px-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FA6000] block"
                      aria-label={`View ${displayTitle} specifications`}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-baseline gap-5 sm:gap-7">
                          <span
                            className={`font-mono text-base font-bold tracking-wider select-none ${
                              isHovered ? 'text-[#C2410C]' : 'text-slate-500'
                            }`}
                          >
                            {service.number}
                          </span>

                          <h3
                            className={`font-display text-2xl xl:text-3xl font-bold tracking-tight transition-colors duration-150 ${
                              isHovered ? 'text-[#C2410C]' : 'text-[#243673]'
                            }`}
                          >
                            {displayTitle}
                          </h3>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#C2410C] transition-opacity duration-150 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          Explore
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* MOBILE: simple accordion, no animated drawer */}
            <div className="lg:hidden border-t border-[#243673]/15 divide-y divide-[#243673]/15">
              {CORVANE_SERVICES.map((service) => {
                const isOpen = expandedMobileId === service.id;
                const displayTitle = service.title;

                return (
                  <div key={service.id}>
                    <button
                      type="button"
                      onClick={() => handleMobileToggle(service.id)}
                      className={`w-full py-5 px-3 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                        isOpen ? 'bg-slate-50' : 'active:bg-slate-50'
                      }`}
                      aria-expanded={isOpen}
                      aria-label={`${displayTitle} service`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-sm font-bold tracking-wider ${
                            isOpen ? 'text-[#C2410C]' : 'text-slate-500'
                          }`}
                        >
                          {service.number}
                        </span>
                        <span
                          className={`font-display text-xl font-bold tracking-tight ${
                            isOpen ? 'text-[#C2410C]' : 'text-[#243673]'
                          }`}
                        >
                          {displayTitle}
                        </span>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 px-3 space-y-4 bg-slate-50">
                        <div className="relative h-44 w-full overflow-hidden rounded border border-[#243673]/10 bg-slate-900">
                          <img
                            src={service.image}
                            alt={displayTitle}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase font-bold text-white bg-[#243673] px-2 py-0.5 rounded-sm">
                            {service.category}
                          </span>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed">
                          {service.summary}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {service.capabilities.slice(0, 3).map((cap, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono text-slate-600 bg-white border border-[#243673]/15 px-2 py-0.5 rounded"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>

                        <div className="pt-1 flex items-center gap-3">
                          {onOpenQuote && (
                            <button
                              type="button"
                              onClick={() => onOpenQuote(displayTitle)}
                              className="flex-1 py-3 px-4 bg-[#FA6000] active:bg-[#E55400] text-white font-bold text-xs uppercase tracking-wider rounded text-center transition-colors"
                            >
                              Get a Quote
                            </button>
                          )}

                          {onOpenDetailModal && (
                            <button
                              type="button"
                              onClick={() => onOpenDetailModal(service)}
                              className="py-3 px-4 bg-white border border-[#243673]/15 text-[#243673] text-xs font-mono uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5"
                            >
                              <span>Details</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#C2410C]" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
