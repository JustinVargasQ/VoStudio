import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MANIFESTO, VO, PURPLE, CYAN, PINK, GREEN } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const INTEGRATED_STATS = [
  { v: '2024', l: 'Fundación',    c: VO },
  { v: 'UTN',  l: 'Universidad',  c: CYAN },
  { v: 'San Carlos', l: 'Base',   c: PURPLE },
  { v: 'CR',   l: 'Origen',       c: PINK },
];

function BigNum({ end, suffix, color, delay = 0 }) {
  const ref = useRef(null);
  useGSAP(() => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 1.8, delay, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate: () => { if (ref.current) ref.current.textContent = Math.floor(obj.v) + suffix; },
    });
  }, []);
  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'Syne,sans-serif', fontWeight: 800,
        fontSize: 'clamp(48px,7vw,84px)',
        background: `linear-gradient(180deg, ${color}, ${color}50)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        letterSpacing: '-0.04em', lineHeight: 0.9,
        display: 'inline-block',
        filter: `drop-shadow(0 0 25px ${color}40)`,
      }}
    >
      0{suffix}
    </span>
  );
}

const YEARS_SINCE = new Date().getFullYear() - 2024 || 1;

const PROOF_STATS = [
  { num: 100,         suffix: '%', label: 'Compromiso por proyecto',        color: VO },
  { num: 24,          suffix: 'h', label: 'Tiempo de respuesta promedio',   color: CYAN },
  { num: YEARS_SINCE, suffix: '+', label: `Año${YEARS_SINCE > 1 ? 's' : ''} desarrollando juntos`, color: PURPLE },
  { num: 0,           suffix: '',  label: 'Letras chiquitas o sorpresas',   color: GREEN },
];

export function Manifesto() {
  const root = useRef(null);

  useGSAP(() => {
    const words = root.current?.querySelectorAll('.mani-word');
    if (!words?.length) return;

    gsap.set(words, { opacity: 0.08 });
    ScrollTrigger.create({
      trigger: root.current,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 0.8,
      animation: gsap.to(words, { opacity: 1, stagger: { each: 0.06, from: 'start' }, ease: 'none' }),
    });

    gsap.to('.mani-ghost', {
      xPercent: -15, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });

    gsap.fromTo('.mani-sub, .mani-byline, .mani-proof-card',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.mani-byline', start: 'top 90%' },
      }
    );
  }, { scope: root });

  return (
    <section
      id="manifiesto"
      ref={root}
      style={{ padding: '160px 24px 140px', background: '#050505', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}14, transparent 70%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div
        className="mani-ghost"
        style={{
          position: 'absolute', top: '36%', left: '50%', transform: 'translate(-50%, -50%)',
          fontFamily: 'Syne,sans-serif', fontWeight: 800,
          fontSize: 'clamp(160px, 30vw, 380px)',
          color: 'rgba(255,255,255,0.018)',
          letterSpacing: '-0.05em', lineHeight: 1,
          whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
        }}
      >
        STUDIO · STUDIO
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <p className="mani-sub" style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: VO, marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 28, height: 1, background: VO, display: 'inline-block' }} />
          Manifiesto
        </p>

        <h2 style={{
          fontFamily: 'Syne,sans-serif', fontWeight: 800,
          fontSize: 'clamp(38px, 7.5vw, 110px)',
          color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.98,
          maxWidth: 1100,
        }}>
          {MANIFESTO.map((w, i) => (
            <span
              key={i}
              className="mani-word"
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                color: w.highlight ? 'transparent' : '#fff',
                background: w.highlight
                  ? `linear-gradient(135deg, ${VO}, ${PURPLE})`
                  : undefined,
                WebkitBackgroundClip: w.highlight ? 'text' : undefined,
                WebkitTextFillColor: w.highlight ? 'transparent' : undefined,
                backgroundClip: w.highlight ? 'text' : undefined,
                filter: w.highlight ? `drop-shadow(0 0 30px ${VO}40)` : undefined,
              }}
            >
              {w.word}
            </span>
          ))}
        </h2>

        <div className="mani-byline" style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: 60 }} >
          <div>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 24 }}>
              Somos <strong style={{ color: '#fff', fontWeight: 600 }}>Justin y Zaylin</strong>, dos ingenieros en sistemas graduados de la <strong style={{ color: VO, fontWeight: 600 }}>Universidad Técnica Nacional</strong> en San Carlos, Costa Rica.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 24 }}>
              Empezamos VO Studio porque vimos que muchos negocios locales necesitaban tecnología bien hecha pero no tenían a quién acudir. Las opciones eran caras, distantes o de calidad regular.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
              Nuestra apuesta es <strong style={{ color: '#fff', fontWeight: 600 }}>distinta</strong>: tratamos cada proyecto como si fuera nuestro propio negocio. Sin intermediarios, sin agencias gigantes, sin tiempos eternos. Solo dos ingenieros que aman lo que hacen, trabajando contigo desde el primer día hasta después del lanzamiento.
            </p>

            <div style={{ marginTop: 36, padding: '20px 24px', borderLeft: `3px solid ${VO}`, background: 'rgba(234,97,19,0.05)', borderRadius: '0 16px 16px 0' }}>
              <p style={{ fontFamily: 'Syne,sans-serif', fontStyle: 'italic', fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                "No vendemos sitios web. Vendemos resultados que puedas medir."
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {INTEGRATED_STATS.map((row) => (
              <div key={row.l} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 16, fontSize: 12, padding: '14px 18px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: row.c, boxShadow: `0 0 12px ${row.c}` }} />
                  {row.l}
                </span>
                <span style={{ color: '#fff', fontWeight: 700, fontFamily: 'Syne,sans-serif', fontSize: 14 }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proof stats — small cards */}
        <div style={{ marginTop: 100, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 16 }}>
          {PROOF_STATS.map((s, i) => (
            <div
              key={s.label}
              className="mani-proof-card"
              style={{
                padding: '28px 24px',
                borderRadius: 22,
                background: `linear-gradient(160deg, ${s.color}08 0%, rgba(10,10,10,0.6) 60%)`,
                border: `1px solid ${s.color}20`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${s.color}25, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <BigNum end={s.num} suffix={s.suffix} color={s.color} delay={i * 0.1} />
                <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .mani-byline { grid-template-columns: 1fr !important; gap: 36px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
