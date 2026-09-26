import React, { useEffect, useState } from 'react';
import { X, Search, ExternalLink, Ship, Plane, Truck, ShieldCheck, PhoneCall, AlertCircle } from 'lucide-react';
import { CORVANE_INFO } from '../data/corvaneData';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { trackEvent } from '../lib/analytics';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [trackingType, setTrackingType] = useState<'container' | 'ocean_bol' | 'air_mawb' | 'booking'>('container');
  const [hasSearched, setHasSearched] = useState(false);

  const dialogRef = useModalBehavior(isOpen, onClose);

  // Re-sync on open: the modal stays mounted while hidden, so without this a
  // pre-filled tracking number (e.g. from the hero quick-track box) would only
  // apply the very first time the modal is opened.
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setHasSearched(false);
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  const handleLaunchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    trackEvent('track_click', { hasQuery: query.trim().length > 0 ? 'yes' : 'no' });
    // Open the authentic official tracking portal in new tab
    window.open(CORVANE_INFO.officialTrackingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#243673]/40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Track and trace consignment"
        className="relative w-full max-w-2xl bg-white rounded shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 focus:outline-none"
      >
        {/* Header */}
        <div className="bg-white text-[#243673] p-6 sm:p-7 relative border-b border-[#243673]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-slate-600 font-medium">
                Corvane WebTracker
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-[#C2410C] p-1 rounded-lg transition-colors"
              aria-label="Close tracking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="font-display text-2xl font-bold text-[#243673] mt-2">
            Track &amp; Trace Consignment
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Access real-time vessel berthing, air cargo arrival, and customs release statuses via Corvane’s official EDI tracking system.
          </p>

          {/* Mode Selector */}
          <div className="grid grid-cols-4 gap-2 mt-5">
            {[
              { id: 'container', label: 'Container #', icon: Ship },
              { id: 'ocean_bol', label: 'Ocean B/L', icon: Ship },
              { id: 'air_mawb', label: 'Air AWB', icon: Plane },
              { id: 'booking', label: 'Corvane Job #', icon: Truck },
            ].map((item) => {
              const Icon = item.icon;
              const active = trackingType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTrackingType(item.id as any)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#FA6000] text-[#243673] shadow-sm'
                      : 'bg-[#243673]/5 text-slate-600 hover:bg-[#243673]/10'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleLaunchTracking} className="space-y-4">
            <div>
              <label htmlFor="tracking-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Enter Consignment Identifier
              </label>
              <div className="relative">
                <input
                  id="tracking-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    trackingType === 'container'
                      ? 'e.g. MSKU9832104 or CMAU1234567'
                      : trackingType === 'air_mawb'
                      ? 'e.g. 081-12345678 (3-digit airline prefix + 8-digits)'
                      : trackingType === 'ocean_bol'
                      ? 'e.g. MEDU12345678 or ONEY1234567'
                      : 'e.g. CAS-2026-XXXX'
                  }
                  className="w-full px-4 py-3.5 pl-11 bg-white border border-slate-300 rounded text-slate-900 font-mono text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FA6000] transition-colors uppercase"
                  autoFocus
                />
                <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Direct live synchronization with carrier manifests and Australian Border Force ICS.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FA6000] hover:bg-[#E55400] text-white font-semibold rounded transition-colors text-sm"
              >
                <span>Launch Tracking Portal</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded transition-colors text-sm"
              >
                Dismiss
              </button>
            </div>
          </form>

          {/* Genuine Protocol Notice */}
          <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-start gap-2 text-slate-800 font-semibold">
              <AlertCircle className="w-4 h-4 text-[#C2410C] flex-shrink-0 mt-0.5" />
              <span>Direct Link to Corvane WebTracker System</span>
            </div>
            <p>
              Corvane Freight utilizes the industry-standard <strong>WebTracker portal</strong> (<span className="font-mono text-slate-700">{CORVANE_INFO.officialTrackingUrl}</span>). All client accounts have 24/7 visibility over container departures, customs milestones, and wharf release approvals.
            </p>
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-slate-600">
              <span>Need immediate verbal clearance?</span>
              <a
                href="tel:+61355501234"
                className="inline-flex items-center gap-1 font-semibold text-[#243673] hover:text-[#C2410C] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Call Melbourne HQ: +61 3 5550 1234</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
