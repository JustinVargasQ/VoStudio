import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRICING, PRICING_NOTE, GUARANTEES, VO, VO_LIGHT, PURPLE, CAL_LINK } from '../data/content';
import { Icon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

function PricingCard({ plan }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="pricing-card"
      whileHover={{ y: plan.popular ? -6 : -4 }}
      style={{
        borderRadius: 28,
        padding: plan.popular ? '0' : '0',
        position: 'relative',
        flex: '1 1 260px',
        minWidth: 0,
      }}
    >
      {plan.popular && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`,
          color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em',
          textTransform: 'uppercase', padding: '5px 16px', borderRadius: 50,
          whiteSpace: 'nowrap', zIndex: 5,
          boxShadow: `0 0 24px ${VO}60`,
        }}>
          Más elegido
        </div>
      )}

      <div style={{
        height: '100%',
        background: plan.popular
          ? `linear-gradient(155deg, ${plan.color}18 0%, rgba(15,15,15,0.95) 50%)`
          : 'rgba(12,12,12,0.7)',
        border: `1px solid ${plan.popular ? plan.color + '50' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 28,
        padding: 32,
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        boxShadow: plan.popular
          ? `0 40px 100px rgba(0,0,0,0.5), 0 0 80px ${plan.color}20`
          : '0 20px 50px rgba(0,0,0,0.3)',
      }}>
        {/* Color accent top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${plan.color}, transparent)` }} />
        <div style={{ position: 'absolute', top: -80, right: -80, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${plan.color}25, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: plan.color, marginBottom: 8 }}>
            {plan.name}
          </p>
          <div style={{ marginBottom: 6 }}>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,3.5vw,40px)', color: '#fff', letterSpacing: '-0.03em' }}>
              {plan.price}
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{plan.priceUSD}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: `${plan.color}12`, border: `1px solid ${plan.color}25`, marginBottom: 20 }}>
            <Icon name="Clock" style={{ color: plan.color, fontSize: 12 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: plan.color }}>{plan.timeline}</span>
          </div>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 20 }}>
            {plan.bestFor}
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18, marginBottom: 20 }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.45 }}>
                  <Icon name="Check" style={{ color: plan.color, flexShrink: 0, marginTop: 1, fontSize: 14 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer',
              padding: '6px 0', display: 'flex', alignItems: 'center', gap: 6,
              textTransform: 'uppercase',
            }}
          >
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} style={{ display: 'inline-block' }}>▾</motion.span>
            {expanded ? 'Ver menos' : 'Qué no incluye'}
          </button>
          {expanded && (
            <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55, padding: '10px 14px', background: 'rgba(255,255,255,0.025)', borderRadius: 10 }}>
              ✗ {plan.notIncluded}
            </p>
          )}
        </div>

        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '13px 24px', borderRadius: 50, marginTop: 22,
            background: plan.popular ? `linear-gradient(135deg, ${plan.color}, ${VO_LIGHT})` : `${plan.color}18`,
            border: `1px solid ${plan.color}${plan.popular ? '' : '40'}`,
            color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13,
            boxShadow: plan.popular ? `0 0 30px ${plan.color}40` : 'none',
            position: 'relative', zIndex: 2,
          }}
        >
          {plan.cta} →
        </motion.a>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.price-head > *',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.price-head', start: 'top 85%' } }
    );
    const cards = gsap.utils.toArray('.pricing-card');
    cards.forEach((c, i) => {
      gsap.fromTo(c,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: i * 0.08, scrollTrigger: { trigger: c, start: 'top 88%' } }
      );
    });
    gsap.fromTo('.guarantee-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.guarantee-row', start: 'top 88%' } }
    );
  }, { scope: root });

  return (
    <section
      id="precios"
      ref={root}
      style={{ padding: '140px 24px 100px', background: '#080808', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}14, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div className="price-head" style={{ textAlign: 'center', marginBottom: 70 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <span style={{ width: 28, height: 1, background: VO }} />
            Precios reales
            <span style={{ width: 28, height: 1, background: VO }} />
          </p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(44px,6.5vw,90px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 20 }}>
            Sin sorpresas.<br />
            <span style={{ color: VO }}>Sin letras chiquitas.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Estos son rangos de referencia. Cada proyecto se cotiza según su alcance real — siempre sabés cuánto vas a pagar antes de empezar.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 50 }}>
          {PRICING.map((plan, i) => <PricingCard key={plan.name} plan={plan} index={i} />)}
        </div>

        {/* Note */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.45)', maxWidth: 680, margin: '0 auto 60px', lineHeight: 1.65, padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
          💡 {PRICING_NOTE}
        </p>

        {/* Guarantees */}
        <div className="guarantee-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 60 }}>
          {GUARANTEES.map((g) => (
            <div key={g.text} className="guarantee-item"
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 50, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
              <Icon name={g.icon} style={{ color: VO, fontSize: 15, flexShrink: 0 }} />
              {g.text}
            </div>
          ))}
        </div>

        {/* Escape para indecisos */}
        <div style={{
          padding: '40px 36px', borderRadius: 28,
          background: `linear-gradient(155deg, ${VO}10 0%, rgba(12,12,12,0.7) 60%)`,
          border: `1px solid ${VO}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 0 60px ${VO}10`,
        }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${VO}25, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(20px,3vw,28px)', color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
              ¿No sabés cuál elegir?
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, maxWidth: 500 }}>
              Contanos tu proyecto en 2 líneas y te decimos qué plan se adapta mejor — sin compromiso ni presión. Respondemos en menos de 24 horas.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            <motion.a href="#contacto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '13px 26px', borderRadius: 50, background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`, color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13, boxShadow: `0 0 28px ${VO}40` }}>
              Escribinos →
            </motion.a>
            <motion.button
              data-cal-link={CAL_LINK} data-cal-namespace="vostudio" data-cal-config='{"layout":"month_view"}'
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '13px 26px', borderRadius: 50, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Agendar 15 min gratis ↗
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
