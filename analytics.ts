/**
 * Provider-agnostic conversion tracking.
 *
 * Forwards every event to whichever tracker is present:
 *  - Plausible (window.plausible — script.tagged-events.js is loaded in index.html)
 *  - Google Tag Manager / GA4 (window.dataLayer)
 * Safe no-op in development/local preview when neither is installed.
 */
type ConversionEvent =
  | 'quote_form_submit'
  | 'quote_form_success'
  | 'quote_form_error'
  | 'newsletter_submit'
  | 'newsletter_success'
  | 'newsletter_error'
  | 'phone_click'
  | 'email_click'
  | 'track_click';

declare global {
  interface Window {
    dataLayer?: unknown[];
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

/** Throttle map — Plausible counts unique conversions; avoid double-fires on repeat taps. */
const lastFired = new Map<string, number>();
const THROTTLE_MS = 1000;

export function trackEvent(event: ConversionEvent, props?: Record<string, string | number>) {
  try {
    // Skip identical rapid repeat fires (e.g. double-tap on a phone link).
    const key = event + JSON.stringify(props ?? {});
    const now = Date.now();
    if (lastFired.get(key) && now - (lastFired.get(key) as number) < THROTTLE_MS) {
      return;
    }
    lastFired.set(key, now);

    // Plausible custom events require the exact "Event Name" casing it documents;
    // `window.plausible` only exists once the deferred script has loaded.
    window.plausible?.(event, { props });
    window.dataLayer?.push({ event, ...props });

    if (import.meta.env.DEV) {
      console.info(`[analytics] ${event}`, props ?? '');
    }
  } catch {
    /* analytics must never break the site */
  }
}
