import { motion } from 'framer-motion';
import { BG, TEXT, TEXT_S, TEXT_D, BORDER, A, A_L, A_D, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';

function Badge3D({ text, sub }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        padding: '8px 22px 8px 10px',
        background: 'linear-gradient(135deg, rgba(251,146,60,0.08), rgba(234,88,12,0.14))',
        border: '1px solid rgba(234,88,12,0.45)',
        borderRadius: 999,
        backdropFilter: 'blur(8px)',
        boxShadow: '0 12px 30px rgba(234,88,12,0.22), inset 0 1px 0 rgba(255,255,255,0.4)',
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
          <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 19, color: '#9A3412', letterSpacing: '-0.01em' }}>{text}</span>
          {sub && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#C2410C', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>{sub}</span>}
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
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const word = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  show:   { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.21, 0.61, 0.35, 1] } },
};

export function Hero() {
  const { t } = useApp();

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

  return (
    <section id="top" style={{ background: BG, position: 'relative', overflow: 'hidden', paddingTop: 'clamp(32px, 5vh, 56px)', paddingBottom: 0 }}>

      {/* ── Atmospheric glow orb — center bottom, inspired by Biokrypt ── */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: '-10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(900px, 120vw)', height: 'min(900px, 120vw)',
        background: `radial-gradient(circle at 50% 60%, ${A}28 0%, ${A_L}12 30%, transparent 65%)`,
        filter: 'blur(1px)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Secondary smaller orb — tighter, brighter core */}
      <motion.div aria-hidden
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '5%', left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(480px, 80vw)', height: 'min(480px, 80vw)',
          background: `radial-gradient(circle at 50% 50%, ${A}40 0%, ${A}18 40%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      {/* Outer ring glow */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: '-20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(1100px, 140vw)', height: 'min(700px, 90vw)',
        background: `radial-gradient(ellipse at 50% 80%, ${A_D}18 0%, transparent 60%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Grid overlay, masked to center */}
      <div className="bg-grid" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        opacity: 0.35,
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
      }} />

      {/* ── Content ── */}
      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>

        {/* Badge — centered */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 'clamp(20px, 3vw, 32px)', flexWrap: 'wrap' }}
        >
          <Badge3D text={t('common.eyebrow.accepting')} sub={t('common.badge.sub')} />
          <span style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT_S }}>
            {t('common.eyebrow.studio')}
          </span>
        </motion.div>

        {/* Headline — centered */}
        <motion.h1
          variants={container} initial="hidden" animate="show"
          style={{
            fontFamily: F_DISPLAY, fontWeight: 400,
            fontSize: 'clamp(48px, 7.5vw, 108px)',
            lineHeight: 0.96, letterSpacing: '-0.03em',
            color: TEXT,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '0.18em', textAlign: 'center',
            perspective: 800,
            maxWidth: '16ch', margin: '0 auto',
          }}
        >
          {headlineWords.map((w, i) => (
            <motion.span key={i} variants={word} style={{ display: 'inline-block', fontStyle: w.italic ? 'italic' : 'normal' }}>
              {w.accent ? <span className="gradient-text">{w.t}</span> : w.t}
            </motion.span>
          ))}
        </motion.h1>

        {/* Description + CTAs — centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, marginTop: 'clamp(24px, 3.5vw, 40px)' }}
        >
          <p style={{
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.65, color: TEXT_S,
            maxWidth: '52ch', textAlign: 'center',
          }}>
            {t('hero.desc')}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <motion.a href="#contacto"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="arrow-slide-parent"
              style={{
                background: TEXT, color: BG,
                padding: '16px 32px', fontSize: 14, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: `0 12px 36px rgba(10,10,10,0.18), 0 0 0 1px ${A}22`,
              }}
            >
              {t('common.cta.start')}
              <span className="arrow-slide" style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </motion.a>
            <a href="#proyectos" className="link-grow" style={{
              padding: '16px 4px', fontSize: 14, fontWeight: 600, color: TEXT,
            }}>
              {t('common.cta.viewProjects')}
            </a>
          </div>
        </motion.div>

        {/* ── Stats band ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease: [0.21, 0.61, 0.35, 1] }}
          style={{
            marginTop: 'clamp(48px, 7vw, 88px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${BORDER}`,
          }}
          className="vo-stats-grid"
        >
          {METRICS.map((m, i) => (
            <div key={i} style={{
              padding: 'clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 28px)',
              borderRight: i < 3 ? `1px solid ${BORDER}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Subtle hover glow */}
              <div className="vo-stat-hover-glow" style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 30% 50%, ${A}08, transparent 70%)`,
                opacity: 0, transition: 'opacity 0.3s',
                pointerEvents: 'none',
              }} />

              <div style={{
                width: 36, height: 36,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: `${A}12`, border: `1px solid ${A}25`,
                color: A,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24">{m.icon}</svg>
              </div>

              <div>
                <div style={{
                  fontFamily: F_DISPLAY, fontWeight: 400, fontStyle: 'italic',
                  fontSize: 'clamp(34px, 4vw, 54px)',
                  lineHeight: 1, letterSpacing: '-0.03em',
                  color: A,
                }}>{m.v}</div>
                <div style={{
                  fontFamily: F_MONO, fontSize: 10, color: TEXT_S,
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600,
                  marginTop: 6,
                }}>{m.l}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .vo-stats-grid > div:hover .vo-stat-hover-glow { opacity: 1 !important; }
        @media (max-width: 700px) {
          .vo-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vo-stats-grid > div:nth-child(2) { border-right: none !important; }
          .vo-stats-grid > div:nth-child(3) { border-top: 1px solid ${BORDER}; }
          .vo-stats-grid > div:nth-child(4) { border-top: 1px solid ${BORDER}; border-right: none !important; }
        }
        @media (max-width: 420px) {
          .vo-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
