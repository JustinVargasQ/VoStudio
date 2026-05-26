/**
 * VO Studio — Design System v7
 * "Pink Lilac Noir"
 *
 * Rosa fuerte como acento principal, lila suave como secundario,
 * coral como pop. Sin violeta neón ni magenta chillón.
 *
 * ─── BRAND PALETTE ────────────────────────────────────────────────────────
 *  Negro Profundo    #06030D
 *  Morado Oscuro     #1B1030  (solo para cards/elevación en dark)
 *  Rosa Fuerte       #FF5C9A  (acento principal)
 *  Rosa Claro        #FF8AB8  (hover)
 *  Rosa Oscuro       #E03877  (pressed)
 *  Lila Suave        #B79CFF  (acento secundario)
 *  Lila Claro        #D4C2FF  (hover/halo)
 *  Lila Oscuro       #9676E6  (pressed)
 *  Coral Rosado      #FF6A63  (pop / errores)
 *
 *  Gradiente principal (145°):
 *  #06030D → #1B1030 → #FF6A63 → #FF5C9A → #B79CFF → #06030D
 */

// ─── Surfaces (CSS vars — adapt to light/dark) ──────────────────────────
export const BG_SECTION = 'var(--bg-section)';
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
// v7 (pink lilac noir): A=#FF5C9A  A_D=#E03877  A_L=#FF8AB8  A2=#B79CFF
export const A        = '#FF5C9A';   // rosa fuerte — primary accent
export const A_D      = '#E03877';   // rosa oscuro — darker/pressed
export const A_L      = '#FF8AB8';   // rosa claro — hover/highlight
export const A_DIM    = 'rgba(255, 92, 154, 0.08)';
export const A2       = '#B79CFF';   // lila suave — secondary accent

// Extended palette (for charts, badges, multi-color UIs)
export const C_PINK        = '#FF5C9A';
export const C_PINK_LIGHT  = '#FF8AB8';
export const C_PINK_DEEP   = '#E03877';
export const C_LILAC       = '#B79CFF';
export const C_LILAC_LIGHT = '#D4C2FF';
export const C_LILAC_DEEP  = '#9676E6';
export const C_CORAL       = '#FF6A63';
export const C_BG_DEEP     = '#06030D';
export const C_BG_DARK     = '#1B1030';

// ─── Gradients (signature visuals) ───────────────────────────────────────
export const GRADIENT_MAIN = 'linear-gradient(145deg, #06030D 0%, #1B1030 14%, #FF6A63 38%, #FF5C9A 52%, #B79CFF 78%, #06030D 100%)';
export const GRADIENT_BTN_PRIMARY   = 'linear-gradient(135deg, #FF5C9A 0%, #B79CFF 100%)';
export const GRADIENT_BTN_SECONDARY = 'linear-gradient(135deg, #FF5C9A 0%, #FF6A63 100%)';
export const GRADIENT_HOVER = 'linear-gradient(135deg, #FF8AB8 0%, #D4C2FF 100%)';

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
