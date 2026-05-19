/**
 * VO Studio — Design System v4
 * "Editorial Minimal · Adaptive"
 *
 * All surface/text/border tokens reference CSS variables defined in index.css.
 * Light/dark themes swap by toggling [data-theme="dark"] on <html>.
 * Accent stays defined in JS too because SVG strokes/fills need the raw hex.
 */

// ─── Surfaces (CSS vars — adapt to light/dark) ──────────────────────────
export const BG       = 'var(--bg)';
export const BG_ALT   = 'var(--bg-alt)';
export const BG_SOFT  = 'var(--bg-soft)';
export const BG_TINT  = 'var(--bg-tint)';
export const BG_CARD  = 'var(--bg-card)';
export const BG_CARD_ALT = 'var(--bg-card-alt)';
export const BG_DARK  = 'var(--bg-dark)';
export const BG_POPULAR = 'var(--bg-popular)';
export const POPULAR_FG = 'var(--popular-fg)';
export const POPULAR_BORDER = 'var(--popular-border)';

// ─── Text ────────────────────────────────────────────────────────────────
export const TEXT     = 'var(--text)';
export const TEXT_S   = 'var(--text-s)';
export const TEXT_D   = 'var(--text-d)';
export const TEXT_INV = 'var(--text-inv)';

// ─── Borders ─────────────────────────────────────────────────────────────
export const BORDER   = 'var(--border)';
export const BORDER_S = 'var(--border-s)';

// ─── Accent (hex — needed by SVGs that can't use CSS vars) ──────────────
export const A        = '#EA580C';   // orange-600
export const A_D      = '#C2410C';   // orange-700
export const A_L      = '#F97316';   // orange-500
export const A_DIM    = 'rgba(234,88,12,0.08)';
export const A2       = '#0EA5E9';   // sky — secondary touches

// ─── Semantic ─────────────────────────────────────────────────────────────
export const SUCCESS  = '#15803D';
export const ERROR    = '#B91C1C';

// ─── Font stacks ──────────────────────────────────────────────────────────
export const F_DISPLAY = '"Instrument Serif", "Times New Roman", serif';
export const F_BODY    = '"Inter", system-ui, -apple-system, sans-serif';
export const F_MONO    = '"JetBrains Mono", ui-monospace, monospace';

// ─── Layout ──────────────────────────────────────────────────────────────
export const MAX_W    = 1280;
export const PAD_X    = 'clamp(20px, 5vw, 64px)';
