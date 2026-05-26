import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import {
  BG, BG_ALT, BG_SECTION, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER,
  F_DISPLAY, F_EDITORIAL, F_MONO, PAD_X, A,
} from '../theme';
import { useApp } from '../context/AppContext';
import { Entropy } from './ui/Entropy';
import { TEAM, STUDIO_EMAIL, STUDIO_PHONE_FMT, STUDIO_WA } from '../data/content';

const FOUNDER_META = [
  {
    specialty_es: 'Desarrollo web & sistemas backend',
    specialty_en: 'Web dev & backend systems',
    skills: ['React', 'Node.js', 'MongoDB'],
    accent: '#FF5C9A',
    grad: 'linear-gradient(135deg, #FF5C9A 0%, #B79CFF 100%)',
    image: 'https://api.dicebear.com/9.x/lorelei/svg?seed=JustinVargas&backgroundColor=FF5C9A&backgroundType=gradientLinear',
  },
  {
    specialty_es: 'Diseño UX/UI & apps móviles',
    specialty_en: 'UX/UI design & mobile apps',
    skills: ['UI/UX', 'Figma', 'React Native'],
    accent: '#B79CFF',
    grad: 'linear-gradient(135deg, #B79CFF 0%, #FF5C9A 100%)',
    image: 'https://api.dicebear.com/9.x/lorelei/svg?seed=ZaylinLopez&backgroundColor=B79CFF&backgroundType=gradientLinear',
  },
];

