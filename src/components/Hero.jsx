import { useRef, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VO, VO_LIGHT, PURPLE } from '../data/content';

const HeroScene = lazy(() => import('../three/HeroScene').then((m) => ({ default: m.HeroScene })));

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { v: 2,    suf: '+',  l: 'Proyectos',   d: 1.2 },
  { v: 100,  suf: '%',  l: 'Compromiso',  d: 1.6 },
  { v: 24,   suf: '/7', l: 'Soporte',     d: 2.0 },
  { v: 'CR', suf: '',   l: 'Hecho aquí',  d: 2.4 },
];

function StatCounter({ end, suffix, duration = 1.6, delay = 0 }) {
  const elRef = useRef(null);
  useGSAP(() => {
    if (typeof end !== 'number') {
      gsap.fromTo(elRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay });
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => { if (elRef.current) elRef.current.textContent = Math.floor(obj.v) + suffix; },
    });
  }, []);
  return <span ref={elRef}>{typeof end === 'number' ? `0${suffix}` : `${end}${suffix}`}</span>;
}

export function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Parallax: title follows mouse subtly
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 18 });
  const smy = useSpring(my, { stiffness: 80, damping: 18 });

  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.x = nx;
      mouse.current.y = ny;
      mx.set(nx * 18);
      my.set(ny * 12);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll-linked transforms
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const yContent  = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opContent = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sceneY    = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sceneScale= useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useGSAP(() => {
    // Letter reveal on mount
    const letters = titleRef.current?.querySelectorAll('.hero-letter');
    if (!letters?.length) return;
    gsap.fromTo(letters,
      { yPercent: 130, opacity: 0, rotateX: -90 },
      {
        yPercent: 0, opacity: 1, rotateX: 0,
        duration: 1.1,
        stagger: 0.05,
        ease: 'power4.out',
        delay: 0.25,
      }
    );
  }, { scope: sectionRef });

  const vo = 'VO'.split('');
  const studio = 'STUDIO'.split('');
  const fontSize = 'clamp(64px, 13vw, 180px)';

  return (
    <section
      id="inicio"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#050505',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', padding: '80px 24px 60px',
      }}
    >
      {/* 3D scene background */}
      <motion.div style={{ position: 'absolute', inset: 0, y: sceneY, scale: sceneScale, opacity: 0.95 }}>
        <Suspense fallback={null}>
          <HeroScene mouse={mouse} />
        </Suspense>
      </motion.div>

      {/* Two restrained orbs — VO + PURPLE */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ position: 'absolute', top: '5%', left: '-12%', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, ${VO}30 0%, transparent 65%)`, filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 12, repeat: Infinity, delay: 5 }}
        style={{ position: 'absolute', bottom: '0%', right: '-10%', width: 650, height: 650, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}22 0%, transparent 65%)`, filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '110px 110px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 90%)',
        }}
      />

      <motion.div style={{ y: yContent, opacity: opContent, position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '9px 20px', borderRadius: 50, marginBottom: 48,
            color: VO,
            background: 'rgba(234,97,19,0.08)',
            border: `1px solid rgba(234,97,19,0.25)`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.span animate={{ scale: [1, 1.7, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: VO, display: 'inline-block', boxShadow: `0 0 8px ${VO}` }} />
          Disponibles para nuevos proyectos · Costa Rica
        </motion.div>

        {/* GSAP animated title with mouse parallax */}
        <motion.div ref={titleRef} style={{ x: smx, y: smy, perspective: 800 }}>
          <div style={{ overflow: 'hidden', lineHeight: 0.9, marginBottom: 4 }}>
            {vo.map((l, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{
                  display: 'inline-block', fontFamily: 'Syne,sans-serif', fontSize, fontWeight: 800,
                  color: '#fff', letterSpacing: '-0.04em', opacity: 0,
                  textShadow: '0 0 40px rgba(255,255,255,0.1)',
                }}
              >
                {l}
              </span>
            ))}
          </div>
          <div style={{ overflow: 'hidden', lineHeight: 0.9, marginBottom: 36 }}>
            {studio.map((l, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{
                  display: 'inline-block', fontFamily: 'Syne,sans-serif', fontSize, fontWeight: 800,
                  letterSpacing: '-0.04em', opacity: 0,
                  background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: `drop-shadow(0 0 20px ${VO}50)`,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8 }}
          style={{
            color: 'rgba(255,255,255,0.45)', fontSize: 19, lineHeight: 1.65,
            maxWidth: 540, margin: '0 auto 44px', fontWeight: 300,
          }}
        >
          Dos ingenieros de la UTN en <span style={{ color: '#fff', fontWeight: 500 }}>San Carlos, Costa Rica</span>, que construyen lo que tu negocio necesita — sin intermediarios, sin agencias, sin excusas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 90 }}
        >
          <motion.a
            href="#proyectos"
            whileHover={{ scale: 1.06, boxShadow: `0 0 60px ${VO}80` }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '16px 36px', borderRadius: 50,
              background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`,
              color: '#fff', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 0 40px ${VO}50`, letterSpacing: '0.02em',
            }}
          >
            Ver proyectos
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >→</motion.span>
          </motion.a>
          <motion.a
            href="#precios"
            whileHover={{ borderColor: `${VO}60`, color: '#fff', background: `${VO}08` }}
            style={{
              padding: '16px 36px', borderRadius: 50, color: 'rgba(255,255,255,0.65)',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.3s', backdropFilter: 'blur(8px)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            Ver precios →
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 24,
            paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.06)',
            maxWidth: 640, margin: '0 auto',
          }}
        >
          {STATS.map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(22px,3.4vw,32px)', color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>
                <StatCounter end={s.v} suffix={s.suf} delay={s.d} />
              </p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 5 }}
      >
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 42, background: `linear-gradient(to bottom, ${VO}, transparent)`, transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
