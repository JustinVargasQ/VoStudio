import { motion } from 'framer-motion';
import { VO, VO_LIGHT, PURPLE } from '../data/content';

export function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#050505',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, textAlign: 'center', flexDirection: 'column', gap: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}20, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, maxWidth: 560 }}
      >
        <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(100px,20vw,200px)', letterSpacing: '-0.05em', lineHeight: 0.85, marginBottom: 8, background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT}, ${PURPLE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: `drop-shadow(0 0 40px ${VO}30)` }}>
          404
        </p>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Esta página no existe
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 36 }}>
          Parece que seguiste un link roto o escribiste mal la URL. No hay drama — desde acá podés volver al inicio.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${VO}60` }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 28px', borderRadius: 50,
              background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`,
              color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            ← Volver al inicio
          </motion.a>
          <motion.a
            href="/#contacto"
            whileHover={{ scale: 1.04 }}
            style={{
              padding: '13px 28px', borderRadius: 50,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 14, textDecoration: 'none',
            }}
          >
            Contactarnos
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
