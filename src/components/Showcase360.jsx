/**
 * Showcase360 — dedicated section pitching 360° virtual tours for hotels,
 * restaurants, real estate and event venues. Sits between Marquee and
 * Services so it gets prime real estate.
 *
 * Layout:
 *   ┌────────────────────────────┬───────────────────────┐
 *   │  Eyebrow                   │                       │
 *   │  Title                     │   Panorama360         │
 *   │  Bullet list               │   (interactive 3D)    │
 *   │  Use-case chips            │                       │
 *   │  CTA → contact             │                       │
 *   └────────────────────────────┴───────────────────────┘
 */

import { motion } from 'framer-motion';
import { Hotel, UtensilsCrossed, Home, PartyPopper, ArrowUpRight, MapPin, Compass } from 'lucide-react';
import {
  BG_SECTION, TEXT, TEXT_S, TEXT_D, BORDER, A, A2,
  F_DISPLAY, F_MONO, MAX_W, PAD_X,
} from '../theme';
import { useApp } from '../context/AppContext';
import { Panorama360 } from './Panorama360';
import { RevealItem } from './Reveal';

export function Showcase360() {
  const { t } = useApp();

  const USE_CASES = [
    { Icon: Hotel,            label: t('showcase360.use.hotels') },
    { Icon: UtensilsCrossed,  label: t('showcase360.use.restaurants') },
    { Icon: Home,             label: t('showcase360.use.realestate') },
    { Icon: PartyPopper,      label: t('showcase360.use.events') },
  ];

  const BULLETS = [
    t('showcase360.bullet1'),
    t('showcase360.bullet2'),
    t('showcase360.bullet3'),
  ];

  return (
    <section
      id="tours-360"
      style={{
        background: BG_SECTION,
        padding: `clamp(80px, 12vh, 140px) 0`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden style={{
        position: 'absolute', top: '10%', right: '-8%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,92,154,0.18), transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '-10%', left: '-8%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(183,156,255,0.18), transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
            gap: 'clamp(28px, 4vw, 64px)',
            alignItems: 'center',
          }}
          className="vo-360-grid"
        >
          {/* ── LEFT — copy ─────────────────────────────────────────────── */}
          <RevealItem y={32}>
            <div>
              {/* Eyebrow */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 999,
                background: `${A}14`, border: `1px solid ${A}40`,
                marginBottom: 22,
              }}>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                  <Compass size={14} color={A} strokeWidth={2.2} />
                </motion.span>
                <span style={{
                  fontFamily: F_MONO, fontSize: 11, color: A,
                  letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
                }}>
                  {t('showcase360.eyebrow')}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: F_DISPLAY, fontWeight: 400,
                fontSize: 'clamp(38px, 5.5vw, 68px)',
                letterSpacing: '-0.025em', lineHeight: 0.98,
                color: TEXT, marginBottom: 20,
              }}>
                {t('showcase360.title.1')}{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${A}, ${A2})`,
                  WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  color: 'transparent', fontStyle: 'italic',
                }}>{t('showcase360.title.2')}</span>{' '}
                {t('showcase360.title.3')}
              </h2>

              {/* Intro */}
              <p style={{
                fontSize: 'clamp(15px, 1.4vw, 17.5px)',
                color: TEXT_S, lineHeight: 1.6, marginBottom: 26,
                maxWidth: '52ch',
              }}>
                {t('showcase360.intro')}
              </p>

              {/* Bullets */}
              <ul style={{
                listStyle: 'none', padding: 0, margin: '0 0 28px 0',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                {BULLETS.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.45 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14.5, color: TEXT_S, lineHeight: 1.5 }}
                  >
                    <span style={{
                      flexShrink: 0, marginTop: 5, width: 8, height: 8, borderRadius: 2,
                      background: `linear-gradient(135deg, ${A}, ${A2})`,
                      boxShadow: `0 0 8px ${A}50`,
                    }} />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Use-case chips */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32,
              }}>
                {USE_CASES.map(({ Icon, label }, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18 + i * 0.06 }}
                    whileHover={{ y: -2, background: `${A}18`, borderColor: `${A}55` }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '7px 12px', borderRadius: 999,
                      background: 'var(--bg-card)', border: `1px solid ${BORDER}`,
                      fontSize: 12.5, color: TEXT_S, fontWeight: 500,
                      cursor: 'default', transition: 'background 0.25s, border 0.25s, transform 0.25s',
                    }}
                  >
                    <Icon size={13} strokeWidth={2} color={A} />
                    {label}
                  </motion.span>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '13px 24px', fontSize: 14, fontWeight: 700,
                  background: `linear-gradient(135deg, ${A}, ${A2})`,
                  color: '#fff', borderRadius: 10,
                  boxShadow: `0 10px 28px ${A}55`,
                  textDecoration: 'none',
                }}
              >
                {t('showcase360.cta')} <ArrowUpRight size={16} strokeWidth={2.5} />
              </motion.a>
            </div>
          </RevealItem>

          {/* ── RIGHT — interactive panorama ─────────────────────────────── */}
          <RevealItem y={32}>
            <div style={{ position: 'relative' }}>
              <Panorama360 height={460} initialScene="lobby" />

              {/* Helper text under viewer */}
              <div style={{
                marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: 12, color: TEXT_D, fontFamily: F_MONO, letterSpacing: '0.04em',
                flexWrap: 'wrap', gap: 8,
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={12} strokeWidth={2} />
                  {t('showcase360.demoLabel')}
                </span>
                <span>{t('showcase360.hint')}</span>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .vo-360-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
