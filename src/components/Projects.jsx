import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BG, BG_ALT, BG_SECTION, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
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
        {/* Ambient glow — top right */}
        <div aria-hidden style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${A}22 0%, transparent 65%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        {/* Ambient glow — bottom left */}
        <div aria-hidden style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 420, height: 420, borderRadius: '50%',
          background: `radial-gradient(circle, #E14DFF18 0%, transparent 65%)`,
          filter: 'blur(55px)', pointerEvents: 'none',
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
        padding: 'clamp(48px, 6vw, 80px) clamp(32px, 3.5vw, 56px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        borderLeft: `1px solid ${BORDER}`,
        minHeight: '100svh',
      }} className="vo-proj-details">

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {/* ── Header: tag + year + ghost number ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: F_MONO, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#fff', background: `linear-gradient(135deg, ${A} 0%, #E14DFF 100%)`,
              padding: '5px 14px', borderRadius: 999,
            }}>{project.tag}</span>
            <span style={{
              fontFamily: F_MONO, fontSize: 10, color: TEXT_D,
              padding: '4px 10px', border: `1px solid ${BORDER}`, borderRadius: 999,
            }}>{project.year}</span>
            <div aria-hidden style={{
              marginLeft: 'auto',
              fontFamily: F_DISPLAY, fontStyle: 'italic',
              fontSize: 'clamp(64px, 7vw, 96px)', lineHeight: 1,
              letterSpacing: '-0.04em', color: A, opacity: 0.10,
              userSelect: 'none', pointerEvents: 'none',
            }}>{project.num}</div>
          </div>

          {/* ── Title ── */}
          <h3 style={{
            fontFamily: F_DISPLAY, fontWeight: 400,
            fontSize: 'clamp(34px, 4vw, 56px)', lineHeight: 0.97,
            letterSpacing: '-0.025em', color: TEXT, marginBottom: 20,
          }}>{project.name}</h3>

          {/* ── Challenge card ── */}
          <div style={{
            padding: '14px 16px', marginBottom: 24,
            background: isDark ? `${A}0A` : `${A}07`,
            borderLeft: `3px solid ${A}`,
            borderRadius: '0 10px 10px 0',
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 9, color: A, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
              {t('projects.challenge')}
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: TEXT_S }}>{project.challenge}</p>
          </div>

          {/* ── Approach items ── */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: F_MONO, fontSize: 9, color: TEXT_D, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
              {t('projects.approach')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {project.approach.map((a, j) => (
                <div key={j} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '11px 14px',
                  background: isDark ? 'rgba(138,70,255,0.07)' : 'rgba(138,70,255,0.05)',
                  border: `1px solid rgba(138,70,255,0.14)`,
                  borderRadius: 10,
                }}>
                  <span style={{
                    fontFamily: F_MONO, fontSize: 9, fontWeight: 700, color: '#fff',
                    background: A, borderRadius: 6, padding: '3px 7px',
                    flexShrink: 0, lineHeight: 1.5, minWidth: 26, textAlign: 'center',
                  }}>{String(j + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 13, color: TEXT_S, lineHeight: 1.55 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Metrics ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
            gap: 8, marginBottom: 20,
          }}>
            {project.metrics.map((m, j) => (
              <div key={j} style={{
                padding: '14px 10px', textAlign: 'center',
                background: isDark ? 'rgba(138,70,255,0.09)' : 'rgba(138,70,255,0.06)',
                border: `1px solid rgba(138,70,255,0.18)`,
                borderRadius: 12,
              }}>
                <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 26, color: A, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 5 }}>{m.v}</div>
                <div style={{ fontSize: 9, color: TEXT_D, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 600 }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* ── Stack ── */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: F_MONO, fontSize: 9, color: TEXT_D, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
              {t('projects.stack')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.techs.map((tech) => (
                <span key={tech} style={{
                  fontFamily: F_MONO, fontSize: 11, color: TEXT_S, fontWeight: 600,
                  padding: '4px 12px', borderRadius: 999,
                  border: `1px solid ${BORDER}`, background: BG_ALT,
                }}>{tech}</span>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          {project.url && (
            <motion.a href={project.url} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="arrow-slide-parent"
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', fontSize: 12, fontWeight: 700,
                background: `linear-gradient(135deg, ${A} 0%, #E14DFF 100%)`,
                color: '#fff',
                borderRadius: 999,
                fontFamily: F_MONO, letterSpacing: '0.10em', textTransform: 'uppercase',
                boxShadow: `0 8px 30px ${A}50, 0 0 0 1px ${A}60`,
                textDecoration: 'none',
              }}>
              {t('common.cta.visitProj')}
              <span className="arrow-slide" style={{ fontSize: 15 }}>→</span>
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
    <section id="proyectos" style={{ background: BG_SECTION, position: 'relative' }}>

      {/* Section intro */}
      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `clamp(80px, 12vh, 140px) ${PAD_X} clamp(32px, 5vw, 56px)` }}>
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
