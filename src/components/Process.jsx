import { motion } from 'framer-motion';
import { MessageCircle, Palette, Code2, Rocket, CheckCircle2 } from 'lucide-react';
import { F_DISPLAY, F_MONO, MAX_W, PAD_X, A } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { RevealItem } from './Reveal';

const PHASE_META = [
  { color: '#0EA5E9', Icon: MessageCircle },
  { color: '#A855F7', Icon: Palette },
  { color: '#1D4ED8', Icon: Code2 },
  { color: '#22C55E', Icon: Rocket },
];

export function Process() {
  const { t, locale } = useApp();
  const { PROCESS } = getContent(locale);

  const steps = PROCESS.map((s, i) => ({
    ...s,
    ...PHASE_META[i],
    duration:    t(`process.duration.${i + 1}`),
    deliverable: t(`process.deliv.${i + 1}`),
  }));

  return (
    <section id="proceso" style={{
      background: '#0A0A0A',
      padding: `clamp(64px, 10vh, 110px) 0`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div aria-hidden style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(234,88,12,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}
          >
            <motion.span initial={{ width: 0 }} whileInView={{ width: 28 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }} style={{ height: 1, background: A, display: 'inline-block' }} />
            <span style={{ fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
              {t('process.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.21, 0.61, 0.35, 1] }}
            style={{
              fontFamily: F_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(34px, 4.5vw, 58px)',
              lineHeight: 1.0, letterSpacing: '-0.025em', color: '#FAFAFA',
              maxWidth: '20ch', marginBottom: 14,
            }}
          >
            {t('process.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('process.title.2')}</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 'clamp(13px, 1vw, 15px)', color: 'rgba(255,255,255,0.5)', maxWidth: '50ch', lineHeight: 1.65 }}
          >
            {t('process.intro')}
          </motion.p>
        </div>

        {/* Steps grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(10px, 1.5vw, 16px)',
          position: 'relative',
        }} className="vo-proc-grid">

          {/* Connecting line (desktop only) */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.6, ease: [0.21, 0.61, 0.35, 1], delay: 0.4 }}
            className="vo-proc-connector"
            style={{
              position: 'absolute',
              top: 52, left: '12.5%', right: '12.5%',
              height: 1,
              background: 'linear-gradient(to right, #0EA5E9, #A855F7, #1D4ED8, #22C55E)',
              transformOrigin: 'left',
              zIndex: 0,
              opacity: 0.4,
            }}
          />

          {steps.map((s, i) => (
            <RevealItem key={s.n} y={28} delay={i * 0.1} style={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 20px 50px ${s.color}25` }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                style={{
                  background: '#141414',
                  border: `1px solid rgba(255,255,255,0.07)`,
                  height: '100%',
                  display: 'flex', flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${s.color}60`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                {/* Color top bar */}
                <div style={{ height: 3, background: s.color, flexShrink: 0 }} />

                <div style={{ padding: 'clamp(18px, 1.8vw, 24px)', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>

                  {/* Icon + number row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: 42, height: 42,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: `${s.color}18`, border: `1px solid ${s.color}35`,
                      borderRadius: '50%', color: s.color,
                      flexShrink: 0,
                    }}>
                      <s.Icon size={18} />
                    </div>
                    <span style={{
                      fontFamily: F_DISPLAY, fontStyle: 'italic',
                      fontSize: 'clamp(38px, 3.5vw, 52px)',
                      lineHeight: 1, letterSpacing: '-0.03em',
                      color: `${s.color}22`,
                    }}>{s.n}</span>
                  </div>

                  {/* Duration badge */}
                  <span style={{
                    alignSelf: 'flex-start',
                    fontFamily: F_MONO, fontSize: 9, fontWeight: 700,
                    color: s.color, letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '4px 10px',
                    background: `${s.color}12`, border: `1px solid ${s.color}30`,
                  }}>
                    {s.duration}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: F_DISPLAY, fontWeight: 400,
                    fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '-0.02em',
                    color: '#FAFAFA', lineHeight: 1.1,
                  }}>{s.title}</h3>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, flex: 1 }}>
                    {s.desc}
                  </p>

                  {/* Deliverable */}
                  <div style={{ paddingTop: 14, borderTop: '1px dashed rgba(255,255,255,0.08)' }}>
                    <div style={{ fontFamily: F_MONO, fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>
                      {t('process.deliverable')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
                      <CheckCircle2 size={13} style={{ color: s.color, flexShrink: 0, marginTop: 1 }} />
                      <span>{s.deliverable}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </div>

        {/* Guarantee bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{
            marginTop: 'clamp(28px, 4vw, 44px)',
            padding: '18px clamp(18px, 2.5vw, 28px)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 32, height: 32, flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '50%',
            }}>
              <CheckCircle2 size={15} style={{ color: '#22C55E' }} />
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#FAFAFA', lineHeight: 1.3 }}>{t('process.guarantee.t')}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{t('process.guarantee.s')}</div>
            </div>
          </div>
          <a href="#contacto" className="arrow-slide-parent" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontWeight: 600, color: '#FAFAFA',
            borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2,
          }}>
            {t('process.guarantee.cta')}
            <span className="arrow-slide">→</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .vo-proc-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vo-proc-connector { display: none !important; }
        }
        @media (max-width: 500px) {
          .vo-proc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
