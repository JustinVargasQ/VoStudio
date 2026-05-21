import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STUDIO_WA } from '../data/content';
import { useApp } from '../context/AppContext';

export function WhatsAppFloat() {
  const { locale } = useApp();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const label = locale === 'en' ? 'Chat with us' : '¡Escribinos!';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9000, display: 'flex', alignItems: 'center', gap: 12 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: '#111', color: '#fff',
                  fontSize: 12, fontWeight: 600,
                  padding: '6px 12px', borderRadius: 8,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  pointerEvents: 'none',
                }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={`https://wa.me/${STUDIO_WA}?text=${encodeURIComponent(locale === 'en' ? 'Hi! I found you on your website and I\'d like to know more about your services.' : '¡Hola! Los encontré en su página web y me gustaría saber más sobre sus servicios.')}`}
            target="_blank" rel="noreferrer"
            aria-label="WhatsApp"
            style={{ position: 'relative', display: 'inline-flex' }}
          >
            {/* Pulse rings */}
            <span style={{
              position: 'absolute', inset: -6, borderRadius: '50%',
              background: 'rgba(37,211,102,0.25)',
              animation: 'wa-pulse 2.5s ease-out infinite',
            }} />
            <span style={{
              position: 'absolute', inset: -3, borderRadius: '50%',
              background: 'rgba(37,211,102,0.15)',
              animation: 'wa-pulse 2.5s ease-out infinite',
              animationDelay: '0.5s',
            }} />

            <motion.div
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.94 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#25D366',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 28px rgba(37,211,102,0.55)',
                position: 'relative',
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </motion.div>
          </a>

          <style>{`
            @keyframes wa-pulse {
              0%   { transform: scale(1); opacity: 1; }
              100% { transform: scale(1.8); opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
