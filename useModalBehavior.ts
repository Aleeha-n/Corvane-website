import { useEffect, useRef } from 'react';

/**
 * Shared modal behavior:
 *  - Closes on Escape (WCAG 2.1.2 — keyboard users could previously not dismiss modals).
 *  - Locks body scroll while open (background used to scroll behind the overlay).
 *  - Moves focus into the dialog on open and restores it to the trigger on close.
 *
 * Attach the returned ref to the dialog panel and give it `tabIndex={-1}`.
 */
export function useModalBehavior(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  // Keep the latest onClose without re-running the open/close effect.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);

    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  return dialogRef;
}
