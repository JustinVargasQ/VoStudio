import { motion } from 'framer-motion';
import { A, A_L, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';
import { Entropy } from './ui/Entropy';

const STAT_ICONS = [
  <path key="0" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  <path key="1" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  <path key="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  <path key="3" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
];

const word = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.21, 0.61, 0.35, 1] } },
};
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

export function Hero() {
  const { t, locale } = useApp();

  const METRICS = [0,1,2,3].map(i => ({
    v: t(`hero.metric.${i+1}.v`),
    l: t(`hero.metric.${i+1}.l`),
    icon: STAT_ICONS[i],
  }));

  const lines = locale === 'en'
    ? [['Your chaos.'], ['Turn it into', true], ['your order.', true]]
    : [['Tu desorden.'], ['Vuélvelo', true], ['tu orden.', true]];

  return (
    <section id="top" style={{
      background: '#0A0A0A',
      position: 'relative', overflow: 'hidden',
      paddingTop: 'clamp(48px, 7vh, 80px)',
      paddingBottom: 0,
    }}>

      {/* Subtle grid */}
      <div className="bg-grid" style={{
        position: 'absolute', inset: 0, opacity: 0.18,
        maskImage: 'radial-gradient(ellipse 70% 60% at 30% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 30% 50%, black 20%, transparent 80%)',
      }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>

        {/* ── Two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          minHeight: 'clamp(480px, 68vh, 680px)',
        }} className="vo-hero-grid">

          {/* ── Left: content ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(20px, 3vw, 32px)', flexWrap: 'wrap' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '6px 16px',
                fontFamily: F_MONO, fontSize: 10, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: A,
                border: `1px solid ${A}40`,
                background: `${A}12`,
                borderRadius: 999,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: A, boxShadow: `0 0 8px ${A}` }} />
                {t('common.eyebrow.accepting')}
              </span>
              <span style={{ fontFamily: F_MONO, fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {t('common.eyebrow.studio')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={container} initial="hidden" animate="show"
              style={{
                fontFamily: F_DISPLAY, fontWeight: 400,
                fontSize: 'clamp(48px, 6.5vw, 92px)',
                lineHeight: 1.0, letterSpacing: '-0.03em',
                color: '#FAFAFA',
              }}
            >
              {lines.map((line, li) => (
                <motion.span key={li} variants={word} style={{ display: 'block' }}>
                  {line[1]
                    ? <span style={{ fontStyle: 'italic', color: A }}>{line[0]}</span>
                    : line[0]
                  }
                </motion.span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.75 }}
              style={{
                marginTop: 'clamp(20px, 3vw, 32px)',
                fontSize: 'clamp(15px, 1.15vw, 17px)',
                lineHeight: 1.65, color: 'rgba(255,255,255,0.55)',
                maxWidth: '42ch',
              }}
            >
              {t('hero.desc')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              style={{ marginTop: 'clamp(24px, 3.5vw, 36px)', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <motion.a href="#contacto"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="arrow-slide-parent"
                style={{
                  background: A, color: '#fff',
                  padding: '15px 30px', fontSize: 14, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  boxShadow: `0 8px 28px ${A}55`,
                }}
              >
                {t('common.cta.start')}
                <span className="arrow-slide" style={{ fontSize: 16 }}>→</span>
              </motion.a>
              <a href="#proyectos" className="link-grow" style={{
                padding: '15px 4px', fontSize: 14, fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
              }}>
                {t('common.cta.viewProjects')}
              </a>
            </motion.div>
          </div>

          {/* ── Right: Entropy canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.21, 0.61, 0.35, 1] }}
            className="vo-hero-visual"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
          >
            {/* Glow behind canvas */}
            <div aria-hidden style={{
              position: 'absolute', inset: '10%',
              background: `radial-gradient(circle at 70% 50%, ${A}18, transparent 65%)`,
              filter: 'blur(40px)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: `0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}>
              <Entropy size={460} />
            </div>
          </motion.div>
        </div>

        {/* ── Stats band ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            marginTop: 'clamp(40px, 6vw, 64px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.2)',
          }}
          className="vo-stats-grid"
        >
          {METRICS.map((m, i) => (
            <div key={i} style={{
              padding: 'clamp(18px, 2.2vw, 28px) clamp(14px, 1.8vw, 24px)',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: `${A}15`, border: `1px solid ${A}25`,
                color: A,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24">{m.icon}</svg>
              </div>
              <div>
                <div style={{
                  fontFamily: F_DISPLAY, fontStyle: 'italic',
                  fontSize: 'clamp(30px, 3.5vw, 48px)',
                  lineHeight: 1, letterSpacing: '-0.03em', color: A,
                }}>{m.v}</div>
                <div style={{
                  fontFamily: F_MONO, fontSize: 10, color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginTop: 5,
                }}>{m.l}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .vo-hero-grid { grid-template-columns: 1fr !important; }
          .vo-hero-visual { max-width: 420px; margin-inline: auto; }
        }
        @media (max-width: 540px) {
          .vo-hero-visual { display: none !important; }
          .vo-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vo-stats-grid > div:nth-child(2) { border-right: none !important; }
          .vo-stats-grid > div:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.07); }
          .vo-stats-grid > div:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.07); border-right: none !important; }
        }
      `}</style>
    </section>
  );
}
