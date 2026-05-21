import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import {
  BG, BG_ALT, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER,
  F_DISPLAY, F_EDITORIAL, F_MONO, PAD_X, A,
} from '../theme';
import { useApp } from '../context/AppContext';
import { Entropy } from './ui/Entropy';
import { TEAM, STUDIO_EMAIL, STUDIO_PHONE_FMT, STUDIO_WA } from '../data/content';

// v4 → v5: ACC (terracotta #943A1F) replaced by ACC (violet #8A46FF).
// ACC2 is the secondary stop used in primary-button gradient.
const ACC  = '#8A46FF';
const ACC2 = '#FF5C9A';

// ─── Brand icons (custom SVGs since Lucide no longer ships brand marks) ──
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  );
}

function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

export function Hero() {
  const { t, locale, theme } = useApp();
  const isDark = theme === 'dark';

  // v5 — Theme-adaptive surface tones (was terracotta/cream v4)
  const SOFT_BG    = isDark ? '#0F0820' : '#F6F2FF';      // inner frame bg
  const ORB_INNER  = isDark ? '#0A0418' : '#FAFAFF';      // entropy frame bg
  const STROKE     = isDark ? 'rgba(138,70,255,0.25)'  : 'rgba(138,70,255,0.22)';
  const STROKE_S   = isDark ? 'rgba(138,70,255,0.15)'  : 'rgba(138,70,255,0.12)';

  const SOCIALS = [
    { Icon: InstagramIcon, name: 'Instagram', handle: '@vostudio.cr',           href: 'https://instagram.com/vostudio.cr', color: '#E4405F' },
    { Icon: FacebookIcon,  name: 'Facebook',  handle: '/vostudio.cr',           href: 'https://facebook.com/vostudio.cr',  color: '#1877F2' },
    { Icon: TikTokIcon,    name: 'TikTok',    handle: '@vostudio.cr',           href: 'https://tiktok.com/@vostudio.cr',   color: isDark ? '#FFFFFF' : '#000000' },
    { Icon: WhatsAppIcon,  name: 'WhatsApp',  handle: `+506 ${STUDIO_PHONE_FMT}`, href: `https://wa.me/${STUDIO_WA}`,        color: '#25D366' },
    { Icon: Mail,          name: 'Email',     handle: STUDIO_EMAIL,             href: `mailto:${STUDIO_EMAIL}`,             color: ACC   },
  ];

  return (
    <section id="top" style={{
      background: BG,
      color: TEXT,
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background 0.3s, color 0.3s',
    }}>

      {/* Left edge accent line */}
      <div aria-hidden style={{
        position: 'absolute', left: 'clamp(20px, 3.5vw, 52px)', top: 0, bottom: 0, width: 1,
        background: `linear-gradient(to bottom, transparent 0%, ${ACC}70 25%, ${ACC}70 75%, transparent 100%)`,
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Top metadata strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          padding: `clamp(64px, 9vh, 96px) ${PAD_X} 0`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'relative', zIndex: 2, flexWrap: 'wrap', gap: 8,
        }}
      >
        <span style={{
          fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: TEXT_D,
        }}>
          VO Studio // {locale === 'en' ? 'Software & Web' : 'Software & Web'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: TEXT_D }}>
            {locale === 'en' ? 'Est. 2023' : 'Desde 2023'}
          </span>
          <span style={{ fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: TEXT_D }}>
            Costa Rica 🇨🇷
          </span>
        </div>
      </motion.div>

      {/* ── Main 2-column area: editorial text | Entropy 3D ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: `clamp(20px, 3vw, 40px) ${PAD_X}`,
        position: 'relative', zIndex: 2,
      }}>
      <div style={{
        width: '100%',
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.95fr)',
        gap: 'clamp(16px, 2vw, 36px)',
        alignItems: 'center',
      }}
        className="vo-hero-grid"
      >

        {/* ── Left column: brutalist text + tagline + CTA ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.5vw, 32px)' }}>
          <div style={{ lineHeight: 0.82 }}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.21, 0.61, 0.35, 1] }}
              style={{
                fontFamily: F_EDITORIAL,
                fontSize: 'clamp(96px, 16vw, 240px)',
                color: TEXT,
                letterSpacing: '0.02em',
                lineHeight: 0.88,
                userSelect: 'none',
              }}
            >
              VO
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 1.0, ease: [0.21, 0.61, 0.35, 1] }}
              style={{
                fontFamily: F_EDITORIAL,
                fontSize: 'clamp(64px, 11vw, 160px)',
                color: isDark ? 'rgba(233,228,224,0.18)' : 'rgba(27,25,26,0.18)',
                letterSpacing: '0.18em',
                lineHeight: 0.92,
                userSelect: 'none',
                marginTop: 'clamp(4px, 0.8vw, 10px)',
              }}
            >
              STUDIO
            </motion.div>
          </div>

          {/* Eyebrow + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ maxWidth: 440 }}
          >
            <p style={{
              fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: TEXT_D, marginBottom: 10,
            }}>
              ↗ {locale === 'en' ? 'Web · Software · UX/UI' : 'Web · Software · UX/UI'}
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              color: TEXT_S,
              lineHeight: 1.6,
            }}>
              {t('hero.desc')}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
          >
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="vo-btn-glow"
              style={{
                background: `linear-gradient(135deg, ${ACC2} 0%, ${ACC} 100%)`,
                color: '#FFFFFF',
                padding: '14px 34px',
                borderRadius: 999,
                fontSize: 13, fontWeight: 700,
                fontFamily: F_MONO, letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}
            >
              {locale === 'en' ? "LET'S BUILD" : 'EMPECEMOS'}
              <span style={{ fontSize: 16 }}>→</span>
            </motion.a>
            <a href="#proyectos" style={{
              fontSize: 12, fontFamily: F_MONO, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: TEXT_D,
              borderBottom: `1px solid ${STROKE}`, paddingBottom: 2,
            }}>
              {locale === 'en' ? 'Our Work ↓' : 'Ver Proyectos ↓'}
            </a>
          </motion.div>
        </div>

        {/* ── Right column: Entropy + orbital rings (3D centerpiece) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.21, 0.61, 0.35, 1] }}
          className="vo-hero-3d"
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'relative',
            width: 'clamp(280px, 36vw, 460px)',
            height: 'clamp(280px, 36vw, 460px)',
            pointerEvents: 'none',
          }}>
            {/* Soft glow halo */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.22, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: '-14%',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${ACC}35 0%, ${ACC}10 45%, transparent 75%)`,
                filter: 'blur(20px)',
              }}
            />

            {/* Outer orbital ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                border: `1px dashed ${ACC}55`,
              }}
            >
              <span style={{
                position: 'absolute', top: -6, left: '50%', marginLeft: -6,
                width: 12, height: 12, borderRadius: '50%',
                background: ACC,
                boxShadow: `0 0 16px ${ACC}, 0 0 32px ${ACC}80`,
              }} />
            </motion.div>

            {/* Middle orbital ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: '8%',
                borderRadius: '50%',
                border: `1px solid ${ACC}38`,
              }}
            >
              <span style={{
                position: 'absolute', bottom: -5, right: '15%',
                width: 9, height: 9, borderRadius: '50%',
                background: `${ACC}E0`,
                boxShadow: `0 0 12px ${ACC}99`,
              }} />
              <span style={{
                position: 'absolute', top: '50%', left: -3, marginTop: -3,
                width: 5, height: 5, borderRadius: '50%',
                background: '#6AB7FF',
                boxShadow: '0 0 10px rgba(106, 183, 255, 0.9)',
              }} />
            </motion.div>

            {/* Entropy canvas — centered & floating */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width:  '80%', height: '80%',
              transform: 'translate(-50%, -50%)',
            }}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'relative',
                  width: '100%', height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `1.5px solid ${ACC}55`,
                  boxShadow: isDark
                    ? `inset 0 0 60px rgba(0,0,0,0.55), 0 0 60px ${ACC}40, 0 0 120px ${ACC2}25, 0 16px 50px rgba(0,0,0,0.5)`
                    : `inset 0 0 40px rgba(138,70,255,0.08), 0 0 70px ${ACC}35, 0 0 140px ${ACC2}20, 0 16px 50px rgba(93,43,255,0.20)`,
                  background: ORB_INNER,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {/* Radial vignette */}
                <div aria-hidden style={{
                  position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                  background: isDark
                    ? 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(10,4,24,0.88) 100%)'
                    : 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(250,250,255,0.85) 100%)',
                  borderRadius: '50%',
                }} />
                <Entropy size={360} theme={theme} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>

      {/* ── Team & Social section (replaces stats band) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        style={{
          borderTop: `1px solid ${STROKE}`,
          background: SOFT_BG,
          position: 'relative', zIndex: 2,
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: `clamp(24px, 3.5vw, 44px) ${PAD_X}`,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
          gap: 'clamp(24px, 4vw, 56px)',
          alignItems: 'center',
        }} className="vo-hero-bottom">

          {/* ── LEFT: founders showcase ── */}
          <div>
            <div style={{
              fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: ACC, fontWeight: 700, marginBottom: 16,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 14, height: 1, background: ACC }} />
              {locale === 'en' ? 'Built in Costa Rica' : 'Hecho en Costa Rica'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TEAM.map((p, i) => (
                <div key={p.short} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 14px',
                  background: BG_CARD,
                  border: `1px solid ${STROKE}`,
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ACC}60`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = STROKE; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: '50%', flexShrink: 0,
                    background: i === 0
                      ? `linear-gradient(135deg, ${ACC} 0%, #7A2E15 100%)`
                      : `linear-gradient(135deg, #B84B22 0%, ${ACC} 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontFamily: F_MONO, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
                    boxShadow: `0 8px 20px ${ACC}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    border: `2px solid ${BG_CARD}`,
                  }}>{p.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F_DISPLAY, fontSize: 18, color: TEXT, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      {p.short} <span style={{ fontStyle: 'italic', color: TEXT_D, fontSize: 14 }}>· {locale === 'en' ? 'Co-founder' : 'Co-fundador' + (i === 1 ? 'a' : '')}</span>
                    </div>
                    <div style={{ fontSize: 11, color: TEXT_D, marginTop: 3, fontFamily: F_MONO }}>
                      {locale === 'en' ? p.role_en : p.role_es}
                    </div>
                  </div>
                  <ArrowUpRight size={14} color={TEXT_D} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: socials grid ── */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              gap: 12, flexWrap: 'wrap', marginBottom: 16,
            }}>
              <div style={{
                fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: ACC, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 14, height: 1, background: ACC }} />
                {locale === 'en' ? 'Connect with us' : 'Conectá con nosotros'}
              </div>
              <span style={{ fontSize: 11, color: TEXT_D, fontStyle: 'italic' }}>
                {locale === 'en' ? 'Reply within 24h · always' : 'Respondemos en menos de 24h · siempre'}
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 8,
            }} className="vo-soc-grid">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="vo-soc-card"
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 8,
                    padding: '14px 12px 12px',
                    background: BG_CARD,
                    border: `1px solid ${STROKE}`,
                    color: TEXT,
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    '--soc-color': s.color,
                  }}
                >
                  {/* Hover accent stripe */}
                  <span aria-hidden className="vo-soc-stripe" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: s.color,
                    transform: 'scaleX(0)', transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  }} />
                  {/* Icon */}
                  <div className="vo-soc-icon" style={{
                    width: 32, height: 32,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: `${s.color}14`,
                    border: `1px solid ${s.color}30`,
                    color: s.color,
                    transition: 'all 0.25s ease',
                  }}>
                    <s.Icon size={15} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: F_MONO, fontSize: 9, letterSpacing: '0.16em',
                      textTransform: 'uppercase', color: TEXT_D, fontWeight: 700, marginBottom: 3,
                    }}>{s.name}</div>
                    <div style={{
                      fontSize: 11, color: TEXT, lineHeight: 1.2,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      fontFamily: F_MONO,
                    }} title={s.handle}>{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .vo-soc-card:hover { transform: translateY(-3px); border-color: var(--soc-color) !important; box-shadow: 0 12px 28px ${ACC}18; }
        .vo-soc-card:hover .vo-soc-stripe { transform: scaleX(1); }
        .vo-soc-card:hover .vo-soc-icon { background: var(--soc-color); color: #fff; border-color: var(--soc-color); }

        @media (max-width: 900px) {
          .vo-hero-grid { grid-template-columns: 1fr !important; }
          .vo-hero-3d { order: -1; }
          .vo-hero-bottom { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .vo-hero-3d { display: none !important; }
          .vo-soc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
