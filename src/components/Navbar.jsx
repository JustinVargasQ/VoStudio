import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { VO, CAL_LINK } from '../data/content';

const LINKS = [
  { label: 'Manifiesto', id: 'manifiesto' },
  { label: 'Servicios',  id: 'servicios' },
  { label: 'Precios',    id: 'precios' },
  { label: 'Proyectos',  id: 'proyectos' },
  { label: 'Proceso',    id: 'proceso' },
  { label: 'Equipo',     id: 'equipo' },
  { label: 'Contacto',   id: 'contacto' },
];

function MagneticLink({ label, href, active }) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.5);
  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y, position: 'relative', fontSize: 12, fontWeight: active ? 700 : 600, textDecoration: 'none', letterSpacing: '0.04em', display: 'inline-block', padding: '8px 14px', color: active ? '#fff' : 'rgba(255,255,255,0.5)' }}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-active"
          style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: VO, boxShadow: `0 0 8px ${VO}` }}
        />
      )}
    </motion.a>
  );
}

function BookingCTA() {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.4);
  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      title="Agendá una consulta gratis de 15 minutos"
      // Cal.com popup — abre el widget de booking sin salir de la página
      data-cal-link={CAL_LINK}
      data-cal-namespace="vostudio"
      data-cal-config='{"layout":"month_view"}'
      style={{ x, y, fontSize: 12, fontWeight: 700, padding: '10px 22px', borderRadius: 50, background: VO, color: '#fff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, boxShadow: `0 6px 20px ${VO}40`, letterSpacing: '0.02em' }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Agendar gratis
    </motion.button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const getActive = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let found = '';
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= center && el.offsetTop + el.offsetHeight > center) found = id;
      });
      return found;
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setActiveId(getActive());
    };

    // Initial check after layout paint
    const raf = requestAnimationFrame(() => setActiveId(getActive()));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
        background: scrolled ? 'rgba(5,5,5,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.a href="#inicio" whileHover={{ scale: 1.04 }}
          style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 17, color: '#fff', textDecoration: 'none', letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ width: 10, height: 10, borderRadius: '50%', background: VO, display: 'inline-block', boxShadow: `0 0 12px ${VO}` }} />
          VO <span style={{ color: VO }}>STUDIO</span>
        </motion.a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
          {LINKS.map((l) => (
            <MagneticLink key={l.id} label={l.label} href={`#${l.id}`} active={activeId === l.id} />
          ))}
          <div style={{ marginLeft: 14 }}>
            <BookingCTA />
          </div>
        </nav>

        <button onClick={() => setOpen((v) => !v)} aria-label="Menú" className="md:hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: 8, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="13" x2="20" y2="13"/><line x1="4" y1="19" x2="20" y2="19"/></>}
            </svg>
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden', background: 'rgba(5,5,5,0.96)', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
            <div style={{ padding: '12px 24px 20px' }}>
              {LINKS.map((l, i) => (
                <motion.a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 700, color: activeId === l.id ? VO : '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {l.label}
                  <span style={{ color: VO, fontSize: 14 }}>→</span>
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + LINKS.length * 0.04 }}
                data-cal-link={CAL_LINK} data-cal-namespace="vostudio" data-cal-config='{"layout":"month_view"}'
                onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 700, color: VO, background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
                Agendar consulta gratis
                <span style={{ fontSize: 14 }}>↗</span>
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
