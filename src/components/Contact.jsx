import { motion } from 'framer-motion';
import { BG_ALT, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { TEAM, CAL_LINK, STUDIO_PHONE_FMT, STUDIO_WA } from '../data/content';
import { useApp } from '../context/AppContext';
import { ContactForm } from './ContactForm';
import { SectionHeader } from './Services';

const AVATAR_COLORS = ['#1D4ED8', '#A855F7'];

export function Contact() {
  const { t, locale } = useApp();

  const NEXT_STEPS = [
    { n: '01', title: t('contact.next.1'), sub: t('contact.next.1s') },
    { n: '02', title: t('contact.next.2'), sub: t('contact.next.2s') },
    { n: '03', title: t('contact.next.3'), sub: t('contact.next.3s') },
    { n: '04', title: t('contact.next.4'), sub: t('contact.next.4s') },
  ];

  const CONTACT_METHODS = [
    {
      label: locale === 'en' ? 'WhatsApp · Studio' : 'WhatsApp · Estudio',
      title: `+506 ${STUDIO_PHONE_FMT}`,
      href: `https://wa.me/${STUDIO_WA}`,
      icon: <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.5.5 2.1.6 2.8.5.5 0 1.4-.6 1.7-1.2.2-.6.2-1 .1-1.2zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" fill="currentColor"/>,
      color: '#22C55E',
    },
    {
      label: t('form.label.email'),
      title: 'justinvargas4299@gmail.com',
      href: 'mailto:justinvargas4299@gmail.com',
      icon: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></g>,
      color: '#EA580C',
    },
    {
      label: t('common.cta.schedule'),
      title: 'cal.com/vostudio',
      href: `https://cal.com/${CAL_LINK}`,
      icon: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></g>,
      color: '#A855F7',
    },
  ];

  return (
    <section id="contacto" style={{ background: BG_ALT, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}>
      <span className="blob blob-1" style={{ top: '5%', right: '-10%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(234,88,12,0.08), transparent 70%)' }} />
      <span className="blob blob-2" style={{ bottom: '-10%', left: '-10%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(34,197,94,0.07), transparent 70%)' }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('contact.eyebrow')}
          title={<>{t('contact.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('contact.title.2')}</span>.</>}
          intro={t('contact.intro')}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.4fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }} className="vo-contact-grid">

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            <motion.a
              href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              whileHover={{ y: -4 }}
              style={{
                position: 'relative', overflow: 'hidden',
                background: '#0A0A0A', color: '#fff',
                padding: 28,
                boxShadow: '0 20px 50px rgba(10,10,10,0.2)',
                display: 'block',
              }}
            >
              <motion.span aria-hidden
                animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: '-50%', right: '-30%',
                  width: 280, height: 280, borderRadius: '50%',
                  background: `radial-gradient(circle, ${A} 0%, transparent 65%)`,
                  filter: 'blur(40px)', opacity: 0.5, pointerEvents: 'none',
                }} />
              <div style={{ position: 'relative' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '5px 10px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)',
                  color: '#86efac',
                  fontFamily: F_MONO, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginBottom: 20,
                }}>
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{ width: 6, height: 6, background: '#86efac', borderRadius: '50%' }}
                  />
                  {t('common.eyebrow.accepting').split('·')[0].trim()}
                </div>
                <h3 style={{
                  fontFamily: F_DISPLAY, fontWeight: 400,
                  fontSize: 'clamp(26px, 2.6vw, 34px)', letterSpacing: '-0.02em', lineHeight: 1.05,
                  marginBottom: 12,
                }}>
                  {t('contact.featured.title.1')} <span style={{ fontStyle: 'italic', color: '#86efac' }}>{t('contact.featured.title.2')}</span>
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 22 }}>
                  {t('contact.featured.desc')}
                </p>
                <div className="arrow-slide-parent" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '12px 18px', background: '#fff', color: '#0A0A0A',
                  fontSize: 13, fontWeight: 700,
                }}>
                  {t('common.cta.bookSlot')}
                  <span className="arrow-slide">→</span>
                </div>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}
            >
              <div style={{
                padding: '14px 20px', borderBottom: `1px solid ${BORDER}`,
                fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontWeight: 600,
              }}>
                {t('contact.channels')}
              </div>
              {CONTACT_METHODS.map((m, i) => (
                <a key={m.label} href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="arrow-slide-parent"
                  style={{
                    padding: '16px 20px',
                    borderTop: i > 0 ? `1px solid ${BORDER}` : 'none',
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = BG_ALT}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{
                    width: 38, height: 38, flexShrink: 0,
                    background: `${m.color}12`, color: m.color,
                    border: `1px solid ${m.color}30`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24">{m.icon}</svg>
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: TEXT_D, fontFamily: F_MONO, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{m.label}</div>
                    <div style={{ fontSize: 14, color: TEXT, fontWeight: 600, marginTop: 2 }}>{m.title}</div>
                  </div>
                  <span className="arrow-slide" style={{ color: TEXT_D, fontSize: 14 }}>→</span>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ background: BG_CARD, border: `1px solid ${BORDER}`, padding: 24 }}
            >
              <div style={{
                fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontWeight: 600, marginBottom: 16,
              }}>
                {t('contact.directWith')}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 14,
              }}>
                {TEAM.map((p, i) => (
                  <div key={p.short} style={{
                    padding: 16,
                    border: `1px solid ${BORDER}`,
                    display: 'flex', flexDirection: 'column', gap: 12,
                    background: 'transparent',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: '50%',
                          background: AVATAR_COLORS[i], color: '#fff',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: F_MONO, fontSize: 14, fontWeight: 700,
                        }}>
                          {p.initials}
                        </div>
                        <span style={{
                          position: 'absolute', bottom: 0, right: 0,
                          width: 11, height: 11, background: '#22C55E',
                          border: `2px solid ${BG_CARD}`, borderRadius: '50%',
                        }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: F_DISPLAY, fontSize: 17, color: TEXT, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                          {p.name}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: TEXT_S, fontFamily: F_MONO, lineHeight: 1.4 }}>
                      {locale === 'en' ? p.role_en : p.role_es}
                    </div>
                    <a href={`mailto:${p.email}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 11, color: A, fontWeight: 600,
                        padding: '5px 10px', background: `${A}10`, border: `1px solid ${A}33`,
                        wordBreak: 'break-all', alignSelf: 'flex-start',
                      }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                      {p.email}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </aside>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ContactForm />

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                background: BG_CARD, border: `1px solid ${BORDER}`,
                padding: 'clamp(24px, 3vw, 36px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ width: 24, height: 1, background: A }} />
                <span style={{
                  fontFamily: F_MONO, fontSize: 10, color: TEXT_S,
                  letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                }}>
                  {t('contact.next.eyebrow')}
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 20,
              }}>
                {NEXT_STEPS.map((s, i) => (
                  <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 26, height: 26,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: A, color: '#fff',
                        fontFamily: F_MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                      }}>{s.n}</span>
                      {i < NEXT_STEPS.length - 1 && (
                        <span style={{ flex: 1, height: 1, background: BORDER }} />
                      )}
                    </div>
                    <div style={{
                      fontFamily: F_DISPLAY, fontSize: 17, color: TEXT,
                      letterSpacing: '-0.015em', lineHeight: 1.15,
                    }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: TEXT_S, lineHeight: 1.45 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vo-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
