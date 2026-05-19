import { motion } from 'framer-motion';
import { BG_ALT, BG_CARD, BG_CARD_ALT, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { RevealStagger, RevealItem } from './Reveal';

const PHASE_META = [
  { color: '#0EA5E9', icon: (<g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/><circle cx="9" cy="11" r="0.8" fill="currentColor" /><circle cx="12.5" cy="11" r="0.8" fill="currentColor" /><circle cx="16" cy="11" r="0.8" fill="currentColor" /></g>) },
  { color: '#A855F7', icon: (<g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></g>) },
  { color: '#1D4ED8', icon: (<g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></g>) },
  { color: '#22C55E', icon: (<g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></g>) },
];

export function Process() {
  const { t, locale } = useApp();
  const { PROCESS } = getContent(locale);

  const enriched = PROCESS.map((s, i) => ({
    ...s,
    ...PHASE_META[i],
    duration: t(`process.duration.${i+1}`),
    deliverable: t(`process.deliv.${i+1}`),
  }));

  return (
    <section id="proceso" style={{ background: BG_ALT, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}>
      <span className="blob blob-1" style={{ top: '15%', right: '-10%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(234,88,12,0.08), transparent 70%)' }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('process.eyebrow')}
          title={<>{t('process.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('process.title.2')}</span>.</>}
          intro={t('process.intro')}
        />

        <div style={{ position: 'relative', marginBottom: 8 }}>
          <div style={{
            position: 'absolute', left: '6%', right: '6%', top: '60px',
            height: 2, background: BORDER, zIndex: 0,
          }} className="vo-proc-line" />
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease: [0.21, 0.61, 0.35, 1] }}
            style={{
              position: 'absolute', left: '6%', right: '6%', top: '60px',
              height: 2,
              background: `linear-gradient(to right, #0EA5E9, #A855F7, #1D4ED8, #22C55E)`,
              transformOrigin: 'left', zIndex: 1,
            }}
            className="vo-proc-line"
          />

          <RevealStagger stagger={0.15} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            position: 'relative', zIndex: 2,
          }}>
            {enriched.map((s, i) => (
              <RevealItem key={s.n} y={28}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  style={{
                    background: BG_CARD,
                    border: `1px solid ${BORDER}`,
                    padding: 'clamp(24px, 2.4vw, 32px) clamp(20px, 2vw, 28px)',
                    display: 'flex', flexDirection: 'column', gap: 18,
                    height: '100%',
                    position: 'relative',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'box-shadow 0.4s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 24px 60px ${s.color}25`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <motion.span
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{
                        width: 56, height: 56,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: BG_CARD,
                        border: `2px solid ${s.color}`,
                        borderRadius: '50%', color: s.color,
                        boxShadow: `0 8px 24px ${s.color}40`,
                        position: 'relative', zIndex: 3,
                      }}>
                      <svg width="24" height="24" viewBox="0 0 24 24">{s.icon}</svg>
                    </motion.span>
                    <span style={{
                      fontFamily: F_DISPLAY, fontStyle: 'italic',
                      fontSize: 56, lineHeight: 1, letterSpacing: '-0.03em',
                      color: `${s.color}30`,
                    }}>{s.n}</span>
                  </div>

                  <span style={{
                    alignSelf: 'flex-start',
                    fontFamily: F_MONO, fontSize: 10, color: s.color, fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '5px 10px', border: `1px solid ${s.color}33`,
                    background: `${s.color}10`,
                  }}>
                    {s.duration}
                  </span>

                  <div>
                    <h3 style={{
                      fontFamily: F_DISPLAY, fontWeight: 400,
                      fontSize: 'clamp(26px, 2.4vw, 32px)', letterSpacing: '-0.02em',
                      color: TEXT, marginBottom: 10, lineHeight: 1.05,
                    }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: TEXT_S, lineHeight: 1.55 }}>{s.desc}</p>
                  </div>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: 18,
                    borderTop: `1px dashed ${BORDER}`,
                  }}>
                    <div style={{
                      fontFamily: F_MONO, fontSize: 10, color: TEXT_D,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      fontWeight: 600, marginBottom: 6,
                    }}>{t('process.deliverable')}</div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: TEXT, lineHeight: 1.45 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 3 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span style={{ fontWeight: 500 }}>{s.deliverable}</span>
                    </div>
                  </div>
                </motion.article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{
            marginTop: 'clamp(40px, 5vw, 64px)',
            padding: '20px clamp(20px, 3vw, 32px)',
            background: BG_CARD,
            border: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              width: 34, height: 34, flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#DCFCE7', border: `1px solid #BBF7D0`, borderRadius: '50%',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, lineHeight: 1.3 }}>
                {t('process.guarantee.t')}
              </div>
              <div style={{ fontSize: 12, color: TEXT_S }}>{t('process.guarantee.s')}</div>
            </div>
          </div>

          <a href="#contacto" className="arrow-slide-parent" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 13, fontWeight: 600, color: TEXT,
            borderBottom: `1px solid ${TEXT}`, paddingBottom: 2,
          }}>
            {t('process.guarantee.cta')}
            <span className="arrow-slide">→</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 720px) { .vo-proc-line { display: none; } }
      `}</style>
    </section>
  );
}
