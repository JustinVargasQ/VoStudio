import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS, VO, PURPLE } from '../data/content';
import { Icon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.proc-head > *',
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.proc-head', start: 'top 85%' },
      }
    );

    gsap.fromTo('.proc-line',
      { scaleY: 0 },
      {
        scaleY: 1, ease: 'none',
        scrollTrigger: {
          trigger: '.proc-list',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.8,
        },
      }
    );

    const items = gsap.utils.toArray('.proc-item');
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        }
      );
      const color = PROCESS[i].color;
      gsap.to(item.querySelector('.proc-dot'), {
        background: color,
        boxShadow: `0 0 30px ${color}, 0 0 60px ${color}40`,
        scrollTrigger: { trigger: item, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
    });
  }, { scope: root });

  return (
    <section
      id="proceso"
      ref={root}
      style={{ padding: '140px 24px 160px', background: '#050505', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '30%', right: '-10%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${VO}12, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div className="proc-head" style={{ marginBottom: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 600 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 28, height: 1, background: VO }} />
              Cómo trabajamos
            </p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(44px,6.5vw,90px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95 }}>
              El proceso <br />
              <span style={{
                background: `linear-gradient(135deg, ${VO}, ${PURPLE})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>en 4 pasos.</span>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', maxWidth: 280, lineHeight: 1.7, textAlign: 'right' }}>
            Transparente, directo y sin sorpresas. Vos siempre sabés en qué etapa estamos.
          </p>
        </div>

        <div className="proc-list" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 60 }}>
          <div
            className="proc-line"
            style={{
              position: 'absolute', left: 'calc(50% - 1px)', top: 0, bottom: 0, width: 2,
              background: `linear-gradient(to bottom, ${VO} 0%, ${PURPLE} 100%)`,
              transformOrigin: 'top',
              scaleY: 0,
              borderRadius: 2,
              zIndex: 0,
              boxShadow: `0 0 30px ${VO}40`,
            }}
          />

          {PROCESS.map((p, i) => {
            const isRight = i % 2 === 1;
            return (
              <div
                key={p.n}
                className="proc-item"
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: isRight ? 'flex-end' : 'flex-start',
                  zIndex: 2,
                }}
              >
                <div style={{ position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}>
                  <div className="proc-dot" style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#111', border: `2px solid ${p.color}`,
                    transition: 'all 0.4s ease',
                  }} />
                </div>

                <div style={{
                  width: 'calc(50% - 50px)',
                  background: `linear-gradient(135deg, ${p.color}10 0%, rgba(12,12,12,0.9) 60%, rgba(10,10,10,0.9) 100%)`,
                  border: `1px solid ${p.color}30`,
                  borderRadius: 24,
                  padding: 36,
                  position: 'relative',
                  backdropFilter: 'blur(10px)',
                  minWidth: 280,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 50px ${p.color}15`,
                }}>
                  {/* Glow */}
                  <div style={{
                    position: 'absolute', top: -40, [isRight ? 'right' : 'left']: -40,
                    width: 160, height: 160, borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.color}25, transparent 70%)`,
                    filter: 'blur(40px)', pointerEvents: 'none',
                  }} />

                  <div style={{
                    position: 'absolute', top: 36,
                    [isRight ? 'left' : 'right']: -50,
                    width: 50, height: 1, background: `linear-gradient(${isRight ? '90deg' : '-90deg'}, ${p.color}40, transparent)`,
                  }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 18,
                      background: `linear-gradient(135deg, ${p.color}30, ${p.color}10)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, border: `1px solid ${p.color}40`,
                      boxShadow: `0 0 20px ${p.color}30`,
                      color: p.color,
                    }}>
                      <Icon name={p.icon} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: p.color, marginBottom: 4, textTransform: 'uppercase' }}>Paso {p.n}</p>
                      <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{p.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, position: 'relative', zIndex: 2 }}>{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
