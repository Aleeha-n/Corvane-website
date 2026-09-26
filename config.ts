/**
 * Site-wide configuration.
 *
 * FORMS — activate the Formspree backend:
 *   1. Create a form at https://formspree.io (free tier: 50 submissions/month)
 *   2. Copy your form ID from the endpoint
 *      (e.g. https://formspree.io/f/xyzabcd → "xyzabcd")
 *   3. Paste it below and confirm your email address in the Formspree dashboard
 *
 * While FORMSPREE_FORM_ID is empty, both site forms gracefully fall back to
 * the original mailto: behaviour, so lead capture never breaks.
 */
export const FORMSPREE_FORM_ID = '';

export const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : '';

/** True once a real Formspree endpoint is configured. */
export const FORMS_CONFIGURED = FORMSPREE_ENDPOINT !== '';

/** Where quote enquiries land (used for mailto fallback + UI copy). */
export const SALES_EMAIL = 'aleehanajeeb.work@gmail.com';
