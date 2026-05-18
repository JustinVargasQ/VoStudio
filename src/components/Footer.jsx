import { motion } from 'framer-motion';
import { TEAM, VO, VO_LIGHT, PURPLE } from '../data/content';

const NAV = [
  { label: 'Inicio',     href: '#inicio' },
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Proyectos',  href: '#proyectos' },
  { label: 'Proceso',    href: '#proceso' },
  { label: 'Equipo',     href: '#equipo' },
  { label: 'FAQ',        href: '#faq' },
  { label: 'Contacto',   href: '#contacto' },
];

const SERVICES_FOOTER = [
  'Páginas web', 'E-commerce', 'Aplicaciones', 'Sistemas a medida', 'SEO & Marketing', 'Mantenimiento',
];

// Social media — replace href with real URLs when accounts exist
const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com/', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )},
  { name: 'LinkedIn', href: 'https://linkedin.com/', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )},
  { name: 'GitHub', href: 'https://github.com/', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )},
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>
      {/* Top accent gradient */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${VO}50, ${PURPLE}40, transparent)` }} />

      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${VO}10, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}10, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 24px 28px', position: 'relative', zIndex: 2 }}>

        {/* Top: big CTA + logo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 48, marginBottom: 60 }} className="footer-top">
          <div>
            <motion.a
              href="#inicio"
              whileHover={{ scale: 1.02 }}
              style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 26, color: '#fff', textDecoration: 'none', letterSpacing: '-0.02em', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ width: 14, height: 14, borderRadius: '50%', background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`, display: 'inline-block', boxShadow: `0 0 14px ${VO}` }}
              />
              VO <span style={{ color: VO }}>STUDIO</span>
            </motion.a>
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 20 }}>
              ¿Empezamos <span style={{ background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>tu proyecto</span>?
            </p>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${VO}60` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 50,
                background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`,
                color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14,
                boxShadow: `0 0 30px ${VO}40`,
              }}
            >
              Contanos tu idea
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </motion.a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              Disponible para
            </p>
            <p style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, color: '#fff', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              Nuevos proyectos<br /><span style={{ color: '#25D366' }}>· Aceptando consultas</span>
            </p>
            <div style={{ marginTop: 8, display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#25D366', boxShadow: '0 0 10px #25D36680' }} />
              Respondemos en menos de 24h
            </div>
          </div>
        </div>

        {/* Middle: link columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, paddingTop: 36, paddingBottom: 36, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Nav */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18 }}>
              Navegación
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18 }}>
              Servicios
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES_FOOTER.map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18 }}>
              Contacto
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <a href="mailto:hola@vostudio.cr" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}
                >hola@vostudio.cr</a>
              </li>
              {TEAM.map((m) => (
                <li key={m.wa}>
                  <a href={`https://wa.me/${m.wa}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {m.short} · {m.phone.slice(0,4)}-{m.phone.slice(4)}
                  </a>
                </li>
              ))}
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>San Carlos, Costa Rica</li>
            </ul>
          </div>

          {/* Social + newsletter-like */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18 }}>
              Síguenos
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
              {SOCIAL.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={s.name}
                  whileHover={{ y: -3, scale: 1.08, color: VO, borderColor: VO }}
                  style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Compartimos novedades, proyectos y aprendizajes en nuestras redes.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
            © {year} VO Studio · Vargas &amp; Ovares · Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href="#contacto" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Política de privacidad</a>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
            <a href="#contacto" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Términos</a>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              Hecho con <span style={{ color: VO }}>♥</span> en Costa Rica 🇨🇷
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
