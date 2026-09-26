import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Search, Phone, ExternalLink, ChevronRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CORVANE_INFO } from '../data/corvaneData';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenTracking: () => void;
  onOpenServices: (serviceId?: string) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenSolutions: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenTracking,
  onOpenServices,
  onOpenAbout,
  onOpenContact,
  onOpenSolutions,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for subtle, non-exaggerated contrast transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Move focus into the drawer on open, restore it to the trigger on close
  // (matches the modal behavior used across the site)
  const previouslyFocused = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (mobileMenuOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      mobileMenuRef.current?.focus();
    } else if (previouslyFocused.current) {
      previouslyFocused.current.focus();
      previouslyFocused.current = null;
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md border-b border-[#243673]/10 py-3.5'
            : 'bg-white border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* LEFT: Corvane Brand Mark */}
          <a
            href="#"
            id="navbar-brand-link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA6000] rounded-lg transition-transform active:scale-[0.98]"
            aria-label="Corvane Freight homepage"
          >
            <BrandLogo variant="dark" />
          </a>

          {/* CENTER: Desktop Navigation (Generous spacing, clean & understated typography) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-slate-700"
          >
            <button
              id="nav-services-btn"
              type="button"
              onClick={() => onOpenServices()}
              className="text-[#484C50] hover:text-[#C2410C] transition-colors cursor-pointer py-1"
            >
              Services
            </button>

            <button
              id="nav-solutions-btn"
              type="button"
              onClick={onOpenSolutions}
              className="text-[#484C50] hover:text-[#C2410C] transition-colors cursor-pointer py-1"
            >
              Solutions / Industries
            </button>

            <button
              id="nav-about-btn"
              type="button"
              onClick={onOpenAbout}
              className="text-[#484C50] hover:text-[#C2410C] transition-colors cursor-pointer py-1"
            >
              About
            </button>

            <button
              id="nav-contact-btn"
              type="button"
              onClick={onOpenContact}
              className="text-[#484C50] hover:text-[#C2410C] transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </nav>

          {/* RIGHT: Actions (Track Shipment & Primary CTA Get a Quote) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Track Shipment — only shown with verified tracking */}
            <button
              id="nav-track-btn"
              type="button"
              onClick={onOpenTracking}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-[#C2410C] hover:bg-[#243673]/5 rounded-lg border border-[#243673]/10 hover:border-[#243673]/20 transition-all cursor-pointer whitespace-nowrap"
              title="Track consignment via WebTracker"
            >
              <Search className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Track Shipment</span>
            </button>

            {/* Get a Quote — Primary CTA */}
            <button
              id="nav-quote-btn"
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FA6000] hover:bg-[#E55400] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE MENU TRIGGER */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-menu-trigger-btn"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-[#C2410C] hover:bg-[#243673]/10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA6000] transition-colors"
              aria-label="Open navigation drawer"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE ACCESSIBLE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#243673]/40 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div
            ref={mobileMenuRef}
            tabIndex={-1}
            className="relative w-full max-w-sm bg-white text-[#243673] h-full shadow-2xl border-l border-[#243673]/10 flex flex-col justify-between p-6 overflow-y-auto focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#243673]/10">
                <BrandLogo variant="light" />
                <button
                  id="mobile-menu-close-btn"
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-[#C2410C] hover:bg-[#243673]/10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA6000] transition-colors"
                  aria-label="Close navigation drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-2" aria-label="Mobile Menu Links">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenServices();
                  }}
                  className="w-full flex items-center justify-between py-3.5 px-3 rounded-lg text-base font-medium text-slate-700 hover:text-[#C2410C] hover:bg-[#243673]/5 transition-colors text-left"
                >
                  <span>Services</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSolutions();
                  }}
                  className="w-full flex items-center justify-between py-3.5 px-3 rounded-lg text-base font-medium text-slate-700 hover:text-[#C2410C] hover:bg-[#243673]/5 transition-colors text-left"
                >
                  <span>Solutions / Industries</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAbout();
                  }}
                  className="w-full flex items-center justify-between py-3.5 px-3 rounded-lg text-base font-medium text-slate-700 hover:text-[#C2410C] hover:bg-[#243673]/5 transition-colors text-left"
                >
                  <span>About</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full flex items-center justify-between py-3.5 px-3 rounded-lg text-base font-medium text-slate-700 hover:text-[#C2410C] hover:bg-[#243673]/5 transition-colors text-left"
                >
                  <span>Contact</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#FA6000] hover:bg-[#E55400] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#243673]/5 text-slate-700 hover:text-[#C2410C] text-xs font-semibold rounded border border-[#243673]/15 transition-colors"
                >
                  <Search className="w-4 h-4 text-[#C2410C]" />
                  <span>Track Shipment</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer: Verified Australian Contact Information */}
            <div className="pt-6 border-t border-[#243673]/10 text-xs text-slate-500 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Melbourne HQ Desk:</span>
                <a
                  href="tel:+61355501234"
                  className="text-[#243673] font-semibold hover:text-[#C2410C] font-mono"
                >
                  +61 3 5550 1234
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Sydney Commercial:</span>
                <a
                  href="tel:+61255500187"
                  className="text-[#243673] font-semibold hover:text-[#C2410C] font-mono"
                >
                  +61 2 5550 0187
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Corporate Email:</span>
                <a
                  href={`mailto:${CORVANE_INFO.generalEmail}`}
                  className="text-[#C2410C] font-semibold hover:underline"
                >
                  {CORVANE_INFO.generalEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
