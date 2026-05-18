import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VO } from '../data/content';

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          whileHover={{ scale: 1.12, rotate: 6 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 40,
            width: 52, height: 52, borderRadius: '50%',
            background: VO, color: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 30px ${VO}60, 0 0 50px ${VO}40`,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 19V5m-7 7 7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
