/**
 * ServiceMockups — polished mini-products that live inside the service detail modal.
 *
 * These are NOT generic illustrations — they're built to read as real screenshots
 * of real products, each with its own brand identity, typography, and data story.
 */

import {
  Scale, Briefcase, Users, Building2,
  ShoppingBag, Heart, Search, Star, User,
  Activity, Flame, Footprints, Play, Pause, Bell,
  Package, BarChart3, TrendingUp, Settings, Plus,
  Globe, ChevronUp, Target, ArrowUpRight,
  CheckCircle2, Shield, RotateCw, Database, Server, Zap,
} from 'lucide-react';
import { F_DISPLAY, F_MONO } from '../theme';

// ─── Shared palette ────────────────────────────────────────────────────
const MK = {
  bg:          '#FAFAFA',
  card:        '#FFFFFF',
  text:        '#0A0A0A',
  textSoft:    '#404040',
  muted:       '#737373',
  mutedSoft:   '#A3A3A3',
  border:      'rgba(0,0,0,0.10)',
  borderSoft:  'rgba(0,0,0,0.06)',
  accent:      '#8A46FF',
  green:       '#10B981',
  greenSoft:   '#D1FAE5',
  yellow:      '#F59E0B',
  yellowSoft:  '#FEF3C7',
  red:         '#DC2626',
  redSoft:     '#FEE2E2',
  blueG:       '#1A0DAB', // Google blue
};

// Layered shadow for polished depth
const SHADOW_LIFT = '0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.10)';
const SHADOW_FRAME = '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 32px 72px rgba(0,0,0,0.14)';

// ─── SVG chart helpers ─────────────────────────────────────────────────

/** Inline sparkline (small trend line). */
function Spark({ data, color, fill = true, w = 80, h = 24, sw = 1.5 }) {
  if (!data?.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 2 - ((v - min) / range) * (h - 4);
    return `${x},${y}`;
  });
  const id = `g-${color.replace('#', '')}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && (
        <polygon points={`0,${h} ${pts.join(' ')} ${w},${h}`} fill={`url(#${id})`} />
      )}
      <polyline
        points={pts.join(' ')}
        fill="none" stroke={color} strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx={pts[pts.length - 1].split(',')[0]} cy={pts[pts.length - 1].split(',')[1]}
        r={2} fill={color} />
    </svg>
  );
}

