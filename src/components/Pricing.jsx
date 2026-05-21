import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';
import { BG, BG_ALT, BG_SECTION, BG_CARD, BG_POPULAR, POPULAR_FG, POPULAR_BORDER, TEXT, TEXT_S, TEXT_D, BORDER, A, A_L, A_D, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { RevealItem } from './Reveal';

// ── Currency Context ──────────────────────────────────────────────────────────
const CurrencyCtx = createContext({ isColones: true, setIsColones: () => {} });

// ── Plan prices & visuals ──────────────────────────────────────────────────────
const PLAN_META = [
  { accent: '#0EA5E9', crc: 450000,   usd: 900  },
  { accent: A,        crc: 950000,   usd: 1900 },
  { accent: '#F59E0B', crc: 2200000,  usd: 4400 },
  { accent: '#A855F7', crc: 4500000,  usd: 9000 },
];

// ── Interactive Starfield ─────────────────────────────────────────────────────
function StarDot({ mousePosition, containerRef }) {
  const [pos] = useState({
    top:  `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2,
    dur:  2 + Math.random() * 3,
    del:  Math.random() * 5,
  });

  const cfg  = { stiffness: 100, damping: 15, mass: 0.1 };
  const sx   = useSpring(0, cfg);
  const sy   = useSpring(0, cfg);

  useEffect(() => {
    if (!containerRef.current || mousePosition.x === null) { sx.set(0); sy.set(0); return; }
    const rect = containerRef.current.getBoundingClientRect();
    const starX = rect.left + (parseFloat(pos.left) / 100) * rect.width;
    const starY = rect.top  + (parseFloat(pos.top)  / 100) * rect.height;
    const dx = mousePosition.x - starX;
    const dy = mousePosition.y - starY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 600) {
      const f = (1 - dist / 600) * 0.5;
      sx.set(dx * f);
      sy.set(dy * f);
    } else { sx.set(0); sy.set(0); }
  }, [mousePosition, pos, containerRef, sx, sy]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: pos.top, left: pos.left,
        width: pos.size, height: pos.size,
        borderRadius: '50%',
        background: TEXT,
        x: sx, y: sy,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: pos.dur, repeat: Infinity, delay: pos.del }}
    />
  );
}

function Starfield({ mousePosition, containerRef }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 100 }).map((_, i) => (
        <StarDot key={i} mousePosition={mousePosition} containerRef={containerRef} />
      ))}
    </div>
  );
}

// ── Currency Toggle ───────────────────────────────────────────────────────────
function CurrencyToggle() {
  const { isColones, setIsColones } = useContext(CurrencyCtx);
  const usdBtnRef   = useRef(null);
  const crcBtnRef   = useRef(null);
  const [pill, setPill] = useState({});

  useEffect(() => {
    const btn = isColones ? crcBtnRef : usdBtnRef;
    if (btn.current) setPill({ width: btn.current.offsetWidth, transform: `translateX(${btn.current.offsetLeft}px)` });
  }, [isColones]);

  const toggle = (toColones) => {
    if (isColones === toColones) return;
    setIsColones(toColones);
    // Confetti on every switch
    const btn = (toColones ? crcBtnRef : usdBtnRef).current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      confetti({
        particleCount: 60, spread: 70,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        colors: [A, A_L, '#FBBF24', '#fff'],
        ticks: 250, gravity: 1.2, decay: 0.94, startVelocity: 25,
      });
    }
  };

  const btnBase = {
    position: 'relative', zIndex: 1,
    padding: '8px 20px',
    fontSize: 13, fontWeight: 600, fontFamily: F_MONO,
    letterSpacing: '0.08em',
    borderRadius: 999,
    transition: 'color 0.2s',
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
      <div style={{ position: 'relative', display: 'inline-flex', background: BG_ALT, borderRadius: 999, padding: 4, border: `1px solid ${BORDER}` }}>
        <motion.div
          style={{ position: 'absolute', top: 4, left: 0, height: 'calc(100% - 8px)', background: A, borderRadius: 999, ...pill }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
        <button ref={crcBtnRef} onClick={() => toggle(true)}
          style={{ ...btnBase, color: isColones ? '#fff' : TEXT_S }}>
          ₡ Colones
        </button>
        <button ref={usdBtnRef} onClick={() => toggle(false)}
          style={{ ...btnBase, color: !isColones ? '#fff' : TEXT_S }}>
          $ Dólares
        </button>
      </div>
    </div>
  );
}

// ── Pricing Card ──────────────────────────────────────────────────────────────
function PricingCard({ plan, meta, index }) {
  const { isColones }      = useContext(CurrencyCtx);
  const { t }              = useApp();
  const isPopular          = !!plan.popular;
  const fg                 = isPopular ? POPULAR_FG  : TEXT;
  const fgMute             = isPopular ? 'rgba(250,250,250,0.72)' : TEXT_S;
  const fgDim              = isPopular ? 'rgba(250,250,250,0.5)'  : TEXT_D;
  const borderC            = isPopular ? 'rgba(250,250,250,0.15)' : BORDER;
  const accent             = meta.accent;

  return (
    <RevealItem y={40}
      className="vo-neon-hover"
      style={{
        position: 'relative',
        background: isPopular ? BG_POPULAR : `${BG_CARD}CC`,
        backdropFilter: 'blur(12px)',
        border: `${isPopular ? '2px' : '1px'} solid ${isPopular ? POPULAR_BORDER : BORDER}`,
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: isPopular
          ? `0 30px 80px rgba(234,88,12,0.40), 0 0 0 1px ${A}33`
          : 'var(--shadow-md)',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 4, background: accent, borderRadius: '20px 20px 0 0' }} />

      {/* Popular badge */}
      {isPopular && (
        <div style={{
          position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
          background: A, color: '#fff',
          padding: '6px 16px',
          fontSize: 11, fontWeight: 700, fontFamily: F_MONO, letterSpacing: '0.15em', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 6, zIndex: 2,
          borderRadius: '0 0 10px 10px',
        }}>
          <Star size={10} fill="currentColor" /> {t('pricing.popular')}
        </div>
      )}

      {/* Popular glow blobs */}
      {isPopular && (
        <>
          <motion.span aria-hidden animate={{ x: [0,30,-20,0], y: [0,-20,20,0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '20%', right: '-30%', width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${A} 0%, transparent 60%)`, filter: 'blur(40px)', opacity: 0.45, pointerEvents: 'none' }} />
          <motion.span aria-hidden animate={{ x: [0,-25,15,0], y: [0,15,-10,0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '10%', left: '-30%', width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(circle, ${A_D} 0%, transparent 65%)`, filter: 'blur(50px)', opacity: 0.55, pointerEvents: 'none' }} />
        </>
      )}

      <div style={{ padding: 'clamp(28px, 2.6vw, 36px)', display: 'flex', flexDirection: 'column', gap: 0, flex: 1, position: 'relative', zIndex: 1, marginTop: isPopular ? 20 : 0 }}>

        {/* Plan name */}
        <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 400, fontSize: 'clamp(26px, 2.2vw, 32px)', letterSpacing: '-0.02em', color: fg, lineHeight: 1.05 }}>
          {plan.name}
        </h3>
        <p style={{ fontSize: 13, color: fgMute, lineHeight: 1.5, marginTop: 8, marginBottom: 24 }}>{plan.bestFor}</p>

        {/* Animated price */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 'clamp(36px, 3.6vw, 48px)', lineHeight: 1, letterSpacing: '-0.02em', color: isPopular ? '#fff' : accent }}>
              <NumberFlow
                value={isColones ? meta.crc : meta.usd}
                format={isColones
                  ? { style: 'currency', currency: 'CRC', minimumFractionDigits: 0, maximumFractionDigits: 0 }
                  : { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }
                }
                locales={isColones ? 'es-CR' : 'en-US'}
              />
            </span>
            <span style={{ fontFamily: F_MONO, fontSize: 11, color: fgDim, letterSpacing: '0.08em' }}>
              {isColones ? '+ ITBMS' : 'USD'}
            </span>
          </div>
          <span style={{ fontFamily: F_MONO, fontSize: 10, color: fgDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {plan.timeline}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: borderC, margin: '20px 0' }} />

        {/* Features */}
        <div style={{ fontFamily: F_MONO, fontSize: 10, color: fgDim, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>
          {t('pricing.includes')}
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {plan.features.map((f, j) => (
            <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: fg, lineHeight: 1.5 }}>
              <span style={{
                width: 18, height: 18, flexShrink: 0, marginTop: 1,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: isPopular ? `${A_L}30` : `${accent}15`,
                color: isPopular ? '#fff' : accent,
                borderRadius: 999,
              }}>
                <Check size={10} strokeWidth={3} />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Not included */}
        {plan.notIncluded && (
          <p style={{ paddingTop: 16, borderTop: `1px dashed ${borderC}`, fontSize: 11, color: fgDim, lineHeight: 1.5, fontStyle: 'italic', marginTop: 16 }}>
            <span style={{ fontFamily: F_MONO, fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.06em', marginRight: 6 }}>{t('pricing.notIncluded')}</span>
            {plan.notIncluded}
          </p>
        )}

        {/* CTA */}
        <motion.a href="#contacto"
          whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
          className="arrow-slide-parent"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginTop: 28, padding: '15px 20px', fontSize: 13, fontWeight: 700,
            background: isPopular ? '#fff' : accent,
            color: isPopular ? A : '#fff',
            border: `1px solid ${isPopular ? '#fff' : accent}`,
            borderRadius: 10,
            boxShadow: isPopular ? '0 14px 36px rgba(0,0,0,0.35)' : `0 8px 24px ${accent}40`,
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          {plan.cta} <span className="arrow-slide">→</span>
        </motion.a>
      </div>
    </RevealItem>
  );
}

// ── Main Pricing Section ──────────────────────────────────────────────────────
export function Pricing() {
  const { t, locale }          = useApp();
  const { PRICING, GUARANTEES } = getContent(locale);
  const [isColones, setIsColones] = useState(true);
  const containerRef             = useRef(null);
  const [mouse, setMouse]        = useState({ x: null, y: null });

  return (
    <CurrencyCtx.Provider value={{ isColones, setIsColones }}>
      <section id="precios"
        ref={containerRef}
        onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setMouse({ x: null, y: null })}
        style={{ background: BG_SECTION, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}
      >
        {/* Starfield */}
        <Starfield mousePosition={mouse} containerRef={containerRef} />

        <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
          <SectionHeader
            eyebrow={t('pricing.eyebrow')}
            title={<>{t('pricing.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('pricing.title.2')}</span>.</>}
            intro={t('pricing.intro')}
          />

          {/* Currency toggle */}
          <CurrencyToggle />

          {/* Cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20, alignItems: 'start',
          }}>
            {PRICING.map((p, i) => (
              <PricingCard key={i} plan={p} meta={PLAN_META[i]} index={i} />
            ))}
          </div>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{
              marginTop: 'clamp(40px, 5vw, 64px)',
              padding: 'clamp(24px, 3vw, 36px)',
              background: BG_CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
            }}
          >
            {GUARANTEES.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{
                  width: 32, height: 32, flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: `${A}12`, border: `1px solid ${A}33`, color: A, borderRadius: 8,
                }}>
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <span style={{ fontSize: 13, color: TEXT, lineHeight: 1.4 }}>{g.text}</span>
              </div>
            ))}
          </motion.div>

          <p style={{ fontSize: 13, color: TEXT_D, marginTop: 24, maxWidth: '60ch', lineHeight: 1.6, fontStyle: 'italic' }}>
            {getContent(locale).PRICING_NOTE}
          </p>
        </div>
      </section>
    </CurrencyCtx.Provider>
  );
}
