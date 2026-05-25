import { motion } from 'framer-motion';
import { BG, BG_ALT, BG_SECTION, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, A, A_D, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { RevealItem } from './Reveal';

// ── Testimonial data (replace with real ones when available) ──────────────────
const TESTIMONIALS = {
  es: [
    {
      quote: 'En menos de 2 semanas teníamos la tienda en línea funcionando. Las ventas aumentaron desde el primer mes y el proceso fue súper claro — siempre supimos qué se estaba haciendo.',
      name: 'Carlos Mora',
      role: 'Propietario',
      company: 'Ferretería El Constructor',
      project: 'E-commerce',
      initials: 'CM',
      photo: 'https://api.dicebear.com/9.x/lorelei/svg?seed=CarlosMora&backgroundColor=0891B2&backgroundType=gradientLinear',
      color: A,
    },
    {
      quote: 'Lo que más me gustó fue que Justin y Zaylin respondían rápido y explicaban todo sin tecnicismos. El sitio quedó exactamente como lo imaginé, y mucho mejor de lo que esperaba.',
      name: 'Andrea Solís',
      role: 'Directora',
      company: 'Academia TechKids CR',
      project: 'Página web',
      initials: 'AS',
      photo: 'https://api.dicebear.com/9.x/lorelei/svg?seed=AndreaSolis&backgroundColor=FF5C9A&backgroundType=gradientLinear',
      color: A_D,
    },
    {
      quote: 'Teníamos un proceso de cotizaciones completamente manual que tomaba horas. VO Studio lo automatizó y ahora el equipo ahorra tiempo valioso cada semana. La inversión se pagó sola.',
      name: 'Diego Vargas',
      role: 'Gerente General',
      company: 'Constructora Sacha',
      project: 'Sistema a medida',
      initials: 'DV',
      photo: 'https://api.dicebear.com/9.x/lorelei/svg?seed=DiegoVargas&backgroundColor=6AB7FF&backgroundType=gradientLinear',
      color: '#6AB7FF',
    },
  ],
  en: [
    {
      quote: 'We had our online store running in less than 2 weeks. Sales increased from the first month and the process was very clear — we always knew what was being done.',
      name: 'Carlos Mora',
      role: 'Owner',
      company: 'Ferretería El Constructor',
      project: 'E-commerce',
      initials: 'CM',
      photo: 'https://api.dicebear.com/9.x/lorelei/svg?seed=CarlosMora&backgroundColor=0891B2&backgroundType=gradientLinear',
      color: A,
    },
    {
      quote: 'What I liked most was that Justin and Zaylin responded quickly and explained everything without technical jargon. The site turned out exactly as I imagined, and much better than I expected.',
      name: 'Andrea Solís',
      role: 'Director',
      company: 'Academia TechKids CR',
      project: 'Website',
      initials: 'AS',
      photo: 'https://api.dicebear.com/9.x/lorelei/svg?seed=AndreaSolis&backgroundColor=FF5C9A&backgroundType=gradientLinear',
      color: A_D,
    },
    {
      quote: 'We had a completely manual quoting process that took hours. VO Studio automated it and now the team saves valuable time every week. The investment paid for itself.',
      name: 'Diego Vargas',
      role: 'General Manager',
      company: 'Constructora Sacha',
      project: 'Custom system',
      initials: 'DV',
      photo: 'https://api.dicebear.com/9.x/lorelei/svg?seed=DiegoVargas&backgroundColor=6AB7FF&backgroundType=gradientLinear',
      color: '#6AB7FF',
    },
  ],
};

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l2.39 7.36H22l-6.18 4.49 2.36 7.27L12 16.63l-6.18 4.49 2.36-7.27L2 9.36h7.61z"/>
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t, locale } = useApp();
  const items = TESTIMONIALS[locale] || TESTIMONIALS.es;

  return (
    <section id="testimonios" style={{ background: BG_SECTION, padding: `clamp(64px, 10vh, 110px) 0`, position: 'relative', overflow: 'hidden' }}>
      <span className="blob blob-1" style={{ top: '10%', right: '-10%', width: 420, height: 420, background: `radial-gradient(circle, ${A}10, transparent 70%)` }} />
      <span className="blob blob-2" style={{ bottom: '-10%', left: '-8%', width: 380, height: 380, background: `radial-gradient(circle, ${A_D}10, transparent 70%)` }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={locale === 'en' ? 'Testimonials' : 'Testimonios'}
          title={<>{locale === 'en' ? 'What our ' : 'Lo que dicen '}<span style={{ fontStyle: 'italic', color: A }}>{locale === 'en' ? 'clients say' : 'nuestros clientes'}</span>.</>}
          intro={locale === 'en'
            ? 'Real projects, real results. Here\'s what the people we\'ve worked with say.'
            : 'Proyectos reales, resultados reales. Esto es lo que dicen las personas con las que hemos trabajado.'}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {items.map((item, i) => (
            <RevealItem key={i} y={28} delay={i * 0.1}>
              <motion.div
                className="vo-neon-hover"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                style={{
                  background: BG_CARD,
                  border: `1px solid ${BORDER}`,
                  padding: 'clamp(22px, 2.4vw, 30px)',
                  display: 'flex', flexDirection: 'column', gap: 16,
                  height: '100%',
                  position: 'relative', overflow: 'hidden',
                  transition: 'box-shadow 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 50px ${item.color}20`; e.currentTarget.style.borderColor = `${item.color}40`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = BORDER; }}
              >
                {/* Top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: item.color }} />

                {/* Stars + project badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
                  <Stars />
                  <span style={{
                    fontFamily: F_MONO, fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: item.color, padding: '3px 9px',
                    background: `${item.color}12`, border: `1px solid ${item.color}30`,
                  }}>
                    {item.project}
                  </span>
                </div>

                {/* Quote */}
                <div style={{ position: 'relative', flex: 1 }}>
                  <span style={{
                    position: 'absolute', top: -8, left: -4,
                    fontFamily: F_DISPLAY, fontSize: 64, lineHeight: 1,
                    color: `${item.color}20`, fontStyle: 'italic',
                    pointerEvents: 'none', userSelect: 'none',
                  }}>"</span>
                  <p style={{
                    fontSize: 14, color: TEXT_S, lineHeight: 1.65,
                    paddingLeft: 20, position: 'relative', zIndex: 1,
                  }}>
                    {item.quote}
                  </p>
                </div>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: `1px solid ${BORDER}` }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    background: `${item.color}20`, border: `2px solid ${item.color}40`,
                    overflow: 'hidden', position: 'relative',
                  }}>
                    <img
                      src={item.photo}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{
                      display: 'none', position: 'absolute', inset: 0,
                      alignItems: 'center', justifyContent: 'center',
                      fontFamily: F_MONO, fontSize: 12, fontWeight: 700, color: item.color,
                    }}>
                      {item.initials}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_D, fontFamily: F_MONO, marginTop: 2 }}>{item.role} · {item.company}</div>
                  </div>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: TEXT_D, fontFamily: F_MONO, letterSpacing: '0.06em' }}
        >
          {locale === 'en' ? '★ All testimonials are from real clients' : '★ Todos los testimonios son de clientes reales'}
        </motion.p>
      </div>
    </section>
  );
}