// v7: ACC = rosa fuerte / ACC2 = lila suave
const ACC  = '#FF5C9A';
const ACC2 = '#B79CFF';

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

  // v7 — Theme-adaptive surface tones (pink lilac noir)
  const SOFT_BG    = isDark ? 'transparent' : '#F7F2FF';  // inner frame bg
  const ORB_INNER  = isDark ? '#06030D' : '#FBF9FF';      // entropy frame bg
  const STROKE     = isDark ? 'rgba(255,92,154,0.25)'  : 'rgba(255,92,154,0.22)';
  const STROKE_S   = isDark ? 'rgba(255,92,154,0.15)'  : 'rgba(255,92,154,0.12)';

  const SOCIALS = [
    { Icon: InstagramIcon, name: 'Instagram', handle: '@vostudio.cr',           href: 'https://instagram.com/vostudio.cr', color: '#E4405F' },
    { Icon: FacebookIcon,  name: 'Facebook',  handle: '/vostudio.cr',           href: 'https://facebook.com/vostudio.cr',  color: '#1877F2' },
    { Icon: TikTokIcon,    name: 'TikTok',    handle: '@vostudio.cr',           href: 'https://tiktok.com/@vostudio.cr',   color: isDark ? '#FFFFFF' : '#000000' },
    { Icon: WhatsAppIcon,  name: 'WhatsApp',  handle: `+506 ${STUDIO_PHONE_FMT}`, href: `https://wa.me/${STUDIO_WA}`,        color: '#25D366' },
    { Icon: Mail,          name: 'Email',     handle: STUDIO_EMAIL,             href: `mailto:${STUDIO_EMAIL}`,             color: ACC   },
  ];

  return (
    <section id="top" style={{
      background: BG_SECTION,
      color: TEXT,
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background 0.3s, color 0.3s',
    }}>

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
          fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: isDark ? 'rgba(255,201,220,0.60)' : 'rgba(255,92,154,0.60)',
        }}>
          VO Studio // Software &amp; Web
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: isDark ? 'rgba(255,201,220,0.45)' : 'rgba(255,92,154,0.45)' }}>
            Est. 2023
          </span>
          <span style={{ fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: isDark ? 'rgba(255,201,220,0.45)' : 'rgba(255,92,154,0.45)' }}>
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
                color: isDark ? 'rgba(180, 140, 255, 0.22)' : 'rgba(27,25,26,0.18)',
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
              fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(255,201,220,0.65)' : 'rgba(255,92,154,0.65)',
              marginBottom: 10,
            }}>
              ↗ Web · Software · Apps · IA · Cloud
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              color: isDark ? 'rgba(230,218,255,0.85)' : 'rgba(27,16,48,0.80)',
              lineHeight: 1.65,
              marginBottom: 14,
            }}>
              {t('hero.desc')}
            </p>

            {/* Capability chips — subtle marketing */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { label: 'Chatbots IA',    color: '#4285F4' },
                { label: 'Visión',          color: '#FBBC05' },
                { label: 'Mapas',          color: '#34A853' },
                { label: 'E-commerce',     color: '#FF5C9A' },
                { label: 'Apps móviles',   color: '#FF6A63' },
                { label: 'SEO',            color: ACC },
              ].map(c => (
                <span key={c.label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 9px', borderRadius: 999,
                  fontSize: 10, fontWeight: 600,
                  fontFamily: F_MONO, letterSpacing: '0.04em',
                  background: isDark ? `${c.color}14` : `${c.color}10`,
                  border: `1px solid ${c.color}35`,
                  color: isDark ? '#fff' : '#1A0F2E',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, boxShadow: `0 0 4px ${c.color}` }} />
                  {c.label}
                </span>
              ))}
            </div>
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
              fontSize: 11, fontFamily: F_MONO, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(255,201,220,0.60)' : 'rgba(255,92,154,0.60)',
              borderBottom: `1px solid rgba(255,92,154,0.30)`, paddingBottom: 2,
            }}>
              {locale === 'en' ? 'Our Work ↓' : 'Ver Proyectos ↓'}
            </a>
          </motion.div>
        </div>

        {/* ── Right column: Entropy + orbital rings (3D centerpiece) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.21, 0.61, 0.35, 1] }}
          className="vo-hero-3d"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
        >
          <div style={{
            position: 'relative',
            width: 'clamp(300px, 38vw, 500px)',
            height: 'clamp(300px, 38vw, 500px)',
            pointerEvents: 'none',
          }}>

            {/* ── Ambient dual-pulse glow ── */}
            <motion.div aria-hidden
              animate={{ scale: [1, 1.22, 1], opacity: [0.42, 0.14, 0.42] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: '-22%', borderRadius: '50%',
                background: `radial-gradient(circle, ${ACC}45 0%, ${ACC2}20 40%, transparent 70%)`,
                filter: 'blur(28px)',
              }}
            />
            <motion.div aria-hidden
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.14, 0.30, 0.14] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
              style={{
                position: 'absolute', inset: '-10%', borderRadius: '50%',
                background: `radial-gradient(circle, ${ACC2}30 0%, transparent 65%)`,
                filter: 'blur(18px)',
              }}
            />

            {/* ── RING A: Outermost — equatorial tilted, dashed ── */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: '-9%', borderRadius: '50%', rotateX: 72 }}
            >
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke={`${ACC2}30`} strokeWidth="0.5" strokeDasharray="4 5" />
              </svg>
              {/* Primary satellite */}
              <span style={{
                position: 'absolute', top: -6, left: '50%', marginLeft: -6,
                width: 12, height: 12, borderRadius: '50%',
                background: ACC2,
                boxShadow: `0 0 14px ${ACC2}, 0 0 28px ${ACC2}90, 0 0 42px ${ACC2}50`,
              }} />
              {/* Secondary satellite */}
              <span style={{
                position: 'absolute', bottom: -3, right: '20%',
                width: 5, height: 5, borderRadius: '50%',
                background: '#fff',
                boxShadow: `0 0 8px #fff, 0 0 16px ${ACC2}80`,
                opacity: 0.75,
              }} />
            </motion.div>

            {/* ── RING B: Polar orbit — vertical tilt ── */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: '-4%', borderRadius: '50%', rotateY: 68 }}
            >
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke={`${ACC}38`} strokeWidth="0.5" />
              </svg>
              <span style={{
                position: 'absolute', top: '12%', right: -5,
                width: 8, height: 8, borderRadius: '50%',
                background: ACC,
                boxShadow: `0 0 12px ${ACC}, 0 0 24px ${ACC}90`,
              }} />
            </motion.div>

            {/* ── RING C: Main equatorial ── */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
            >
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke={`${ACC}48`} strokeWidth="0.6" />
              </svg>
              {/* Bright leading dot */}
              <span style={{
                position: 'absolute', top: -6, left: '50%', marginLeft: -6,
                width: 12, height: 12, borderRadius: '50%',
                background: `radial-gradient(circle, #fff 20%, ${ACC2} 100%)`,
                boxShadow: `0 0 18px ${ACC2}, 0 0 36px ${ACC2}90, 0 0 54px ${ACC2}50`,
              }} />
              {/* Trailing dim dot */}
              <span style={{
                position: 'absolute', bottom: '10%', left: -4,
                width: 6, height: 6, borderRadius: '50%',
                background: ACC,
                boxShadow: `0 0 10px ${ACC}, 0 0 20px ${ACC}70`,
                opacity: 0.70,
              }} />
            </motion.div>

            {/* ── RING D: Inner diagonal ── */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: '8%', borderRadius: '50%', rotateX: -55, rotateZ: 25 }}
            >
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke={`${ACC}28`} strokeWidth="0.45" />
              </svg>
              <span style={{
                position: 'absolute', bottom: -4, right: '15%',
                width: 8, height: 8, borderRadius: '50%',
                background: ACC,
                boxShadow: `0 0 12px ${ACC}, 0 0 24px ${ACC}80`,
              }} />
              <span style={{
                position: 'absolute', top: '25%', left: -3,
                width: 5, height: 5, borderRadius: '50%',
                background: '#FF6A63',
                boxShadow: '0 0 12px #FF6A63, 0 0 22px rgba(255,106,99,0.80)',
              }} />
            </motion.div>

            {/* ── RING E: Innermost fast ── */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: '20%', borderRadius: '50%', rotateX: 40 }}
            >
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke={`#B79CFF35`} strokeWidth="0.4" strokeDasharray="2 6" />
              </svg>
              <span style={{
                position: 'absolute', top: -3, left: '50%', marginLeft: -3,
                width: 6, height: 6, borderRadius: '50%',
                background: '#B79CFF',
                boxShadow: '0 0 10px #B79CFF, 0 0 20px #B79CFF90',
              }} />
            </motion.div>

            {/* ── Entropy sphere — centered & floating ── */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '76%', height: '76%', transform: 'translate(-50%,-50%)' }}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'relative', width: '100%', height: '100%',
                  borderRadius: '50%', overflow: 'hidden',
                  border: `1.5px solid ${ACC}65`,
                  boxShadow: isDark
                    ? `inset 0 0 70px rgba(0,0,0,0.60), 0 0 80px ${ACC}55, 0 0 160px ${ACC2}35, 0 24px 70px rgba(0,0,0,0.55)`
                    : `inset 0 0 40px rgba(255,92,154,0.12), 0 0 90px ${ACC}45, 0 0 180px ${ACC2}28`,
                  background: ORB_INNER,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {/* Vignette edge fade */}
                <div aria-hidden style={{
                  position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', borderRadius: '50%',
                  background: isDark
                    ? 'radial-gradient(circle at 50% 50%, transparent 48%, rgba(8,2,20,0.94) 100%)'
                    : 'radial-gradient(circle at 50% 50%, transparent 52%, rgba(250,248,255,0.90) 100%)',
                }} />
                {/* Scanning sweep line */}
                <motion.div aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 1, borderRadius: '50%',
                    background: `conic-gradient(from 0deg, transparent 0deg, ${ACC}18 30deg, transparent 60deg)`,
                    pointerEvents: 'none',
                  }}
                />
                <Entropy size={320} theme={theme} />
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
              textTransform: 'uppercase', color: ACC2, fontWeight: 700, marginBottom: 16,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 14, height: 1, background: ACC2 }} />
              {locale === 'en' ? 'Built in Costa Rica' : 'Hecho en Costa Rica'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TEAM.map((p, i) => {
                const m = FOUNDER_META[i];
                return (
                  <div key={p.short}
                    style={{
                      background: isDark ? 'rgba(18, 8, 42, 0.70)' : 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                      border: `1px solid ${isDark ? 'rgba(255,92,154,0.20)' : 'rgba(255,92,154,0.18)'}`,
                      borderRadius: 16, overflow: 'hidden',
                      transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${m.accent}55`;
                      e.currentTarget.style.boxShadow  = `0 14px 40px ${m.accent}20`;
                      e.currentTarget.style.transform  = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,92,154,0.20)' : 'rgba(255,92,154,0.18)';
                      e.currentTarget.style.boxShadow  = 'none';
                      e.currentTarget.style.transform  = 'translateY(0)';
                    }}
                  >
                    {/* Top accent bar */}
                    <div style={{ height: 3, background: m.grad }} />

                    <div style={{ padding: '14px 16px', display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                      {/* Avatar with image + glow + online dot */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{
                          position: 'absolute', inset: -3, borderRadius: '50%',
                          background: m.grad, opacity: 0.32, filter: 'blur(6px)',
                        }} />
                        <div style={{
                          position: 'relative', width: 54, height: 54, borderRadius: '50%',
                          background: m.grad,
                          border: `2px solid rgba(255,255,255,0.18)`,
                          boxShadow: `0 0 0 2px ${m.accent}35`,
                          overflow: 'hidden',
                        }}>
                          <img
                            src={m.image}
                            alt={p.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div style={{
                            display: 'none', position: 'absolute', inset: 0,
                            alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontFamily: F_MONO, fontSize: 13, fontWeight: 700,
                          }}>{p.initials}</div>
                        </div>
                        <span style={{
                          position: 'absolute', bottom: 2, right: 2,
                          width: 11, height: 11, borderRadius: '50%',
                          background: '#22C55E',
                          border: `2px solid ${isDark ? 'rgba(18,8,42,0.9)' : 'rgba(255,255,255,0.9)'}`,
                        }} />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                          <div style={{ fontFamily: F_DISPLAY, fontSize: 14.5, letterSpacing: '-0.01em', lineHeight: 1.15, color: isDark ? '#fff' : '#1A0F2E' }}>
                            {p.name}
                          </div>
                          <span style={{
                            fontFamily: F_MONO, fontSize: 8.5, fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: m.accent, background: `${m.accent}14`,
                            border: `1px solid ${m.accent}30`,
                            borderRadius: 999, padding: '2px 7px',
                            flexShrink: 0, marginTop: 1,
                          }}>
                            {locale === 'en' ? 'Co-founder' : (i === 1 ? 'Co-fundadora' : 'Co-fundador')}
                          </span>
                        </div>

                        <div style={{
                          fontSize: 10.5, marginBottom: 8,
                          color: isDark ? 'rgba(255,201,220,0.60)' : 'rgba(255,92,154,0.65)',
                          fontFamily: F_MONO, letterSpacing: '0.02em',
                        }}>
                          {locale === 'en' ? m.specialty_en : m.specialty_es}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 9 }}>
                          {m.skills.map(s => (
                            <span key={s} style={{
                              fontSize: 9.5, fontFamily: F_MONO, fontWeight: 600,
                              padding: '2px 7px', borderRadius: 999,
                              background: isDark ? 'rgba(255,92,154,0.12)' : 'rgba(255,92,154,0.08)',
                              border: `1px solid ${isDark ? 'rgba(255,92,154,0.25)' : 'rgba(255,92,154,0.20)'}`,
                              color: isDark ? 'rgba(255,201,220,0.80)' : 'rgba(255,92,154,0.80)',
                            }}>{s}</span>
                          ))}
                        </div>

                        <a href={`mailto:${p.email}`} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          fontSize: 10.5, fontFamily: F_MONO, color: m.accent,
                          borderBottom: `1px solid ${m.accent}35`, paddingBottom: 1,
                          textDecoration: 'none', transition: 'opacity 0.2s',
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.70'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          <Mail size={10} />
                          {p.email}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: socials grid ── */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12, flexWrap: 'wrap', marginBottom: 14,
            }}>
              <div style={{
                fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: ACC2, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 14, height: 1, background: ACC2 }} />
                {locale === 'en' ? 'Connect with us' : 'Conectá con nosotros'}
              </div>
              <span style={{ fontSize: 10.5, color: isDark ? 'rgba(255,201,220,0.50)' : 'rgba(255,92,154,0.55)', fontFamily: F_MONO, letterSpacing: '0.04em' }}>
                {locale === 'en' ? '↩ Reply in 24h' : '↩ Respondemos en 24h'}
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 8,
            }} className="vo-soc-grid">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="vo-soc-card vo-neon-hover"
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    padding: '18px 10px 14px',
                    background: isDark ? 'rgba(14, 7, 30, 0.65)' : 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,92,154,0.15)'}`,
                    color: isDark ? '#fff' : '#1A0F2E',
                    textDecoration: 'none',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.28s ease',
                    cursor: 'pointer',
                    '--soc-color': s.color,
                  }}
                >
                  {/* Top glow line */}
                  <span aria-hidden className="vo-soc-stripe" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
                    background: `linear-gradient(90deg, transparent 0%, ${s.color} 50%, transparent 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }} />

                  {/* Icon circle */}
                  <div className="vo-soc-icon" style={{
                    width: 40, height: 40, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${s.color}18`,
                    border: `1.5px solid ${s.color}35`,
                    color: s.color,
                    transition: 'all 0.28s ease',
                    flexShrink: 0,
                  }}>
                    <s.Icon size={17} />
                  </div>

                  {/* Name */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: F_MONO, fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(27,16,48,0.55)',
                      marginBottom: 4,
                    }}>{s.name}</div>
                    <div style={{
                      fontSize: 10, fontFamily: F_MONO,
                      color: isDark ? 'rgba(255,255,255,0.88)' : '#1A0F2E',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      maxWidth: '100%', lineHeight: 1.2,
                    }} title={s.handle}>{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .vo-soc-card:hover { transform: translateY(-4px); border-color: var(--soc-color) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.18), 0 0 0 1px var(--soc-color); }
        .vo-soc-card:hover .vo-soc-stripe { opacity: 1 !important; }
        .vo-soc-card:hover .vo-soc-icon { background: var(--soc-color) !important; color: #fff !important; border-color: var(--soc-color) !important; transform: scale(1.08); }
        :root[data-theme="dark"] .vo-soc-card:hover { background: rgba(20, 10, 45, 0.88) !important; }
        :root:not([data-theme="dark"]) .vo-soc-card:hover { background: rgba(255,255,255,0.96) !important; }

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
