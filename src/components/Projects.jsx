import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BG, BG_ALT, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';

// Project images
import jdMain from '../assets/JDVIRTUAL/JD.png';
import utnHome from '../assets/UTNMAPS/Pantalla de Inicio.png';
import utnDirectorio from '../assets/UTNMAPS/Directorio .png';
import utnDron from '../assets/UTNMAPS/Dron con Puntos.png';
import utnCamaras from '../assets/UTNMAPS/Camaras Borradas.png';

const PROJECT_MEDIA = [
  {
    gallery: [jdMain],
    labels: ['Tienda'],
  },
  {
    gallery: [utnDron, utnHome, utnDirectorio, utnCamaras],
    labels: ['Mapa 3D', 'Inicio', 'Directorio', 'Cámaras'],
  },
];

function ProjectPanel({ project, media, t, isDark }) {
  const [activeImg, setActiveImg] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  // v4 → v5: stage swapped from terracotta-era cream/charcoal to neon-nebula palette.
  const stageBg     = isDark ? '#0F0820' : '#F6F2FF';
  const dotColor    = isDark ? 'rgba(232,223,255,0.08)' : 'rgba(138,70,255,0.10)';
  const watermark   = isDark ? 'rgba(232,223,255,0.07)' : 'rgba(93,43,255,0.10)';
  const metaColor   = isDark ? 'rgba(232,223,255,0.55)' : 'rgba(27,16,48,0.55)';
  const vignetteBg  = isDark ? 'rgba(15,8,32,0.4)' : 'rgba(246,242,255,0.4)';

  return (
    <div ref={ref} style={{
      minHeight: '100svh',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.55fr) minmax(320px, 1fr)',
      borderTop: `1px solid ${BORDER}`,
    }} className="vo-proj-panel">

      {/* ── Left: cinematic image stage ── */}
      <div style={{
        position: 'relative',
        background: stageBg,
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100svh',
      }}>
        {/* Dotted grid backdrop */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 90%)',
        }} />

        {/* Ambient terracotta glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '20%', right: '15%',
          width: 380, height: 380, borderRadius: '50%',
          background: `radial-gradient(circle, ${A}25 0%, transparent 65%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />

        {/* Big editorial number watermark */}
        <div aria-hidden style={{
          position: 'absolute', top: 'clamp(20px, 3vw, 40px)', left: 'clamp(24px, 3vw, 48px)',
          fontFamily: F_DISPLAY, fontStyle: 'italic',
          fontSize: 'clamp(72px, 9vw, 160px)',
          color: watermark,
          lineHeight: 0.9, letterSpacing: '-0.03em',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          {project.num}
        </div>

        {/* The image with parallax */}
        <motion.div
          key={activeImg}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.61, 0.35, 1] }}
          style={{
            position: 'relative',
            maxWidth: '78%',
            maxHeight: '76%',
            zIndex: 1,
          }}
        >
          <motion.img
            src={media.gallery[activeImg]}
            alt={project.name}
            style={{
              y: imageY,
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              boxShadow: isDark
                ? '0 60px 120px rgba(0,0,0,0.55), 0 0 80px rgba(138,70,255,0.18), 0 0 0 1px rgba(232,223,255,0.10)'
                : '0 60px 120px rgba(93,43,255,0.18), 0 0 60px rgba(225,77,255,0.10), 0 0 0 1px rgba(138,70,255,0.15)',
              borderRadius: 6,
            }}
          />
        </motion.div>

        {/* Bottom metadata strip */}
        <div style={{
          position: 'absolute', bottom: 'clamp(20px, 3vw, 36px)', left: 'clamp(24px, 3vw, 48px)',
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: metaColor,
          pointerEvents: 'none',
        }}>
          <span>{project.tag}</span>
          <span style={{ opacity: 0.4 }}>//</span>
          <span>{project.year}</span>
          {media.gallery.length > 1 && (
            <>
              <span style={{ opacity: 0.4 }}>//</span>
              <span style={{ color: A }}>{String(activeImg + 1).padStart(2, '0')} / {String(media.gallery.length).padStart(2, '0')}</span>
            </>
          )}
        </div>

        {/* Thumbnails — only when gallery has multiple shots */}
        {media.gallery.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: 'clamp(20px, 3vw, 36px)',
            right: 'clamp(24px, 3vw, 48px)',
            display: 'flex', gap: 8,
            zIndex: 2,
          }}>
            {media.gallery.map((img, idx) => {
              const isActive = activeImg === idx;
              return (
                <button key={idx}
                  onClick={() => setActiveImg(idx)}
                  aria-label={media.labels[idx]}
                  style={{
                    width: 'clamp(44px, 4.5vw, 64px)',
                    height: 'clamp(44px, 4.5vw, 64px)',
                    border: `2px solid ${isActive ? A : (isDark ? 'rgba(232,223,255,0.20)' : 'rgba(138,70,255,0.25)')}`,
                    overflow: 'hidden',
                    opacity: isActive ? 1 : 0.55,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    padding: 0,
                    background: stageBg,
                    boxShadow: isActive ? `0 0 16px ${A}50` : 'none',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.opacity = '0.55'; }}
                >
                  <img src={img} alt={media.labels[idx]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Right: details panel ── */}
      <div style={{
        background: BG,
        padding: 'clamp(28px, 3.5vw, 56px) clamp(24px, 2.8vw, 48px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        borderLeft: `1px solid ${BORDER}`,
        minHeight: '100svh',
      }} className="vo-proj-details">

        {/* Number + tag + year */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 22 }}>
            <span style={{
              fontFamily: F_MONO, fontSize: 11, color: A, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '5px 11px', background: `${A}10`, border: `1px solid ${A}33`, fontWeight: 600,
            }}>{project.tag}</span>
            <span style={{
              fontFamily: F_MONO, fontSize: 11, color: TEXT_S,
              padding: '5px 10px', border: `1px solid ${BORDER}`,
            }}>{project.year}</span>
            <span style={{
              fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.12em', marginLeft: 'auto',
            }}>{project.num}</span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: F_DISPLAY, fontWeight: 400,
            fontSize: 'clamp(32px, 3.5vw, 52px)', lineHeight: 1,
            letterSpacing: '-0.025em', color: TEXT, marginBottom: 18,
          }}>{project.name}</h3>

          {/* Description */}
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: TEXT_S, marginBottom: 22 }}>
            <span style={{ color: TEXT, fontWeight: 600 }}>{t('projects.challenge')} </span>
            {project.challenge}
          </p>

          {/* Approach */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22, paddingTop: 18, borderTop: `1px solid ${BORDER}` }}>
            <li style={{ fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>{t('projects.approach')}</li>
            {project.approach.map((a, j) => (
              <li key={j} style={{ display: 'flex', gap: 12, fontSize: 13, color: TEXT_S, lineHeight: 1.55 }}>
                <span style={{ fontFamily: F_MONO, color: A, fontSize: 11, minWidth: 22, fontWeight: 700 }}>{String(j + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>

          {/* Stack + Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, paddingTop: 18, borderTop: `1px solid ${BORDER}`, marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: F_MONO, fontSize: 9, color: TEXT_D, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>{t('projects.stack')}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {project.techs.map((tech) => (
                  <span key={tech} style={{
                    fontFamily: F_MONO, fontSize: 10, color: TEXT_S,
                    padding: '3px 8px', border: `1px solid ${BORDER}`, background: BG_ALT,
                  }}>{tech}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: F_MONO, fontSize: 9, color: TEXT_D, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>{t('projects.results')}</div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {project.metrics.map((m, j) => (
                  <div key={j}>
                    <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 22, color: A, letterSpacing: '-0.02em', lineHeight: 1 }}>{m.v}</div>
                    <div style={{ fontSize: 9, color: TEXT_S, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          {project.url && (
            <motion.a href={project.url} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="arrow-slide-parent"
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 26px', fontSize: 13, fontWeight: 700,
                background: A, color: '#E9E4E0',
                borderRadius: 999,
                fontFamily: F_MONO, letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: `0 0 0 1px ${A}80, 0 8px 30px ${A}50`,
              }}>
              {t('common.cta.visitProj')}
              <span className="arrow-slide">→</span>
            </motion.a>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export function Projects() {
  const { t, locale, theme } = useApp();
  const { PROJECTS } = getContent(locale);
  const isDark = theme === 'dark';

  return (
    <section id="proyectos" style={{ background: BG, position: 'relative' }}>

      {/* Section intro */}
      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `clamp(80px, 12vh, 140px) ${PAD_X} clamp(40px, 6vw, 80px)` }}>
        <SectionHeader
          eyebrow={t('projects.eyebrow')}
          title={<>{t('projects.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('projects.title.2')}</span>.</>}
          intro={t('projects.intro')}
        />
      </div>

      {/* Fullscreen project panels */}
      {PROJECTS.map((p, i) => (
        <ProjectPanel
          key={p.num}
          project={p}
          media={PROJECT_MEDIA[i] || PROJECT_MEDIA[0]}
          t={t}
          isDark={isDark}
        />
      ))}

      <style>{`
        @media (max-width: 900px) {
          .vo-proj-panel {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .vo-proj-panel > div:first-child {
            min-height: 70svh !important;
          }
          .vo-proj-details {
            min-height: auto !important;
            border-left: none !important;
            border-top: 1px solid var(--border) !important;
          }
        }
      `}</style>
    </section>
  );
}
