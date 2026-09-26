import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStatsStrip } from './components/TrustStatsStrip';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TradeLanesSection } from './components/TradeLanesSection';
import { DarkVisualBreak } from './components/DarkVisualBreak';
import { WhyCorvaneSection } from './components/WhyCorvaneSection';
import { QuoteContactSection } from './components/QuoteContactSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { TrackingModal } from './components/TrackingModal';
import { SolutionsModal } from './components/SolutionsModal';
import { Footer } from './components/Footer';
import { NewsletterSection } from './components/NewsletterSection';
import { ServiceItem } from './types';
import { useEffect } from 'react';
import { trackEvent } from './lib/analytics';

// Smooth-scrolls to a section anchor. All navigation targets are on-page sections.
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function App() {
  // Chosen service for the on-page quote form, set when users click a service-specific quote CTA.
  const [quoteInitialService, setQuoteInitialService] = useState('Sea Freight');

  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingInitialQuery, setTrackingInitialQuery] = useState('');

  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceItem | null>(null);

  const [isSolutionsModalOpen, setIsSolutionsModalOpen] = useState(false);

  // Global conversion tracking: phone taps, email clicks, tracking-portal opens.
  // One delegated listener covers every tel:/mailto:/track CTA site-wide.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { number: href.replace('tel:', '') });
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { email: href.replace('mailto:', '').split('?')[0] });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Prefills the on-page quote form's service selection, then scrolls to it.
  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setQuoteInitialService(serviceName);
    }
    scrollToSection('quote');
  };

  const handleOpenContact = () => scrollToSection('contact');

  const handleOpenTracking = (query: string = '') => {
    setTrackingInitialQuery(query);
    setIsTrackingModalOpen(true);
  };

  const handleOpenServices = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    scrollToSection('services');
  };

  const handleOpenAbout = () => scrollToSection('about');

  return (
    <div className="min-h-screen bg-white text-[#484C50] font-sans antialiased selection:bg-[#FA6000] selection:text-white overflow-x-hidden flex flex-col justify-between">
      {/* 1. PREMIUM NAVBAR (Desktop & Mobile Navigation) */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenTracking={() => handleOpenTracking()}
        onOpenServices={(serviceId) => handleOpenServices(serviceId)}
        onOpenAbout={handleOpenAbout}
        onOpenContact={handleOpenContact}
        onOpenSolutions={() => setIsSolutionsModalOpen(true)}
      />

      {/* 2. MAIN WORKFLOW: HERO + TRUST + ABOUT + SERVICES + BREAK + WHY CORVANE + PROCESS + QUOTE/CONTACT */}
      <main className="flex-1 flex flex-col">
        {/* HERO SECTION */}
        <Hero
          onOpenQuote={(servicePrefill) => handleOpenQuote(servicePrefill)}
          onOpenServices={(serviceId) => handleOpenServices(serviceId)}
          onOpenTracking={(query) => handleOpenTracking(query)}
          onOpenContact={handleOpenContact}
        />

        {/* SECTION 1: TRUST / STATS STRIP (Verified Corvane 20+ Years & 3 Continents) */}
        <TrustStatsStrip />

        {/* SECTION 2: ABOUT Corvane (Two-Column Editorial Presentation) */}
        <AboutSection
          onOpenQuote={() => handleOpenQuote()}
          onOpenServices={() => handleOpenServices()}
        />

        {/* SECTION 3: SERVICES SECTION (Editorial Numbered Service System) */}
        <ServicesSection
          selectedServiceId={selectedServiceId}
          onSelectService={(serviceId) => setSelectedServiceId(serviceId)}
          onOpenDetailModal={(service) => setSelectedDetailService(service)}
          onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
        />

        {/* SECTION 3.5: GLOBAL TRADE LANES (Corridors + Transit Windows) */}
        <TradeLanesSection />

        {/* SECTION 4: WHY CORVANE / OPERATIONAL PILLARS */}
        <WhyCorvaneSection onOpenQuote={() => handleOpenQuote()} />

        {/* SECTION 5: FINAL CALL-TO-ACTION BANNER (Compact & Distinct right before Contact) */}
        <DarkVisualBreak onOpenQuote={() => handleOpenQuote()} />

        {/* SECTION 6: QUOTE + CONTACT (Editorial Two-Column Conversion Section) */}
        <QuoteContactSection initialService={quoteInitialService} />

        {/* SECTION 7: NEWSLETTER SIGN-UP */}
        <NewsletterSection />
      </main>

      <Footer
        onOpenTracking={() => handleOpenTracking()}
        onOpenQuote={(service) => handleOpenQuote(service)}
        onSelectService={(serviceId) => {
          setSelectedServiceId(serviceId);
          handleOpenServices(serviceId);
        }}
      />

      {/* OPERATIONAL MODALS */}
      <ServiceDetailModal
        service={selectedDetailService}
        onClose={() => setSelectedDetailService(null)}
        onRequestQuote={(serviceTitle) => {
          setSelectedDetailService(null);
          handleOpenQuote(serviceTitle);
        }}
      />

      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        initialQuery={trackingInitialQuery}
      />

      <SolutionsModal
        isOpen={isSolutionsModalOpen}
        onClose={() => setIsSolutionsModalOpen(false)}
        onOpenQuote={(solution) => {
          setIsSolutionsModalOpen(false);
          handleOpenQuote(solution);
        }}
      />
    </div>
  );
}
