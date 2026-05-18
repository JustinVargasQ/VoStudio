import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, VO, VO_LIGHT } from '../data/content';
import { useIsMobile, useIsTouch } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

function BrowserMockup({ project, enableTilt = true }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (!enableTilt) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateZ(20px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)'; };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        width: '100%', maxWidth: 560, aspectRatio: '16/10',
        background: '#0c0c0c', borderRadius: 14, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: `0 50px 100px -20px rgba(0,0,0,0.7), 0 0 80px ${project.color}25`,
        transition: 'transform 0.4s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0a' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
          {project.url ? new URL(project.url).hostname : 'utn-maps.app'}
        </span>
      </div>
      <div style={{ position: 'relative', height: 'calc(100% - 36px)', background: `linear-gradient(135deg, ${project.color}40 0%, #0a0a0a 60%)`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: project.color, opacity: 0.25, filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: project.color, opacity: 0.15, filter: 'blur(50px)' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 56, marginBottom: 4 }}>{project.emoji}</div>
          <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 50, background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'inline-block', letterSpacing: '0.08em', backdropFilter: 'blur(8px)' }}>
            {project.tag}
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 24, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>{project.name}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {project.techs.slice(0, 3).map((t) => (
              <span key={t} style={{ fontSize: 9, padding: '3px 8px', borderRadius: 50, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectContent({ p }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{
          fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(60px,7vw,96px)',
          background: `linear-gradient(135deg, ${p.color}, ${VO_LIGHT})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          letterSpacing: '-0.04em', lineHeight: 1,
        }}>{p.num}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 50, background: `${p.color}20`, color: p.color, letterSpacing: '0.08em' }}>{p.tag}</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{p.year}</span>
      </div>
      <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1 }}>
        {p.name}
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>

      {p.challenge && (
        <div style={{ marginBottom: 18, padding: '14px 16px', borderLeft: `2px solid ${p.color}`, background: `${p.color}08`, borderRadius: '0 10px 10px 0' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.color, marginBottom: 6 }}>
            El reto
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{p.challenge}</p>
        </div>
      )}

      {p.approach && (
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
            Qué hicimos
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.approach.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
                <span style={{ color: p.color, marginTop: 2, flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 26, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {p.metrics.map((m) => (
          <div key={m.l}>
            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 20, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{m.v}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{m.l}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
        {p.techs.map((t) => (
          <span key={t} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 50, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>{t}</span>
        ))}
      </div>

      {p.url ? (
        <motion.a
          href={p.url} target="_blank" rel="noopener noreferrer"
          whileHover={{ x: 8 }}
          style={{
            fontSize: 14, fontWeight: 700, color: '#fff', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 24px', borderRadius: 50,
            background: p.color, boxShadow: `0 0 30px ${p.color}40`,
          }}
        >
          Ver proyecto en vivo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </motion.a>
      ) : (
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
          Proyecto institucional · UTN
        </span>
      )}
    </>
  );
}

export function Projects() {
  const root = useRef(null);
  const trackRef = useRef(null);
  const isMobile = useIsMobile();
  const isTouch = useIsTouch();

  useGSAP(() => {
    // Header always animates
    gsap.fromTo('.proj-head > *',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-head', start: 'top 85%' },
      }
    );

    // Horizontal scroll ONLY on desktop (and non-touch)
    if (isMobile || isTouch) {
      // Vertical reveal on mobile
      const panels = gsap.utils.toArray('.proj-vertical');
      panels.forEach((panel, i) => {
        gsap.fromTo(panel,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 85%' },
            delay: i * 0.1,
          }
        );
      });
      return;
    }

    if (!trackRef.current) return;
    const track = trackRef.current;
    const sections = track.querySelectorAll('.proj-panel');
    if (!sections.length) return;

    const totalScroll = () => track.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(track, {
      x: () => -totalScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        pin: true,
        scrub: 0.6,
        start: 'top top',
        end: () => `+=${totalScroll() + window.innerHeight * 0.5}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    sections.forEach((panel) => {
      const inner = panel.querySelectorAll('.proj-fade');
      gsap.fromTo(inner,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: root, dependencies: [isMobile, isTouch] });

  // ─── MOBILE/TOUCH: vertical layout ───
  if (isMobile || isTouch) {
    return (
      <section id="proyectos" ref={root} style={{ padding: '100px 24px 80px', background: '#080808', position: 'relative' }}>
        <div className="proj-head" style={{ marginBottom: 60 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 28, height: 1, background: VO }} />
            Nuestro trabajo
          </p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(36px,8vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95 }}>
            Proyectos <span style={{ color: VO }}>destacados</span>.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className="proj-vertical"
              style={{
                display: 'flex', flexDirection: 'column', gap: 28,
                padding: 24, borderRadius: 28,
                background: `linear-gradient(160deg, ${p.color}10 0%, rgba(10,10,10,0.6) 60%)`,
                border: `1px solid ${p.color}25`,
              }}
            >
              <BrowserMockup project={p} enableTilt={false} />
              <ProjectContent p={p} />
            </div>
          ))}

          <div className="proj-vertical" style={{ textAlign: 'center', padding: '40px 24px', borderRadius: 28, background: `linear-gradient(135deg, ${VO}10, rgba(10,10,10,0.6))`, border: `1px solid ${VO}25` }}>
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
              ¿El próximo es <span style={{ color: VO }}>el tuyo?</span>
            </p>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 50, background: VO, color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13, marginTop: 8 }}
            >
              Contanos tu idea →
            </motion.a>
          </div>
        </div>
      </section>
    );
  }

  // ─── DESKTOP: horizontal scroll ───
  return (
    <section id="proyectos" ref={root} style={{ background: '#080808', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="proj-head" style={{ position: 'absolute', top: '8%', left: 0, right: 0, zIndex: 10, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 28, height: 1, background: VO }} />
              Nuestro trabajo
            </p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95 }}>
              Proyectos <span style={{ color: VO }}>destacados</span>.
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span>Scroll</span>
            <motion.svg width="34" height="14" viewBox="0 0 34 14" fill="none" animate={{ x: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <path d="M1 7H33M33 7L27 1M33 7L27 13" stroke={VO} strokeWidth="1.5" />
            </motion.svg>
          </div>
        </div>

        <div ref={trackRef} style={{ display: 'flex', willChange: 'transform', height: '70vh', alignItems: 'center', paddingLeft: '8vw', paddingRight: '8vw' }}>
          {PROJECTS.map((p) => (
            <div key={p.name} className="proj-panel" style={{ width: 'min(85vw, 1100px)', flexShrink: 0, paddingRight: 64, display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
              <div className="proj-fade" style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
                <BrowserMockup project={p} enableTilt={!isTouch} />
              </div>
              <div className="proj-fade" style={{ flex: '1 1 320px', maxWidth: 440 }}>
                <ProjectContent p={p} />
              </div>
            </div>
          ))}

          <div className="proj-panel" style={{ width: '40vw', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="proj-fade" style={{ textAlign: 'center', maxWidth: 360 }}>
              <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 14 }}>
                ¿El próximo es <span style={{ color: VO }}>el tuyo?</span>
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 28 }}>
                Estamos abiertos a nuevos retos. Si tenés una idea, queremos escucharla.
              </p>
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 50, background: VO, color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14, boxShadow: `0 0 40px ${VO}50` }}
              >
                Contanos tu idea →
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
