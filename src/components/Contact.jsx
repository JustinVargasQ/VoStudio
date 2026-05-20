import { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Mail, MapPin } from 'lucide-react';
import { BG_ALT, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, A, A_L, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { TEAM, CAL_LINK, STUDIO_PHONE_FMT, STUDIO_WA } from '../data/content';
import { useApp } from '../context/AppContext';
import { ContactForm } from './ContactForm';
import { SectionHeader } from './Services';

// ── Per-member extra data ─────────────────────────────────────────────────────
const CONTACT_META = [
  {
    color:  A,
    image:  'https://api.dicebear.com/9.x/lorelei/svg?seed=JustinVargas&backgroundColor=EA580C&backgroundType=gradientLinear',
    bio_es: 'Full-stack developer apasionado por construir sistemas robustos y experiencias digitales.',
    bio_en: 'Full-stack developer passionate about robust systems and digital experiences.',
    skills: ['Node.js', 'React', 'MongoDB'],
  },
  {
    color:  A_L,
    image:  'https://api.dicebear.com/9.x/lorelei/svg?seed=ZaylinLopez&backgroundColor=A855F7&backgroundType=gradientLinear',
    bio_es: 'Especialista en UX/UI y apps móviles. Diseña interfaces atractivas y fáciles de usar.',
    bio_en: 'UX/UI & mobile specialist. Designs compelling interfaces.',
    skills: ['UI/UX', 'React Native', 'Figma'],
  },
];

// ── Rich member card (theme-aware, 3D tilt) ───────────────────────────────────
function ContactMemberCard({ member, meta }) {
  const { locale } = useApp();
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width  / 2) / (r.width  / 2));
    mouseY.set((e.clientY - r.top  - r.height / 2) / (r.height / 2));
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  const bio = locale === 'en' ? meta.bio_en : meta.bio_es;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
      >
        <div style={{
          background: BG_CARD, border: `1px solid ${BORDER}`,
          borderRadius: 16, overflow: 'hidden',
          boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.12), 0 0 0 1px ${meta.color}33` : 'none',
          transition: 'box-shadow 0.4s',
        }}>
          {/* Color top bar */}
          <div style={{ height: 3, background: meta.color }} />

          {/* Hover gradient */}
          <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${meta.color}08, transparent 60%)`, pointerEvents: 'none', borderRadius: 16 }} />

          {/* Sparkle */}
          <motion.div animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
            style={{ position: 'absolute', top: 14, right: 14, color: meta.color, zIndex: 2 }}>
            <Sparkles size={16} />
          </motion.div>

          <div style={{ padding: '16px 18px', display: 'flex', gap: 14, position: 'relative' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <motion.div whileHover={{ scale: 1.06 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  border: `2px solid ${meta.color}40`,
                  overflow: 'hidden', background: meta.color,
                  position: 'relative',
                }}>
                  <img src={meta.image} alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex'; }}
                  />
                  <div style={{ display:'none', position:'absolute', inset:0, alignItems:'center', justifyContent:'center', fontFamily:F_MONO, fontSize:18, fontWeight:700, color:'#fff' }}>
                    {member.initials}
                  </div>
                </div>
                <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity }}
                  style={{ position:'absolute', bottom:2, right:2, width:11, height:11, borderRadius:'50%', background:'#22C55E', border:`2px solid ${BG_CARD}` }} />
              </motion.div>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily:F_DISPLAY, fontSize:17, color:TEXT, letterSpacing:'-0.015em', lineHeight:1.1, marginBottom:6 }}>
                {member.name}
              </div>
              <div style={{
                display:'inline-flex', alignItems:'center',
                fontFamily:F_MONO, fontSize:9, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase',
                color:meta.color, padding:'3px 10px',
                background:`${meta.color}12`, border:`1px solid ${meta.color}30`,
                borderRadius:999, marginBottom:8,
              }}>
                {locale === 'en' ? 'Systems Engineer' : 'Ingeniero/a en Sistemas'}
              </div>
              <p style={{ fontSize:12.5, color:TEXT_S, lineHeight:1.5, marginBottom:10 }}>{bio}</p>

              {/* Skills */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:10 }}>
                {meta.skills.map(s => (
                  <span key={s} style={{
                    fontSize:10, fontFamily:F_MONO, fontWeight:600,
                    padding:'3px 9px', borderRadius:999,
                    background:BG_ALT, border:`1px solid ${BORDER}`,
                    color:TEXT_S,
                  }}>{s}</span>
                ))}
              </div>

              {/* Email */}
              <a href={`mailto:${member.email}`} style={{
                display:'inline-flex', alignItems:'center', gap:6,
                fontSize:11, fontFamily:F_MONO, color:meta.color,
                borderBottom:`1px solid ${meta.color}40`, paddingBottom:1,
                transition:'opacity 0.2s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.opacity='0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity='1'}
              >
                <Mail size={10} />
                {member.email}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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

            {/* Rich team cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                {t('contact.directWith')}
              </div>
              {TEAM.map((p, i) => (
                <ContactMemberCard key={p.short} member={p} meta={CONTACT_META[i]} />
              ))}
            </div>
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
