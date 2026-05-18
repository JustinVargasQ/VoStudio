import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, VO } from '../data/content';
import { Icon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({ s, i, total }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="srv-card"
      style={{
        position: 'sticky',
        top: 90 + i * 14,
        marginBottom: 24,
        background: `linear-gradient(135deg, ${s.color}10 0%, #0a0a0a 60%, #050505 100%)`,
        border: `1px solid ${s.color}30`,
        borderRadius: 32,
        overflow: 'hidden',
        boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 70px ${s.color}15`,
      }}
    >
      <div style={{ position: 'absolute', top: -120, right: -120, width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, ${s.color}30, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, height: 3, width: '60%', background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

      <div style={{ padding: 'clamp(28px, 4vw, 52px)', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Number */}
          <div style={{ minWidth: 64 }}>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(48px,6vw,96px)', background: `linear-gradient(135deg, ${s.color}, ${s.color}40)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.02em', lineHeight: 1, filter: `drop-shadow(0 0 20px ${s.color}40)` }}>{s.n}</span>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${s.color}25, ${s.color}10)`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: `0 0 20px ${s.color}25` }}>
                <Icon name={s.icon} style={{ color: s.color, fontSize: 22 }} />
              </div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.4vw,42px)', color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                {s.title}
              </h3>
            </div>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 10 }}>{s.desc}</p>

            {/* Timeline pill */}
            {s.timeline && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: `${s.color}12`, border: `1px solid ${s.color}25`, marginBottom: 14 }}>
                <Icon name="Clock" style={{ color: s.color, fontSize: 11 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: '0.06em' }}>{s.timeline}</span>
              </div>
            )}

            {/* Tagline */}
            <p style={{ fontSize: 13, fontWeight: 700, color: s.color, letterSpacing: '0.04em', marginBottom: s.includes ? 20 : 0 }}>→ {s.tagline}</p>

            {/* Accordion: includes / excludes */}
            {s.includes && (
              <>
                <button
                  onClick={() => setOpen((v) => !v)}
                  style={{ background: 'none', border: 'none', color: s.color, fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: '8px 0', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.08em' }}
                >
                  <motion.span animate={{ rotate: open ? 90 : 0 }} style={{ display: 'inline-flex' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
                  </motion.span>
                  {open ? 'Cerrar detalle' : 'Ver qué incluye'}
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
                        <div>
                          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Incluye</p>
                          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {s.includes.map((item) => (
                              <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                                <Icon name="Check" style={{ color: s.color, flexShrink: 0, marginTop: 1, fontSize: 13 }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          {s.excludes && (
                            <>
                              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>No incluye</p>
                              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {s.excludes.map((item) => (
                                  <li key={item} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                                    <span style={{ flexShrink: 0 }}>✕</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          {s.bestFor && (
                            <div style={{ marginTop: s.excludes ? 20 : 0 }}>
                              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Ideal para</p>
                              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{s.bestFor}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Right: index + progress */}
          <div className="hidden md:block" style={{ minWidth: 90, textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 }}>Servicio</p>
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 14, color: '#fff', fontWeight: 700, marginTop: 4 }}>{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
            <div style={{ marginTop: 14, width: 50, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginLeft: 'auto' }}>
              <div style={{ width: `${((i + 1) / total) * 100}%`, height: '100%', background: s.color, borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.srv-eyebrow, .srv-title, .srv-lead',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.srv-title', start: 'top 85%' } }
    );
    const cards = gsap.utils.toArray('.srv-card');
    cards.forEach((card, i) => {
      gsap.to(card, {
        scale: 1 - (cards.length - i - 1) * 0.04,
        opacity: i === cards.length - 1 ? 1 : 0.85,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top 8%', end: () => `+=${(cards.length - i) * 80}`, scrub: 1 },
      });
      gsap.fromTo(card, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
    });
  }, { scope: root });

  return (
    <section id="servicios" ref={root} style={{ padding: '140px 24px 80px', background: '#050505', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${VO}10, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: 80, maxWidth: 800 }}>
          <p className="srv-eyebrow" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 28, height: 1, background: VO }} />Qué hacemos
          </p>
          <h2 className="srv-title" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(46px,7vw,96px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 24 }}>
            Servicios <br />
            <span style={{ color: VO }}>integrales.</span>
          </h2>
          <p className="srv-lead" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 560 }}>
            De la idea al producto terminado. Hacé click en cada servicio para ver qué incluye, qué no, y cuándo te conviene.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          {SERVICES.map((s, i) => <ServiceCard key={s.n} s={s} i={i} total={SERVICES.length} />)}
        </div>
      </div>
    </section>
  );
}
