import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FAQ as DATA, VO, ACCENTS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function Item({ item, index, isOpen, onToggle }) {
  const color = ACCENTS[index % ACCENTS.length];
  return (
    <motion.div
      layout
      style={{
        background: isOpen
          ? `linear-gradient(155deg, ${color}12 0%, rgba(12,12,12,0.8) 70%)`
          : 'rgba(12,12,12,0.5)',
        border: `1px solid ${isOpen ? color + '40' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 0.4s, border-color 0.4s',
        boxShadow: isOpen ? `0 0 60px ${color}15` : 'none',
      }}
    >
      {isOpen && (
        <div style={{
          position: 'absolute', top: -50, right: -50,
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${color}30, transparent 70%)`,
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
      )}

      <button
        onClick={onToggle}
        style={{
          width: '100%', padding: '28px 32px', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, color: '#fff', cursor: 'pointer', textAlign: 'left',
          position: 'relative', zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            color, fontFamily: 'monospace', flexShrink: 0,
          }}>0{index + 1}</span>
          <h3 style={{
            fontFamily: 'Syne,sans-serif', fontWeight: 700,
            fontSize: 'clamp(17px,1.8vw,21px)',
            color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.3,
          }}>{item.q}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: isOpen ? color : 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: isOpen ? `0 0 20px ${color}50` : 'none',
            transition: 'background 0.4s, box-shadow 0.4s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: isOpen ? '#fff' : 'rgba(255,255,255,0.7)' }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden', position: 'relative', zIndex: 2 }}
          >
            <div style={{ padding: '0 32px 28px 76px' }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const root = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo('.faq-head > *',
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-head', start: 'top 85%' },
      }
    );

    gsap.fromTo('.faq-list > *',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
      }
    );
  }, { scope: root });

  return (
    <section
      id="faq"
      ref={root}
      style={{ padding: '140px 24px 140px', background: '#050505', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '30%', left: '-5%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${VO}10, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div className="faq-head" style={{ marginBottom: 70, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <span style={{ width: 28, height: 1, background: VO }} />
            Preguntas frecuentes
            <span style={{ width: 28, height: 1, background: VO }} />
          </p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(42px,6vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 18 }}>
            Resolvamos <span style={{ color: VO }}>tus dudas.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            ¿Tenés otra pregunta que no está acá? Escribinos por WhatsApp y te respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {DATA.map((item, i) => (
            <Item
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
