import { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Mail, MapPin } from 'lucide-react';

function LinkedInSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
import { A, A_L, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { TEAM } from '../data/content';
import { useApp } from '../context/AppContext';

// ── Static per-member data ─────────────────────────────────────────────────────
const MEMBER_META = [
  {
    color:    A,
    image:    'https://api.dicebear.com/9.x/lorelei/svg?seed=JustinVargas&backgroundColor=EA580C&backgroundType=gradientLinear',
    location_es: 'San Carlos, Costa Rica',
    location_en: 'San Carlos, Costa Rica',
    bio_es:   'Full-stack developer apasionado por construir sistemas robustos y experiencias digitales que convierten visitas en clientes.',
    bio_en:   'Full-stack developer passionate about building robust systems and digital experiences that turn visitors into clients.',
    skills:   ['Node.js', 'React', 'MongoDB'],
    linkedin: '#',
  },
  {
    color:    A_L,
    image:    'https://api.dicebear.com/9.x/lorelei/svg?seed=ZaylinLopez&backgroundColor=A855F7&backgroundType=gradientLinear',
    location_es: 'San Carlos, Costa Rica',
    location_en: 'San Carlos, Costa Rica',
    bio_es:   'Ingeniera especializada en UX/UI y apps móviles. Diseña interfaces que son visualmente atractivas y fáciles de usar.',
    bio_en:   'Engineer specializing in UX/UI and mobile apps. Designs interfaces that are visually striking and effortless to use.',
    skills:   ['UI/UX', 'React Native', 'Figma'],
    linkedin: '#',
  },
];

// ── 3D Tilt Card ───────────────────────────────────────────────────────────────
function MemberCard({ member, meta, index }) {
  const { locale } = useApp();
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2));
    mouseY.set((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2));
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  const role     = locale === 'en' ? member.role_en : member.role_es;
  const bio      = locale === 'en' ? meta.bio_en    : meta.bio_es;
  const location = locale === 'en' ? meta.location_en : meta.location_es;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.6, 0.05, 0.01, 0.9] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
      >
        {/* Card */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 28,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          border: `1px solid rgba(255,255,255,0.08)`,
          boxShadow: hovered
            ? `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${meta.color}44`
            : '0 20px 50px rgba(0,0,0,0.35)',
          transition: 'box-shadow 0.5s ease',
        }}>

          {/* Hover gradient overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 0%, ${meta.color}18, transparent 65%)`,
              pointerEvents: 'none', zIndex: 0,
            }}
          />

          {/* Sparkle on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
            style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, color: meta.color }}
          >
            <Sparkles size={20} />
          </motion.div>

          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(28px, 3vw, 40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

            {/* Avatar */}
            <div style={{ marginBottom: 20 }}>
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ position: 'relative' }}
              >
                {/* Animated halo */}
                <motion.div
                  animate={hovered && !reduced ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: -6, borderRadius: '50%',
                    background: `conic-gradient(${meta.color}88, transparent, ${meta.color}44, transparent)`,
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.4s',
                    filter: 'blur(4px)',
                  }}
                />
                <div style={{
                  width: 112, height: 112, borderRadius: '50%',
                  border: `2px solid rgba(255,255,255,0.12)`,
                  overflow: 'hidden',
                  background: meta.color,
                  position: 'relative',
                }}>
                  <img
                    src={meta.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    onError={(e) => {
                      // Fallback to initials if dicebear fails
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none', position: 'absolute', inset: 0,
                    alignItems: 'center', justifyContent: 'center',
                    fontFamily: F_MONO, fontSize: 28, fontWeight: 700, color: '#fff',
                  }}>
                    {member.initials}
                  </div>
                </div>
                {/* Online dot */}
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute', bottom: 4, right: 4,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#22C55E', border: '2px solid #0A0A0A',
                  }}
                />
              </motion.div>
            </div>

            {/* Name */}
            <motion.h3
              animate={{ scale: hovered ? 1.03 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: F_DISPLAY, fontWeight: 400,
                fontSize: 'clamp(22px, 2vw, 28px)',
                letterSpacing: '-0.02em', color: '#FAFAFA',
                lineHeight: 1.1, textAlign: 'center',
                marginBottom: 10,
              }}
            >
              {member.name}
            </motion.h3>

            {/* Role badge */}
            <div style={{
              fontFamily: F_MONO, fontSize: 9, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: meta.color,
              padding: '5px 14px',
              background: `${meta.color}15`,
              border: `1px solid ${meta.color}33`,
              borderRadius: 999,
              marginBottom: 8,
            }}>
              {locale === 'en' ? 'Systems Engineer' : 'Ingeniero/a en Sistemas'}
            </div>

            {/* Experience + university */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
              <span style={{ fontFamily: F_MONO }}>UTN · San Carlos</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
              <MapPin size={11} />
              <span>{location}</span>
            </div>

            {/* Bio */}
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65, textAlign: 'center',
              maxWidth: '32ch', marginBottom: 16,
            }}>
              {bio}
            </p>

            {/* Email visible */}
            <a href={`mailto:${member.email}`} style={{
              fontFamily: F_MONO, fontSize: 11,
              color: meta.color, letterSpacing: '0.04em',
              borderBottom: `1px solid ${meta.color}50`,
              paddingBottom: 2, marginBottom: 20,
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {member.email}
            </a>

            {/* Skills */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 24 }}
            >
              {meta.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: si * 0.08, type: 'spring' }}
                  style={{
                    fontSize: 11, fontFamily: F_MONO, fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '4px 12px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: LinkedInSVG, href: meta.linkedin, label: 'LinkedIn' },
                { icon: Mail,     href: `mailto:${member.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }, si) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: hovered ? 1 : 0.85, rotate: 0 }}
                  transition={{ delay: hovered ? si * 0.08 : 0, type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.15, backgroundColor: `${meta.color}30` }}
                  style={{
                    width: 38, height: 38, borderRadius: '50%',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'background 0.2s',
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Team() {
  const { locale, t } = useApp();

  return (
    <section id="equipo" style={{
      background: '#0A0A0A',
      padding: `clamp(72px, 11vh, 120px) 0`,
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Animated background blobs */}
      <motion.div aria-hidden
        animate={{ scale: [1, 1.18, 1], rotate: [0, 90, 0], opacity: [0.15, 0.30, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '-10%', right: '-8%',
          width: 480, height: 480, borderRadius: '50%',
          background: `${A}33`, filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div aria-hidden
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0], opacity: [0.10, 0.25, 0.10] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', bottom: '-15%', left: '-8%',
          width: 420, height: 420, borderRadius: '50%',
          background: '#A855F733', filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 72px)' }}
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: F_MONO, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: A, padding: '6px 16px',

              background: `${A}15`, border: `1px solid ${A}33`,
              borderRadius: 999,
            }}>
              <Sparkles size={11} />
              {locale === 'en' ? 'Direct Contact' : 'Hablás Directo Con'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily: F_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(38px, 5.5vw, 70px)',
              lineHeight: 1.0, letterSpacing: '-0.025em',
              marginBottom: 20,
              background: 'linear-gradient(to bottom right, #FAFAFA, rgba(250,250,250,0.55))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {locale === 'en' ? (
              <>You talk directly<br />with the <span style={{ fontStyle: 'italic', WebkitTextFillColor: A, color: A }}>engineers</span></>
            ) : (
              <>Hablás directo<br />con los <span style={{ fontStyle: 'italic', WebkitTextFillColor: A, color: A }}>ingenieros</span></>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', color: 'rgba(255,255,255,0.5)', maxWidth: '48ch', margin: '0 auto', lineHeight: 1.65 }}
          >
            {locale === 'en'
              ? 'Two engineers from UTN San Carlos. We build the software, we answer the messages, we handle the entire project — from design to launch.'
              : 'Dos ingenieros de la UTN San Carlos. Nosotros construimos el software, respondemos los mensajes y manejamos todo el proyecto — del diseño al lanzamiento.'}
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(20px, 3vw, 36px)',
          maxWidth: 860, margin: '0 auto',
        }}>
          {TEAM.map((member, i) => (
            <MemberCard key={member.short} member={member} meta={MEMBER_META[i]} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
