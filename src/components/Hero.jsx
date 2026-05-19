import { motion } from 'framer-motion';
import { BG, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, A, A_L, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';
import { HeroVisual } from './HeroVisual';

function StatOrbital() {
  return (
    <div className="vo-stat-3d" aria-hidden>
      <div className="vo-stat-3d-orbit-3" />
      <div className="vo-stat-3d-orbit" />
      <div className="vo-stat-3d-orb" />
      <div className="vo-stat-3d-orbit-2" />
    </div>
  );
}

function Badge3D({ text, sub }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        padding: '8px 22px 8px 10px',
        background: 'linear-gradient(135deg, rgba(251,146,60,0.08), rgba(234,88,12,0.14))',
        border: '1px solid rgba(234,88,12,0.45)',
        borderRadius: 999,
        position: 'relative',
        backdropFilter: 'blur(8px)',
        boxShadow:
          '0 12px 30px rgba(234,88,12,0.22), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.05)',
      }}>
        {/* 3D glass orb */}
        <div className="vo-orb-wrap">
          <span className="vo-orb-halo" />
          <div className="vo-orb">
            <svg className="vo-orb-glyph" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.39 7.36H22l-6.18 4.49 2.36 7.27L12 16.63l-6.18 4.49 2.36-7.27L2 9.36h7.61z"/>
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, lineHeight: 1.1 }}>
          <span style={{
            fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
            fontSize: 19, color: '#9A3412', letterSpacing: '-0.01em',
          }}>{text}</span>
          {sub && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              color: '#C2410C', letterSpacing: '0.16em',
              textTransform: 'uppercase', fontWeight: 600,
            }}>{sub}</span>
          )}
        </div>

        <span className="vo-sparkle" style={{ top: -6,  right: 16, animationDelay: '0s' }}>✦</span>
        <span className="vo-sparkle" style={{ bottom: -4, right: 42, animationDelay: '0.7s', fontSize: 8 }}>✦</span>
        <span className="vo-sparkle" style={{ top: -2,  left: 56,  animationDelay: '1.3s', fontSize: 7 }}>✦</span>
        <span className="vo-sparkle" style={{ bottom: 4, left: -2, animationDelay: '1.9s', fontSize: 9 }}>✦</span>
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const word = {
  hidden: { opacity: 0, y: 36, rotateX: -28 },
  show:   { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.85, ease: [0.21, 0.61, 0.35, 1] } },
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
  }));

  return (
    <section id="top" style={{ background: BG, position: 'relative', overflow: 'hidden', paddingTop: 'clamp(48px, 8vh, 96px)', paddingBottom: 'clamp(60px, 10vh, 120px)' }}>

      <span className="blob blob-1" style={{ top: '-10%', right: '-8%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(234,88,12,0.12), transparent 70%)' }} />
      <span className="blob blob-2" style={{ bottom: '-15%', left: '-10%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(245,158,11,0.10), transparent 70%)' }} />

      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32, flexWrap: 'wrap' }}
        >
          <Badge3D text={t('common.eyebrow.accepting')} sub={t('common.badge.sub')} />
          <span style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT_S }}>
            {t('common.eyebrow.studio')}
          </span>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }} className="vo-hero-grid">

          <div>
            <motion.h1
              variants={container} initial="hidden" animate="show"
              style={{
                fontFamily: F_DISPLAY, fontWeight: 400,
                fontSize: 'clamp(44px, 6.8vw, 96px)',
                lineHeight: 0.98, letterSpacing: '-0.03em',
                color: TEXT,
                display: 'flex', flexWrap: 'wrap', gap: '0.18em',
                perspective: 800,
              }}
            >
              {headlineWords.map((w, i) => (
                <motion.span key={i} variants={word} style={{
                  display: 'inline-block',
                  fontStyle: w.italic ? 'italic' : 'normal',
                }}>
                  {w.accent ? <span className="gradient-text">{w.t}</span> : w.t}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }}
              style={{
                marginTop: 'clamp(28px, 4vw, 44px)',
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.6, color: TEXT_S, maxWidth: '46ch',
              }}
            >
              {t('hero.desc')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
              style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <motion.a href="#contacto"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="arrow-slide-parent"
                style={{
                  background: TEXT, color: BG,
                  padding: '16px 28px', fontSize: 14, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  boxShadow: '0 10px 30px rgba(10,10,10,0.18)',
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
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.21, 0.61, 0.35, 1] }}
            className="vo-hero-visual"
          >
            <HeroVisual />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.21, 0.61, 0.35, 1] }}
          style={{
            marginTop: 'clamp(56px, 9vw, 100px)',
            paddingTop: 32, paddingBottom: 32,
            borderTop: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center',
            gap: 'clamp(24px, 4vw, 56px)',
            flexWrap: 'wrap',
          }}
          className="vo-stats-band"
        >
          {/* 3D orbital decoration */}
          <StatOrbital />

          {/* Stats row */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'clamp(16px, 2vw, 32px)',
            minWidth: 0,
          }}>
            {METRICS.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}
                style={{
                  paddingInlineStart: i > 0 ? 'clamp(16px, 2vw, 28px)' : 0,
                  borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none',
                }}
              >
                <div style={{
                  fontFamily: F_DISPLAY, fontWeight: 400, fontStyle: 'italic',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  lineHeight: 1, letterSpacing: '-0.03em',
                  color: A, marginBottom: 8,
                }}>{m.v}</div>
                <div style={{
                  fontFamily: F_MONO, fontSize: 11, color: TEXT_S,
                  letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
                }}>{m.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vo-hero-grid { grid-template-columns: 1fr !important; }
          .vo-hero-visual { max-width: 420px; margin-inline: auto; }
        }
        @media (max-width: 560px) {
          /* Hide complex 3D visual on small phones — headline + CTA are enough */
          .vo-hero-visual { display: none !important; }
        }
      `}</style>
    </section>
  );
}
