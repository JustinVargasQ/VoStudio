import { motion } from 'framer-motion';
import { A, A_D, A_L, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';
import { CTAVisual } from './CTAVisual';

export function CTABanner() {
  const { t } = useApp();
  return (
    <section style={{
      background: A,
      padding: `clamp(64px, 10vw, 110px) 0`,
      position: 'relative', overflow: 'hidden',
    }}>
      <motion.span aria-hidden
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600,
          background: `radial-gradient(circle, ${A_L} 0%, transparent 60%)`,
          filter: 'blur(60px)', opacity: 0.55,
        }} />
      <motion.span aria-hidden
        animate={{ x: [0, -50, 40, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '-25%', right: '-10%', width: 700, height: 700,
          background: `radial-gradient(circle, ${A_D} 0%, transparent 65%)`,
          filter: 'blur(80px)', opacity: 0.6,
        }} />
      <div className="bg-dot" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }} className="vo-cta-row">

          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}
            >
              <motion.span
                initial={{ width: 0 }} whileInView={{ width: 28 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ height: 1, background: '#fff' }}
              />
              <span style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
                {t('cta.eyebrow')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.21, 0.61, 0.35, 1] }}
              style={{
                fontFamily: F_DISPLAY, fontWeight: 400,
                fontSize: 'clamp(36px, 5.5vw, 76px)',
                lineHeight: 1, letterSpacing: '-0.025em',
                color: '#fff',
              }}
            >
              {t('cta.title.1')}<br />
              <span style={{ fontStyle: 'italic' }}>{t('cta.title.2')}</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ marginTop: 28, fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.88)', maxWidth: '46ch' }}
            >
              {t('cta.desc')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.35 }}
              style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <motion.a href="#contacto"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="arrow-slide-parent"
                style={{
                  background: '#fff', color: A,
                  padding: '15px 26px', fontSize: 14, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  boxShadow: '0 14px 40px rgba(0,0,0,0.25)',
                }}
              >
                {t('common.cta.startNow')} <span className="arrow-slide" style={{ fontSize: 16 }}>→</span>
              </motion.a>
              <motion.a href="https://cal.com/vostudio/consulta-gratuita" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: '15px 26px', fontSize: 14, fontWeight: 600,
                  color: '#fff', border: '1px solid rgba(255,255,255,0.5)',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {t('common.cta.schedule')}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                marginTop: 36,
                display: 'flex', gap: 20, flexWrap: 'wrap',
                paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              {[0,1,2].map((i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: F_DISPLAY, fontStyle: 'italic',
                    fontSize: 24, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em',
                  }}>{t(`cta.trust.${i+1}.v`)}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginTop: 4 }}>
                    {t(`cta.trust.${i+1}.l`)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="vo-cta-visual">
            <CTAVisual />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vo-cta-row { grid-template-columns: 1fr !important; }
          .vo-cta-visual { max-width: 400px; margin-inline: auto; }
        }
        @media (max-width: 560px) {
          /* On small phones the overlapping cards look broken — hide visual, show trust stats only */
          .vo-cta-visual { display: none !important; }
        }
        /* Scale font/padding inside the visual cards at mid-widths */
        @media (max-width: 400px) {
          .vo-cta-visual-wrap { font-size: 11px; }
        }
      `}</style>
    </section>
  );
}
