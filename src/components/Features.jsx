import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURES, VO, PURPLE } from '../data/content';
import { Icon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

function FeatureCard({ feature, index, wide }) {
  const accent = feature.color;

  return (
    <motion.div
      className="feat-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        gridColumn: wide ? 'span 2' : 'span 1',
        borderRadius: 24,
        padding: wide ? '44px 48px' : '36px 36px',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.07)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: wide ? 'row' : 'column',
        gap: wide ? 40 : 24,
        alignItems: wide ? 'center' : 'flex-start',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}30`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
    >
      {/* Subtle accent line top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, opacity: 0.6 }} />

      {/* Icon block */}
      <div style={{
        width: wide ? 72 : 56, height: wide ? 72 : 56,
        flexShrink: 0,
        borderRadius: 18,
        background: `${accent}12`,
        border: `1px solid ${accent}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent,
        fontSize: wide ? 30 : 24,
      }}>
        <Icon name={feature.icon} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Tag pill */}
        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: accent, marginBottom: 10,
          padding: '4px 10px', borderRadius: 50,
          background: `${accent}10`, border: `1px solid ${accent}18`,
        }}>
          {feature.tag}
        </span>

        <h3 style={{
          fontFamily: 'Syne,sans-serif', fontWeight: 700,
          fontSize: wide ? 'clamp(22px,2.4vw,30px)' : 20,
          color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2,
          marginBottom: 10,
        }}>
          {feature.title}
        </h3>
        <p style={{
          fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65,
          maxWidth: wide ? 500 : '100%',
        }}>
          {feature.desc}
        </p>
      </div>

      {/* Index number — subtle background decoration */}
      <span style={{
        position: 'absolute', bottom: -10, right: 16,
        fontFamily: 'Syne,sans-serif', fontWeight: 900,
        fontSize: wide ? 120 : 96,
        color: 'rgba(255,255,255,0.02)',
        letterSpacing: '-0.04em', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

export function Features() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.feat-head-item',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.feat-head-item', start: 'top 85%' } }
    );
  }, { scope: root });

  return (
    <section
      id="features"
      ref={root}
      style={{ padding: '120px 24px 100px', background: '#050505', position: 'relative', overflow: 'hidden' }}
    >
      {/* Single orb — restrained */}
      <div style={{ position: 'absolute', top: '30%', right: '-8%', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}14, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header — asymmetric */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 64, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <p className="feat-head-item" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 28, height: 1, background: VO }} />
              Por qué elegirnos
            </p>
            <h2 className="feat-head-item" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
              Más que una agencia.<br />
              <span style={{ color: VO }}>Somos tu equipo.</span>
            </h2>
          </div>
          <p className="feat-head-item" style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 340, lineHeight: 1.7 }}>
            Diseño premium, código limpio y enfoque de negocio para entregar productos que generan resultados reales.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {FEATURES.map((f, i) => {
            const wide = i === 0 || i === 5;
            return <FeatureCard key={f.title} feature={f} index={i} wide={wide} />;
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #features .feat-card { grid-column: span 3 !important; }
        }
      `}</style>
    </section>
  );
}
