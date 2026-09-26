import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ArrowRight, AlertCircle, CheckCircle2, RotateCcw, Loader2, Send } from 'lucide-react';
import { FORMS_CONFIGURED, SALES_EMAIL } from '../config';
import { submitToFormspree } from '../lib/formspree';
import { trackEvent } from '../lib/analytics';

interface QuoteContactSectionProps {
  initialService?: string;
  className?: string;
}

export const QuoteContactSection: React.FC<QuoteContactSectionProps> = ({
  initialService = '',
  className = '',
}) => {
  const verifiedServices = [
    'Air Freight',
    'Sea Freight',
    'Project Cargo',
    'Break Bulk',
    'Transport',
    'Export',
    'Customs Clearance',
    '3PL',
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceType: initialService || 'Sea Freight',
    freightRequirement: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionState, setSubmissionState] = useState<
    'idle' | 'submitting' | 'prepared' | 'error'
  >('idle');
  const [serverError, setServerError] = useState('');
  // Honeypot: invisible to humans; bots that fill it get silently dropped.
  const [honeypot, setHoneypot] = useState('');

  // Keep service type in sync if initialService changes via external clicks
  useEffect(() => {
    if (initialService) {
      // Check if matches or partially matches a verified service
      const matched = verifiedServices.find(
        (s) => s.toLowerCase() === initialService.toLowerCase() || initialService.toLowerCase().includes(s.toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        serviceType: matched || initialService,
      }));
    }
  }, [initialService]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your business / company name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number';
    }
    if (!formData.freightRequirement.trim()) {
      newErrors.freightRequirement = 'Please specify your freight or consignment requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMailto = () => {
    const subject = encodeURIComponent(
      `Freight Quote Request: ${formData.serviceType} - ${formData.company}`
    );
    const body = encodeURIComponent(
      `Full Name: ${formData.fullName}\n` +
      `Business / Company: ${formData.company}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Service Type: ${formData.serviceType}\n` +
      `Freight Requirement: ${formData.freightRequirement}\n` +
      `Message: ${formData.message || 'N/A'}\n`
    );
    return `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Honeypot filled → almost certainly a bot. Pretend success, send nothing.
    if (honeypot) {
      setSubmissionState('prepared');
      return;
    }

    trackEvent('quote_form_submit', { service: formData.serviceType });

    // Backend not activated yet → original mailto hand-off (visible fallback).
    if (!FORMS_CONFIGURED) {
      window.location.href = buildMailto();
      setSubmissionState('prepared');
      return;
    }

    setSubmissionState('submitting');
    setServerError('');

    const outcome = await submitToFormspree({
      _subject: `Freight Quote Request: ${formData.serviceType} — ${formData.company}`,
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      freightRequirement: formData.freightRequirement,
      message: formData.message || 'N/A',
      _replyto: formData.email,
    });

    if (outcome.status === 'ok') {
      trackEvent('quote_form_success', { service: formData.serviceType });
      setSubmissionState('prepared');
    } else {
      trackEvent('quote_form_error', { service: formData.serviceType });
      setServerError(outcome.status === 'error' ? outcome.message : 'Something went wrong.');
      setSubmissionState('error');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      serviceType: 'Sea Freight',
      freightRequirement: '',
      message: '',
    });
    setErrors({});
    setServerError('');
    setSubmissionState('idle');
  };

  return (
    <section
      id="quote"
      className={`relative bg-white text-[#243673] py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-[#243673]/10 ${className}`}
      aria-label="Quote and Contact Information"
    >
      {/* Anchor for contact link navigation */}
      <div id="contact" className="absolute -top-24 left-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* ==================================================== */}
          {/* LEFT SIDE: Editorial Info, Heading & Verified Contact */}
          {/* ==================================================== */}
          <div
            className="lg:col-span-5 space-y-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C2410C]">
              Get in Touch
            </p>

            {/* Large Heading */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#243673] tracking-tight leading-[1.12]">
              Let&apos;s move your freight.
            </h2>

            {/* Short Supporting Copy (1-2 lines, grounded in real positioning) */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Call us or send your cargo details and you&apos;ll have a clear rate within a business day.
            </p>

            {/* Verified Corvane Contact Details (No cards, pure editorial layout) */}
            <div className="pt-4 border-t border-[#243673]/10 space-y-6">
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#243673]/5 border border-[#243673]/10 flex items-center justify-center text-[#C2410C] flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Call
                  </span>
                  <a
                    href="tel:+61355501234"
                    className="font-display text-lg sm:text-xl font-bold text-[#243673] hover:text-[#C2410C] transition-colors focus:outline-none focus-visible:underline inline-block mt-0.5 font-mono"
                  >
                    +61 3 5550 1234
                  </a>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    Operations &middot; Mon&ndash;Fri 08:30&ndash;17:30 AEST
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#243673]/5 border border-[#243673]/10 flex items-center justify-center text-[#C2410C] flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </span>
                  <a
                    href="mailto:aleehanajeeb.work@gmail.com"
                    className="font-display text-base sm:text-lg font-bold text-[#243673] hover:text-[#C2410C] transition-colors focus:outline-none focus-visible:underline inline-block mt-0.5"
                  >
                    aleehanajeeb.work@gmail.com
                  </a>

                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#243673]/5 border border-[#243673]/10 flex items-center justify-center text-[#C2410C] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Visit
                  </span>
                  <address className="not-italic text-sm text-slate-700 leading-relaxed mt-0.5">
                    Unit 4, 18 Freight Way,<br />
                    Port Melbourne VIC 3207, Australia
                  </address>

                </div>
              </div>

            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT SIDE: Clean Quote Form                         */}
          {/* ==================================================== */}
          <div
            className="lg:col-span-7"
          >
            {submissionState === 'prepared' ? (
              /* Success state — wording differs between backend and mailto modes */
              <div className="p-8 sm:p-10 rounded bg-[#F4F6FA] border border-[#243673]/15 space-y-6">
                <div className="w-12 h-12 rounded-full bg-white border border-[#243673]/15 flex items-center justify-center text-[#C2410C]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-[#243673] tracking-tight">
                    {FORMS_CONFIGURED ? 'Inquiry received.' : 'Inquiry Prepared for Dispatch'}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {FORMS_CONFIGURED ? (
                      <>
                        Thank you. Your inquiry is with our Melbourne operations desk and we will reply to <strong className="text-[#243673]">{formData.email}</strong> within one business day.
                      </>
                    ) : (
                      <>
                        Your inquiry is ready in your email client, addressed to <strong className="text-[#243673]">{SALES_EMAIL}</strong>. Hit send and it comes straight to us.
                      </>
                    )}
                  </p>
                </div>

                {!FORMS_CONFIGURED && (
                  <div className="p-4 rounded bg-white border border-[#243673]/15 text-xs text-slate-600 space-y-2">
                    <div className="font-mono text-[#C2410C] uppercase font-bold tracking-wider">
                      Next Step
                    </div>
                    <p>
                      Please review and click <strong>Send</strong> in your mail application to transmit your consignment details directly to our Melbourne operations desk.
                    </p>
                    <p className="text-slate-500">
                      If your email client did not automatically launch, contact us directly via telephone at <a href="tel:+61355501234" className="text-[#243673] underline hover:text-[#C2410C] font-mono">+61 3 5550 1234</a> or email <a href={`mailto:${SALES_EMAIL}`} className="text-[#243673] underline hover:text-[#C2410C]">{SALES_EMAIL}</a>.
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#243673]/10 hover:bg-[#243673]/15 text-[#243673] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Clean Quote Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-6 sm:p-10 rounded bg-[#F4F6FA] border border-[#243673]/15 space-y-6"
              >
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#243673] tracking-tight">
                    Request a Freight Quotation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Tell us what you&apos;re shipping and we&apos;ll reply with a clear, all-in rate.
                  </p>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-fullName"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600"
                    >
                      Full Name <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      id="quote-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                        if (errors.fullName) {
                          setErrors((prev) => ({ ...prev, fullName: '' }));
                        }
                      }}
                      placeholder="e.g. David Mitchell"
                      className={`w-full px-4 py-3 rounded bg-white border text-[#243673] text-sm placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-1 ${
                        errors.fullName
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#243673]/15 focus:border-[#FF6309] focus:ring-[#FA6000]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Business / Company */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-company"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600"
                    >
                      Business / Company <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      id="quote-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, company: e.target.value }));
                        if (errors.company) {
                          setErrors((prev) => ({ ...prev, company: '' }));
                        }
                      }}
                      placeholder="e.g. Apex Industrial Supplies Pty Ltd"
                      className={`w-full px-4 py-3 rounded bg-white border text-[#243673] text-sm placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-1 ${
                        errors.company
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#243673]/15 focus:border-[#FF6309] focus:ring-[#FA6000]'
                      }`}
                    />
                    {errors.company && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600"
                    >
                      Email Address <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: '' }));
                        }
                      }}
                      placeholder="d.mitchell@company.com.au"
                      className={`w-full px-4 py-3 rounded bg-white border text-[#243673] text-sm placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-1 ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#243673]/15 focus:border-[#FF6309] focus:ring-[#FA6000]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600"
                    >
                      Phone Number <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: '' }));
                        }
                      }}
                      placeholder="e.g. 0400 000 000"
                      className={`w-full px-4 py-3 rounded bg-white border text-[#243673] text-sm placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-1 ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#243673]/15 focus:border-[#FF6309] focus:ring-[#FA6000]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                </div>

                {/* Service Type Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="quote-serviceType"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600"
                  >
                    Service Type
                  </label>
                  <select
                    id="quote-serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, serviceType: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded bg-white border border-[#243673]/15 text-[#243673] text-sm transition-colors focus:outline-none focus:border-[#FF6309] focus:ring-1 focus:ring-[#FA6000] cursor-pointer"
                  >
                    {verifiedServices.map((srv) => (
                      <option key={srv} value={srv} className="bg-white text-[#243673]">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Freight Requirement */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="quote-requirement"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600"
                  >
                    Freight Requirement <span className="text-[#C2410C]">*</span>
                  </label>
                  <input
                    id="quote-requirement"
                    name="freightRequirement"
                    type="text"
                    value={formData.freightRequirement}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, freightRequirement: e.target.value }));
                      if (errors.freightRequirement) {
                        setErrors((prev) => ({ ...prev, freightRequirement: '' }));
                      }
                    }}
                    placeholder="e.g. 1x 40ft High Cube container from Ningbo to Melbourne"
                    className={`w-full px-4 py-3 rounded bg-white border text-[#243673] text-sm placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-1 ${
                      errors.freightRequirement
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-[#243673]/15 focus:border-[#FF6309] focus:ring-[#FA6000]'
                    }`}
                  />
                  {errors.freightRequirement && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.freightRequirement}</span>
                    </p>
                  )}
                </div>

                {/* Honeypot — visually hidden from humans, irresistible to bots */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
                  <label htmlFor="quote-company-website">Website</label>
                  <input
                    id="quote-company-website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Message — optional extra details */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="quote-message"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600"
                  >
                    Anything else? <span className="text-slate-600 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="quote-message"
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Dimensions, weight, target date..."
                    className="w-full px-4 py-3 rounded bg-white border border-[#243673]/15 text-[#243673] text-sm placeholder:text-slate-500 transition-colors focus:outline-none focus:border-[#FF6309] focus:ring-1 focus:ring-[#FA6000] resize-none"
                  />
                </div>

                {/* Server-side / network error banner */}
                {submissionState === 'error' && (
                  <div
                    role="alert"
                    className="p-4 rounded bg-red-50 border border-red-200 flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-700 space-y-1">
                      <p className="font-semibold text-red-700">Your inquiry could not be sent.</p>
                      <p className="text-xs">{serverError}</p>
                      <p className="text-xs text-slate-500">
                        You can also reach us directly at{' '}
                        <a href={`tel:+61355501234`} className="text-[#243673] underline hover:text-[#C2410C] font-mono">+61 3 5550 1234</a>{' '}or{' '}
                        <a href={`mailto:${SALES_EMAIL}`} className="text-[#243673] underline hover:text-[#C2410C]">{SALES_EMAIL}</a>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submissionState === 'submitting'}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FA6000] hover:bg-[#E55400] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60 disabled:cursor-wait"
                  >
                    {submissionState === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Request a Quote</span>
                        <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Direct contact note — one short line */}
                <p className="text-[11px] text-slate-500 pt-1">
                  Prefer email? <a
                    href="mailto:aleehanajeeb.work@gmail.com"
                    className="text-[#243673] hover:text-[#C2410C] underline"
                  >
                    aleehanajeeb.work@gmail.com
                  </a>
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
