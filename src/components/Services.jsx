import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, ShoppingBag, Smartphone, Database, Search, Shield, Check, ArrowUpRight } from 'lucide-react';
import { BG, BG_ALT, BG_SECTION, BG_CARD, BG_CARD_ALT, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { Reveal, RevealStagger, RevealItem } from './Reveal';
import { ServiceVisual } from './ServiceVisual';
import { ServiceMockup } from './ServiceMockups';

// Icon per service (by index)
const SERVICE_ICONS = [Layout, ShoppingBag, Smartphone, Database, Search, Shield];

// Professional photo per service (Unsplash, verified)
const SERVICE_PHOTOS = [
  'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=720&q=80',  // 01 Web — designer at work
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=720&q=80',  // 02 E-commerce — shopping
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=720&q=80',  // 03 Apps — mobile phone
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=720&q=80',  // 04 Systems — analytics dashboard
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=720&q=80',  // 05 SEO — charts
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=720&q=80',  // 06 Maintenance — code/server
];

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

// ─── Service detail modal ──────────────────────────────────────────────
function ServiceModal({ service, onClose, t }) {
  // ESC key closes + body scroll lock
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15,13,14,0.78)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 40px)',
        overflowY: 'auto',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.21, 0.61, 0.35, 1] }}
        style={{
          position: 'relative',
          background: BG,
          width: '100%', maxWidth: 1080,
          border: `1px solid ${BORDER}`,
          boxShadow: '0 40px 100px rgba(0,0,0,0.45)',
          margin: 'auto 0',
        }}
      >
        {/* Top accent stripe */}
        <div aria-hidden style={{ height: 3, background: A, width: '100%' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t('services.modal.close')}
          style={{
            position: 'absolute', top: 18, right: 18,
            width: 38, height: 38,
            background: BG_ALT, border: `1px solid ${BORDER}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: TEXT, zIndex: 5, cursor: 'pointer',
            transition: 'background 0.15s, border-color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = BG_CARD_ALT; e.currentTarget.style.borderColor = A; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = BG_ALT; e.currentTarget.style.borderColor = BORDER; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Content */}
        <div style={{ padding: 'clamp(28px, 4vw, 56px)' }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <span style={{
              fontFamily: F_MONO, fontSize: 11, color: A,
              letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
            }}>
              {t('services.modal.servicePrefix')} {service.n}
            </span>
            <h2 id="service-modal-title" style={{
              fontFamily: F_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.0,
              letterSpacing: '-0.025em', color: TEXT,
              marginTop: 10, marginBottom: 10,
            }}>{service.title}</h2>
            <p style={{
              fontFamily: F_DISPLAY, fontStyle: 'italic',
              fontSize: 'clamp(16px, 1.4vw, 20px)', color: TEXT_S, lineHeight: 1.4,
            }}>{service.tagline}</p>
          </div>

          {/* Meta strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 24,
            paddingTop: 22, paddingBottom: 26, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`,
            marginBottom: 32,
          }} className="vo-sm-meta">
            <div>
              <div style={{ fontFamily: F_MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEXT_D, marginBottom: 6, fontWeight: 600 }}>
                {t('services.modal.timeline')}
              </div>
              <div style={{ fontSize: 14, color: TEXT, fontWeight: 600 }}>{service.timeline}</div>
            </div>
            <div>
              <div style={{ fontFamily: F_MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEXT_D, marginBottom: 6, fontWeight: 600 }}>
                {t('services.modal.idealFor')}
              </div>
              <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.5 }}>{service.perfectFor}</div>
            </div>
          </div>

          {/* Visual mockup — a tiny live demo of what the service looks like */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: A, fontWeight: 700,
              }}>
                ↗ {t('services.modal.examples')}
              </h3>
              <span style={{ fontSize: 12, color: TEXT_D, fontStyle: 'italic' }}>{t('services.modal.examplesHint')}</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ServiceMockup n={service.n} />
            </motion.div>
          </div>

          {/* Includes + Stack grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 36,
            paddingTop: 26, borderTop: `1px solid ${BORDER}`,
          }} className="vo-sm-bottom">
            <div>
              <h3 style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT_D, fontWeight: 700, marginBottom: 16 }}>
                {t('services.modal.includes')}
              </h3>
              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                {service.includes.map((inc, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: TEXT_S, lineHeight: 1.5 }}>
                    <span style={{ color: A, fontWeight: 700, lineHeight: 1.2, flexShrink: 0 }}>✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT_D, fontWeight: 700, marginBottom: 16 }}>
                {t('services.modal.stack')}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {service.stack.map((tech) => (
                  <span key={tech} style={{
                    fontFamily: F_MONO, fontSize: 11, color: TEXT_S, fontWeight: 500,
                    padding: '5px 10px', border: `1px solid ${BORDER}`, background: BG_CARD_ALT,
                  }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 32, paddingTop: 24, borderTop: `1px solid ${BORDER}`,
            display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 13, color: TEXT_S, maxWidth: 380, lineHeight: 1.5 }}>
              {t('services.modal.ctaNote')}
            </span>
            <motion.a href="#contacto"
              onClick={onClose}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: A, color: '#E9E4E0',
                padding: '14px 32px', fontSize: 13, fontWeight: 700,
                borderRadius: 999,
                fontFamily: F_MONO, letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 0 0 1px ${A}80, 0 8px 30px ${A}55`,
                flexShrink: 0,
              }}>
              {t('common.cta.start')}
              <span style={{ fontSize: 16 }}>→</span>
            </motion.a>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .vo-sm-meta { grid-template-columns: 1fr !important; }
            .vo-sm-bottom { grid-template-columns: 1fr !important; gap: 24px !important; }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

const CARD_ACCENTS = ['#6AB7FF', '#E14DFF', '#8A46FF', '#FF5C9A', '#FF6A63', '#F59E0B'];

export function Services() {
  const { t, locale } = useApp();
  const { SERVICES } = getContent(locale);
  const [hovered, setHovered] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const openedService = openIndex !== null ? SERVICES[openIndex] : null;

  return (
    <section id="servicios" style={{ background: BG_SECTION, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('services.eyebrow')}
          title={<>{t('services.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('services.title.2')}</span>.</>}
          intro={t('services.intro')}
        />

        <RevealStagger stagger={0.08} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {SERVICES.map((s, i) => {
            const isHovered = hovered === i;
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const Icon = SERVICE_ICONS[i] || Layout;
            const photo = SERVICE_PHOTOS[i] || SERVICE_PHOTOS[0];
            return (
              <RevealItem key={s.n} y={28}>
                <motion.article
                  className="vo-neon-hover"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setOpenIndex(i)}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIndex(i); } }}
                  aria-label={`${t('common.cta.knowMore')}: ${s.title}`}
                  style={{
                    position: 'relative',
                    background: BG_CARD,
                    border: `1px solid ${isHovered ? `${accent}45` : BORDER}`,
                    borderRadius: 14,
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: isHovered
                      ? `0 20px 50px ${accent}1A, 0 0 0 1px ${accent}25`
                      : 'var(--shadow-sm)',
                    transition: 'all 0.35s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* ─── Photo header ─── */}
                  <div style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    background: '#1a1027',
                  }}>
                    <motion.img
                      src={photo}
                      alt={s.title}
                      loading="lazy"
                      animate={{ scale: isHovered ? 1.06 : 1 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                        filter: 'saturate(1.05)',
                      }}
                    />
                    {/* Color-tinted gradient overlay (gives each card its identity) */}
                    <div aria-hidden style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(180deg, ${accent}25 0%, transparent 35%, rgba(15,8,32,0.85) 100%)`,
                      pointerEvents: 'none',
                    }} />

                    {/* Icon badge — overlapping bottom-left */}
                    <div style={{
                      position: 'absolute', bottom: 14, left: 16,
                      width: 44, height: 44, borderRadius: 10,
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: accent,
                      boxShadow: `0 8px 20px rgba(0,0,0,0.20), 0 0 0 1px ${accent}25`,
                      transition: 'transform 0.3s ease',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}>
                      <Icon size={20} strokeWidth={1.7} />
                    </div>

                    {/* Timeline glass chip — top right */}
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      fontFamily: F_MONO, fontSize: 9, fontWeight: 700,
                      color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase',
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                      padding: '4px 10px', borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}>{s.timeline}</div>

                    {/* Ghost number — bottom right */}
                    <div aria-hidden style={{
                      position: 'absolute', bottom: 8, right: 16,
                      fontFamily: F_DISPLAY, fontStyle: 'italic',
                      fontSize: 38, color: '#fff', lineHeight: 1,
                      opacity: 0.55, letterSpacing: '-0.03em',
                      pointerEvents: 'none', userSelect: 'none',
                    }}>
                      {s.n}
                    </div>
                  </div>

                  {/* ─── Card content ─── */}
                  <div style={{
                    padding: 'clamp(22px, 2.2vw, 28px)',
                    display: 'flex', flexDirection: 'column', flex: 1,
                    position: 'relative',
                  }}>
                    {/* Title + description */}
                    <div style={{ marginBottom: 18 }}>
                      <h3 style={{
                        fontFamily: F_DISPLAY, fontWeight: 400,
                        fontSize: 'clamp(22px, 2vw, 28px)', lineHeight: 1.05,
                        letterSpacing: '-0.025em', color: TEXT, marginBottom: 8,
                      }}>{s.title}</h3>
                      <p style={{ fontSize: 13.5, lineHeight: 1.55, color: TEXT_S }}>{s.desc}</p>
                    </div>

                    {/* Includes — checkmark list */}
                    <ul style={{
                      listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8,
                      paddingTop: 18, borderTop: `1px solid ${BORDER}`,
                      marginTop: 'auto', marginBottom: 18,
                    }}>
                      {s.includes.slice(0, 3).map((inc, j) => (
                        <li key={j} style={{ display: 'flex', gap: 10, fontSize: 12.5, color: TEXT_S, lineHeight: 1.5 }}>
                          <span style={{
                            width: 16, height: 16, borderRadius: 4,
                            background: `${accent}15`,
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            color: accent, flexShrink: 0, marginTop: 1,
                          }}>
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: accent,
                        fontFamily: F_MONO, letterSpacing: '0.10em', textTransform: 'uppercase',
                      }}>
                        Conocer más
                      </span>
                      <span style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: isHovered ? accent : `${accent}14`,
                        border: `1px solid ${accent}40`,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        color: isHovered ? '#fff' : accent,
                        transition: 'all 0.3s ease',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      }}>
                        <ArrowUpRight size={15} strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>

      {/* Service detail modal */}
      <AnimatePresence>
        {openedService && (
          <ServiceModal
            key={openedService.n}
            service={openedService}
            onClose={() => setOpenIndex(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
