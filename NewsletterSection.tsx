import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Loader2, AlertCircle } from 'lucide-react';
import { FORMS_CONFIGURED, SALES_EMAIL } from '../config';
import { submitToFormspree } from '../lib/formspree';
import { trackEvent } from '../lib/analytics';

export const NewsletterSection: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'done' | 'error'>(
    'idle'
  );
  const [serverError, setServerError] = useState('');
  // Honeypot: invisible to humans; bots that fill it get silently dropped.
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot filled → almost certainly a bot. Pretend success, send nothing.
    if (honeypot) {
      setSubmitState('done');
      return;
    }

    trackEvent('newsletter_submit');

    // Backend not activated yet → original mailto hand-off (visible fallback).
    if (!FORMS_CONFIGURED) {
      const subject = encodeURIComponent(`Newsletter Subscription: ${firstName} ${lastName} (${company})`);
      const body = encodeURIComponent(
        [
          `Please add me to the Corvane Freight newsletter.`,
          ``,
          `First Name: ${firstName}`,
          `Last Name: ${lastName}`,
          `Company: ${company}`,
          `Email: ${email}`,
        ].join('\n')
      );
      window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitState('done');
      return;
    }

    setSubmitState('submitting');
    setServerError('');

    const outcome = await submitToFormspree({
      _subject: `Newsletter Subscription: ${firstName} ${lastName}`,
      firstName,
      lastName,
      company,
      email,
      _replyto: email,
    });

    if (outcome.status === 'ok') {
      trackEvent('newsletter_success');
      setSubmitState('done');
    } else {
      trackEvent('newsletter_error');
      setServerError(outcome.status === 'error' ? outcome.message : 'Something went wrong.');
      setSubmitState('error');
    }
  };

  return (
    <section
      id="newsletter"
      className="relative bg-[#F4F6FA] text-[#243673] py-16 sm:py-20 overflow-hidden border-t border-b border-[#243673]/10"
      aria-label="Sign up for Corvane Freight newsletter"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* LEFT: Copy */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#243673] tracking-tight leading-[1.15]">
              Freight rates, once a month.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
              One email a month. No spam, unsubscribe anytime.
            </p>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-7 lg:pl-8">
            {submitState === 'done' ? (
              <div className="p-6 rounded bg-[#F4F6FA] border border-[#243673]/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-[#243673]">
                    {FORMS_CONFIGURED ? 'You are on the list.' : 'Subscription prepared for dispatch.'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {FORMS_CONFIGURED
                      ? `Thanks ${firstName}, we'll send the next freight bulletin to ${email}.`
                      : "Your email client should now be open with a pre-filled request. Send it and we'll add you to the next bulletin."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label htmlFor="nl-first" className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      First name <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      id="nl-first"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete="given-name"
                      className="w-full bg-white border border-[#243673]/15 hover:border-[#243673]/25 focus:border-[#FF6309] rounded-lg px-4 py-3 text-sm text-[#243673] placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#FA6000]/40 transition-colors"
                    />
                  </div>

                  <div>
                  <label htmlFor="nl-email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email <span className="text-[#C2410C]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
                    <input
                      id="nl-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full bg-white border border-[#243673]/15 hover:border-[#243673]/25 focus:border-[#FF6309] rounded-lg pl-11 pr-4 py-3 text-sm text-[#243673] placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#FA6000]/40 transition-colors"
                    />
                  </div>
                </div>
                </div>

                {/* Honeypot — visually hidden from humans, irresistible to bots */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
                  <label htmlFor="nl-website">Website</label>
                  <input
                    id="nl-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Server-side / network error banner */}
                {submitState === 'error' && (
                  <div
                    role="alert"
                    className="p-4 rounded bg-red-50 border border-red-200 flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-700 space-y-1">
                      <p className="font-semibold text-red-700">Subscription could not be sent.</p>
                      <p className="text-xs">{serverError}</p>
                    </div>
                  </div>
                )}

                <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] bg-[#FA6000] hover:bg-[#E55400] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60 disabled:cursor-wait"
                  >
                    {submitState === 'submitting' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Subscribing…</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
