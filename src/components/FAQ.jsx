import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BG, BG_CARD, BG_ALT, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';

// v5 — Category hues mapped to the Neon Nebula palette.
// (Old v4 used rainbow with #943A1F #0EA5E9 #A855F7 #10B981 #F59E0B
//  #EC4899 #14B8A6 #6366F1 #84CC16). Icons render in sidebar pill + question row.
const CATEGORY_DEFS = [
  { id: 'precio',    color: '#5D2BFF', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6' },           // wallet/$
  { id: 'hosting',   color: '#6AB7FF', icon: 'M2 12h20M2 12a10 10 0 0 1 20 0M2 12a10 10 0 0 0 20 0M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20' }, // globe
  { id: 'contenido', color: '#E14DFF', icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z' },               // pencil
  { id: 'pago',      color: '#FF5C9A', icon: 'M2 7h20v12H2zM2 11h20M6 15h4' },                                          // card
  { id: 'plazos',    color: '#FF6A63', icon: 'M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },                  // clock
  { id: 'soporte',   color: '#6A5CFF', icon: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM7 11l3 3 7-7' },                    // shield/check
  { id: 'remoto',    color: '#8A46FF', icon: 'M2 3h20v14H2zM8 21h8M12 17v4' },                                          // monitor
  { id: 'industria', color: '#C14DFF', icon: 'M3 21h18M5 21V8l7-5 7 5v13M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2' }, // building (interpolated stop)
  { id: 'propiedad', color: '#6AB7FF', icon: 'M21 12V7H5a2 2 0 1 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M18 12a2 2 0 0 0 0 4h4v-4z' }, // wallet
];

const CATEGORY_LABELS = {
  es: { precio:'Precio', hosting:'Hosting', contenido:'Contenido', pago:'Pagos', plazos:'Plazos', soporte:'Soporte', remoto:'Remoto', industria:'Industria', propiedad:'Propiedad' },
  en: { precio:'Pricing', hosting:'Hosting', contenido:'Content', pago:'Payments', plazos:'Timing', soporte:'Support', remoto:'Remote', industria:'Industry', propiedad:'Ownership' },
};

const FAQ_CAT_IDS = ['precio', 'hosting', 'contenido', 'pago', 'plazos', 'soporte', 'remoto', 'industria', 'propiedad'];

export function FAQ() {
  const { t, locale } = useApp();
  const { FAQ: FAQ_DATA } = getContent(locale);
  const labels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.es;

  const [open, setOpen] = useState(0);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const CATEGORIES = useMemo(() => [
    { id: 'all', label: t('faq.allCat'), color: TEXT, icon: 'M4 6h16M4 12h16M4 18h16' },
    ...CATEGORY_DEFS.map(c => ({ ...c, label: labels[c.id] })),
  ], [t, labels]);

  const catFor = (idx) => {
    const id = FAQ_CAT_IDS[idx];
    return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
  };

  const items = useMemo(() => {
    return FAQ_DATA
      .map((f, i) => ({ ...f, idx: i, cat: catFor(i) }))
      .filter(f => filter === 'all' || f.cat.id === filter)
      .filter(f => !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));
  }, [filter, query, locale]);

  const counts = useMemo(() => {
    const c = { all: FAQ_DATA.length };
    FAQ_DATA.forEach((_, i) => {
      const id = FAQ_CAT_IDS[i];
      c[id] = (c[id] || 0) + 1;
    });
    return c;
  }, [locale]);

  return (
    <section id="faq" style={{ background: BG, padding: `clamp(32px, 5vh, 56px) 0`, position: 'relative', overflow: 'hidden' }}>
      <span className="blob blob-2" style={{ top: '5%', left: '-10%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)' }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('faq.eyebrow')}
          title={<>{t('faq.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('faq.title.2')}</span>.</>}
          intro={t('faq.intro')}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ position: 'relative', maxWidth: 560, marginBottom: 32 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT_S} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search" value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('faq.searchPlaceholder')}
            style={{
              width: '100%', padding: '12px 12px 12px 40px',
              fontSize: 14, color: TEXT, fontFamily: 'inherit',
              background: BG_CARD, border: `1px solid ${BORDER}`,
              outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = A; e.target.style.boxShadow = `0 0 0 3px ${A}15`; }}
            onBlur={(e) => { e.target.style.borderColor = BORDER; e.target.style.boxShadow = 'none'; }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              padding: 6, color: TEXT_S,
            }} aria-label="Clear">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 2.2fr)',
          gap: 'clamp(32px, 5vw, 72px)',
        }} className="vo-faq-grid">

          <aside style={{ position: 'sticky', top: 100, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <div style={{
                fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 600, marginBottom: 16,
              }}>{t('faq.categories')}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {CATEGORIES.map(c => {
                  const active = filter === c.id;
                  const count = counts[c.id] || 0;
                  if (c.id !== 'all' && count === 0) return null;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setFilter(c.id)}
                        style={{
                          width: '100%', padding: '10px 14px',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                          fontSize: 13, fontWeight: active ? 700 : 500,
                          color: active ? '#fff' : TEXT,
                          background: active ? c.color : 'transparent',
                          border: `1px solid ${active ? c.color : 'transparent'}`,
                          borderLeft: !active ? `3px solid ${c.color}55` : `1px solid ${c.color}`,
                          transition: 'all 0.2s', textAlign: 'left',
                          boxShadow: active ? `0 8px 24px ${c.color}40` : 'none',
                        }}
                        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = `${c.color}10`; e.currentTarget.style.borderLeftColor = c.color; }}}
                        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderLeftColor = `${c.color}55`; }}}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                          <span style={{
                            width: 24, height: 24, flexShrink: 0,
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: active ? 'rgba(255,255,255,0.18)' : `${c.color}14`,
                            border: `1px solid ${active ? 'rgba(255,255,255,0.3)' : `${c.color}30`}`,
                            borderRadius: 6,
                            color: active ? '#fff' : c.color,
                          }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d={c.icon} />
                            </svg>
                          </span>
                          {c.label}
                        </span>
                        <span style={{ fontFamily: F_MONO, fontSize: 11, fontWeight: 600, color: active ? 'rgba(255,255,255,0.85)' : c.color !== TEXT ? `${c.color}` : TEXT_D, opacity: active ? 1 : 0.7 }}>
                          {String(count).padStart(2, '0')}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ padding: 24, background: BG_ALT, border: `1px solid ${BORDER}` }}>
              <div style={{ fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>
                {t('faq.askCta.t')}
              </div>
              <p style={{ fontSize: 14, color: TEXT_S, lineHeight: 1.55, marginBottom: 16 }}>
                {t('faq.askCta.s')}
              </p>
              <a href="#contacto" className="arrow-slide-parent" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: BG,
                background: TEXT, padding: '11px 18px',
                transition: 'opacity 0.15s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('common.cta.askQuestion')}
                <span className="arrow-slide">→</span>
              </a>
            </div>
          </aside>

          <div>
            {items.length === 0 ? (
              <div style={{ padding: 48, border: `1px dashed ${BORDER}`, textAlign: 'center' }}>
                <p style={{ fontSize: 15, color: TEXT_S }}>{t('faq.noResults')}</p>
                <button onClick={() => { setQuery(''); setFilter('all'); }}
                  style={{ marginTop: 12, fontSize: 13, color: A, fontWeight: 600, borderBottom: `1px solid ${A}` }}>
                  {t('faq.clearFilters')}
                </button>
              </div>
            ) : (
              <div>
                {items.map((f) => {
                  const isOpen = open === f.idx;
                  return (
                    <div key={f.idx}
                      style={{
                        borderBottom: `1px solid ${BORDER}`,
                        background: isOpen ? `${f.cat.color}06` : 'transparent',
                        borderLeft: `2px solid ${isOpen ? f.cat.color : 'transparent'}`,
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? -1 : f.idx)}
                        style={{
                          width: '100%', padding: '10px 14px',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          gap: 16, textAlign: 'left',
                        }}
                      >
                        <span style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1, minWidth: 0 }}>
                          <span style={{
                            fontFamily: F_MONO, fontSize: 10, color: f.cat.color,
                            fontWeight: 700, minWidth: 22, letterSpacing: '0.04em',
                          }}>
                            {String(f.idx + 1).padStart(2, '0')}
                          </span>
                          <span style={{
                            width: 22, height: 22, flexShrink: 0,
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: `${f.cat.color}14`,
                            border: `1px solid ${f.cat.color}30`,
                            borderRadius: 5,
                            color: f.cat.color,
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d={f.cat.icon} />
                            </svg>
                          </span>
                          <span style={{
                            fontFamily: F_DISPLAY, fontSize: 'clamp(13px, 1vw, 15px)',
                            color: TEXT, letterSpacing: '-0.01em', lineHeight: 1.3,
                          }}>{f.q}</span>
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                          style={{
                            width: 22, height: 22, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: isOpen ? f.cat.color : TEXT_D,
                          }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.21, 0.61, 0.35, 1] }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{ padding: '0 14px 12px 44px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                              <p style={{ fontSize: 13.5, color: TEXT_S, lineHeight: 1.6, maxWidth: '70ch' }}>{f.a}</p>
                              <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                                alignSelf: 'flex-start',
                              }}>
                                <span style={{
                                  fontFamily: F_MONO, fontSize: 9, color: f.cat.color, fontWeight: 600,
                                  letterSpacing: '0.1em', textTransform: 'uppercase',
                                  padding: '2px 7px', background: `${f.cat.color}14`,
                                  border: `1px solid ${f.cat.color}28`,
                                }}>{f.cat.label}</span>
                                <span style={{ fontSize: 10, color: TEXT_D, fontFamily: F_MONO }}>{t('faq.feedback.q')}</span>
                                <button style={{
                                  padding: '2px 8px', fontSize: 10, fontWeight: 600,
                                  border: `1px solid ${BORDER}`, color: TEXT_S,
                                }}>{t('faq.feedback.yes')}</button>
                                <button style={{
                                  padding: '2px 8px', fontSize: 10, fontWeight: 600,
                                  border: `1px solid ${BORDER}`, color: TEXT_S,
                                }}>{t('faq.feedback.no')}</button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vo-faq-grid { grid-template-columns: 1fr !important; }
          .vo-faq-grid aside { position: static !important; }
        }
      `}</style>
    </section>
  );
}
