import { useState } from 'react';
import { motion } from 'framer-motion';
import { BG, BG_CARD, BG_CARD_ALT, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { Reveal, RevealStagger, RevealItem } from './Reveal';
import { ServiceVisual } from './ServiceVisual';

function SectionHeader({ eyebrow, title, intro }) {
  return (
    <div style={{ marginBottom: 'clamp(48px, 7vw, 88px)' }}>
      <Reveal style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }} y={12}>
        <motion.span
          initial={{ width: 0 }} whileInView={{ width: 28 }} viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.61, 0.35, 1] }}
          style={{ height: 1, background: A }}
        />
        <span style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT_S }}>{eyebrow}</span>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 'clamp(32px, 6vw, 96px)', alignItems: 'end' }} className="vo-sh-row">
        <Reveal as="h2" y={28} duration={0.85} style={{
          fontFamily: F_DISPLAY, fontWeight: 400,
          fontSize: 'clamp(40px, 6vw, 80px)',
          lineHeight: 1.02, letterSpacing: '-0.025em', color: TEXT,
        }}>{title}</Reveal>
        {intro && (
          <Reveal as="p" y={20} delay={0.15} style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.6, color: TEXT_S, maxWidth: '48ch' }}>
            {intro}
          </Reveal>
        )}
      </div>
      <style>{`@media (max-width: 720px) { .vo-sh-row { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

export { SectionHeader };

export function Services() {
  const { t, locale } = useApp();
  const { SERVICES } = getContent(locale);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="servicios" style={{ background: BG, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}>
      <span className="blob blob-2" style={{ top: '20%', right: '-10%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(234,88,12,0.10), transparent 70%)' }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('services.eyebrow')}
          title={<>{t('services.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('services.title.2')}</span>.</>}
          intro={t('services.intro')}
        />

        <RevealStagger stagger={0.08} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {SERVICES.map((s, i) => {
            const isHovered = hovered === i;
            return (
              <RevealItem key={s.n} y={28}>
                <motion.article
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  style={{
                    background: BG_CARD,
                    border: `1px solid ${BORDER}`,
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: isHovered ? '0 24px 60px rgba(10,10,10,0.10)' : 'var(--shadow-sm)',
                    transition: 'box-shadow 0.4s, background 0.3s',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    aspectRatio: '320 / 180',
                    overflow: 'hidden',
                    borderBottom: `1px solid ${BORDER}`,
                  }}>
                    <motion.div
                      animate={{ scale: isHovered ? 1.06 : 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <ServiceVisual index={i} />
                    </motion.div>
                    <div style={{
                      position: 'absolute', top: 14, left: 16,
                      fontFamily: F_DISPLAY, fontStyle: 'italic',
                      fontSize: 28, color: A, letterSpacing: '-0.02em',
                      background: 'rgba(255,255,255,0.95)',
                      padding: '2px 12px', lineHeight: 1.1,
                    }}>
                      {s.n}
                    </div>
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      fontFamily: F_MONO, fontSize: 10, color: '#0A0A0A',
                      background: '#fff', padding: '5px 10px',
                      letterSpacing: '0.06em',
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}>{s.timeline}</div>
                  </div>

                  <div style={{ padding: 'clamp(24px, 2.6vw, 32px)', display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
                    <div>
                      <h3 style={{
                        fontFamily: F_DISPLAY, fontWeight: 400,
                        fontSize: 'clamp(26px, 2.4vw, 32px)', lineHeight: 1.1,
                        letterSpacing: '-0.02em', color: TEXT, marginBottom: 8,
                      }}>{s.title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.55, color: TEXT_S }}>{s.desc}</p>
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 18, borderTop: `1px solid ${BORDER}`, marginTop: 'auto' }}>
                      {s.includes.slice(0, 3).map((inc, j) => (
                        <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: TEXT_S, lineHeight: 1.45 }}>
                          <span style={{ color: A, marginTop: 2, fontWeight: 700, lineHeight: 1 }}>+</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 12, fontWeight: 600, color: A,
                      fontFamily: F_MONO, letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      <span style={{
                        display: 'inline-block', transition: 'transform 0.3s',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      }}>{t('common.cta.knowMore')} →</span>
                    </div>
                  </div>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
