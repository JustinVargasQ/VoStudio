/**
 * VO Studio — Design System v5
 * "Neon Nebula — Violet/Magenta/Pink"
 *
 * All surface/text/border tokens reference CSS variables defined in index.css.
 * Light/dark themes swap by toggling [data-theme="dark"] on <html>.
 * Accent stays defined in JS too because SVG strokes/fills need the raw hex.
 *
 * ─── BRAND PALETTE ────────────────────────────────────────────────────────
 *  Negro Profundo    #06030D
 *  Morado Oscuro     #1B1030
 *  Púrpura Intenso   #5D2BFF
 *  Violeta Brillante #8A46FF
 *  Magenta Neón      #E14DFF
 *  Rosa Fuerte       #FF5C9A
 *  Coral Rosado      #FF6A63
 *  Azul Eléctrico    #6AB7FF
 *  Azul Violeta      #6A5CFF
 *
 *  Gradiente principal (145°):
 *  #06030D → #2A0F1E → #FF6A63 → #FF5C9A → #C14DFF → #7B4DFF → #5D2BFF
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
// Old (v4 terracotta):  A=#943A1F  A_D=#7A2E15  A_L=#B84B22  A2=#E9E4E0
// New (v5 neon nebula): A=#8A46FF  A_D=#5D2BFF  A_L=#E14DFF  A2=#FF5C9A
export const A        = '#8A46FF';   // bright violet — primary accent
export const A_D      = '#5D2BFF';   // intense purple — darker/pressed
export const A_L      = '#E14DFF';   // neon magenta — hover/highlight
export const A_DIM    = 'rgba(138, 70, 255, 0.08)';
export const A2       = '#FF5C9A';   // strong pink — secondary accent (gradient end)

// Extended palette (for charts, badges, multi-color UIs)
export const C_PURPLE_DEEP   = '#5D2BFF';
export const C_VIOLET        = '#8A46FF';
export const C_MAGENTA       = '#E14DFF';
export const C_PINK          = '#FF5C9A';
export const C_CORAL         = '#FF6A63';
export const C_BLUE_ELECTRIC = '#6AB7FF';
export const C_BLUE_VIOLET   = '#6A5CFF';
export const C_BG_DEEP       = '#06030D';
export const C_BG_PURPLE     = '#1B1030';

// ─── Gradients (signature visuals) ───────────────────────────────────────
export const GRADIENT_MAIN = 'linear-gradient(145deg, #06030D 0%, #2A0F1E 14%, #FF6A63 38%, #FF5C9A 52%, #C14DFF 66%, #7B4DFF 82%, #5D2BFF 100%)';
export const GRADIENT_BTN_PRIMARY   = 'linear-gradient(135deg, #FF5C9A 0%, #8A46FF 100%)';
export const GRADIENT_BTN_SECONDARY = 'linear-gradient(135deg, #FF6A63 0%, #5D2BFF 100%)';
export const GRADIENT_HOVER = 'linear-gradient(135deg, #E14DFF 0%, #5D2BFF 100%)';

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
