import { motion } from 'framer-motion';
import { MessageCircle, Palette, Code2, Rocket } from 'lucide-react';
import { TEXT, TEXT_S, TEXT_D, BORDER, A, A_L, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';
import { HeroCanvas } from './HeroCanvas';

function Badge3D({ text, sub }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        padding: '8px 22px 8px 10px',
        background: 'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(234,88,12,0.20))',
        border: '1px solid rgba(234,88,12,0.55)',
        borderRadius: 999,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 12px 30px rgba(234,88,12,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
      }}>
        <div className="vo-orb-wrap">
          <span className="vo-orb-halo" />
          <div className="vo-orb">
            <svg className="vo-orb-glyph" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.39 7.36H22l-6.18 4.49 2.36 7.27L12 16.63l-6.18 4.49 2.36-7.27L2 9.36h7.61z"/>
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, lineHeight: 1.1 }}>
          <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 19, color: '#fff', letterSpacing: '-0.01em', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{text}</span>
          {sub && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>{sub}</span>}
        </div>
        <span className="vo-sparkle" style={{ top: -6,  right: 16, animationDelay: '0s' }}>✦</span>
        <span className="vo-sparkle" style={{ bottom: -4, right: 42, animationDelay: '0.7s', fontSize: 8 }}>✦</span>
        <span className="vo-sparkle" style={{ top: -2,  left: 56,  animationDelay: '1.3s', fontSize: 7 }}>✦</span>
      </div>
    </div>
  );
}

const STAT_ICONS = [
  <path key="0" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  <path key="1" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  <path key="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  <path key="3" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};
const word = {
  hidden: { opacity: 0, y: 48, rotateX: -22 },
  show:   { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.21, 0.61, 0.35, 1] } },
};

export function Hero() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const headlineWords = [
    { t: t('hero.title.1') },
    { t: t('hero.title.2') },
    { t: t('hero.title.3') },
    { t: t('hero.title.4'), italic: true, accent: true },
    { t: t('hero.title.5'), italic: true, accent: true },
    { t: t('hero.title.6') },
    { t: t('hero.title.7') },
  ];

  const METRICS = [0,1,2,3].map((i) => ({
    v: t(`hero.metric.${i+1}.v`),
    l: t(`hero.metric.${i+1}.l`),
    icon: STAT_ICONS[i],
  }));

  // Text colors always white/light over the canvas
  const headlineColor   = '#FAFAFA';
  const subtitleColor   = 'rgba(255,255,255,0.72)';
  const statValueColor  = A;
  const statLabelColor  = 'rgba(255,255,255,0.55)';
  const statBorderColor = 'rgba(255,255,255,0.10)';

  return (
    <section id="top" style={{
      background: isDark ? '#0A0A0A' : '#1a0a00',
      position: 'relative', overflow: 'hidden',
      paddingTop: 'clamp(32px, 5vh, 56px)',
      paddingBottom: 0,
    }}>

      {/* ── Three.js canvas — key forces remount on theme change ── */}
      <HeroCanvas key={theme} theme={theme} />

      {/* ── Vignette overlay so text is always legible ── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isDark
          ? 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(10,10,10,0.55) 100%)'
          : 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(26,10,0,0.60) 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 2 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 'clamp(20px, 3vw, 32px)', flexWrap: 'wrap' }}
        >
          <Badge3D text={t('common.eyebrow.accepting')} sub={t('common.badge.sub')} />
          <span style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            {t('common.eyebrow.studio')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={container} initial="hidden" animate="show"
          style={{
            fontFamily: F_DISPLAY, fontWeight: 400,
            fontSize: 'clamp(48px, 7.5vw, 108px)',
            lineHeight: 0.96, letterSpacing: '-0.03em',
            color: headlineColor,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '0.18em', textAlign: 'center',
            perspective: 800,
            maxWidth: '16ch', margin: '0 auto',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
          }}
        >
          {headlineWords.map((w, i) => (
            <motion.span key={i} variants={word} style={{ display: 'inline-block', fontStyle: w.italic ? 'italic' : 'normal' }}>
              {w.accent ? <span className="gradient-text">{w.t}</span> : w.t}
            </motion.span>
          ))}
        </motion.h1>

        {/* Description + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, marginTop: 'clamp(24px, 3.5vw, 40px)' }}
        >
          <p style={{
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.65, color: subtitleColor,
            maxWidth: '52ch', textAlign: 'center',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}>
            {t('hero.desc')}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <motion.a href="#contacto"
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              className="arrow-slide-parent"
              style={{
                background: A, color: '#fff',
                padding: '16px 32px', fontSize: 14, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 12px 36px rgba(234,88,12,0.55)`,
              }}
            >
              {t('common.cta.start')}
              <span className="arrow-slide" style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </motion.a>
            <a href="#proyectos" className="link-grow" style={{
              padding: '16px 4px', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
            }}>
              {t('common.cta.viewProjects')}
            </a>
          </div>
        </motion.div>

        {/* Stats band */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.21, 0.61, 0.35, 1] }}
          style={{
            marginTop: 'clamp(48px, 7vw, 88px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${statBorderColor}`,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
          }}
          className="vo-stats-grid"
        >
          {METRICS.map((m, i) => (
            <div key={i} style={{
              padding: 'clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 28px)',
              borderRight: i < 3 ? `1px solid ${statBorderColor}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                width: 36, height: 36,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: `${A}20`, border: `1px solid ${A}40`,
                color: A,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24">{m.icon}</svg>
              </div>

              <div>
                <div style={{
                  fontFamily: F_DISPLAY, fontWeight: 400, fontStyle: 'italic',
                  fontSize: 'clamp(34px, 4vw, 54px)',
                  lineHeight: 1, letterSpacing: '-0.03em',
                  color: statValueColor,
                  textShadow: `0 0 30px ${A}80`,
                }}>{m.v}</div>
                <div style={{
                  fontFamily: F_MONO, fontSize: 10, color: statLabelColor,
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600,
                  marginTop: 6,
                }}>{m.l}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .vo-stats-grid > div:hover { background: rgba(234,88,12,0.06); transition: background 0.3s; }
        @media (max-width: 700px) {
          .vo-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vo-stats-grid > div:nth-child(2) { border-right: none !important; }
          .vo-stats-grid > div:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.10); }
          .vo-stats-grid > div:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.10); border-right: none !important; }
        }
      `}</style>
    </section>
  );
}
