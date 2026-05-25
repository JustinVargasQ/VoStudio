/**
 * VO Studio — Design System v6
 * "Midnight Signal — Cyan/Pink/Coral"
 *
 * All surface/text/border tokens reference CSS variables defined in index.css.
 * Light/dark themes swap by toggling [data-theme="dark"] on <html>.
 * Accent stays defined in JS too because SVG strokes/fills need the raw hex.
 *
 * ─── BRAND PALETTE ────────────────────────────────────────────────────────
 *  Negro Profundo    #040C14
 *  Azul Noche        #061720
 *  Cian Eléctrico    #06B6D4
 *  Cian Vivo         #22D3EE
 *  Cian Profundo     #0891B2
 *  Rosa Fuerte       #FF5C9A
 *  Coral Rosado      #FF6A63
 *  Azul Eléctrico    #6AB7FF
 *
 *  Gradiente principal (145°):
 *  #040C14 → #061720 → #FF6A63 → #FF5C9A → #22D3EE → #06B6D4 → #0891B2
 */

// ─── Surfaces (CSS vars — adapt to light/dark) ──────────────────────────
export const BG_SECTION = 'var(--bg-section)'; // transparent in dark, opaque in light
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
// v5 (neon nebula):  A=#8A46FF  A_D=#5D2BFF  A_L=#E14DFF  A2=#FF5C9A
// v6 (midnight signal): A=#06B6D4  A_D=#0891B2  A_L=#22D3EE  A2=#FF5C9A
export const A        = '#06B6D4';   // cyan-500 — primary accent
export const A_D      = '#0891B2';   // cyan-600 — darker/pressed
export const A_L      = '#22D3EE';   // cyan-400 — hover/highlight
export const A_DIM    = 'rgba(6, 182, 212, 0.08)';
export const A2       = '#FF5C9A';   // strong pink — secondary accent

// Extended palette (for charts, badges, multi-color UIs)
export const C_CYAN        = '#06B6D4';
export const C_CYAN_LIGHT  = '#22D3EE';
export const C_CYAN_DEEP   = '#0891B2';
export const C_PINK        = '#FF5C9A';
export const C_CORAL       = '#FF6A63';
export const C_BLUE_ELECTRIC = '#6AB7FF';
export const C_TEAL        = '#14B8A6';
export const C_SKY         = '#0EA5E9';
export const C_BG_DEEP     = '#040C14';
export const C_BG_NAVY     = '#061720';

// ─── Gradients (signature visuals) ───────────────────────────────────────
export const GRADIENT_MAIN = 'linear-gradient(145deg, #040C14 0%, #061720 14%, #FF6A63 38%, #FF5C9A 52%, #22D3EE 66%, #06B6D4 82%, #0891B2 100%)';
export const GRADIENT_BTN_PRIMARY   = 'linear-gradient(135deg, #FF5C9A 0%, #06B6D4 100%)';
export const GRADIENT_BTN_SECONDARY = 'linear-gradient(135deg, #FF6A63 0%, #0891B2 100%)';
export const GRADIENT_HOVER = 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)';

// ─── Semantic ─────────────────────────────────────────────────────────────
export const SUCCESS  = '#10B981';
export const ERROR    = '#FF6A63'; // coral pink, in palette

// ─── Font stacks ──────────────────────────────────────────────────────────
export const F_DISPLAY   = '"Instrument Serif", "Times New Roman", serif';
export const F_EDITORIAL = '"Bebas Neue", "Arial Black", sans-serif';
export const F_BODY      = '"Inter", system-ui, -apple-system, sans-serif';
export const F_MONO      = '"JetBrains Mono", ui-monospace, monospace';

// ─── Layout ──────────────────────────────────────────────────────────────
export const MAX_W    = 1280;
export const PAD_X    = 'clamp(20px, 5vw, 64px)';
