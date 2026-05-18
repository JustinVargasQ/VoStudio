import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM, VO, VO_LIGHT } from '../data/content';
import { useIsTouch } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const WA = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function TeamCard({ member, index, isTouch }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-120, 120], [10, -10]);
  const ry = useTransform(x, [-120, 120], [-10, 10]);
  const sx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sy = useSpring(ry, { stiffness: 220, damping: 22 });

  const onMove = (e) => {
    if (isTouch) return;
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const isPrimary = member.color === VO;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="team-card"
      style={{
        rotateX: isTouch ? 0 : sx,
        rotateY: isTouch ? 0 : sy,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 100%)',
        borderRadius: 32,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        height: '100%',
        position: 'relative',
        transform: 'translateZ(20px)',
        boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 60px ${isPrimary ? VO + '15' : 'rgba(255,255,255,0.05)'}`,
      }}>
        {/* Accent top */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${isPrimary ? VO : '#fff'}, transparent)` }} />

        {/* Background glow */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${isPrimary ? VO : '#fff'}15, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

        {/* Top header */}
        <div style={{ padding: '40px 36px 28px', display: 'flex', alignItems: 'flex-start', gap: 22, position: 'relative', zIndex: 2 }}>
          <motion.div
            whileHover={{ rotate: [-3, 3, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 80, height: 80, borderRadius: 22,
              background: isPrimary
                ? `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`
                : 'linear-gradient(135deg, #fff, #ddd)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 30,
              color: isPrimary ? '#fff' : '#050505',
              flexShrink: 0,
              boxShadow: `0 0 40px ${isPrimary ? VO : '#fff'}40`,
            }}
          >
            {member.initials}
          </motion.div>
          <div style={{ paddingTop: 8 }}>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 19, color: '#fff', lineHeight: 1.25, marginBottom: 6 }}>
              {member.name}
            </h3>
            <p style={{ fontSize: 12, fontWeight: 700, color: isPrimary ? VO : 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
              {member.role}
            </p>
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding: '0 36px', position: 'relative', zIndex: 2 }}>
          <div style={{
            padding: '18px 22px', borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: 22,
            position: 'relative',
          }}>
            <span style={{ position: 'absolute', top: -6, left: 14, fontSize: 40, color: isPrimary ? VO : 'rgba(255,255,255,0.3)', fontFamily: 'Syne,sans-serif', lineHeight: 1 }}>"</span>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontStyle: 'italic', paddingLeft: 12 }}>{member.quote}</p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '0 36px 36px', position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 26 }}>{member.bio}</p>

          <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Stack & habilidades</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
            {member.skills.map((s, si) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + si * 0.04 + index * 0.1 }}
                whileHover={{ scale: 1.08, background: isPrimary ? VO + '20' : 'rgba(255,255,255,0.08)' }}
                style={{
                  fontSize: 11, padding: '5px 12px', borderRadius: 50,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          <motion.a
            href={`https://wa.me/${member.wa}?text=Hola ${member.short}! Vi el sitio de VO Studio.`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 13, fontWeight: 700, color: '#fff',
              background: '#25D366', padding: '12px 22px', borderRadius: 50,
              textDecoration: 'none', boxShadow: '0 0 30px rgba(37,211,102,0.3)',
            }}
          >
            <WA /> {member.phone.slice(0,4)}-{member.phone.slice(4)}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  const root = useRef(null);
  const isTouch = useIsTouch();

  useGSAP(() => {
    gsap.fromTo('.team-head > *',
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.team-head', start: 'top 85%' },
      }
    );

    const cards = gsap.utils.toArray('.team-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      );
    });
  }, { scope: root });

  return (
    <section
      id="equipo"
      ref={root}
      style={{ padding: '140px 24px 160px', background: '#050505', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '30%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${VO}10, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div className="team-head" style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VO, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 28, height: 1, background: VO }} />
            Quiénes somos
          </p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(46px,7vw,96px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 22 }}>
            El equipo <br />
            <span style={{ background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>detrás del código.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 560, lineHeight: 1.7 }}>
            Dos ingenieros graduados de la Universidad Técnica Nacional de Costa Rica, con visión clara y compromiso total con cada proyecto.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px,1fr))', gap: 28 }}>
          {TEAM.map((m, i) => <TeamCard key={m.initials} member={m} index={i} isTouch={isTouch} />)}
        </div>
      </div>
    </section>
  );
}