/** Bigger line chart with grid + dots + area fill */
function LineChart({ data, labels = [], color, w = 360, h = 140 }) {
  const padL = 26, padR = 8, padT = 10, padB = 22;
  const cw = w - padL - padR, ch = h - padT - padB;
  const max = Math.max(...data), min = 0;
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * cw;
    const y = padT + (1 - (v - min) / range) * ch;
    return { x, y, v };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${padT + ch} L ${pts[0].x} ${padT + ch} Z`;
  const gridLines = [0, 0.25, 0.5, 0.75, 1];
  const gradId = `lc-${color.replace('#', '')}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {gridLines.map((g, i) => (
        <line key={i}
          x1={padL} x2={w - padR}
          y1={padT + g * ch} y2={padT + g * ch}
          stroke={MK.borderSoft} strokeWidth={1}
          strokeDasharray={i === 0 || i === gridLines.length - 1 ? '0' : '2,3'}
        />
      ))}
      {/* Y axis labels */}
      {[max, max / 2, 0].map((v, i) => (
        <text key={i}
          x={padL - 6} y={padT + (i / 2) * ch + 3}
          fontSize="8" fill={MK.muted} textAnchor="end"
          fontFamily="ui-monospace, monospace"
        >{Math.round(v).toLocaleString()}</text>
      ))}
      {/* Area + line */}
      <path d={areaD} fill={`url(#${gradId})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 3.5 : 2.5}
          fill={MK.card} stroke={color} strokeWidth={i === pts.length - 1 ? 2 : 1.5} />
      ))}
      {/* X axis labels */}
      {labels.map((lab, i) => (
        <text key={i}
          x={padL + (i / (data.length - 1)) * cw}
          y={h - 6}
          fontSize="8" fill={MK.muted} textAnchor="middle"
          fontFamily="ui-monospace, monospace"
        >{lab}</text>
      ))}
    </svg>
  );
}

/** 30-bar uptime indicator — each bar = 1 day of the last 30 days */
function UptimeBars({ days = 30, w = '100%', h = 36 }) {
  // Mostly green with two yellow blips
  const series = Array.from({ length: days }, (_, i) => {
    if (i === 11) return 'partial';
    if (i === 22) return 'partial';
    return 'ok';
  });
  return (
    <div style={{ display: 'flex', gap: 2, width: w, height: h, alignItems: 'flex-end' }}>
      {series.map((s, i) => (
        <div key={i} style={{
          flex: 1, height: '100%',
          background: s === 'ok' ? MK.green : MK.yellow,
          opacity: s === 'ok' ? 0.85 : 0.95,
          borderRadius: 1,
        }} />
      ))}
    </div>
  );
}

/** SVG circular progress ring — for fitness activity */
function Ring({ progress = 0.75, size = 96, sw = 8, color = '#fff', track = 'rgba(255,255,255,0.18)', label }) {
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * progress;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={`${dash} ${c}`}
        strokeLinecap="round"
      />
      {label && (
        <text
          x={size / 2} y={size / 2}
          fontSize={size * 0.22} fontWeight="700"
          fill={color} textAnchor="middle" dominantBaseline="central"
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        >
          {label}
        </text>
      )}
    </svg>
  );
}

// ─── Shared chrome ─────────────────────────────────────────────────────
function BrowserFrame({ url, children, style }) {
  return (
    <div style={{
      border: `1px solid ${MK.border}`,
      background: MK.card,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: SHADOW_FRAME,
      ...style,
    }}>
      <div style={{
        height: 36,
        background: 'linear-gradient(180deg, #FAFAFA 0%, #F2F2F2 100%)',
        borderBottom: `1px solid ${MK.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 7,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        <div style={{
          marginInline: 'auto',
          padding: '5px 14px',
          background: MK.card,
          border: `1px solid ${MK.border}`,
          borderRadius: 6,
          fontSize: 10,
          color: MK.muted,
          fontFamily: F_MONO,
          minWidth: 240,
          textAlign: 'center',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: MK.green }} />
          {url}
        </div>
        <span style={{ width: 10, opacity: 0 }} />
      </div>
      <div>{children}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 01 · WEBSITES — Editorial law firm (navy + gold/cream)
// ────────────────────────────────────────────────────────────────────────
function WebsiteMock() {
  const NAVY = '#0F1B2E';
  const CREAM = '#F8F5EE';
  const GOLD = '#C9A961';

  return (
    <BrowserFrame url="alvaradolegal.cr">
      {/* Top nav */}
      <div style={{
        background: NAVY, color: CREAM,
        padding: '14px 26px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 10,
      }}>
        <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 18, letterSpacing: '-0.02em' }}>
          Alvarado<span style={{ color: GOLD }}>·</span>Legal
        </div>
        <div style={{ display: 'flex', gap: 26, fontSize: 10, opacity: 0.85 }}>
          <span>Inicio</span><span>Áreas de práctica</span><span>Equipo</span><span>Casos</span><span>Contacto</span>
        </div>
        <div style={{
          background: GOLD, color: NAVY,
          padding: '7px 14px', fontSize: 9.5, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>Consulta gratis</div>
      </div>

      {/* Hero */}
      <div style={{ background: CREAM, padding: '36px 30px 32px', display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 28, alignItems: 'center' }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: 18, height: 1, background: GOLD }} />
            Est. 2004 · Bufete legal
          </div>
          <div style={{
            fontFamily: F_DISPLAY, fontSize: 38, lineHeight: 1.02,
            letterSpacing: '-0.025em', color: NAVY, marginBottom: 14,
          }}>
            Defensa que<br />transforma <span style={{ fontStyle: 'italic', color: GOLD }}>destinos</span>.
          </div>
          <div style={{ fontSize: 11, color: '#4A5568', lineHeight: 1.6, marginBottom: 18, maxWidth: '88%' }}>
            Más de <strong style={{ color: NAVY }}>800 casos ganados</strong> en derecho civil, penal y familia. Asesoría seria, sin promesas vacías.
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: NAVY, color: CREAM,
              padding: '11px 18px', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>Consulta gratis →</span>
            <span style={{
              padding: '11px 16px', fontSize: 10, fontWeight: 600,
              color: NAVY, borderBottom: `1.5px solid ${NAVY}`,
              letterSpacing: '0.04em',
            }}>Conocer el equipo</span>
          </div>

          {/* Trust bar */}
          <div style={{ marginTop: 22, paddingTop: 16, borderTop: `1px solid ${NAVY}15`, display: 'flex', alignItems: 'center', gap: 14, fontSize: 10 }}>
            <div style={{ display: 'inline-flex', gap: 1 }}>
              {[0,1,2,3,4].map(i => <Star key={i} size={11} fill={GOLD} strokeWidth={0} />)}
            </div>
            <div style={{ color: NAVY, fontWeight: 700, fontSize: 11 }}>4.9/5</div>
            <div style={{ color: '#4A5568', fontSize: 9.5 }}>312 reseñas en</div>
            <div style={{ fontSize: 10, fontWeight: 700 }}>
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div style={{
          aspectRatio: '4/5',
          background: `radial-gradient(circle at 30% 25%, #1B2E48 0%, ${NAVY} 50%, #08111F 100%)`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 24px 50px ${NAVY}50, inset 0 0 0 1px ${GOLD}20`,
        }}>
          {/* Gold scales of justice */}
          <svg viewBox="0 0 200 240" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E5C58F" />
                <stop offset="50%" stopColor={GOLD} />
                <stop offset="100%" stopColor="#8A6F36" />
              </linearGradient>
            </defs>
            {/* Vertical pillar */}
            <rect x="98" y="40" width="4" height="160" fill="url(#gold-grad)" />
            {/* Top ornament */}
            <circle cx="100" cy="40" r="6" fill="url(#gold-grad)" />
            {/* Crossbar */}
            <rect x="40" y="78" width="120" height="3" fill="url(#gold-grad)" />
            {/* Chains */}
            <line x1="50" y1="81" x2="50" y2="120" stroke={GOLD} strokeWidth="1" />
            <line x1="150" y1="81" x2="150" y2="120" stroke={GOLD} strokeWidth="1" />
            {/* Left pan */}
            <path d="M 28 120 Q 50 138, 72 120 L 72 122 Q 50 145, 28 122 Z" fill="url(#gold-grad)" />
            {/* Right pan */}
            <path d="M 128 120 Q 150 142, 172 120 L 172 122 Q 150 149, 128 122 Z" fill="url(#gold-grad)" />
            {/* Base */}
            <rect x="80" y="200" width="40" height="6" fill="url(#gold-grad)" />
            <rect x="70" y="206" width="60" height="3" fill="url(#gold-grad)" opacity="0.7" />
          </svg>
          {/* Bottom caption */}
          <div style={{
            position: 'absolute', bottom: 14, left: 14, right: 14,
            fontFamily: F_DISPLAY, fontStyle: 'italic',
            fontSize: 11, color: GOLD, letterSpacing: '-0.01em',
            opacity: 0.9,
          }}>
            "Honor en cada caso."
          </div>
        </div>
      </div>

      {/* Practice areas */}
      <div style={{ background: MK.card, padding: '24px 30px 28px', borderTop: `1px solid ${NAVY}10` }}>
        <div style={{
          fontSize: 9, color: GOLD, letterSpacing: '0.22em',
          textTransform: 'uppercase', fontWeight: 700, marginBottom: 12,
        }}>Áreas de práctica</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { Icon: Scale,     t: 'Civil',  d: 'Contratos · Sucesiones · Propiedad' },
            { Icon: Briefcase, t: 'Penal',  d: 'Defensa activa · Audiencias' },
            { Icon: Users,     t: 'Familia',d: 'Divorcios · Custodia · Alimentos' },
          ].map((a, i) => (
            <div key={i} style={{
              padding: '16px 14px',
              border: `1px solid ${MK.border}`,
              background: '#FAFAFA',
              display: 'flex', flexDirection: 'column', gap: 6,
              position: 'relative',
            }}>
              <a.Icon size={20} color={NAVY} strokeWidth={1.5} />
              <div style={{ fontFamily: F_DISPLAY, fontSize: 16, color: NAVY, letterSpacing: '-0.02em' }}>
                Derecho {a.t}
              </div>
              <div style={{ fontSize: 9.5, color: MK.muted, lineHeight: 1.45 }}>{a.d}</div>
              <div style={{
                marginTop: 4, fontSize: 9, color: GOLD,
                fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>Más info <ArrowUpRight size={11} /></div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 02 · E-COMMERCE — Premium beauty store
// ────────────────────────────────────────────────────────────────────────

/** Stylized product bottle/tube (CSS only, looks like a real cosmetic) */
function ProductBottle({ palette, shape = 'bottle', label = 'BLOOM' }) {
  const { cap, body, accent, labelBg } = palette;
  return (
    <div style={{
      width: '100%', aspectRatio: '1/1',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      background: `linear-gradient(160deg, #FCFCFC 0%, #F5F1ED 100%)`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Soft glow behind product */}
      <div style={{
        position: 'absolute', inset: '15% 20%',
        background: `radial-gradient(circle, ${accent}30 0%, transparent 65%)`,
        filter: 'blur(20px)',
      }} />
      {/* Bottle */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: shape === 'tube' ? '38%' : '46%',
        height: shape === 'tube' ? '78%' : '85%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Cap */}
        <div style={{
          width: shape === 'tube' ? '50%' : '45%',
          height: shape === 'tube' ? '10%' : '14%',
          background: `linear-gradient(180deg, ${cap}, ${cap}DD)`,
          borderRadius: shape === 'tube' ? '4px 4px 0 0' : '50% 50% 8% 8% / 60% 60% 8% 8%',
          boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.15), inset 2px 0 4px rgba(255,255,255,0.4)',
        }} />
        {/* Body */}
        <div style={{
          flex: 1, width: '100%',
          background: `linear-gradient(135deg, ${body} 0%, ${body}EE 70%, ${body}CC 100%)`,
          borderRadius: shape === 'tube' ? '2px 2px 8px 8px' : '12px 12px 18px 18px',
          boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.12), inset 3px 0 6px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Highlight stripe */}
          <div style={{
            position: 'absolute', left: '20%', top: '5%', bottom: '5%', width: '8%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))',
            borderRadius: 999,
          }} />
          {/* Label */}
          <div style={{
            width: '70%',
            background: labelBg,
            padding: '6px 4px',
            textAlign: 'center',
            fontFamily: F_DISPLAY, fontStyle: 'italic',
            fontSize: 9, color: MK.text, letterSpacing: '0.04em',
            borderTop: `1px solid ${accent}30`,
            borderBottom: `1px solid ${accent}30`,
          }}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function EcommerceMock() {
  const products = [
    { name: 'Sérum Vitamina C', subtitle: '30ml · Iluminador', price: '₡14.200', oldPrice: '₡18.900', rating: 4.8, reviews: 124, sale: true, palette: { cap: '#E8B89C', body: '#FFE5D0', accent: '#D4844F', labelBg: '#FFF5EC' }, shape: 'bottle', label: 'C-GLOW' },
    { name: 'Labial Mate Velour', subtitle: 'Tono Rouge 24', price: '₡8.900', rating: 4.9, reviews: 287, palette: { cap: '#1A1A1A', body: '#B23E4A', accent: '#8B2A35', labelBg: '#FFE9EC' }, shape: 'tube', label: 'VELOUR' },
    { name: 'Aceite Capilar Argán', subtitle: '100ml · Reparador', price: '₡11.500', rating: 4.7, reviews: 89, palette: { cap: '#D4AF37', body: '#3A2E22', accent: '#C9A961', labelBg: '#FFF8E8' }, shape: 'bottle', label: 'ARGAN' },
    { name: 'Mascarilla Hidratante', subtitle: '50g · Piel seca', price: '₡6.800', rating: 4.9, reviews: 412, palette: { cap: '#C19FE0', body: '#EAD4F5', accent: '#8B6FB0', labelBg: '#F4EAFF' }, shape: 'tube', label: 'HYDRA' },
  ];

  return (
    <BrowserFrame url="bloomcosmetics.cr">
      {/* Top bar */}
      <div style={{
        padding: '14px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${MK.borderSoft}`, gap: 18,
      }}>
        <div style={{
          fontFamily: F_DISPLAY, fontStyle: 'italic',
          fontSize: 26, letterSpacing: '-0.03em',
          color: '#2A1F1F', display: 'inline-flex', alignItems: 'baseline', gap: 2,
        }}>
          Bloom<span style={{ color: '#D4844F', fontSize: 28 }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: 22, fontSize: 10.5, color: MK.textSoft, fontWeight: 500 }}>
          <span>Skincare</span><span style={{ color: MK.text, fontWeight: 700 }}>Maquillaje</span>
          <span>Cabello</span><span>Cuerpo</span><span style={{ color: '#D4844F' }}>Ofertas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Search size={15} color={MK.textSoft} strokeWidth={1.7} />
          <Heart size={15} color={MK.textSoft} strokeWidth={1.7} />
          <User size={15} color={MK.textSoft} strokeWidth={1.7} />
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <ShoppingBag size={15} color={MK.text} strokeWidth={1.7} />
            <span style={{
              position: 'absolute', top: -5, right: -8,
              background: '#D4844F', color: '#fff',
              borderRadius: 10, padding: '0 4px',
              fontSize: 8, fontWeight: 700,
              minWidth: 14, height: 14,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>2</span>
          </div>
        </div>
      </div>

      {/* Hero strip */}
      <div style={{
        padding: '20px 28px',
        background: 'linear-gradient(90deg, #FFF5EC 0%, #FAEFE5 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${MK.borderSoft}`,
      }}>
        <div>
          <div style={{ fontSize: 9, color: '#D4844F', letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
            Edición Primavera
          </div>
          <div style={{ fontFamily: F_DISPLAY, fontSize: 22, color: '#2A1F1F', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Tu piel, en su <span style={{ fontStyle: 'italic', color: '#D4844F' }}>mejor versión</span>.
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#2A1F1F', color: '#FFF5EC',
          padding: '10px 18px', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Ver colección →
        </div>
      </div>

      {/* Subnav: filters */}
      <div style={{ padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${MK.borderSoft}` }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Todo (84)', 'Skincare (32)', 'Maquillaje (28)', 'Cabello (14)', 'Body (10)'].map((c, i) => {
            const active = i === 2;
            return (
              <span key={c} style={{
                fontSize: 9.5, padding: '5px 12px',
                border: `1px solid ${active ? '#2A1F1F' : MK.border}`,
                color: active ? '#fff' : MK.textSoft,
                background: active ? '#2A1F1F' : 'transparent',
                fontWeight: active ? 700 : 500,
                letterSpacing: '0.04em',
              }}>{c}</span>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.5, color: MK.muted }}>
          Ordenar: <strong style={{ color: MK.text }}>Más vendidos</strong> ↓
        </div>
      </div>

      {/* Product grid */}
      <div style={{ padding: '20px 28px 26px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, background: '#FCFAF7' }}>
        {products.map((p, i) => (
          <div key={i} style={{
            background: MK.card,
            border: `1px solid ${i === 0 ? '#D4844F' : MK.border}`,
            display: 'flex', flexDirection: 'column',
            position: 'relative',
            boxShadow: i === 0 ? '0 12px 32px rgba(212,132,79,0.18)' : '0 1px 0 rgba(0,0,0,0.02)',
            transform: i === 0 ? 'translateY(-4px)' : 'none',
          }}>
            {p.sale && (
              <span style={{
                position: 'absolute', top: 10, left: 10, zIndex: 2,
                background: '#D4844F', color: '#fff',
                fontSize: 8, fontWeight: 700, padding: '3px 7px',
                letterSpacing: '0.1em',
              }}>-25%</span>
            )}
            <Heart size={12} style={{
              position: 'absolute', top: 10, right: 10, zIndex: 2,
              color: MK.mutedSoft,
            }} strokeWidth={1.8} />
            <ProductBottle palette={p.palette} shape={p.shape} label={p.label} />
            <div style={{ padding: '12px 12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>
                <div style={{ fontSize: 10.5, color: MK.text, fontWeight: 600, lineHeight: 1.25 }}>{p.name}</div>
                <div style={{ fontSize: 8.5, color: MK.muted, marginTop: 2 }}>{p.subtitle}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9 }}>
                <div style={{ display: 'inline-flex', gap: 0.5 }}>
                  {[0,1,2,3,4].map(s => (
                    <Star key={s} size={9} fill="#F5A623" strokeWidth={0} />
                  ))}
                </div>
                <span style={{ color: MK.text, fontWeight: 700 }}>{p.rating}</span>
                <span style={{ color: MK.muted }}>({p.reviews})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#D4844F' }}>{p.price}</span>
                {p.oldPrice && (
                  <span style={{ fontSize: 9, color: MK.muted, textDecoration: 'line-through' }}>{p.oldPrice}</span>
                )}
              </div>
              <button style={{
                marginTop: 4, background: '#2A1F1F', color: '#fff',
                fontSize: 9, fontWeight: 700, padding: '7px 0',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                border: 'none',
              }}>+ Agregar</button>
            </div>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 03 · APP — Pulse Fit, dark fitness app
// ────────────────────────────────────────────────────────────────────────
function AppMock() {
  // Mini sparkline data
  const kcalData = [120, 180, 240, 290, 340, 380, 420];
  const setsData = [1, 2, 3, 4, 6, 7, 8];
  const stepsData = [400, 800, 1200, 1800, 2400, 2900, 3247];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 12px 36px', background: 'linear-gradient(180deg, #2A1F1F 0%, #1A0F0F 100%)', borderRadius: 8, border: `1px solid ${MK.border}`, position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, ${MK.accent}40 0%, transparent 60%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 256,
        background: '#0A0A0A',
        borderRadius: 40,
        padding: 6,
        boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 2px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          background: '#0F0F12',
          borderRadius: 34,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Notch */}
          <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 76, height: 18, background: '#000', borderRadius: 12, zIndex: 5 }} />

          {/* Status bar */}
          <div style={{ padding: '10px 22px 4px', display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, fontFamily: F_MONO, color: '#fff' }}>
            <span>9:41</span>
            <span style={{ display: 'inline-flex', gap: 4, fontSize: 9 }}>● ● ● 🔋</span>
          </div>

          {/* Header */}
          <div style={{ padding: '6px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Miércoles</div>
              <div style={{ fontFamily: F_DISPLAY, fontSize: 22, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1 }}>
                Hola, <span style={{ fontStyle: 'italic' }}>Andrea</span>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Bell size={14} color="rgba(255,255,255,0.6)" strokeWidth={1.8} />
              <span style={{ position: 'absolute', top: -2, right: -3, width: 6, height: 6, borderRadius: '50%', background: '#FF3B6B' }} />
            </div>
          </div>

          {/* Streak banner */}
          <div style={{
            margin: '0 16px 12px',
            padding: '7px 12px',
            background: 'rgba(255,200,100,0.1)',
            border: '1px solid rgba(255,200,100,0.25)',
            borderRadius: 999,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 9, color: '#FFD580',
          }}>
            <Flame size={11} fill="#FF6B35" color="#FF6B35" strokeWidth={0} />
            <strong>12 días en racha</strong>
            <span style={{ opacity: 0.7 }}>· Sigue así</span>
          </div>

          {/* Active workout card */}
          <div style={{
            margin: '0 14px',
            background: 'linear-gradient(135deg, #FF3B6B 0%, #C2185B 50%, #6A1B9A 100%)',
            color: '#fff',
            borderRadius: 18,
            padding: 16,
            boxShadow: '0 20px 40px rgba(255,59,107,0.35)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Decorative glow */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', filter: 'blur(20px)' }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, opacity: 0.8, fontFamily: F_MONO, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px #fff', animation: 'pulse 1.5s infinite' }} />
                  En curso
                </div>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 17, fontWeight: 400, lineHeight: 1.1, marginBottom: 4, letterSpacing: '-0.02em' }}>
                  Cardio <span style={{ fontStyle: 'italic' }}>HIIT</span>
                </div>
                <div style={{ fontSize: 9.5, opacity: 0.85, fontFamily: F_MONO, marginBottom: 10 }}>22:30 / 30:00</div>

                {/* Heart rate */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9, background: 'rgba(255,255,255,0.15)', padding: '4px 8px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                  <Heart size={9} fill="#fff" strokeWidth={0} />
                  <strong>142</strong> bpm
                </div>
              </div>
              <Ring progress={0.75} size={70} sw={6} color="#fff" track="rgba(255,255,255,0.2)" label="75%" />
            </div>

            <div style={{
              marginTop: 12, display: 'flex', gap: 6,
            }}>
              <button style={{
                flex: 1, background: '#fff', color: '#C2185B',
                padding: '8px 0', borderRadius: 10,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                border: 'none',
              }}>
                <Pause size={10} fill="#C2185B" strokeWidth={0} />
                Pausar
              </button>
              <button style={{
                background: 'rgba(255,255,255,0.18)', color: '#fff',
                padding: '8px 12px', borderRadius: 10,
                fontSize: 10, fontWeight: 700,
                border: 'none', backdropFilter: 'blur(4px)',
              }}>
                Skip
              </button>
            </div>
          </div>

          {/* Stats row with sparklines */}
          <div style={{ padding: '14px 14px 10px' }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 8, fontFamily: F_MONO }}>Hoy</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {[
                { v: '420', l: 'Kcal',  Icon: Flame,      data: kcalData,  color: '#FF6B35' },
                { v: '8',    l: 'Sets',  Icon: Activity,   data: setsData,  color: '#4FC3F7' },
                { v: '3.2k', l: 'Pasos', Icon: Footprints, data: stepsData, color: '#81C784' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: 8, borderRadius: 10,
                  display: 'flex', flexDirection: 'column', gap: 2,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <s.Icon size={11} color={s.color} strokeWidth={2} />
                    <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.5)', fontFamily: F_MONO }}>+12%</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{s.v}</div>
                  <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: F_MONO }}>{s.l}</div>
                  <Spark data={s.data} color={s.color} w={64} h={18} sw={1.2} />
                </div>
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 0 14px',
            display: 'flex', justifyContent: 'space-around',
            background: '#08080A',
          }}>
            {[
              { Icon: Activity,   t: 'Hoy',     a: true  },
              { Icon: Play,       t: 'Rutinas', a: false },
              { Icon: BarChart3,  t: 'Stats',   a: false },
              { Icon: User,       t: 'Perfil',  a: false },
            ].map((tb, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <tb.Icon size={15} color={tb.a ? '#FF3B6B' : 'rgba(255,255,255,0.4)'}
                  fill={tb.a ? '#FF3B6B' : 'transparent'} strokeWidth={tb.a ? 0 : 1.8} />
                <span style={{ fontSize: 7.5, fontWeight: tb.a ? 700 : 500, color: tb.a ? '#fff' : 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{tb.t}</span>
                {tb.a && <span style={{ width: 12, height: 2, background: '#FF3B6B', borderRadius: 2 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating side cards (depth) */}
      <div aria-hidden style={{
        position: 'absolute', top: '20%', right: '8%',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        padding: '8px 12px', borderRadius: 8,
        fontSize: 9, color: 'rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
        transform: 'rotate(4deg)',
      }}>
        <Flame size={11} fill="#FF6B35" strokeWidth={0} />
        <strong style={{ color: '#fff' }}>+50 XP</strong> nuevo récord
      </div>
      <div aria-hidden style={{
        position: 'absolute', bottom: '22%', left: '8%',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        padding: '8px 12px', borderRadius: 8,
        fontSize: 9, color: 'rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
        transform: 'rotate(-3deg)',
      }}>
        <CheckCircle2 size={11} color="#81C784" strokeWidth={2} />
        <span><strong style={{ color: '#fff' }}>Meta semanal</strong> 4/5</span>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 04 · SYSTEMS — B2B SaaS admin dashboard
// ────────────────────────────────────────────────────────────────────────
function SystemMock() {
  const INDIGO = '#4F46E5';

  const rows = [
    { p: 'Tornillo cabeza plana 1/4" x 100u', sku: 'TR-0142', s: 420, pr: '₡4.500',  st: 'ok',   trend: [10,12,14,18,22,28] },
    { p: 'Cinta métrica 5m flexible',          sku: 'CM-0089', s: 12,  pr: '₡2.200',  st: 'low',  trend: [22,18,14,10,12,8]  },
    { p: 'Taladro DeWalt 20V Brushless',       sku: 'DW-2401', s: 3,   pr: '₡89.000', st: 'crit', trend: [18,14,10,7,5,3]    },
    { p: 'Brocha 3" mango madera natural',     sku: 'BR-0033', s: 85,  pr: '₡1.800',  st: 'ok',   trend: [12,14,18,22,28,32] },
    { p: 'Cable eléctrico THHN 12 AWG · m',    sku: 'CE-1244', s: 240, pr: '₡850',    st: 'ok',   trend: [8,10,12,14,18,22]  },
  ];
  const statusStyles = {
    ok:   { bg: MK.greenSoft,  c: '#047857',  t: 'En stock' },
    low:  { bg: MK.yellowSoft, c: '#92400E',  t: 'Bajo'      },
    crit: { bg: MK.redSoft,    c: '#B91C1C',  t: 'Crítico'   },
  };

  const salesData = [180, 220, 195, 280, 310, 290, 340, 385];
  const salesLabels = ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];

  return (
    <BrowserFrame url="panel.ferreterialopez.cr">
      <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', minHeight: 400 }}>
        {/* Sidebar */}
        <div style={{ background: '#0F1419', color: '#fff', padding: '18px 0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0 18px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={13} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>FerreLópez</div>
              <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 1 }}>Admin · v2.4</div>
            </div>
          </div>

          {[
            { Icon: BarChart3, t: 'Dashboard' },
            { Icon: Package,   t: 'Inventario', a: true, badge: '12' },
            { Icon: TrendingUp,t: 'Ventas' },
            { Icon: Users,     t: 'Clientes' },
            { Icon: Settings,  t: 'Ajustes' },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '8px 18px',
              background: m.a ? 'rgba(79,70,229,0.18)' : 'transparent',
              borderLeft: `2.5px solid ${m.a ? INDIGO : 'transparent'}`,
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 10.5,
              color: m.a ? '#fff' : 'rgba(255,255,255,0.55)',
              fontWeight: m.a ? 600 : 500,
            }}>
              <m.Icon size={13} strokeWidth={2} />
              <span style={{ flex: 1 }}>{m.t}</span>
              {m.badge && (
                <span style={{
                  background: m.a ? INDIGO : 'rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: 8, fontWeight: 700,
                  padding: '1px 6px', borderRadius: 99, fontFamily: F_MONO,
                }}>{m.badge}</span>
              )}
            </div>
          ))}

          {/* Bottom user card */}
          <div style={{ marginTop: 'auto', padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(135deg, ${INDIGO}, #818CF8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9, fontWeight: 700 }}>RL</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>Ramón López</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>Gerente</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ padding: '18px 22px', background: MK.card, overflow: 'hidden' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>Inventario</div>
              <div style={{ fontFamily: F_DISPLAY, fontSize: 24, fontWeight: 400, color: MK.text, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Resumen <span style={{ fontStyle: 'italic' }}>general</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: MK.bg, border: `1px solid ${MK.border}`,
                padding: '6px 10px', fontSize: 9.5, color: MK.muted,
                fontFamily: F_MONO,
              }}>
                <Search size={10} /> Buscar producto…
              </div>
              <div style={{ position: 'relative' }}>
                <Bell size={13} color={MK.textSoft} strokeWidth={2} />
                <span style={{ position: 'absolute', top: -3, right: -3, width: 7, height: 7, borderRadius: '50%', background: MK.red }} />
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: INDIGO, color: '#fff',
                padding: '8px 14px', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.06em',
                boxShadow: `0 4px 12px ${INDIGO}40`,
              }}>
                <Plus size={11} strokeWidth={2.5} /> Producto
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 18 }}>
            {[
              { l: 'Total productos', v: '1,248', d: '+12 esta semana', trend: 'up',   data: [200,205,212,220,228,236,240,248], c: MK.text },
              { l: 'Stock bajo',       v: '12',    d: '4 críticos',     trend: 'flat', data: [8,10,11,9,10,12,12,12],             c: MK.yellow },
              { l: 'Por reordenar',    v: '4',     d: 'Acción urgente', trend: 'up',   data: [1,1,2,2,3,3,4,4],                   c: MK.accent },
              { l: 'Ventas hoy',       v: '₡385k', d: '+18% vs ayer',   trend: 'up',   data: [180,220,240,280,310,340,360,385],   c: MK.green },
            ].map((k, i) => (
              <div key={i} style={{
                padding: '12px 14px', border: `1px solid ${MK.border}`,
                background: MK.card, position: 'relative',
                boxShadow: SHADOW_LIFT,
              }}>
                <div style={{ fontSize: 8.5, color: MK.muted, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, marginBottom: 8 }}>{k.l}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: k.c, letterSpacing: '-0.025em', lineHeight: 1 }}>{k.v}</div>
                    <div style={{ fontSize: 8, color: MK.muted, marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                      {k.trend === 'up' && <ChevronUp size={9} color={MK.green} strokeWidth={2.5} />}
                      {k.d}
                    </div>
                  </div>
                  <Spark data={k.data} color={k.c} w={60} h={28} sw={1.5} />
                </div>
              </div>
            ))}
          </div>

          {/* Chart + Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14 }}>
            {/* Sales chart */}
            <div style={{ padding: 14, border: `1px solid ${MK.border}`, background: MK.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Ventas mensuales</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: MK.text, marginTop: 4, letterSpacing: '-0.02em' }}>₡2.41M <span style={{ fontSize: 10, color: MK.green, fontWeight: 600, marginLeft: 4 }}>↗ +24%</span></div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['7D', '30D', '6M'].map((p, i) => {
                    const active = i === 2;
                    return (
                      <span key={p} style={{
                        fontSize: 8.5, padding: '3px 8px',
                        background: active ? MK.text : 'transparent',
                        color: active ? '#fff' : MK.muted,
                        border: `1px solid ${active ? MK.text : MK.border}`,
                        fontWeight: 700, letterSpacing: '0.06em',
                        fontFamily: F_MONO,
                      }}>{p}</span>
                    );
                  })}
                </div>
              </div>
              <LineChart data={salesData} labels={salesLabels} color={INDIGO} w={380} h={150} />
            </div>

            {/* Activity feed */}
            <div style={{ padding: 14, border: `1px solid ${MK.border}`, background: MK.card, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Actividad reciente</div>
              {[
                { Icon: ShoppingBag, c: MK.green,  t: 'Venta · #2847',         d: 'Sucursal Centro', a: '₡18.400', s: 'hace 3min' },
                { Icon: Package,     c: MK.accent, t: 'Stock bajo · Taladro',  d: '3 unidades',       a: 'Alerta',   s: 'hace 12min' },
                { Icon: Users,       c: INDIGO,    t: 'Nuevo cliente',         d: 'Constructora SC',  a: '+1',       s: 'hace 1h' },
                { Icon: CheckCircle2,c: MK.green,  t: 'Pedido entregado',      d: 'Orden #2841',      a: '✓',        s: 'hace 2h' },
              ].map((a, i, arr) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, padding: '8px 0',
                  borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
                  alignItems: 'center',
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: `${a.c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <a.Icon size={11} color={a.c} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: MK.text, fontWeight: 600 }}>{a.t}</div>
                    <div style={{ fontSize: 8.5, color: MK.muted }}>{a.d}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: a.c, fontWeight: 700, fontFamily: F_MONO }}>{a.a}</div>
                    <div style={{ fontSize: 7.5, color: MK.mutedSoft, fontFamily: F_MONO, marginTop: 1 }}>{a.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products table */}
          <div style={{ marginTop: 16, border: `1px solid ${MK.border}`, background: MK.card }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2.6fr 0.7fr 0.5fr 0.7fr 0.6fr', padding: '10px 14px', background: MK.bg, fontSize: 8, fontWeight: 700, color: MK.muted, textTransform: 'uppercase', letterSpacing: '0.14em', borderBottom: `1px solid ${MK.border}`, alignItems: 'center' }}>
              <span>Producto</span><span>SKU</span><span>Stock</span><span>Precio</span><span>Estado</span>
            </div>
            {rows.slice(0, 4).map((row, i) => {
              const s = statusStyles[row.st];
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '2.6fr 0.7fr 0.5fr 0.7fr 0.6fr',
                  padding: '10px 14px',
                  borderBottom: i < 3 ? `1px solid ${MK.borderSoft}` : 'none',
                  fontSize: 10, alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 26, height: 26, background: MK.bg, border: `1px solid ${MK.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Package size={12} color={MK.muted} strokeWidth={1.8} />
                    </div>
                    <span style={{ color: MK.text, fontWeight: 500 }}>{row.p}</span>
                  </div>
                  <span style={{ color: MK.muted, fontFamily: F_MONO, fontSize: 9 }}>{row.sku}</span>
                  <span style={{ color: MK.text, fontWeight: 600 }}>{row.s}</span>
                  <span style={{ color: MK.text, fontWeight: 600 }}>{row.pr}</span>
                  <span style={{
                    fontSize: 8, fontWeight: 700, padding: '3px 8px',
                    background: s.bg, color: s.c,
                    justifySelf: 'flex-start',
                    letterSpacing: '0.06em',
                  }}>{s.t}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 05 · SEO — Refined SERP + analytics
// ────────────────────────────────────────────────────────────────────────
function SEOMock() {
  const trafficData = [1240, 1850, 2400, 3200, 4100, 5800, 7400, 9200, 11600];
  const trafficLabels = ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];

  return (
    <div style={{
      background: MK.bg, padding: 22, border: `1px solid ${MK.border}`, borderRadius: 10,
      display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 18,
      boxShadow: SHADOW_FRAME,
    }} className="vo-mk-seo">

      {/* Left: Google SERP */}
      <div style={{ background: MK.card, padding: 20, border: `1px solid ${MK.border}` }}>
        {/* Google header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${MK.borderSoft}` }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
          <div style={{
            flex: 1, padding: '8px 16px',
            border: `1px solid ${MK.border}`,
            borderRadius: 24, fontSize: 11, color: MK.text,
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 1px 6px rgba(32,33,36,0.08)',
          }}>
            <Search size={12} color={MK.muted} />
            <span style={{ flex: 1 }}>diseño web Costa Rica</span>
            <span style={{ width: 1, height: 14, background: MK.border }} />
            <span style={{ fontSize: 9, color: '#4285F4' }}>🔍</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 18, fontSize: 9.5, color: MK.muted, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${MK.borderSoft}` }}>
          <span style={{ color: '#4285F4', borderBottom: '2px solid #4285F4', paddingBottom: 6, fontWeight: 500 }}>Todo</span>
          <span>Imágenes</span><span>Videos</span><span>Mapas</span><span>Noticias</span><span>Más</span>
        </div>

        <div style={{ fontSize: 9, color: MK.muted, marginBottom: 12, fontFamily: F_MONO }}>
          Cerca de <strong>2.340.000</strong> resultados · 0,42 segundos
        </div>

        {/* Our #1 result */}
        <div style={{
          background: '#FFF8F4', padding: '14px 16px',
          border: `1.5px solid ${MK.accent}50`,
          marginBottom: 14, position: 'relative',
          boxShadow: `0 8px 24px ${MK.accent}15`,
        }}>
          <div style={{
            position: 'absolute', top: -10, right: 12,
            background: MK.accent, color: '#fff',
            fontSize: 8.5, fontWeight: 700, padding: '4px 10px',
            letterSpacing: '0.12em',
            boxShadow: `0 4px 12px ${MK.accent}50`,
          }}>★ #1 POSICIÓN</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, marginBottom: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: MK.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 8, fontWeight: 700 }}>V</div>
            <div>
              <span style={{ color: MK.text, fontWeight: 500 }}>VO Studio</span>
              <span style={{ color: MK.muted, marginInline: 4 }}>·</span>
              <span style={{ color: MK.muted }}>https://vostudio.cr</span>
              <span style={{ color: MK.muted, marginInline: 2 }}>›</span>
              <span style={{ color: MK.muted }}>diseño-web</span>
            </div>
          </div>
          <div style={{ fontSize: 14, color: MK.blueG, fontWeight: 400, marginBottom: 5, lineHeight: 1.3 }}>VO Studio — Diseño web profesional en Costa Rica</div>
          <div style={{ fontSize: 10.5, color: MK.textSoft, lineHeight: 1.5 }}>
            Páginas web modernas, rápidas y optimizadas para Google. Ingenieros UTN con +800 proyectos entregados. <strong>Cotización gratis en 24h</strong>…
          </div>
          {/* Sitelinks */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${MK.borderSoft}` }}>
            {[
              { t: 'Proyectos', d: 'JD Virtual · UTN Maps' },
              { t: 'Precios',   d: 'Desde ₡450k · Sin sorpresas' },
            ].map((sl, i) => (
              <div key={i}>
                <div style={{ fontSize: 9.5, color: MK.blueG }}>{sl.t}</div>
                <div style={{ fontSize: 8.5, color: MK.muted, marginTop: 1 }}>{sl.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Other results */}
        {[
          { fav: '#4A90E2', url: 'designcr.com',  title: 'Design CR — Agencia digital',    desc: 'Servicios de diseño y desarrollo web para empresas en Costa Rica desde…' },
          { fav: '#7B61FF', url: 'webdev.cr',     title: 'WebDev CR — Páginas web a medida',desc: 'Creamos sitios web profesionales con el mejor diseño y SEO incluido…' },
        ].map((r, i, arr) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: r.fav }} />
              <div style={{ fontSize: 9, color: MK.text }}>
                <span style={{ fontWeight: 500 }}>{r.url.split('.')[0].toUpperCase()}</span>
                <span style={{ color: MK.muted, marginInline: 4 }}>·</span>
                <span style={{ color: MK.muted }}>https://{r.url}</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: MK.blueG, marginBottom: 3, lineHeight: 1.3 }}>{r.title}</div>
            <div style={{ fontSize: 10, color: MK.textSoft, lineHeight: 1.5 }}>{r.desc}</div>
          </div>
        ))}
      </div>

      {/* Right: Analytics + DA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Domain Authority */}
        <div style={{
          background: MK.card, padding: 14, border: `1px solid ${MK.border}`,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ position: 'relative' }}>
            <Ring progress={0.87} size={62} sw={6} color={MK.accent} track={MK.borderSoft} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: MK.text, lineHeight: 1, letterSpacing: '-0.02em' }}>87</div>
              <div style={{ fontSize: 7, color: MK.muted, fontFamily: F_MONO, letterSpacing: '0.1em' }}>/ 100</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Domain Authority</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MK.text, marginBottom: 2 }}>Excelente</div>
            <div style={{ fontSize: 9, color: MK.green, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <ChevronUp size={10} strokeWidth={2.5} /> +14 puntos vs. competencia
            </div>
          </div>
        </div>

        {/* Traffic chart */}
        <div style={{ background: MK.card, padding: 14, border: `1px solid ${MK.border}`, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Tráfico orgánico</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MK.text, marginTop: 4, letterSpacing: '-0.025em', display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
                +847%
                <span style={{ fontSize: 10, color: MK.green, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp size={11} strokeWidth={2.5} />
                  vs. 9 meses atrás
                </span>
              </div>
            </div>
            <div style={{ fontSize: 8.5, color: MK.muted, fontFamily: F_MONO, padding: '3px 7px', border: `1px solid ${MK.border}`, alignSelf: 'flex-start' }}>
              9M
            </div>
          </div>
          <LineChart data={trafficData} labels={trafficLabels} color={MK.accent} w={380} h={130} />
        </div>

        {/* Keyword table */}
        <div style={{ background: MK.card, padding: 14, border: `1px solid ${MK.border}` }}>
          <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Top palabras clave</div>
          {[
            { kw: 'diseño web Costa Rica', pos: 1,  change: 8,  vol: '5.4k' },
            { kw: 'e-commerce CR',         pos: 3,  change: 2,  vol: '2.1k' },
            { kw: 'desarrollo web SJO',    pos: 4,  change: 5,  vol: '1.8k' },
            { kw: 'apps móviles CR',       pos: 7,  change: 12, vol: '980'  },
          ].map((k, i, arr) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 36px 36px 50px',
              alignItems: 'center', gap: 8,
              padding: '7px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
              fontSize: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                <Target size={9} color={MK.muted} strokeWidth={2} />
                <span style={{ color: MK.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{k.kw}</span>
              </div>
              <span style={{ color: MK.text, fontWeight: 700, textAlign: 'center', fontFamily: F_MONO, fontSize: 10 }}>#{k.pos}</span>
              <span style={{ color: MK.green, fontWeight: 700, fontSize: 9, textAlign: 'right', display: 'inline-flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                <ChevronUp size={9} strokeWidth={2.5} />{k.change}
              </span>
              <span style={{ color: MK.muted, fontSize: 9, fontFamily: F_MONO, textAlign: 'right' }}>{k.vol}/m</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .vo-mk-seo { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 06 · MAINTENANCE — Real status-page dashboard
// ────────────────────────────────────────────────────────────────────────
function MaintenanceMock() {
  return (
    <BrowserFrame url="status.vostudio.cr">
      <div style={{ padding: 24, background: MK.bg }}>
        {/* Header strip */}
        <div style={{
          background: MK.card, border: `1px solid ${MK.border}`,
          padding: '18px 22px', marginBottom: 14,
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'center',
          boxShadow: SHADOW_LIFT,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative band */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${MK.green} 0%, ${MK.green} 90%, ${MK.yellow} 95%, ${MK.green} 100%)`,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: MK.greenSoft,
              border: `2px solid ${MK.green}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px ${MK.green}50`,
            }}>
              <CheckCircle2 size={22} color={MK.green} strokeWidth={2.2} fill={MK.greenSoft} />
            </div>
            <div>
              <div style={{ fontSize: 9, color: MK.green, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>● Todos los sistemas operativos</div>
              <div style={{ fontFamily: F_DISPLAY, fontSize: 22, color: MK.text, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Funcionando con <span style={{ fontStyle: 'italic', color: MK.green }}>normalidad</span>
              </div>
              <div style={{ fontSize: 10, color: MK.muted, marginTop: 3, fontFamily: F_MONO }}>Última caída: hace 18 días · 4 min · resuelta</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>Uptime · 30d</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: MK.green, letterSpacing: '-0.03em', lineHeight: 1 }}>99.98<span style={{ fontSize: 18, opacity: 0.7 }}>%</span></div>
            <div style={{ fontSize: 9, color: MK.green, fontWeight: 600, marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <ChevronUp size={10} strokeWidth={2.5} /> +0.12% vs. mes anterior
            </div>
          </div>
        </div>

        {/* 30-day uptime bar chart */}
        <div style={{ background: MK.card, border: `1px solid ${MK.border}`, padding: 16, marginBottom: 14, boxShadow: SHADOW_LIFT }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Disponibilidad · últimos 30 días</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 8.5, color: MK.muted }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, background: MK.green, borderRadius: 1 }} />Operativo
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, background: MK.yellow, borderRadius: 1 }} />Degradado
              </span>
            </div>
          </div>
          <UptimeBars days={60} h={42} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 8, color: MK.mutedSoft, fontFamily: F_MONO }}>
            <span>Hace 60 días</span>
            <span>Hoy</span>
          </div>
        </div>

        {/* Service status grid with sparklines */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { Icon: Globe,    n: 'Sitio web',    lat: '89ms',  data: [85, 90, 88, 92, 87, 89] },
            { Icon: Server,   n: 'API',          lat: '142ms', data: [150, 145, 140, 148, 142, 142] },
            { Icon: Database, n: 'Base de datos',lat: '38ms',  data: [40, 38, 36, 39, 37, 38] },
            { Icon: Zap,      n: 'CDN',          lat: '24ms',  data: [25, 24, 26, 22, 25, 24] },
          ].map((s, i) => (
            <div key={i} style={{ background: MK.card, padding: '12px 14px', border: `1px solid ${MK.border}`, boxShadow: SHADOW_LIFT }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <s.Icon size={13} color={MK.text} strokeWidth={1.8} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: MK.text }}>{s.n}</span>
                </div>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: MK.green, boxShadow: `0 0 8px ${MK.green}`, animation: 'pulse 2s infinite' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: MK.text, letterSpacing: '-0.02em' }}>{s.lat}</div>
                  <div style={{ fontSize: 7.5, color: MK.muted, fontFamily: F_MONO, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginTop: 1 }}>Latencia</div>
                </div>
                <Spark data={s.data} color={MK.green} w={48} h={22} sw={1.3} />
              </div>
            </div>
          ))}
        </div>

        {/* Incident timeline */}
        <div style={{ background: MK.card, border: `1px solid ${MK.border}`, padding: 16, boxShadow: SHADOW_LIFT }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Actividad reciente</div>
            <div style={{ fontSize: 9, color: MK.muted, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <RotateCw size={10} strokeWidth={2} /> Actualizado hace 2 min
            </div>
          </div>
          {[
            { Icon: CheckCircle2, c: MK.green,  t: 'Backup automático completado',         d: '128MB · 3 bases de datos',  s: 'hace 2h' },
            { Icon: RotateCw,     c: MK.accent, t: 'Actualización de dependencias',        d: 'react@19.0.2 · vite@8.0.10', s: 'hace 1d' },
            { Icon: Shield,       c: MK.green,  t: 'Bloqueo automático · 43 IPs',          d: 'Intentos de fuerza bruta',   s: 'hace 3d' },
            { Icon: BarChart3,    c: MK.muted,  t: 'Reporte mensual generado',             d: 'Enviado a client@empresa.cr', s: 'hace 7d' },
          ].map((a, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
            }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: `${a.c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <a.Icon size={12} color={a.c} strokeWidth={2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, color: MK.text, fontWeight: 600 }}>{a.t}</div>
                <div style={{ fontSize: 9, color: MK.muted, marginTop: 1, fontFamily: F_MONO }}>{a.d}</div>
              </div>
              <span style={{ fontSize: 9, color: MK.mutedSoft, fontFamily: F_MONO, letterSpacing: '0.04em' }}>{a.s}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </BrowserFrame>
  );
}

// ─── Dispatcher ────────────────────────────────────────────────────────
export function ServiceMockup({ n }) {
  switch (n) {
    case '01': return <WebsiteMock />;
    case '02': return <EcommerceMock />;
    case '03': return <AppMock />;
    case '04': return <SystemMock />;
    case '05': return <SEOMock />;
    case '06': return <MaintenanceMock />;
    default:   return null;
  }
}
