import { motion } from 'framer-motion';
import { BG, BG_ALT, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { Reveal } from './Reveal';
import { ProjectVisual } from './ProjectVisual';

export function Projects() {
  const { t, locale } = useApp();
  const { PROJECTS } = getContent(locale);

  return (
    <section id="proyectos" style={{ background: BG, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}>
      <span className="blob blob-2" style={{ bottom: '5%', right: '-8%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)' }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('projects.eyebrow')}
          title={<>{t('projects.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('projects.title.2')}</span>.</>}
          intro={t('projects.intro')}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 7vw, 100px)' }}>
          {PROJECTS.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={p.num} y={40} duration={0.9}>
                <article style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
                  gap: 'clamp(32px, 5vw, 64px)',
                  alignItems: 'center',
                  direction: reverse ? 'rtl' : 'ltr',
                }} className="vo-proj-row">

                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                    style={{
                      position: 'relative', direction: 'ltr',
                      aspectRatio: '600 / 400', overflow: 'hidden',
                      border: `1px solid ${BORDER}`,
                      boxShadow: '0 30px 80px rgba(10,10,10,0.10)',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 12, left: 16, zIndex: 2,
                      fontFamily: F_DISPLAY, fontStyle: 'italic',
                      fontSize: 'clamp(48px, 5vw, 72px)',
                      color: '#fff', mixBlendMode: 'difference',
                      letterSpacing: '-0.03em', lineHeight: 1,
                      pointerEvents: 'none',
                    }}>{p.num}</div>

                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer"
                        style={{
                          position: 'absolute', top: 14, right: 14, zIndex: 2,
                          background: 'rgba(255,255,255,0.95)', color: '#0A0A0A',
                          padding: '7px 12px', fontSize: 11, fontWeight: 600,
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          backdropFilter: 'blur(8px)',
                          fontFamily: F_MONO, letterSpacing: '0.04em',
                        }}>
                        {t('common.live')}
                        <span style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%' }} />
                      </a>
                    )}

                    <ProjectVisual index={i} />
                  </motion.div>

                  <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: F_MONO, fontSize: 11, color: A, letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '5px 10px', background: `${A}10`, border: `1px solid ${A}33`, fontWeight: 600,
                      }}>{p.tag}</span>
                      <span style={{
                        fontFamily: F_MONO, fontSize: 11, color: TEXT_S,
                        padding: '5px 10px', border: `1px solid ${BORDER}`,
                      }}>{p.year}</span>
                    </div>

                    <h3 style={{
                      fontFamily: F_DISPLAY, fontWeight: 400,
                      fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 1,
                      letterSpacing: '-0.025em', color: TEXT,
                    }}>{p.name}</h3>

                    <p style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.6, color: TEXT_S }}>
                      <span style={{ color: TEXT, fontWeight: 600 }}>{t('projects.challenge')} </span>{p.challenge}
                    </p>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
                      <li style={{ fontFamily: F_MONO, fontSize: 11, color: TEXT_D, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>{t('projects.approach')}</li>
                      {p.approach.map((a, j) => (
                        <li key={j} style={{ display: 'flex', gap: 12, fontSize: 14, color: TEXT_S, lineHeight: 1.55 }}>
                          <span style={{ fontFamily: F_MONO, color: A, fontSize: 12, minWidth: 24, fontWeight: 600 }}>{String(j + 1).padStart(2, '0')}</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                      gap: 24, paddingTop: 20, borderTop: `1px solid ${BORDER}`,
                    }} className="vo-proj-bot">
                      <div>
                        <div style={{ fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>{t('projects.stack')}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {p.techs.map((tech) => (
                            <span key={tech} style={{
                              fontFamily: F_MONO, fontSize: 11, color: TEXT_S,
                              padding: '4px 9px', border: `1px solid ${BORDER}`, background: BG_ALT,
                            }}>{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>{t('projects.results')}</div>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          {p.metrics.map((m, j) => (
                            <div key={j}>
                              <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 24, color: A, letterSpacing: '-0.02em', lineHeight: 1 }}>{m.v}</div>
                              <div style={{ fontSize: 10, color: TEXT_S, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{m.l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {p.url && (
                      <motion.a href={p.url} target="_blank" rel="noreferrer"
                        whileHover={{ x: 4 }}
                        className="arrow-slide-parent"
                        style={{
                          marginTop: 8,
                          alignSelf: 'flex-start',
                          display: 'inline-flex', alignItems: 'center', gap: 10,
                          padding: '13px 22px', fontSize: 13, fontWeight: 600,
                          background: TEXT, color: BG,
                          boxShadow: '0 10px 30px rgba(10,10,10,0.15)',
                        }}>
                        {t('common.cta.visitProj')}
                        <span className="arrow-slide">→</span>
                      </motion.a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vo-proj-row { grid-template-columns: 1fr !important; direction: ltr !important; }
          .vo-proj-bot { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
