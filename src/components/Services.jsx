import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, ShoppingBag, Smartphone, Database, Search, Shield, Check, ArrowUpRight, MessageCircle, Mic, Image as ImageIcon, Map, Code, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { BG, BG_ALT, BG_SECTION, BG_CARD, BG_CARD_ALT, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { Reveal, RevealStagger, RevealItem } from './Reveal';
import { ServiceVisual } from './ServiceVisual';
import { ServiceMockup } from './ServiceMockups';

// Icon per regular service (by index — corresponds to services 01..06)
const SERVICE_ICONS = [Layout, ShoppingBag, Smartphone, Database, Search, Shield];

// Google Cloud capabilities for the featured card
const GOOGLE_CAPABILITIES = [
  { Icon: MessageCircle, label: 'Chatbots',  color: '#4285F4' },
  { Icon: Mic,           label: 'Voz IA',    color: '#EA4335' },
  { Icon: ImageIcon,     label: 'Visión',    color: '#FBBC05' },
  { Icon: Map,           label: 'Mapas',     color: '#34A853' },
  { Icon: Code,          label: 'APIs',      color: '#9C46FF' },
];

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
        <div style={{ padding: 'clamp(16px, 3vw, 56px)' }}>

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

const CARD_ACCENTS = ['#FF6A63', '#B79CFF', '#FF5C9A', '#FF5C9A', '#FF6A63', '#F59E0B'];

// ─── 3D Cover-Flow style carousel for regular service cards ────────────
function ServiceCarousel({ services, onOpen, t }) {
  const [active, setActive]   = useState(0);
  const [hovered, setHovered] = useState(false);
  const n = services.length;

  // 3D tilt state for the active card
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const activeTiltRef = useRef(null);

  const onCardMouseMove = useCallback((e) => {
    if (!activeTiltRef.current) return;
    const rect = activeTiltRef.current.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setTilt({ rx: (py - 0.5) * -20, ry: (px - 0.5) * 20, gx: px * 100, gy: py * 100 });
  }, []);

  const onCardMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  }, []);

  const offsetOf = (i) => {
    let d = i - active;
    if (d >  n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  // Keyboard navigation when the carousel is hovered
  useEffect(() => {
    if (!hovered) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hovered, n]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        marginTop: 36,
        height: 'clamp(440px, 60vh, 540px)',
        perspective: 1400,
        perspectiveOrigin: '50% 50%',
        userSelect: 'none',
      }}>
      {/* Cards */}
      {services.map((s, i) => {
        const offset = offsetOf(i);
        const abs    = Math.abs(offset);
        if (abs > 2) return null;
        const isActive = abs === 0;
        const sign     = Math.sign(offset);

        const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
        const Icon   = SERVICE_ICONS[i] || Layout;
        const photo  = SERVICE_PHOTOS[i] || SERVICE_PHOTOS[0];

        // Visual transforms based on distance from active
        const xPct    = offset * 38;                            // horizontal spread
        const scale   = isActive ? 1 : abs === 1 ? 0.82 : 0.66;
        const blurFilter = isActive ? 'none' : abs === 1 ? 'blur(3px)' : 'blur(7px)';
        const opacity = isActive ? 1 : abs === 1 ? 0.55 : 0.22;
        const rotateY = -sign * (abs === 1 ? 14 : 22);
        const zIndex  = 10 - abs;

        return (
          <motion.article
            key={s.n}
            initial={false}
            animate={{
              x: `calc(${xPct}% - 50%)`,
              scale, opacity, rotateY,
              filter: blurFilter,
            }}
            transition={{ type: 'spring', stiffness: 240, damping: 30 }}
            onClick={() => {
              if (isActive) onOpen(i);
              else setActive(i);
            }}
            role="button"
            tabIndex={isActive ? 0 : -1}
            aria-label={isActive ? `${t('common.cta.knowMore')}: ${s.title}` : `Activar ${s.title}`}
            onKeyDown={(e) => {
              if (isActive && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onOpen(i);
              }
            }}
            style={{
              position: 'absolute',
              left: '50%', top: 0,
              width: 'min(360px, 88vw)',
              height: '100%',
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
              cursor: 'pointer',
              zIndex,
              willChange: 'transform, opacity, filter',
            }}>
            <div
              ref={isActive ? activeTiltRef : undefined}
              onMouseMove={isActive ? onCardMouseMove : undefined}
              onMouseLeave={isActive ? onCardMouseLeave : undefined}
              style={{
                width: '100%', height: '100%',
                background: BG_CARD,
                border: `1px solid ${isActive ? `${accent}55` : BORDER}`,
                borderRadius: 16,
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isActive
                  ? `${tilt.ry * 1.2}px ${-tilt.rx * 1.2 + 40}px 80px ${accent}35, 0 0 0 1px ${accent}40, 0 0 60px ${accent}18`
                  : 'var(--shadow-sm)',
                transform: (isActive && (tilt.rx !== 0 || tilt.ry !== 0))
                  ? `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.02)`
                  : 'none',
                transition: isActive
                  ? 'border-color 0.4s, box-shadow 0.06s ease-out, transform 0.08s ease-out'
                  : 'border-color 0.4s, box-shadow 0.4s, transform 0.4s ease-out',
              }}>
              {/* Glare overlay */}
              {isActive && (
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 16,
                  background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 40%, transparent 65%)`,
                  pointerEvents: 'none',
                  zIndex: 20,
                  mixBlendMode: 'screen',
                }} />
              )}
              {/* Photo header */}
              <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: '#1a1027' }}>
                <img src={photo} alt={s.title} loading="lazy" style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  filter: 'saturate(1.05)',
                }} />
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(180deg, ${accent}25 0%, transparent 35%, rgba(15,8,32,0.85) 100%)`,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: 14, left: 16,
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(255,255,255,0.95)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: accent,
                  boxShadow: `0 8px 20px rgba(0,0,0,0.20), 0 0 0 1px ${accent}25`,
                }}>
                  <Icon size={20} strokeWidth={1.7} />
                </div>
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  fontFamily: F_MONO, fontSize: 9, fontWeight: 700,
                  color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 10px', borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>{s.timeline}</div>
                <div aria-hidden style={{
                  position: 'absolute', bottom: 8, right: 16,
                  fontFamily: F_DISPLAY, fontStyle: 'italic',
                  fontSize: 38, color: '#fff', lineHeight: 1,
                  opacity: 0.55, letterSpacing: '-0.03em',
                  pointerEvents: 'none', userSelect: 'none',
                }}>{s.n}</div>
              </div>

              {/* Card content */}
              <div style={{
                padding: 'clamp(20px, 2.2vw, 28px)',
                display: 'flex', flexDirection: 'column', flex: 1,
              }}>
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{
                    fontFamily: F_DISPLAY, fontWeight: 400,
                    fontSize: 'clamp(22px, 2vw, 28px)', lineHeight: 1.05,
                    letterSpacing: '-0.025em', color: TEXT, marginBottom: 8,
                  }}>{s.title}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: TEXT_S }}>{s.desc}</p>
                </div>
                <ul style={{
                  listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8,
                  paddingTop: 16, borderTop: `1px solid ${BORDER}`,
                  marginTop: 'auto', marginBottom: 16,
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: accent,
                    fontFamily: F_MONO, letterSpacing: '0.10em', textTransform: 'uppercase',
                  }}>
                    Conocer más
                  </span>
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: isActive ? accent : `${accent}14`,
                    border: `1px solid ${accent}40`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: isActive ? '#fff' : accent,
                    transition: 'all 0.3s ease',
                  }}>
                    <ArrowUpRight size={15} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}

      {/* Left arrow */}
      <button onClick={prev} aria-label="Anterior servicio" style={{
        position: 'absolute', left: 'clamp(8px, 4vw, 40px)', top: '50%', transform: 'translateY(-50%)',
        zIndex: 20,
        width: 48, height: 48, borderRadius: '50%',
        background: BG_CARD, border: `1px solid ${BORDER}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: TEXT, cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
        backdropFilter: 'blur(8px)',
        transition: 'transform 0.18s, border-color 0.18s, background 0.18s',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; e.currentTarget.style.borderColor = A; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.borderColor = BORDER; }}
      >
        <ChevronLeft size={22} strokeWidth={1.8} />
      </button>

      {/* Right arrow */}
      <button onClick={next} aria-label="Siguiente servicio" style={{
        position: 'absolute', right: 'clamp(8px, 4vw, 40px)', top: '50%', transform: 'translateY(-50%)',
        zIndex: 20,
        width: 48, height: 48, borderRadius: '50%',
        background: BG_CARD, border: `1px solid ${BORDER}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: TEXT, cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
        backdropFilter: 'blur(8px)',
        transition: 'transform 0.18s, border-color 0.18s, background 0.18s',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; e.currentTarget.style.borderColor = A; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.borderColor = BORDER; }}
      >
        <ChevronRight size={22} strokeWidth={1.8} />
      </button>

      {/* Dot indicators */}
      <div style={{
        position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, zIndex: 20,
      }}>
        {services.map((s, i) => {
          const isActive = i === active;
          const accent   = CARD_ACCENTS[i % CARD_ACCENTS.length];
          return (
            <button key={s.n} onClick={() => setActive(i)} aria-label={`Ir a ${s.title}`}
              style={{
                width: isActive ? 28 : 8, height: 8, borderRadius: 99,
                background: isActive ? accent : 'rgba(138,70,255,0.20)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }} />
          );
        })}
      </div>
    </div>
  );
}

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

        {/* ─── Featured card on its own row ─── */}
        {(() => {
          const featuredEntry = SERVICES
            .map((s, i) => ({ s, i }))
            .find(({ s }) => s.featured);
          if (!featuredEntry) return null;
          const { s, i } = featuredEntry;
          const isHovered = hovered === i;
          {
              return (
                <RevealItem key={s.n} y={28} style={{ gridColumn: '1 / -1' }}>
                  <motion.article
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setOpenIndex(i)}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIndex(i); } }}
                    aria-label={`Conocer más: ${s.title}`}
                    style={{
                      position: 'relative',
                      background: 'linear-gradient(135deg, #0A0A12 0%, #1A0A2E 45%, #0E1F3D 100%)',
                      borderRadius: 18,
                      padding: 'clamp(28px, 3.5vw, 44px)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      minHeight: 240,
                      border: '1px solid rgba(66,133,244,0.25)',
                      boxShadow: isHovered
                        ? '0 28px 64px rgba(66,133,244,0.28), 0 0 0 1px rgba(66,133,244,0.45)'
                        : '0 8px 30px rgba(0,0,0,0.15)',
                      transition: 'all 0.35s ease',
                    }}
                  >
                    {/* Floating Google-color blobs */}
                    <div aria-hidden style={{ position: 'absolute', top: '-25%', left: '15%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, #4285F455 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                    <div aria-hidden style={{ position: 'absolute', bottom: '-35%', right: '5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, #EA433540 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                    <div aria-hidden style={{ position: 'absolute', top: '30%', right: '30%', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, #34A85340 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

                    <div style={{
                      position: 'relative', zIndex: 1,
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
                      gap: 'clamp(28px, 4vw, 56px)',
                      alignItems: 'center',
                    }} className="vo-google-grid">
                      {/* LEFT: text + chips + CTA */}
                      <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                          <span style={{
                            padding: '4px 11px',
                            background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)',
                            color: '#fff', fontSize: 9, fontWeight: 900,
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            fontFamily: F_MONO, borderRadius: 999,
                            boxShadow: '0 4px 14px rgba(66,133,244,0.40)',
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                          }}>
                            <Sparkles size={10} strokeWidth={2.5} />
                            Nuevo · Featured
                          </span>
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                            IA · Visión · Maps · APIs
                          </span>
                        </div>

                        <h3 style={{
                          fontFamily: F_DISPLAY, fontWeight: 400,
                          fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.02,
                          letterSpacing: '-0.025em', color: '#fff', marginBottom: 14,
                        }}>
                          Inteligencia,{' '}
                          <span style={{
                            fontStyle: 'italic',
                            background: 'linear-gradient(135deg, #4285F4 0%, #EA4335 35%, #FBBC05 65%, #34A853 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text', color: 'transparent',
                          }}>todo conectado</span>.
                        </h3>

                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: 22, maxWidth: '54ch' }}>
                          {s.desc}
                        </p>

                        {/* Capability chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 22 }}>
                          {GOOGLE_CAPABILITIES.map((c, j) => (
                            <span key={j} style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '6px 12px', borderRadius: 999,
                              background: `${c.color}15`, border: `1px solid ${c.color}50`,
                              color: '#fff', fontSize: 10.5, fontWeight: 600,
                            }}>
                              <c.Icon size={11} color={c.color} strokeWidth={2.2} />
                              {c.label}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 10,
                          fontSize: 11, fontWeight: 700, color: '#fff',
                          fontFamily: F_MONO, letterSpacing: '0.10em', textTransform: 'uppercase',
                          padding: '12px 22px', borderRadius: 999,
                          background: 'linear-gradient(135deg, rgba(66,133,244,0.18), rgba(234,67,53,0.18))',
                          border: '1px solid rgba(255,255,255,0.22)',
                          backdropFilter: 'blur(10px)',
                          transition: 'transform 0.2s',
                          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        }}>
                          Explorar demos en vivo
                          <ArrowUpRight size={14} strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* RIGHT: Big G + floating capability cards */}
                      <div style={{
                        position: 'relative',
                        minHeight: 240,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }} className="vo-google-visual">
                        {/* Glow ring behind icon */}
                        <div aria-hidden style={{
                          position: 'absolute', width: 280, height: 280, borderRadius: '50%',
                          background: 'conic-gradient(from 0deg, #4285F4, #34A853, #FBBC05, #EA4335, #4285F4)',
                          filter: 'blur(30px)', opacity: 0.30,
                          animation: 'gRotate 12s linear infinite',
                        }} />
                        {/* Big sparkles icon — provider-neutral */}
                        <div style={{
                          position: 'relative', zIndex: 1,
                          width: 180, height: 180, borderRadius: '50%',
                          background: 'conic-gradient(from 45deg, #4285F4, #34A853, #FBBC05, #EA4335, #4285F4)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 24px 60px rgba(66,133,244,0.40)',
                        }}>
                          <div style={{
                            width: 160, height: 160, borderRadius: '50%',
                            background: '#0A0A12',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <Sparkles size={62} color="#fff" strokeWidth={1.4} style={{ filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.40))' }} />
                          </div>
                        </div>
                        {/* Floating mini cards */}
                        <div style={{
                          position: 'absolute', top: '10%', right: '0%',
                          padding: '8px 12px', borderRadius: 10,
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(12px)',
                          display: 'inline-flex', alignItems: 'center', gap: 7,
                          fontSize: 10, color: '#fff', fontFamily: F_MONO,
                          transform: 'rotate(4deg)',
                          boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
                        }}>
                          <MessageCircle size={12} color="#4285F4" strokeWidth={2.2} />
                          <strong>Chatbot</strong> · 24/7
                        </div>
                        <div style={{
                          position: 'absolute', bottom: '12%', left: '0%',
                          padding: '8px 12px', borderRadius: 10,
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(12px)',
                          display: 'inline-flex', alignItems: 'center', gap: 7,
                          fontSize: 10, color: '#fff', fontFamily: F_MONO,
                          transform: 'rotate(-3deg)',
                          boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
                        }}>
                          <Map size={12} color="#34A853" strokeWidth={2.2} />
                          <strong>Maps</strong> · live
                        </div>
                      </div>
                    </div>

                    <style>{`
                      @keyframes gRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                      @media (max-width: 720px) {
                        .vo-google-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
                        .vo-google-visual { min-height: 160px !important; }
                        .vo-google-visual > div:nth-child(2) { width: 130px !important; height: 130px !important; }
                        .vo-google-visual > div:nth-child(2) > div { width: 112px !important; height: 112px !important; }
                      }
                      /* GoogleCloudMock modal — tighter spacing on mobile */
                      @media (max-width: 720px) {
                        .vo-gc-banner { gap: 8px !important; padding: 9px 11px !important; }
                        .vo-gc-banner > div:last-child > div:first-child { font-size: 10px !important; }
                        .vo-gc-banner > div:last-child > div:last-child { font-size: 9px !important; line-height: 1.5 !important; }
                      }
                    `}</style>
                  </motion.article>
                </RevealItem>
              );
            }
          })()}

        {/* ─── 3D Carousel of regular service cards ─── */}
        <ServiceCarousel
          services={SERVICES.filter(s => !s.featured)}
          getOriginalIndex={(carouselIdx) => {
            // Map carousel position back to original SERVICES index
            const regular = SERVICES.filter(s => !s.featured);
            const target = regular[carouselIdx];
            return SERVICES.findIndex(s => s.n === target.n);
          }}
          onOpen={(carouselIdx) => {
            const regular = SERVICES.filter(s => !s.featured);
            const target  = regular[carouselIdx];
            const realIdx = SERVICES.findIndex(s => s.n === target.n);
            setOpenIndex(realIdx);
          }}
          t={t}
        />

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
