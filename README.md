# Corvane Freight — Marketing Site

React + Vite + Tailwind v4 marketing site for Corvane Freight Group (Australian freight forwarder).

## Stack

- **React 19** + TypeScript
- **Vite 8** dev server / bundler
- **Tailwind CSS v4** (via `@tailwindcss/vite`) with semantic tokens in `src/index.css`
- **motion** (Framer Motion) for entrance animations
- **lucide-react** icons

## Local development

```bash
npm install
npm run dev        # serves on http://localhost:3000
```

Other scripts:

```bash
npm run build      # production bundle → dist/
npm run preview    # preview production build
npm run lint       # tsc --noEmit
```

## Structure

```
src/
  App.tsx                # section composition + modal state
  components/            # 17 rendered components (Hero, Services, Footer, modals…)
  data/corvaneData.ts       # all content (services, offices, metrics, info)
  index.css              # Tailwind entry + semantic tokens + fluid typography
```

## Design tokens

Defined on `:root` in `src/index.css`:

- **Surfaces** — `--surface-base` `#070D1A`, `--surface-well` `#060C1E`, `--surface-panel` `#0A1128`, `--surface-raised` `#0F172A`, `--surface-light` `#F8FAFC`
- **Accent** — `--accent` `#EA580C` (decorative), `--accent-cta` `#C2410C` (buttons, WCAG AA 5.18:1 with white), `--accent-cta-hover` `#A8380E`

## Forms

Both conversion forms (quote + newsletter) are wired for **Formspree**:

1. Create a free form at https://formspree.io (50 submissions/month)
2. Paste your form ID into `FORMSPREE_FORM_ID` in `src/config.ts`
3. Confirm your email in the Formspree dashboard

Until an ID is set, forms transparently fall back to the original `mailto:` hand-off. Includes a bot honeypot on both forms and conversion event tracking (`src/lib/analytics.ts`) — events flow to GTM/dataLayer and Plausible automatically when installed.

Tracking hands off to an external portal: `https://example.com/track`.
