import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Palette, Code2, Rocket, CheckCircle2 } from 'lucide-react';
import { BG, BG_ALT, BG_SECTION, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, F_DISPLAY, F_MONO, MAX_W, PAD_X, A } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';

// v6 — Steps mapped to Midnight Signal palette.
const PHASE_META = [
  { color: '#6AB7FF', Icon: MessageCircle }, // 01 consulta — electric blue
  { color: '#22D3EE', Icon: Palette },       // 02 diseño — cyan light
  { color: '#06B6D4', Icon: Code2 },         // 03 desarrollo — cyan
  { color: '#FF5C9A', Icon: Rocket },        // 04 lanzamiento — strong pink
];

export function Process() {
  const { t, locale } = useApp();
  const { PROCESS } = getContent(locale);
  const [active, setActive] = useState(0);

  const steps = PROCESS.map((s, i) => ({
    ...s,
    ...PHASE_META[i],
    duration:    t(`process.duration.${i + 1}`),
    deliverable: t(`process.deliv.${i + 1}`),
  }));

  const step = steps[active];

  return (
    <section id="proceso" style={{
      background: BG_SECTION,
      padding: `clamp(64px, 10vh, 110px) 0`,
      position: 'relative', overflow: 'hidden',
      transition: 'background 0.3s',
    }}>
      {/* Animated ambient blob that follows active step color */}
      <motion.div aria-hidden
        animate={{ background: `radial-gradient(ellipse, ${step.color}14 0%, transparent 70%)` }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 400, borderRadius: '50%',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(32px, 5vw, 52px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}
          >
            <motion.span initial={{ width: 0 }} whileInView={{ width: 28 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }} style={{ height: 1, background: A, display: 'inline-block' }} />
            <span style={{ fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: TEXT_D, fontWeight: 600 }}>
              {t('process.eyebrow')}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ fontFamily: F_DISPLAY, fontWeight: 400, fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: TEXT, maxWidth: '20ch', marginBottom: 12 }}
          >
            {t('process.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('process.title.2')}</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 'clamp(13px, 1vw, 15px)', color: TEXT_S, maxWidth: '50ch', lineHeight: 1.65 }}
          >
            {t('process.intro')}
          </motion.p>
        </div>

        {/* ── Step tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ position: 'relative', marginBottom: 'clamp(24px, 3vw, 36px)' }}
        >
          {/* Connecting line — base track */}
          <div style={{ position: 'absolute', top: 17, left: '12.5%', right: '12.5%', height: 2, background: BORDER, zIndex: 0, borderRadius: 2 }} />
          {/* Progress fill with glow */}
          <motion.div
            animate={{
              width: `${active * 25 + 12.5}%`,
              background: `linear-gradient(to right, ${steps[0].color}, ${steps[active].color})`,
              boxShadow: `0 0 8px ${steps[active].color}80, 0 0 18px ${steps[active].color}40`,
            }}
            style={{ position: 'absolute', top: 17, left: '12.5%', height: 2, zIndex: 1, borderRadius: 2 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          {/* Glowing head dot */}
          <motion.div
            animate={{
              left: `calc(${active * 25 + 12.5}% - 4px)`,
              background: steps[active].color,
              boxShadow: `0 0 10px ${steps[active].color}, 0 0 24px ${steps[active].color}80`,
            }}
            style={{ position: 'absolute', top: 14, width: 8, height: 8, borderRadius: '50%', zIndex: 2 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          <div style={{ display: 'flex', position: 'relative', zIndex: 2 }} className="vo-proc-tabs">
            {steps.map((s, i) => {
              const isActive = active === i;
              return (
                <button key={s.n} onClick={() => setActive(i)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '0 8px 12px', background: 'transparent', cursor: 'pointer' }}
                >
                  <motion.div
                    animate={{
                      background: isActive ? s.color : BORDER,
                      scale: isActive ? 1.15 : 1,
                      boxShadow: isActive ? `0 0 20px ${s.color}80` : 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F_MONO, fontSize: 11, fontWeight: 700, color: isActive ? '#fff' : TEXT_D, border: `1px solid ${isActive ? s.color : BORDER}` }}
                  >
                    {s.n}
                  </motion.div>
                  <motion.span
                    animate={{ color: isActive ? s.color : TEXT_D }}
                    style={{ fontFamily: F_MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}
                  >
                    {s.title}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Cards grid with 3D perspective ── */}
        <div style={{ perspective: '1200px', perspectiveOrigin: '50% -50%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(10px, 1.5vw, 16px)' }} className="vo-proc-grid">
            {steps.map((s, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={s.n}
                  className="vo-neon-hover"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: isActive ? 1 : 0.6, y: 0 }}
                  viewport={{ once: true }}
                  animate={{
                    y: isActive ? -12 : 0,
                    scale: isActive ? 1.03 : 0.97,
                    opacity: isActive ? 1 : 0.6,
                    rotateX: isActive ? 0 : 4,
                  }}
                  whileHover={{ opacity: isActive ? 1 : 0.85, y: isActive ? -14 : -6, scale: isActive ? 1.03 : 1.01 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24, delay: i * 0.08 }}
                  style={{
                    background: BG_CARD,
                    border: `1px solid ${isActive ? `${s.color}60` : BORDER}`,
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', cursor: 'pointer',
                    boxShadow: isActive ? `0 24px 60px ${s.color}30, 0 0 0 1px ${s.color}20` : 'none',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Color top bar */}
                  <motion.div
                    animate={{ height: isActive ? 4 : 2, background: s.color }}
                    style={{ flexShrink: 0 }}
                  />

                  <div style={{ padding: 'clamp(16px, 1.8vw, 22px)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>

                    {/* Icon + number */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <motion.div
                        animate={{
                          background: isActive ? `${s.color}25` : `${s.color}12`,
                          scale: isActive ? 1.1 : 1,
                        }}
                        style={{ width: 42, height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: `${s.color}12`, border: `1px solid ${s.color}35`, borderRadius: '50%', color: s.color, flexShrink: 0 }}
                      >
                        <motion.div
                          animate={isActive ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
                          transition={isActive ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : {}}
                        >
                          <s.Icon size={18} />
                        </motion.div>
                      </motion.div>
                      <motion.span
                        animate={{ opacity: isActive ? 0.3 : 0.15, scale: isActive ? 1.05 : 1 }}
                        style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 'clamp(36px, 3.5vw, 50px)', lineHeight: 1, letterSpacing: '-0.03em', color: s.color }}
                      >
                        {s.n}
                      </motion.span>
                    </div>

                    {/* Duration */}
                    <span style={{ alignSelf: 'flex-start', fontFamily: F_MONO, fontSize: 9, fontWeight: 700, color: s.color, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 9px', background: `${s.color}12`, border: `1px solid ${s.color}30` }}>
                      {s.duration}
                    </span>

                    {/* Title */}
                    <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 400, fontSize: 'clamp(18px, 1.6vw, 24px)', letterSpacing: '-0.02em', color: TEXT, lineHeight: 1.1 }}>
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: 12.5, color: TEXT_S, lineHeight: 1.55, flex: 1 }}>
                      {s.desc}
                    </p>

                    {/* Deliverable — only fully visible when active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden', paddingTop: 12, borderTop: `1px dashed ${BORDER}` }}
                        >
                          <div style={{ fontFamily: F_MONO, fontSize: 9, color: TEXT_D, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>
                            {t('process.deliverable')}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: TEXT, lineHeight: 1.4 }}>
                            <CheckCircle2 size={13} style={{ color: s.color, flexShrink: 0, marginTop: 1 }} />
                            <span>{s.deliverable}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Inactive deliverable indicator */}
                    {!isActive && (
                      <div style={{ fontSize: 10, color: TEXT_D, fontFamily: F_MONO, paddingTop: 8, borderTop: '1px dashed var(--border-s)' }}>
                        {t('process.deliverable')} →
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Guarantee bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginTop: 'clamp(28px, 4vw, 44px)', padding: '16px clamp(16px, 2.5vw, 26px)', background: BG_ALT, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 30, height: 30, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '50%' }}>
              <CheckCircle2 size={14} style={{ color: '#22C55E' }} />
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, lineHeight: 1.3 }}>{t('process.guarantee.t')}</div>
              <div style={{ fontSize: 11, color: TEXT_D, marginTop: 2 }}>{t('process.guarantee.s')}</div>
            </div>
          </div>
          <a href="#contacto" className="arrow-slide-parent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: TEXT, borderBottom: `1px solid ${TEXT_D}`, paddingBottom: 2 }}>
            {t('process.guarantee.cta')}
            <span className="arrow-slide">→</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .vo-proc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .vo-proc-grid { grid-template-columns: 1fr !important; }
          .vo-proc-tabs button span:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
