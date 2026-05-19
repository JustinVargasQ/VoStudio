import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BG, BG_CARD, BG_ALT, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';

const CATEGORY_DEFS = [
  { id: 'precio',    color: '#1D4ED8' },
  { id: 'hosting',   color: '#0EA5E9' },
  { id: 'contenido', color: '#A855F7' },
  { id: 'pago',      color: '#F59E0B' },
  { id: 'plazos',    color: '#0EA5E9' },
  { id: 'soporte',   color: '#22C55E' },
  { id: 'remoto',    color: '#A855F7' },
  { id: 'industria', color: '#F59E0B' },
  { id: 'propiedad', color: '#22C55E' },
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
    { id: 'all', label: t('faq.allCat'), color: TEXT },
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
    <section id="faq" style={{ background: BG, padding: `clamp(64px, 9vh, 100px) 0`, position: 'relative', overflow: 'hidden' }}>
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
              width: '100%', padding: '16px 16px 16px 48px',
              fontSize: 15, color: TEXT, fontFamily: 'inherit',
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
                          fontSize: 13, fontWeight: active ? 600 : 500,
                          color: active ? BG : TEXT,
                          background: active ? c.color : 'transparent',
                          border: `1px solid ${active ? c.color : 'transparent'}`,
                          transition: 'all 0.15s', textAlign: 'left',
                        }}
                        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = BG_ALT; }}}
                        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; }}}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: active ? '#fff' : c.color }} />
                          {c.label}
                        </span>
                        <span style={{ fontFamily: F_MONO, fontSize: 11, color: active ? 'rgba(255,255,255,0.7)' : TEXT_D }}>
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
                          width: '100%', padding: '14px 18px',
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
                            width: 6, height: 6, borderRadius: '50%', background: f.cat.color, flexShrink: 0,
                          }} />
                          <span style={{
                            fontFamily: F_DISPLAY, fontSize: 'clamp(15px, 1.2vw, 17px)',
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
                            <div style={{ padding: '0 18px 16px 52px', display: 'flex', flexDirection: 'column', gap: 10 }}>
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
