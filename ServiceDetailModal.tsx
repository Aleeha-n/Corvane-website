import React from 'react';
import { X, CheckCircle2, ArrowRight, Layers, Package } from 'lucide-react';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote,
}) => {
  const dialogRef = useModalBehavior(service !== null, onClose);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#243673]/40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${service.title} service details`}
        className="relative w-full max-w-4xl bg-white rounded shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col focus:outline-none"
      >
        {/* Header / Hero with genuine photo */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0 bg-slate-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#243673] via-[#0A1128]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service Title Overlay — white text on the image, protected by the navy scrim */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-3">
              <span className="font-editorial-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FA6000] text-white">
                SERVICE {service.number}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                {service.category} Speciality
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/85 mt-1 max-w-2xl">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Detailed Narrative */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Operational Scope &amp; Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Capabilities Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C2410C]" />
              <span>Core Operational Capabilities</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[#C2410C] font-bold leading-5" aria-hidden="true">·</span>
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Equipment & Cargo Handled Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Equipment */}
            <div className="p-5 rounded bg-slate-50 border border-slate-200 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C2410C]" />                 <span>Specialised Fleet &amp; Equipment</span>
              </h5>
              <ul className="space-y-2 text-xs text-slate-700">
                {service.equipment.map((eq, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span aria-hidden="true">·</span>
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cargo Handled */}
            <div className="p-5 rounded bg-slate-50 border border-slate-200 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#C2410C]" />
                <span>Typical Freight Handled</span>
              </h5>
              <ul className="space-y-2 text-xs text-slate-700">
                {service.cargoHandled.map((cargo, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span aria-hidden="true">·</span>
                    <span>{cargo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compliance & Transit Benefit */}
          <div className="p-4 rounded bg-slate-50 border border-slate-200 text-[#243673] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#C2410C] font-semibold">
                Strategic Transit Advantage
              </span>
              <p className="text-xs text-slate-700 mt-0.5">
                {service.transitAdvantage}
              </p>
            </div>
            {service.complianceNotes && (
              <div className="text-[11px] text-slate-500 border-t sm:border-t-0 sm:border-l border-[#243673]/10 pt-2 sm:pt-0 sm:pl-4 max-w-xs">
                {service.complianceNotes}
              </div>
            )}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            Have questions regarding cargo dimensions or wharf cartage?
            <span className="block font-semibold text-slate-900">
              Corvane Freight operations desk: +61 3 5550 1234
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded border border-slate-200 transition-colors flex-1 sm:flex-initial"
            >
              Back
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(service.title);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FA6000] hover:bg-[#E55400] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex-1 sm:flex-initial"
            >
              <span>Get Quote for {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
