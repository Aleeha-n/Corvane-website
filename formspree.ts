import { FORMSPREE_ENDPOINT } from '../config';

export type SubmitOutcome =
  | { status: 'ok' }
  | { status: 'fallback' }   // Formspree not configured — mailto hand-off used instead
  | { status: 'error'; message: string };

/**
 * POSTs form data to Formspree as JSON.
 * Returns { status: 'ok' } on 200, or { status: 'error' } with a human-readable
 * message for the UI. Callers handle their own mailto fallback when unconfigured.
 */
export async function submitToFormspree(data: Record<string, string>): Promise<SubmitOutcome> {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return { status: 'ok' };
    }

    // Formspree returns useful JSON error bodies (validation, spam, limits)
    let message = `Submission failed (${res.status}).`;
    try {
      const body = await res.json();
      if (body?.errors?.length) {
        message = body.errors.map((e: { message?: string }) => e.message).join(' ');
      }
    } catch {
      /* non-JSON error body — keep default message */
    }
    return { status: 'error', message };
  } catch {
    return {
      status: 'error',
      message: 'Network error — please check your connection and try again.',
    };
  }
}
