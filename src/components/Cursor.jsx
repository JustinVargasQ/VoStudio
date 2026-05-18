import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { VO } from '../data/content';

export function Cursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 400, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 400, damping: 28, mass: 0.5 });
  const [variant, setVariant] = useState('default'); // default | link | drag | text

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    const over = (e) => {
      const t = e.target;
      const cursorAttr = t.closest?.('[data-cursor]')?.dataset?.cursor;
      if (cursorAttr) return setVariant(cursorAttr);
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest?.('a') || t.closest?.('button')) {
        return setVariant('link');
      }
      if (['INPUT', 'TEXTAREA', 'P', 'H1', 'H2', 'H3', 'SPAN'].includes(t.tagName)) {
        return setVariant('text');
      }
      setVariant('default');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sizes = {
    default: { dot: 6,  ring: 32, color: 'rgba(255,255,255,0.25)', text: '' },
    link:    { dot: 0,  ring: 64, color: VO,                       text: '' },
    drag:    { dot: 0,  ring: 78, color: VO,                       text: 'DRAG' },
    text:    { dot: 3,  ring: 20, color: 'rgba(255,255,255,0.4)',  text: '' },
  };
  const s = sizes[variant] || sizes.default;

  return (
    <>
      <motion.div
        style={{ position: 'fixed', top: 0, left: 0, x: mx, y: my, translateX: '-50%', translateY: '-50%', zIndex: 9999, pointerEvents: 'none' }}
        animate={{ width: s.dot, height: s.dot, opacity: s.dot ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: VO }} />
      </motion.div>
      <motion.div
        style={{ position: 'fixed', top: 0, left: 0, x: sx, y: sy, translateX: '-50%', translateY: '-50%', zIndex: 9998, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        animate={{
          width: s.ring,
          height: s.ring,
          borderColor: s.color,
          backgroundColor: variant === 'link' ? `${VO}22` : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      >
        <div style={{ width: s.ring, height: s.ring, border: `1.5px solid ${s.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: variant === 'link' ? `${VO}22` : 'transparent', transition: 'background 0.2s' }}>
          {s.text && <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: '#fff' }}>{s.text}</span>}
        </div>
      </motion.div>
    </>
  );
}
