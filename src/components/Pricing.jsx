import { motion } from 'framer-motion';
import { BG_ALT, BG_CARD, BG_POPULAR, POPULAR_FG, POPULAR_BORDER, TEXT, TEXT_S, TEXT_D, TEXT_INV, BORDER, A, A_L, A_D, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { RevealStagger, RevealItem } from './Reveal';

const PLAN_VISUALS = [
  { accent: '#0EA5E9', labelKey: 'pricing.label.fast',  icon: (<path d="M13 2L4 14h7v8l9-12h-7V2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />) },
  { accent: '#EA580C', labelKey: 'pricing.popular',     icon: (<g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M12 3L3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></g>) },
  { accent: '#F59E0B', labelKey: 'pricing.label.247',   icon: (<g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M5 8h14l-1.5 12.5a2 2 0 01-2 1.5h-7a2 2 0 01-2-1.5L5 8z"/><path d="M9 8V5a3 3 0 016 0v3"/></g>) },
  { accent: '#A855F7', labelKey: 'pricing.label.custom',icon: (<g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="5" rx="1"/><rect x="13" y="10" width="8" height="11" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/></g>) },
];

const PLAN_LABELS = {
  es: ['Rápido', 'Más elegido', 'Vendé 24/7', 'A medida'],
  en: ['Fast', 'Most chosen', 'Sell 24/7', 'Custom'],
};

function ParsePrice({ raw, isPopular, accent }) {
  const m = raw.match(/^(\D*?)(\d[\d.,kKMm$₡]*.*)$/);
  const prefix = (m && m[1]?.trim()) || '';
  const amount = (m && m[2]?.trim()) || raw;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {prefix && (
        <span style={{
          fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: isPopular ? 'rgba(250,250,250,0.55)' : TEXT_D,
        }}>{prefix}</span>
      )}
      <span style={{
        fontFamily: F_DISPLAY, fontStyle: 'italic',
        fontSize: 'clamp(32px, 3.4vw, 44px)',
        letterSpacing: '-0.02em', lineHeight: 1, color: accent,
      }}>{amount}</span>
    </div>
  );
}

export function Pricing() {
  const { t, locale } = useApp();
  const { PRICING, PRICING_NOTE, GUARANTEES } = getContent(locale);
  const labels = PLAN_LABELS[locale] || PLAN_LABELS.es;

  return (
    <section id="precios" style={{ background: BG_ALT, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}>
      <span className="blob blob-1" style={{ top: '10%', left: '-12%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(234,88,12,0.08), transparent 70%)' }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('pricing.eyebrow')}
          title={<>{t('pricing.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('pricing.title.2')}</span>.</>}
          intro={t('pricing.intro')}
        />

        {/* Neobrutalism rotations per card */}
        <RevealStagger stagger={0.1} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          position: 'relative',
          paddingBottom: 12,
        }}>
          {PRICING.map((p, i) => {
            const isPopular = !!p.popular;
            const v = PLAN_VISUALS[i] || PLAN_VISUALS[0];
            const accent = v.accent;
            const fg = isPopular ? POPULAR_FG : TEXT;
            const fgMute = isPopular ? 'rgba(250,250,250,0.72)' : TEXT_S;
            const fgDim = isPopular ? 'rgba(250,250,250,0.5)' : TEXT_D;
            const borderC = isPopular ? 'rgba(250,250,250,0.15)' : BORDER;
            const rotations = [-0.8, 0.5, -0.5, 0.7];
            const rot = rotations[i] || 0;

            return (
              <RevealItem key={i} y={32}
                style={{
                  position: 'relative',
                  background: isPopular ? BG_POPULAR : BG_CARD,
                  border: `2px solid ${isPopular ? accent : TEXT}`,
                  overflow: 'visible',
                  display: 'flex', flexDirection: 'column',
                  transform: `rotate(${rot}deg)`,
                  zIndex: isPopular ? 2 : 1,
                  boxShadow: isPopular
                    ? `6px 6px 0px 0px ${accent}, 0 0 0 1px ${A}22`
                    : `4px 4px 0px 0px var(--text)`,
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `rotate(${rot}deg) translate(-4px, -4px)`;
                  e.currentTarget.style.boxShadow = isPopular
                    ? `10px 10px 0px 0px ${accent}`
                    : `8px 8px 0px 0px var(--text)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${rot}deg)`;
                  e.currentTarget.style.boxShadow = isPopular
                    ? `6px 6px 0px 0px ${accent}, 0 0 0 1px ${A}22`
                    : `4px 4px 0px 0px var(--text)`;
                }}
              >
                <div style={{ height: 4, background: accent }} />

                {isPopular && (
                  <>
                    <motion.span aria-hidden
                      animate={{ x: [0, 30, -20, 0], y: [0, -20, 20, 0] }}
                      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: '20%', right: '-30%',
                        width: 280, height: 280, borderRadius: '50%',
                        background: `radial-gradient(circle, ${A} 0%, transparent 60%)`,
                        filter: 'blur(40px)', opacity: 0.5, pointerEvents: 'none',
                      }} />
                    <motion.span aria-hidden
                      animate={{ x: [0, -25, 15, 0], y: [0, 15, -10, 0] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', bottom: '10%', left: '-30%',
                        width: 260, height: 260, borderRadius: '50%',
                        background: `radial-gradient(circle, ${A_D} 0%, transparent 65%)`,
                        filter: 'blur(50px)', opacity: 0.6, pointerEvents: 'none',
                      }} />
                  </>
                )}

                {isPopular && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: A, color: '#fff',
                    fontSize: 10, padding: '5px 10px',
                    letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', gap: 6, zIndex: 2,
                  }}>
                    <span style={{ fontSize: 11, lineHeight: 1 }}>★</span> {t('pricing.popular')}
                  </div>
                )}

                <div style={{ padding: 'clamp(24px, 2.4vw, 32px) clamp(24px, 2.4vw, 32px) 0', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <motion.span
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{
                        width: 48, height: 48,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: isPopular ? 'rgba(255,255,255,0.08)' : `${accent}15`,
                        color: isPopular ? '#fff' : accent,
                        border: `1px solid ${isPopular ? 'rgba(255,255,255,0.15)' : `${accent}33`}`,
                      }}>
                      <svg width="22" height="22" viewBox="0 0 24 24">{v.icon}</svg>
                    </motion.span>
                    {!isPopular && (
                      <span style={{
                        fontFamily: F_MONO, fontSize: 10, color: accent, fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        padding: '4px 10px', border: `1px solid ${accent}33`,
                        background: `${accent}10`,
                      }}>{labels[i]}</span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: F_DISPLAY, fontWeight: 400,
                    fontSize: 'clamp(28px, 2.6vw, 34px)', lineHeight: 1.05,
                    letterSpacing: '-0.02em', color: fg, marginBottom: 20,
                  }}>{p.name}</h3>

                  <ParsePrice raw={p.price} isPopular={isPopular} accent={isPopular ? '#fff' : accent} />

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    marginTop: 10, fontSize: 12, color: fgDim, fontFamily: F_MONO,
                  }}>
                    <span>{p.priceUSD}</span>
                    <span style={{ width: 3, height: 3, background: fgDim, borderRadius: '50%' }} />
                    <span>{p.timeline}</span>
                  </div>
                </div>

                <div style={{
                  padding: 'clamp(20px, 2.2vw, 28px) clamp(24px, 2.4vw, 32px)',
                  margin: '24px 0 0',
                  borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}`,
                  background: isPopular ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{
                    fontFamily: F_MONO, fontSize: 10, color: fgDim, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600,
                  }}>{t('pricing.idealFor')}</div>
                  <p style={{ fontSize: 13, color: fgMute, lineHeight: 1.5 }}>{p.bestFor}</p>
                </div>

                <div style={{ padding: 'clamp(24px, 2.4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 18, flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: F_MONO, fontSize: 10, color: fgDim, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
                  }}>{t('pricing.includes')}</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    {p.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: fg, lineHeight: 1.5 }}>
                        <span style={{
                          width: 18, height: 18, flexShrink: 0, marginTop: 1,
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          background: isPopular ? `${A_L}30` : `${accent}15`,
                          color: isPopular ? '#fff' : accent,
                          borderRadius: 999,
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {p.notIncluded && (
                    <p style={{
                      paddingTop: 16, borderTop: `1px dashed ${borderC}`,
                      fontSize: 11, color: fgDim, lineHeight: 1.5, fontStyle: 'italic',
                    }}>
                      <span style={{ fontFamily: F_MONO, fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.06em', marginRight: 6 }}>{t('pricing.notIncluded')}</span>
                      {p.notIncluded}
                    </p>
                  )}
                </div>

                <div style={{ padding: '0 clamp(24px, 2.4vw, 32px) clamp(24px, 2.4vw, 32px)', position: 'relative', zIndex: 1 }}>
                  <motion.a href="#contacto"
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                    className="arrow-slide-parent"
                    style={{
                      width: '100%',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      padding: '15px 20px', fontSize: 13, fontWeight: 700,
                      background: isPopular ? '#fff' : accent,
                      color: isPopular ? A : '#fff',
                      border: `1px solid ${isPopular ? '#fff' : accent}`,
                      boxShadow: isPopular ? '0 14px 36px rgba(0,0,0,0.35)' : `0 8px 24px ${accent}40`,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    {p.cta} <span className="arrow-slide">→</span>
                  </motion.a>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{
            marginTop: 'clamp(40px, 5vw, 64px)',
            padding: 'clamp(24px, 3vw, 36px)',
            background: BG_CARD,
            border: `1px solid ${BORDER}`,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {GUARANTEES.map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{
                width: 32, height: 32, flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: `${A}12`, border: `1px solid ${A}33`, color: A,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span style={{ fontSize: 13, color: TEXT, lineHeight: 1.4 }}>{g.text}</span>
            </div>
          ))}
        </motion.div>

        <p style={{ fontSize: 13, color: TEXT_D, marginTop: 24, maxWidth: '60ch', lineHeight: 1.6, fontStyle: 'italic' }}>
          {PRICING_NOTE}
        </p>
      </div>
    </section>
  );
}
