import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM, VO, PURPLE, CAL_LINK } from '../data/content';
import { ContactForm } from './ContactForm';

gsap.registerPlugin(ScrollTrigger);

const WA = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export function Contact() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.to('.contact-ghost', {
      xPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });

    const chars = root.current?.querySelectorAll('.contact-char');
    if (chars?.length) {
      gsap.fromTo(chars,
        { yPercent: 120, opacity: 0, rotateX: -60 },
        {
          yPercent: 0, opacity: 1, rotateX: 0,
          duration: 1, stagger: 0.04, ease: 'power4.out',
          scrollTrigger: { trigger: '.contact-title', start: 'top 75%' },
        }
      );
    }

    gsap.fromTo('.contact-eyebrow, .contact-lead',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.contact-title', start: 'top 75%' },
        delay: 0.4,
      }
    );
  }, { scope: root });

  const titleParts = [
    { text: 'Hablemos', highlight: false },
    { text: 'de tu idea.', highlight: true },
  ];

  return (
    <section
      id="contacto"
      ref={root}
      style={{ padding: '140px 24px 140px', background: '#080808', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${VO}18, transparent)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', left: '5%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}14, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div
        className="contact-ghost"
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}
      >
        <span style={{
          fontFamily: 'Syne,sans-serif', fontWeight: 800,
          fontSize: 'clamp(140px,26vw,340px)',
          color: 'rgba(255,255,255,0.022)',
          letterSpacing: '-0.05em', lineHeight: 1,
          whiteSpace: 'nowrap', userSelect: 'none',
        }}>CONTACTO</span>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <p className="contact-eyebrow" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <span style={{ width: 28, height: 1, background: VO }} />
            Trabajemos juntos
            <span style={{ width: 28, height: 1, background: VO }} />
          </p>
          <h2 className="contact-title" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(46px,8vw,120px)', color: '#fff', letterSpacing: '-0.045em', lineHeight: 0.92, marginBottom: 24 }}>
            {titleParts.map((part, pi) => (
              <span key={pi} style={{ display: 'block', overflow: 'hidden', perspective: 600 }}>
                {part.text.split('').map((c, i) => (
                  <span
                    key={i}
                    className="contact-char"
                    style={{
                      display: 'inline-block',
                      background: part.highlight ? `linear-gradient(135deg, ${VO}, ${PURPLE})` : 'none',
                      WebkitBackgroundClip: part.highlight ? 'text' : undefined,
                      WebkitTextFillColor: part.highlight ? 'transparent' : undefined,
                      backgroundClip: part.highlight ? 'text' : undefined,
                      color: part.highlight ? 'transparent' : '#fff',
                      filter: part.highlight ? `drop-shadow(0 0 30px ${VO}50)` : undefined,
                    }}
                  >
                    {c === ' ' ? ' ' : c}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="contact-lead" style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
            Llenanos el formulario o escribinos directo por WhatsApp. Sin compromiso, sin tecnicismos.
          </p>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 32, alignItems: 'flex-start' }} className="contact-grid">
          {/* LEFT: Form */}
          <div>
            <ContactForm />
          </div>

          {/* RIGHT: Direct contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              padding: 28,
              background: 'linear-gradient(155deg, rgba(37,211,102,0.08) 0%, rgba(12,12,12,0.85) 60%)',
              border: '1px solid rgba(37,211,102,0.25)',
              borderRadius: 24,
              boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 50px rgba(37,211,102,0.1)',
            }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#25D366', marginBottom: 6 }}>
                Más rápido
              </p>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
                Escribinos por WhatsApp
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {TEAM.map((m) => (
                  <motion.a
                    key={m.wa}
                    href={`https://wa.me/${m.wa}?text=Hola ${m.short}! Vi el sitio de VO Studio y me interesa un proyecto.`}
                    target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 16px', borderRadius: 14,
                      background: 'rgba(37,211,102,0.12)',
                      border: '1px solid rgba(37,211,102,0.25)',
                      color: '#fff', textDecoration: 'none',
                    }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%',
                      background: '#25D366',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', flexShrink: 0,
                    }}>
                      <WA />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{m.short}</p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{m.phone.slice(0,4)}-{m.phone.slice(4)}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Cal.com booking */}
            <motion.button
              data-cal-link={CAL_LINK}
              data-cal-namespace="vostudio"
              data-cal-config='{"layout":"month_view"}'
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '18px 22px', borderRadius: 20, width: '100%',
                background: `linear-gradient(155deg, ${VO}12 0%, rgba(12,12,12,0.7) 60%)`,
                border: `1px solid ${VO}30`,
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 13, background: `${VO}20`, border: `1px solid ${VO}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: VO, flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: VO, marginBottom: 4 }}>Consulta gratis</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Agendar 15 minutos →</p>
              </div>
            </motion.button>

            {/* Email */}
            <a
              href="mailto:hola@vostudio.cr"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '20px 22px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff', textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${VO}50`; e.currentTarget.style.background = `${VO}08`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: `${VO}20`, border: `1px solid ${VO}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: VO, flexShrink: 0,
              }}>
                <MailIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>
                  Email
                </p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>hola@vostudio.cr</p>
              </div>
            </a>

            {/* Info box */}
            <div style={{
              padding: 22, borderRadius: 20,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                <span style={{ color: VO }}><PinIcon /></span>
                San Carlos, Alajuela · Costa Rica
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                <span style={{ color: VO }}><ClockIcon /></span>
                Lunes a viernes · 8am – 6pm GMT-6
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#25D366', boxShadow: '0 0 10px #25D36680', display: 'inline-block' }} />
                Disponibles para nuevos proyectos
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
