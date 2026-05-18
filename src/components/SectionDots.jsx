import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VO } from '../data/content';

const SECTIONS = [
  { id: 'inicio',     label: 'Inicio' },
  { id: 'manifiesto', label: 'Manifiesto' },
  { id: 'features',   label: 'Por qué' },
  { id: 'servicios',  label: 'Servicios' },
  { id: 'precios',    label: 'Precios' },
  { id: 'proyectos',  label: 'Proyectos' },
  { id: 'proceso',    label: 'Proceso' },
  { id: 'equipo',     label: 'Equipo' },
  { id: 'faq',        label: 'FAQ' },
  { id: 'contacto',   label: 'Contacto' },
];

export function SectionDots() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const fn = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let curr = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= center && el.offsetTop + el.offsetHeight > center) curr = i;
      });
      setActive(curr);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="hidden lg:flex" style={{ position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 40, flexDirection: 'column', gap: 15 }}>
      {SECTIONS.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={`Ir a ${s.label}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          style={{ position: 'relative', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <motion.span
            animate={{ scale: active === i ? 1 : 0.5, background: active === i ? VO : 'rgba(255,255,255,0.35)' }}
            style={{ width: 8, height: 8, borderRadius: '50%' }}
          />
          {active === i && (
            <motion.span layoutId="dot-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${VO}`, opacity: 0.5 }} />
          )}
          {hover === i && (
            <motion.span
              initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
              style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', background: '#0a0a0a', padding: '5px 10px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}
            >
              {s.label}
            </motion.span>
          )}
        </a>
      ))}
    </div>
  );
}
