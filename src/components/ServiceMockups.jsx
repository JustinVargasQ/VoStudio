/**
 * ServiceMockups — polished mini-products that live inside the service detail modal.
 *
 * These are NOT generic illustrations — they're built to read as real screenshots
 * of real products, each with its own brand identity, typography, and data story.
 */

import React, { useState } from 'react';
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
// 01 · WEBSITES — Lumière restaurant (warm, interactive booking & menu)
// ────────────────────────────────────────────────────────────────────────
function WebsiteMock() {
  const [tab, setTab]         = useState('menu');
  const [menuCat, setMenuCat] = useState('Principales');
  const [people, setPeople]   = useState(2);
  const [dayIdx, setDayIdx]   = useState(2);
  const [timeSlot, setTimeSlot] = useState('20:00');
  const [bookingDone, setBookingDone] = useState(false);
  const [likedDishes, setLikedDishes] = useState({});

  // Color palette — warm, editorial
  const CREAM   = '#F8F1E5';
  const DARK    = '#1A0F0A';
  const COFFEE  = '#3D2418';
  const GOLD    = '#C9A961';
  const GOLD_S  = '#A6864B';
  const RED     = '#A4382E';

  // Build next 5 days dynamically
  const today = new Date();
  const days  = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      day: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][d.getDay()],
      num: d.getDate(),
      label: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : null,
    };
  });

  const SLOTS = ['18:30', '19:00', '20:00', '20:30', '21:00'];

  const MENU = {
    Entradas: [
      { name: 'Burrata fresca',          desc: 'Tomates heirloom, albahaca, aceite de oliva trufado',     price: '₡8.900',  img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=240&q=80' },
      { name: 'Tartar de atún',          desc: 'Aguacate, sésamo negro, salsa ponzu, wonton crujiente',   price: '₡11.200', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=240&q=80' },
      { name: 'Hummus mediterráneo',     desc: 'Garbanzo, tahini, pimentón ahumado, pan pita',            price: '₡6.500',  img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=240&q=80' },
    ],
    Principales: [
      { name: 'Risotto de hongos',       desc: 'Porcini, parmesano reggiano, trufa negra y romero fresco', price: '₡14.500', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=240&q=80', popular: true },
      { name: 'Salmón a la parrilla',    desc: 'Quinoa tricolor, espárragos, salsa de eneldo y limón',      price: '₡16.800', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=240&q=80' },
      { name: 'Cordero al merlot',       desc: 'Reducción de vino tinto, puré de papa rústico, romero',     price: '₡22.400', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80' },
    ],
    Postres: [
      { name: 'Tiramisú clásico',        desc: 'Mascarpone, espresso, cacao amargo, ladyfingers caseros',   price: '₡5.800',  img: 'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&w=240&q=80' },
      { name: 'Crème brûlée',            desc: 'Vainilla de Madagascar, costra de azúcar quemada',          price: '₡5.400',  img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=240&q=80' },
      { name: 'Tarta de chocolate 70%',  desc: 'Ganache de chocolate negro, frambuesa, helado de vainilla', price: '₡6.200',  img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=240&q=80' },
    ],
    Bebidas: [
      { name: 'Malbec reserva',          desc: 'Mendoza, Argentina · cosecha 2019 · copa',                 price: '₡4.500',  img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=240&q=80' },
      { name: 'Aperol Spritz',           desc: 'Prosecco, aperol, soda, naranja deshidratada',             price: '₡3.800',  img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=240&q=80' },
      { name: 'Espresso doble',          desc: 'Café de altura, tueste medio, origen Tarrazú',              price: '₡1.800',  img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=240&q=80' },
    ],
  };

  const CATEGORIES = ['Entradas', 'Principales', 'Postres', 'Bebidas'];
  const currentDishes = MENU[menuCat];

  const handleReserve = () => {
    setBookingDone(true);
    setTimeout(() => setBookingDone(false), 3000);
  };
  const toggleLike = (key) => setLikedDishes(l => ({ ...l, [key]: !l[key] }));

  return (
    <BrowserFrame url="lumiere.cr">
      <div style={{ background: CREAM, position: 'relative' }}>

        {/* Top bar — reservation hours + phone */}
        <div style={{
          background: DARK, color: CREAM,
          padding: '5px 28px', fontSize: 9, fontFamily: F_MONO,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          letterSpacing: '0.06em',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981', animation: 'pulse 2s infinite' }} />
            ABIERTO · cierra a las 23:30
          </span>
          <span style={{ opacity: 0.75 }}>+506 2256 · Av. Escazú · Reservas online</span>
        </div>

        {/* Nav */}
        <div style={{
          padding: '18px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${COFFEE}15`,
        }}>
          <div style={{
            fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 26,
            color: DARK, letterSpacing: '-0.025em', lineHeight: 1,
          }}>
            Lumi<span style={{ color: GOLD }}>è</span>re
            <div style={{ fontSize: 7, color: COFFEE, opacity: 0.6, letterSpacing: '0.32em', textTransform: 'uppercase', fontFamily: F_MONO, fontStyle: 'normal', marginTop: 2 }}>
              Cocina · de · autor
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, background: `${COFFEE}08`, borderRadius: 999, padding: 3 }}>
            {[
              { id: 'menu',     label: 'Menú' },
              { id: 'reservar', label: 'Reservar' },
              { id: 'sobre',    label: 'Nosotros' },
            ].map(t => {
              const a = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: '7px 16px', borderRadius: 999,
                  fontSize: 10, fontWeight: a ? 700 : 500,
                  background: a ? DARK : 'transparent',
                  color: a ? CREAM : COFFEE,
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  letterSpacing: '0.04em', transition: 'all 0.2s',
                }}>{t.label}</button>
              );
            })}
          </div>
          <button onClick={() => setTab('reservar')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: DARK, color: CREAM,
            padding: '10px 20px', border: 'none', cursor: 'pointer',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase',
            fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = COFFEE}
            onMouseLeave={(e) => e.currentTarget.style.background = DARK}
          >
            Reservar mesa
          </button>
        </div>

        <div style={{ minHeight: 420, background: CREAM }}>

          {/* TAB: Menú */}
          {tab === 'menu' && (
            <div style={{ padding: '24px 28px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 9, color: GOLD_S, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
                    — La carta
                  </div>
                  <div style={{ fontFamily: F_DISPLAY, fontSize: 28, color: DARK, letterSpacing: '-0.025em', lineHeight: 1 }}>
                    Sabores con <span style={{ fontStyle: 'italic', color: GOLD }}>historia</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {CATEGORIES.map(c => {
                    const a = menuCat === c;
                    return (
                      <button key={c} onClick={() => setMenuCat(c)} style={{
                        fontSize: 9.5, padding: '6px 12px',
                        background: a ? DARK : 'transparent',
                        color: a ? CREAM : COFFEE,
                        border: `1px solid ${a ? DARK : `${COFFEE}25`}`,
                        fontWeight: a ? 700 : 500, letterSpacing: '0.04em',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s',
                      }}>{c}</button>
                    );
                  })}
                </div>
              </div>

              {/* Dish grid — real food photos */}
              <div key={menuCat} style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
                animation: 'fadeIn 0.4s ease',
              }}>
                {currentDishes.map((d, i) => {
                  const key = `${menuCat}-${i}`;
                  const liked = !!likedDishes[key];
                  return (
                    <div key={key} style={{
                      background: '#fff',
                      border: `1px solid ${COFFEE}12`,
                      overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                      position: 'relative',
                      transition: 'transform 0.25s, box-shadow 0.25s',
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(61,36,24,0.12)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#EFE6D6' }}>
                        <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        {d.popular && (
                          <span style={{
                            position: 'absolute', top: 8, left: 8,
                            background: GOLD, color: DARK,
                            fontSize: 8, fontWeight: 700, padding: '3px 8px',
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                          }}>★ Favorito</span>
                        )}
                        <button onClick={() => toggleLike(key)} aria-label="Favorito" style={{
                          position: 'absolute', top: 8, right: 8,
                          width: 26, height: 26, borderRadius: '50%',
                          background: 'rgba(255,255,255,0.92)', border: 'none',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', padding: 0,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
                          transition: 'transform 0.18s',
                          transform: liked ? 'scale(1.15)' : 'scale(1)',
                        }}>
                          <Heart size={12} fill={liked ? RED : 'transparent'} color={liked ? RED : COFFEE} strokeWidth={2} />
                        </button>
                      </div>
                      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                          <div style={{ fontFamily: F_DISPLAY, fontSize: 14, color: DARK, letterSpacing: '-0.015em', lineHeight: 1.15 }}>{d.name}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: GOLD_S, fontFamily: F_MONO, flexShrink: 0 }}>{d.price}</div>
                        </div>
                        <div style={{ fontSize: 9.5, color: COFFEE, opacity: 0.75, lineHeight: 1.45, flex: 1 }}>{d.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: Reservar */}
          {tab === 'reservar' && (
            <div style={{ padding: '32px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center' }}>
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" alt="Lumière interior" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 14, left: 14, right: 14,
                  background: 'rgba(26,15,10,0.85)', color: CREAM,
                  padding: '10px 14px', backdropFilter: 'blur(8px)',
                }}>
                  <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 14, marginBottom: 2 }}>
                    "Una experiencia inolvidable"
                  </div>
                  <div style={{ fontSize: 9, opacity: 0.75, fontFamily: F_MONO }}>— Revista Gastronomía 2025</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 9, color: GOLD_S, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                  — Reservá tu mesa
                </div>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 28, color: DARK, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 18 }}>
                  Una noche, una <span style={{ fontStyle: 'italic', color: GOLD }}>memoria</span>.
                </div>

                {/* Number of people */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 9, color: COFFEE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                    Personas
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => setPeople(p => Math.max(1, p - 1))} style={{
                      width: 30, height: 30, border: `1px solid ${COFFEE}30`,
                      background: 'transparent', color: DARK, fontSize: 16, lineHeight: 1,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>−</button>
                    <span style={{ fontFamily: F_DISPLAY, fontSize: 22, color: DARK, minWidth: 28, textAlign: 'center', letterSpacing: '-0.02em' }}>{people}</span>
                    <button onClick={() => setPeople(p => Math.min(10, p + 1))} style={{
                      width: 30, height: 30, border: `1px solid ${COFFEE}30`,
                      background: 'transparent', color: DARK, fontSize: 16, lineHeight: 1,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>+</button>
                    <span style={{ fontSize: 9, color: COFFEE, opacity: 0.65, fontFamily: F_MONO, marginLeft: 4 }}>
                      adulto{people > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Date picker */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 9, color: COFFEE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                    Fecha
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {days.map((d, i) => {
                      const a = dayIdx === i;
                      return (
                        <button key={i} onClick={() => setDayIdx(i)} style={{
                          flex: 1, padding: '8px 4px',
                          background: a ? DARK : '#fff',
                          color: a ? CREAM : DARK,
                          border: `1px solid ${a ? DARK : `${COFFEE}20`}`,
                          cursor: 'pointer', fontFamily: 'inherit',
                          display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center',
                          transition: 'all 0.18s',
                        }}>
                          <span style={{ fontSize: 7.5, fontFamily: F_MONO, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d.label || d.day}</span>
                          <span style={{ fontFamily: F_DISPLAY, fontSize: 16, fontStyle: a ? 'italic' : 'normal', letterSpacing: '-0.02em' }}>{d.num}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slot */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 9, color: COFFEE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                    Horario
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {SLOTS.map(s => {
                      const a = timeSlot === s;
                      return (
                        <button key={s} onClick={() => setTimeSlot(s)} style={{
                          fontSize: 10, padding: '6px 10px',
                          background: a ? DARK : '#fff',
                          color: a ? CREAM : DARK,
                          border: `1px solid ${a ? DARK : `${COFFEE}20`}`,
                          cursor: 'pointer', fontFamily: F_MONO,
                          fontWeight: a ? 700 : 500, letterSpacing: '0.04em',
                          transition: 'all 0.18s',
                        }}>{s}</button>
                      );
                    })}
                  </div>
                </div>

                <button onClick={handleReserve} style={{
                  width: '100%', padding: '13px 20px',
                  background: DARK, color: CREAM,
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.background = COFFEE}
                  onMouseLeave={(e) => e.currentTarget.style.background = DARK}
                >
                  Confirmar reserva · {people} pers. · {days[dayIdx].day} {days[dayIdx].num} · {timeSlot}
                </button>
                <div style={{ fontSize: 9, color: COFFEE, opacity: 0.6, marginTop: 10, textAlign: 'center', fontFamily: F_MONO }}>
                  Confirmación inmediata · cancelación gratis hasta 4h antes
                </div>
              </div>
            </div>
          )}

          {/* TAB: Sobre nosotros */}
          {tab === 'sobre' && (
            <div style={{ padding: '32px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 9, color: GOLD_S, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                  — Nuestra historia
                </div>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 32, color: DARK, letterSpacing: '-0.025em', lineHeight: 1.0, marginBottom: 18 }}>
                  Cocina de <span style={{ fontStyle: 'italic', color: GOLD }}>autor</span>,<br />
                  desde 2018.
                </div>
                <p style={{ fontSize: 11.5, color: COFFEE, lineHeight: 1.65, marginBottom: 18 }}>
                  Lumière nació en San José con una idea simple: traer técnica francesa a ingredientes costarricenses de temporada. Nuestro chef Esteban Mora trabajó 8 años en cocinas Michelin de Lyon antes de volver a casa.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 18 }}>
                  {[
                    { v: '7',   l: 'Años abiertos' },
                    { v: '4.9', l: 'Google · 312 reseñas' },
                    { v: '★★',  l: 'Guía Gastronómica' },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: '10px 12px', background: '#fff', border: `1px solid ${COFFEE}12` }}>
                      <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 22, color: GOLD, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: 8, color: COFFEE, opacity: 0.7, marginTop: 4, letterSpacing: '0.06em' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80" alt="Chef Esteban Mora" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(0.15)' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(26,15,10,0.92), transparent)',
                  padding: '36px 16px 14px',
                }}>
                  <div style={{ color: CREAM, fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 14, marginBottom: 2 }}>
                    Esteban Mora
                  </div>
                  <div style={{ color: GOLD, fontSize: 9, fontFamily: F_MONO, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                    Chef ejecutivo
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Booking confirmation toast */}
        {bookingDone && (
          <div style={{
            position: 'absolute', bottom: 20, right: 20, zIndex: 50,
            background: DARK, color: CREAM,
            padding: '12px 18px',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            boxShadow: '0 16px 40px rgba(0,0,0,0.30)',
            border: `1px solid ${GOLD}55`,
            animation: 'toastUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth: 320,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: `${GOLD}25`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <CheckCircle2 size={14} color={GOLD} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2 }}>Reserva confirmada</div>
              <div style={{ fontSize: 9, opacity: 0.75, fontFamily: F_MONO }}>
                {days[dayIdx].day} {days[dayIdx].num} · {timeSlot} · mesa para {people}
              </div>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </BrowserFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────
// (Old VO Studio portfolio mock — kept for reference, not exported)
// ────────────────────────────────────────────────────────────────────────
function WebsiteMock_OLD_UNUSED() {
  const [tab, setTab]                 = useState('inicio');
  const [siteType, setSiteType]       = useState('landing');
  const [pages, setPages]             = useState(5);
  const [selectedProject, setSelectedProject] = useState(0);
  const [themeMode, setThemeMode]     = useState('dark');     // dark | light
  const [visitors, setVisitors]       = useState(127);
  const [showContact, setShowContact] = useState(false);
  const [formStep, setFormStep]       = useState('idle');     // idle | filling | sent
  const [formName, setFormName]       = useState('');
  const [formEmail, setFormEmail]     = useState('');
  const [rotatingWord, setRotatingWord] = useState(0);

  const isDark = themeMode === 'dark';
  const DARK   = isDark ? '#0A0A12' : '#F8F6FF';
  const MID    = isDark ? '#12121E' : '#FFFFFF';
  const FG     = isDark ? '#fff'    : '#0A0A12';
  const FG_S   = isDark ? 'rgba(255,255,255,0.60)' : 'rgba(10,10,18,0.65)';
  const FG_D   = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(10,10,18,0.45)';
  const BORDER_C = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,18,0.10)';
  const SOFT_BG  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(10,10,18,0.04)';
  const ACC    = '#8A46FF';
  const ACC2   = '#FF5C9A';

  const tabs = ['Inicio', 'Proyectos', 'Servicios'];
  const ROTATING_WORDS = ['negocios', 'ideas', 'marcas', 'futuros'];

  // Rotate words every 2.4s
  React.useEffect(() => {
    const id = setInterval(() => setRotatingWord(w => (w + 1) % ROTATING_WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  // Live visitor counter — drift slightly every 4s
  React.useEffect(() => {
    const id = setInterval(() => {
      setVisitors(v => Math.max(98, Math.min(189, v + Math.round((Math.random() - 0.4) * 4))));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const PROJECTS = [
    { name: 'JD Virtual Store', tag: 'E-commerce', year: '2025', color: '#FF5C9A', stat: '+340% ventas', detail: 'Tienda online de cosméticos con catálogo de 200+ productos, carrito y pasarela de pago. Admin panel sin código para que la dueña suba productos sola.' },
    { name: 'UTN Maps',         tag: 'App móvil',   year: '2024', color: '#6AB7FF', stat: '50+ puntos',   detail: 'App de navegación interna para el campus de la UTN San Carlos. Búsqueda offline, geolocalización en tiempo real, base de datos editable por administración.' },
    { name: 'FerreLópez ERP',   tag: 'Sistema',     year: '2024', color: '#F59E0B', stat: '3 sucursales', detail: 'Sistema de inventario y ventas en tiempo real para 3 ferreterías hermanadas. Sincronización en tiempo real, alertas de stock, reportes mensuales automáticos.' },
  ];

  const SERVICES_LIST = [
    { n: '01', t: 'Páginas web',       d: 'Landing, sitio corporativo o portafolio.',    accent: ACC,       Icon: Globe },
    { n: '02', t: 'E-commerce',        d: 'Tiendas con carrito, admin y pagos reales.',  accent: ACC2,      Icon: ShoppingBag },
    { n: '03', t: 'Apps móviles',      d: 'iOS y Android con UX probada.',                accent: '#6AB7FF', Icon: Activity },
    { n: '04', t: 'Sistemas a medida', d: 'ERPs, dashboards e inventarios.',              accent: '#F59E0B', Icon: Database },
  ];

  const TESTIMONIALS = [
    { quote: 'Entregaron antes de tiempo y el resultado superó lo prometido.', name: 'María R.', role: 'JD Cosmetics' },
    { quote: 'Nos quitaron Excel de encima y ganamos 15 horas a la semana.',   name: 'Carlos L.', role: 'FerreLópez' },
  ];

  // Live price calculator
  const TYPE_BASE = { landing: 450, sitio: 950, ecommerce: 2200 };
  const estimatedPrice = TYPE_BASE[siteType] + (pages - 5) * 80;

  const submitForm = (e) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setFormStep('sent');
    setTimeout(() => {
      setShowContact(false);
      setFormStep('idle');
      setFormName(''); setFormEmail('');
    }, 2200);
  };

  return (
    <BrowserFrame url="vostudio.cr">
      <div style={{ position: 'relative', background: DARK, transition: 'background 0.3s' }}>

      {/* Live visitors strip */}
      <div style={{
        background: isDark ? 'rgba(138,70,255,0.10)' : 'rgba(138,70,255,0.08)',
        borderBottom: `1px solid ${BORDER_C}`,
        padding: '5px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 9, fontFamily: F_MONO,
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: FG_S }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#10B981',
            boxShadow: '0 0 6px #10B981', animation: 'pulse 2s infinite',
          }} />
          <strong style={{ color: FG }}>{visitors}</strong> personas viendo este sitio
        </div>
        <div style={{ color: FG_D, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span>Respuesta en &lt; 24h</span>
          <span>•</span>
          <span>Costa Rica</span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: DARK, padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER_C}`, transition: 'all 0.3s' }}>
        <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 20, color: FG, letterSpacing: '-0.02em' }}>
          VO<span style={{ color: ACC }}>.</span>Studio
        </div>
        {/* Interactive tabs */}
        <div style={{ display: 'flex', gap: 2, background: SOFT_BG, borderRadius: 999, padding: 3 }}>
          {tabs.map(t => {
            const active = tab === t.toLowerCase();
            return (
              <button key={t} onClick={() => setTab(t.toLowerCase())}
                style={{
                  padding: '6px 16px', borderRadius: 999, fontSize: 10, fontWeight: active ? 700 : 500,
                  background: active ? ACC : 'transparent',
                  color: active ? '#fff' : FG_S,
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}>{t}</button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Theme toggle */}
          <button onClick={() => setThemeMode(m => m === 'dark' ? 'light' : 'dark')}
            aria-label="Cambiar tema"
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: SOFT_BG, border: `1px solid ${BORDER_C}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: FG, padding: 0,
              transition: 'all 0.2s',
            }}>
            {isDark
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
          </button>
          <button onClick={() => setShowContact(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `linear-gradient(135deg, ${ACC2} 0%, ${ACC} 100%)`,
              color: '#fff', padding: '8px 18px', borderRadius: 999,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: `0 6px 18px ${ACC}40`,
              transition: 'transform 0.15s',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={(e)   => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Hablemos
          </button>
        </div>
      </div>

      {/* Content area */}
      <div style={{ background: DARK, minHeight: 360, overflow: 'hidden', transition: 'background 0.3s' }}>

        {/* TAB: Inicio */}
        {tab === 'inicio' && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>

            {/* Animated background gradient blobs */}
            <div aria-hidden style={{
              position: 'absolute', top: '-30%', right: '-10%', width: 450, height: 450, borderRadius: '50%',
              background: `radial-gradient(circle, ${ACC}35 0%, transparent 65%)`,
              filter: 'blur(60px)', pointerEvents: 'none',
              animation: 'floatA 12s ease-in-out infinite',
            }} />
            <div aria-hidden style={{
              position: 'absolute', bottom: '-20%', left: '-10%', width: 380, height: 380, borderRadius: '50%',
              background: `radial-gradient(circle, ${ACC2}28 0%, transparent 65%)`,
              filter: 'blur(60px)', pointerEvents: 'none',
              animation: 'floatB 14s ease-in-out infinite',
            }} />

            {/* HERO grid — text + decorative card */}
            <div style={{ padding: '36px 32px 28px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'center', position: 'relative' }}>
              <div>
                <div style={{ fontSize: 9, color: ACC2, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 20, height: 1, background: ACC2 }} />
                  Ingenieros UTN · Costa Rica
                </div>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 44, lineHeight: 1, letterSpacing: '-0.03em', color: FG, marginBottom: 14 }}>
                  Software que<br />transforma{' '}
                  <span key={rotatingWord} style={{
                    display: 'inline-block', fontStyle: 'italic',
                    background: `linear-gradient(135deg, ${ACC2} 0%, ${ACC} 100%)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', color: 'transparent',
                    animation: 'wordRotate 0.5s ease',
                  }}>{ROTATING_WORDS[rotatingWord]}</span>.
                </div>
                <div style={{ fontSize: 12, color: FG_S, lineHeight: 1.65, maxWidth: 380, marginBottom: 22 }}>
                  Webs, apps y sistemas a medida para empresas que quieren crecer sin depender de soluciones genéricas.
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button onClick={() => setShowContact(true)} style={{
                    background: `linear-gradient(135deg, ${ACC2} 0%, ${ACC} 100%)`,
                    color: '#fff', padding: '11px 22px', borderRadius: 999,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: `0 8px 22px ${ACC}40`,
                  }}>
                    Cotizar proyecto
                  </button>
                  <button onClick={() => setTab('proyectos')} style={{
                    color: FG_S, fontSize: 11, fontWeight: 500,
                    borderBottom: `1px solid ${BORDER_C}`, paddingBottom: 1,
                    background: 'transparent', border: 'none', borderBottom: `1px solid ${FG_D}`,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    Ver proyectos →
                  </button>
                </div>
              </div>

              {/* Decorative tech card — visual interest */}
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(10,10,18,0.04)',
                border: `1px solid ${BORDER_C}`,
                borderRadius: 14, padding: 18, position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(12px)',
              }}>
                <div aria-hidden style={{
                  position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%',
                  background: `radial-gradient(circle, ${ACC}40 0%, transparent 70%)`, filter: 'blur(20px)',
                }} />
                <div style={{ fontSize: 8, color: ACC, letterSpacing: '0.20em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
                  Stack 2025
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'].map(t => (
                    <div key={t} style={{
                      fontSize: 9, fontFamily: F_MONO, fontWeight: 600,
                      padding: '5px 9px', borderRadius: 6,
                      background: isDark ? 'rgba(138,70,255,0.10)' : 'rgba(138,70,255,0.08)',
                      border: `1px solid ${isDark ? 'rgba(138,70,255,0.25)' : 'rgba(138,70,255,0.18)'}`,
                      color: FG, display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACC, boxShadow: `0 0 4px ${ACC}` }} />
                      {t}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px dashed ${BORDER_C}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 8.5, color: FG_D, fontFamily: F_MONO }}>Velocidad Lighthouse</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#10B981', fontFamily: F_MONO, fontStyle: 'italic' }}>98/100</span>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div style={{
              padding: '0 32px 24px',
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
              position: 'relative',
            }}>
              {[
                ['2+',   'Años de experiencia'],
                ['15+',  'Proyectos entregados'],
                ['100%', 'Código tuyo al finalizar'],
              ].map(([v, l]) => (
                <div key={l} style={{
                  padding: '10px 14px',
                  background: SOFT_BG, borderRadius: 10,
                  border: `1px solid ${BORDER_C}`,
                }}>
                  <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 22, color: ACC, letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 8.5, color: FG_D, marginTop: 4, letterSpacing: '0.04em' }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Live price calculator */}
            <div style={{
              margin: '0 32px 22px',
              padding: '18px 20px',
              background: SOFT_BG,
              border: `1px solid ${BORDER_C}`,
              borderRadius: 14,
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center',
              position: 'relative',
            }}>
              <div>
                <div style={{ fontSize: 8, color: ACC2, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
                  ▸ Cotizá en vivo
                </div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
                  {[
                    { id: 'landing',   label: 'Landing' },
                    { id: 'sitio',     label: 'Sitio web' },
                    { id: 'ecommerce', label: 'E-commerce' },
                  ].map(o => {
                    const a = siteType === o.id;
                    return (
                      <button key={o.id} onClick={() => setSiteType(o.id)} style={{
                        fontSize: 9, padding: '5px 10px', borderRadius: 6,
                        background: a ? ACC : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(10,10,18,0.05)'),
                        color: a ? '#fff' : FG_S,
                        border: `1px solid ${a ? ACC : BORDER_C}`,
                        fontWeight: 700, letterSpacing: '0.04em',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                      }}>{o.label}</button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 9, color: FG_D, fontFamily: F_MONO, minWidth: 50 }}>{pages} págs.</span>
                  <input
                    type="range" min={3} max={15} value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    style={{
                      flex: 1, maxWidth: 160, accentColor: ACC,
                      cursor: 'pointer', height: 4,
                    }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 8, color: FG_D, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
                  Desde
                </div>
                <div key={estimatedPrice} style={{
                  fontFamily: F_DISPLAY, fontStyle: 'italic',
                  fontSize: 34, letterSpacing: '-0.025em', lineHeight: 1,
                  background: `linear-gradient(135deg, ${ACC2} 0%, ${ACC} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', color: 'transparent',
                  animation: 'priceFlash 0.4s ease',
                }}>
                  ₡{estimatedPrice}k
                </div>
                <div style={{ fontSize: 8.5, color: FG_D, marginTop: 2, fontFamily: F_MONO }}>
                  ~${Math.round(estimatedPrice * 2)} USD
                </div>
              </div>
            </div>

            {/* Testimonials carousel */}
            <div style={{
              margin: '0 32px 28px',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{
                  padding: '14px 16px',
                  background: SOFT_BG,
                  border: `1px solid ${BORDER_C}`,
                  borderRadius: 10,
                  position: 'relative',
                }}>
                  <div aria-hidden style={{
                    position: 'absolute', top: 8, right: 12,
                    fontFamily: F_DISPLAY, fontStyle: 'italic',
                    fontSize: 28, color: ACC, opacity: 0.30, lineHeight: 0.8,
                  }}>"</div>
                  <p style={{ fontSize: 11, color: FG, lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>
                    {t.quote}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${ACC2} 0%, ${ACC} 100%)`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: 8, fontWeight: 700, fontFamily: F_MONO,
                    }}>{t.name.split(' ').map(s => s[0]).join('')}</div>
                    <div>
                      <div style={{ fontSize: 10, color: FG, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 8.5, color: FG_D, fontFamily: F_MONO }}>{t.role}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                      {[0,1,2,3,4].map(s => <Star key={s} size={9} fill="#F59E0B" strokeWidth={0} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Proyectos — clickable with expanded detail */}
        {tab === 'proyectos' && (
          <div style={{ padding: '28px 32px 32px' }}>
            <div style={{ fontSize: 9, color: ACC, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>Trabajo reciente · click para expandir</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PROJECTS.map((p, i) => {
                const isOpen = selectedProject === i;
                return (
                  <button key={i} onClick={() => setSelectedProject(isOpen ? -1 : i)}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 8,
                      padding: '14px 18px',
                      background: isOpen ? `${p.color}10` : SOFT_BG,
                      border: `1px solid ${isOpen ? `${p.color}50` : BORDER_C}`,
                      borderLeft: `3px solid ${p.color}`,
                      borderRadius: '0 10px 10px 0',
                      cursor: 'pointer', textAlign: 'left',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 11, color: FG_D, minWidth: 28 }}>{String(i+1).padStart(2,'0')}</div>
                        <div>
                          <div style={{ fontSize: 13, color: FG, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 2 }}>{p.name}</div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <span style={{ fontSize: 8.5, color: p.color, background: `${p.color}18`, border: `1px solid ${p.color}30`, padding: '1px 7px', borderRadius: 999, fontWeight: 700 }}>{p.tag}</span>
                            <span style={{ fontSize: 8.5, color: FG_D, fontFamily: F_MONO }}>{p.year}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: p.color, fontWeight: 700, fontFamily: F_MONO }}>{p.stat}</div>
                    </div>
                    {isOpen && (
                      <div style={{
                        marginTop: 4, paddingTop: 10,
                        borderTop: `1px dashed ${BORDER_C}`,
                        fontSize: 11, color: FG_S,
                        lineHeight: 1.55, fontStyle: 'italic',
                        animation: 'fadeIn 0.3s ease',
                      }}>
                        {p.detail}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: Servicios — hover effects with icons */}
        {tab === 'servicios' && (
          <div style={{ padding: '28px 32px 32px' }}>
            <div style={{ fontSize: 9, color: ACC, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>Lo que construimos</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SERVICES_LIST.map((s, i) => (
                <div key={i}
                  style={{
                    padding: '18px 16px',
                    background: SOFT_BG,
                    border: `1px solid ${BORDER_C}`,
                    borderRadius: 12, position: 'relative', overflow: 'hidden',
                    cursor: 'pointer', transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${s.accent}12`;
                    e.currentTarget.style.borderColor = `${s.accent}55`;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 12px 28px ${s.accent}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = SOFT_BG;
                    e.currentTarget.style.borderColor = BORDER_C;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.accent }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: `${s.accent}20`, border: `1px solid ${s.accent}40`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: s.accent,
                    }}>
                      <s.Icon size={15} strokeWidth={1.8} />
                    </div>
                    <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 22, color: s.accent, opacity: 0.30, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</div>
                  </div>
                  <div style={{ fontSize: 13, color: FG, fontWeight: 600, marginBottom: 5, letterSpacing: '-0.01em' }}>{s.t}</div>
                  <div style={{ fontSize: 10.5, color: FG_D, lineHeight: 1.5 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact modal — slides up from bottom */}
      {showContact && (
        <div onClick={() => setShowContact(false)} style={{
          position: 'absolute', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          animation: 'overlayIn 0.2s ease',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: isDark ? '#12121E' : '#fff',
            border: `1px solid ${BORDER_C}`,
            borderRadius: '14px 14px 0 0',
            width: '100%', maxWidth: 460,
            padding: 22,
            boxShadow: '0 -20px 60px rgba(0,0,0,0.45)',
            animation: 'sheetUp 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {formStep === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '20px 12px' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `${ACC}18`, border: `1px solid ${ACC}40`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                }}>
                  <CheckCircle2 size={22} color={ACC} strokeWidth={2} />
                </div>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 18, color: FG, marginBottom: 6 }}>
                  ¡Mensaje enviado!
                </div>
                <div style={{ fontSize: 11, color: FG_S }}>
                  Te respondemos en menos de 24 horas.
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: F_DISPLAY, fontSize: 18, color: FG, letterSpacing: '-0.02em', marginBottom: 2 }}>
                      Hablemos
                    </div>
                    <div style={{ fontSize: 10, color: FG_D, fontFamily: F_MONO }}>
                      Respuesta &lt; 24h · sin compromiso
                    </div>
                  </div>
                  <button onClick={() => setShowContact(false)} aria-label="Cerrar" style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: SOFT_BG, border: 'none',
                    color: FG, cursor: 'pointer', fontSize: 14, lineHeight: 1,
                  }}>×</button>
                </div>
                <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Tu nombre"
                    style={{
                      padding: '10px 14px', fontSize: 11,
                      background: SOFT_BG, border: `1px solid ${BORDER_C}`,
                      borderRadius: 8, color: FG, outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Tu email"
                    style={{
                      padding: '10px 14px', fontSize: 11,
                      background: SOFT_BG, border: `1px solid ${BORDER_C}`,
                      borderRadius: 8, color: FG, outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <span style={{ fontSize: 9, color: FG_D, fontFamily: F_MONO }}>
                      Cotización: <strong style={{ color: ACC }}>₡{estimatedPrice}k</strong>
                    </span>
                    <button type="submit"
                      disabled={!formName || !formEmail}
                      style={{
                        background: !formName || !formEmail
                          ? SOFT_BG
                          : `linear-gradient(135deg, ${ACC2} 0%, ${ACC} 100%)`,
                        color: !formName || !formEmail ? FG_D : '#fff',
                        padding: '10px 22px', borderRadius: 999,
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                        border: 'none', cursor: !formName || !formEmail ? 'not-allowed' : 'pointer',
                        fontFamily: 'inherit',
                      }}>
                      Enviar →
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      </div>
      <style>{`
        @keyframes priceFlash { 0% { opacity: 0.5; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wordRotate { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px, 25px); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px, -20px); } }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
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
  // Sneaker product detail page state
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize,  setSelectedSize]  = useState(null);
  const [cartItems,     setCartItems]     = useState([
    { name: 'NIMBUS REACT 2',   color: 'Negro',  size: 41, price: 89900, qty: 1, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=120&q=80' },
  ]);
  const [cartOpen,      setCartOpen]      = useState(false);
  const [wishlist,      setWishlist]      = useState({});
  const [zoomImg,       setZoomImg]       = useState(0);
  const [toast,         setToast]         = useState(null);
  const [saleSeconds,   setSaleSeconds]   = useState(7325);  // 2h 02m 05s

  // Live sale countdown
  React.useEffect(() => {
    const id = setInterval(() => setSaleSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = Math.floor(saleSeconds / 3600);
  const mm = Math.floor((saleSeconds % 3600) / 60);
  const ss = saleSeconds % 60;

  const PRODUCT = {
    brand: 'STARK ATHLETICS',
    name:  'AERO PRO X3',
    tagline: 'Edición limitada · drop primavera',
    price: 134900,
    oldPrice: 169900,
    rating: 4.8,
    reviews: 247,
  };

  const COLORS = [
    { name: 'Carbón',   hex: '#1A1A1A', mainImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=80', stock: 12 },
    { name: 'Bone',     hex: '#E8DFC9', mainImg: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=720&q=80', stock: 4 },
    { name: 'Sunburst', hex: '#F5C842', mainImg: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=720&q=80', stock: 8 },
    { name: 'Storm',    hex: '#4A5568', mainImg: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=720&q=80', stock: 0 },
  ];

  const THUMBS = [
    COLORS[selectedColor].mainImg,
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80',
  ];

  const SIZES = [
    { n: 38, available: true  },
    { n: 39, available: true  },
    { n: 40, available: false },
    { n: 41, available: true  },
    { n: 42, available: true  },
    { n: 43, available: true  },
    { n: 44, available: false },
    { n: 45, available: true  },
  ];

  const RELATED = [
    { name: 'Velocity 2',  price: 89900,  img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=220&q=80' },
    { name: 'Pulse Lite',  price: 109900, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=220&q=80', sale: true },
    { name: 'Court Pro',   price: 149900, img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=220&q=80' },
  ];

  const currentColor = COLORS[selectedColor];
  const cartTotal    = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const cartCount    = cartItems.reduce((sum, it) => sum + it.qty, 0);
  const fmt          = (n) => `₡${(n / 1000).toFixed(1).replace('.0', '')}k`;

  const handleAddToBag = () => {
    if (!selectedSize) {
      setToast({ type: 'error', text: 'Seleccioná una talla' });
      setTimeout(() => setToast(null), 1800);
      return;
    }
    setCartItems(items => [
      ...items,
      { name: PRODUCT.name, color: currentColor.name, size: selectedSize, price: PRODUCT.price, qty: 1, img: currentColor.mainImg },
    ]);
    setCartOpen(true);
    setToast(null);
  };
  const removeItem = (idx) => setCartItems(items => items.filter((_, i) => i !== idx));
  const changeQty  = (idx, delta) => setCartItems(items =>
    items.map((it, i) => i === idx ? { ...it, qty: Math.max(1, it.qty + delta) } : it)
  );
  const toggleWish = () => setWishlist(w => ({ ...w, main: !w.main }));

  return (
    <BrowserFrame url="starkathletics.com">
      <div style={{ position: 'relative', background: '#0A0A0F', color: '#fff', minHeight: 520, overflow: 'hidden' }}>

        {/* Sale countdown banner */}
        <div style={{
          background: 'linear-gradient(90deg, #FF3B5E 0%, #FF9100 100%)',
          color: '#fff', padding: '6px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
          fontSize: 10, fontFamily: F_MONO, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          <span>★ DROP TERMINA EN</span>
          <span style={{ background: 'rgba(0,0,0,0.25)', padding: '2px 8px', borderRadius: 4, fontFamily: F_MONO }}>
            {String(hh).padStart(2,'0')}:{String(mm).padStart(2,'0')}:{String(ss).padStart(2,'0')}
          </span>
          <span style={{ opacity: 0.9 }}>· envío gratis +₡50k</span>
        </div>

        {/* Top nav */}
        <div style={{
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            fontFamily: F_MONO, fontWeight: 900,
            fontSize: 14, letterSpacing: '0.20em',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            STARK<span style={{ color: '#FF3B5E' }}>/</span>ATHLETICS
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 10, color: 'rgba(255,255,255,0.65)', fontWeight: 500, letterSpacing: '0.04em' }}>
            <span>Hombre</span>
            <span>Mujer</span>
            <span style={{ color: '#fff', fontWeight: 700 }}>Sneakers</span>
            <span>Ropa</span>
            <span style={{ color: '#FF3B5E', fontWeight: 700 }}>Sale</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Search size={14} color="rgba(255,255,255,0.65)" strokeWidth={1.8} />
            <User size={14} color="rgba(255,255,255,0.65)" strokeWidth={1.8} />
            <button onClick={() => setCartOpen(true)} aria-label="Carrito" style={{
              position: 'relative', display: 'inline-flex',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              <ShoppingBag size={14} color="#fff" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span key={cartCount} style={{
                  position: 'absolute', top: -5, right: -8,
                  background: '#FF3B5E', color: '#fff',
                  borderRadius: 10, padding: '0 4px',
                  fontSize: 8, fontWeight: 700,
                  minWidth: 14, height: 14,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'cartPop 0.4s ease',
                  boxShadow: '0 0 10px rgba(255,59,94,0.6)',
                }}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* PRODUCT DETAIL — 2 col */}
        <div style={{ padding: '24px 28px 20px', display: 'grid', gridTemplateColumns: '1fr 0.95fr', gap: 28 }}>

          {/* LEFT: Image gallery */}
          <div>
            <div style={{
              position: 'relative', aspectRatio: '1/1',
              background: 'linear-gradient(135deg, #16161E 0%, #0F0F18 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Decorative grid lines */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              {/* Color-tinted glow */}
              <div aria-hidden style={{
                position: 'absolute', inset: '20%',
                background: `radial-gradient(circle, ${currentColor.hex}55 0%, transparent 70%)`,
                filter: 'blur(50px)',
              }} />

              <img
                key={`${selectedColor}-${zoomImg}`}
                src={zoomImg === 0 ? currentColor.mainImg : THUMBS[zoomImg]}
                alt={PRODUCT.name}
                style={{
                  position: 'relative', width: '85%', height: '85%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.55))',
                  animation: 'imgSwap 0.35s ease',
                }}
              />

              {/* Stock badge */}
              {currentColor.stock > 0 && currentColor.stock <= 5 && (
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: '#FF3B5E', color: '#fff',
                  padding: '4px 10px', fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: F_MONO,
                  boxShadow: '0 4px 12px rgba(255,59,94,0.40)',
                }}>● Solo {currentColor.stock} disponibles</div>
              )}
              {currentColor.stock === 0 && (
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.65)',
                  padding: '4px 10px', fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: F_MONO,
                }}>Agotado</div>
              )}

              {/* Discount badge */}
              <div style={{
                position: 'absolute', top: 14, right: 14,
                background: '#fff', color: '#0A0A0F',
                padding: '4px 10px', fontSize: 10, fontWeight: 900,
                letterSpacing: '0.06em', fontFamily: F_MONO,
              }}>−21%</div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7, marginTop: 10 }}>
              {THUMBS.map((t, i) => (
                <button key={i} onClick={() => setZoomImg(i)} style={{
                  aspectRatio: '1/1',
                  background: '#16161E',
                  border: `1.5px solid ${zoomImg === i ? '#fff' : 'rgba(255,255,255,0.10)'}`,
                  cursor: 'pointer', padding: 4, transition: 'border-color 0.18s',
                  overflow: 'hidden',
                }}>
                  <img src={t} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: zoomImg === i ? 1 : 0.55 }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product details */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 9, color: '#FF3B5E', letterSpacing: '0.22em', fontWeight: 700, fontFamily: F_MONO, marginBottom: 8 }}>
              {PRODUCT.brand}
            </div>
            <div style={{ fontFamily: F_MONO, fontWeight: 900, fontSize: 26, letterSpacing: '0.04em', lineHeight: 1, marginBottom: 6 }}>
              {PRODUCT.name}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)', fontStyle: 'italic', marginBottom: 14 }}>
              {PRODUCT.tagline}
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
              <div style={{ display: 'inline-flex', gap: 1 }}>
                {[0,1,2,3,4].map(s => <Star key={s} size={11} fill="#FFD580" strokeWidth={0} />)}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{PRODUCT.rating}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>· {PRODUCT.reviews} reseñas</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
              <span style={{ fontFamily: F_MONO, fontSize: 24, fontWeight: 900, color: '#fff' }}>
                ₡{PRODUCT.price.toLocaleString('es-CR')}
              </span>
              <span style={{ fontFamily: F_MONO, fontSize: 12, color: 'rgba(255,255,255,0.40)', textDecoration: 'line-through' }}>
                ₡{PRODUCT.oldPrice.toLocaleString('es-CR')}
              </span>
              <span style={{ fontSize: 9, color: '#FF3B5E', background: 'rgba(255,59,94,0.15)', border: '1px solid rgba(255,59,94,0.35)', padding: '2px 7px', fontWeight: 700, fontFamily: F_MONO, letterSpacing: '0.06em' }}>
                AHORRÁS ₡{(PRODUCT.oldPrice - PRODUCT.price).toLocaleString('es-CR')}
              </span>
            </div>

            {/* Color picker */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, fontFamily: F_MONO }}>
                  Color
                </div>
                <div style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{currentColor.name}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {COLORS.map((c, i) => {
                  const a = selectedColor === i;
                  return (
                    <button key={c.name} onClick={() => { setSelectedColor(i); setZoomImg(0); }}
                      title={c.name}
                      style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: c.hex, border: `2px solid ${a ? '#fff' : 'transparent'}`,
                        boxShadow: a ? '0 0 0 1px rgba(255,255,255,0.3), 0 0 12px rgba(255,255,255,0.25)' : 'inset 0 0 0 1px rgba(255,255,255,0.10)',
                        cursor: 'pointer', padding: 0,
                        transition: 'all 0.18s', position: 'relative',
                      }}>
                      {c.stock === 0 && (
                        <span style={{
                          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'rgba(255,255,255,0.85)', fontSize: 16, lineHeight: 1, textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        }}>×</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size picker */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, fontFamily: F_MONO }}>
                  Talla EU
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: 1, cursor: 'pointer' }}>
                  Guía de tallas
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {SIZES.map(s => {
                  const a = selectedSize === s.n;
                  return (
                    <button key={s.n} onClick={() => s.available && setSelectedSize(s.n)}
                      disabled={!s.available}
                      style={{
                        padding: '8px 0', fontSize: 11, fontWeight: 700, fontFamily: F_MONO,
                        background: a ? '#fff' : s.available ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                        color: a ? '#0A0A0F' : s.available ? '#fff' : 'rgba(255,255,255,0.20)',
                        border: `1px solid ${a ? '#fff' : 'rgba(255,255,255,0.10)'}`,
                        textDecoration: s.available ? 'none' : 'line-through',
                        cursor: s.available ? 'pointer' : 'not-allowed',
                        transition: 'all 0.15s',
                      }}>{s.n}</button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button onClick={handleAddToBag}
                disabled={currentColor.stock === 0}
                style={{
                  flex: 1, padding: '14px 16px',
                  background: currentColor.stock === 0 ? 'rgba(255,255,255,0.08)' : '#fff',
                  color: currentColor.stock === 0 ? 'rgba(255,255,255,0.35)' : '#0A0A0F',
                  border: 'none', cursor: currentColor.stock === 0 ? 'not-allowed' : 'pointer',
                  fontFamily: F_MONO, fontSize: 11, fontWeight: 900,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'transform 0.15s',
                }}
                onMouseDown={(e) => currentColor.stock > 0 && (e.currentTarget.style.transform = 'scale(0.97)')}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <ShoppingBag size={13} strokeWidth={2.5} />
                {currentColor.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
              </button>
              <button onClick={toggleWish} aria-label="Wishlist" style={{
                width: 44, height: 44,
                background: wishlist.main ? 'rgba(255,59,94,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${wishlist.main ? '#FF3B5E' : 'rgba(255,255,255,0.10)'}`,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s',
              }}>
                <Heart size={15} fill={wishlist.main ? '#FF3B5E' : 'transparent'} color={wishlist.main ? '#FF3B5E' : '#fff'} strokeWidth={2} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { Icon: Shield,    t: 'Garantía',    d: '2 años' },
                { Icon: RotateCw,  t: 'Devolución',  d: '30 días' },
                { Icon: Zap,       t: 'Envío',       d: '24–48h' },
              ].map(b => (
                <div key={b.t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <b.Icon size={13} color="rgba(255,255,255,0.55)" strokeWidth={1.7} />
                  <div>
                    <div style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>{b.t}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO }}>{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products carousel */}
        <div style={{ padding: '0 28px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 18, marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, fontFamily: F_MONO }}>
              También te puede gustar
            </div>
            <span style={{ fontSize: 9, color: '#FF3B5E', fontWeight: 700, fontFamily: F_MONO, letterSpacing: '0.06em', cursor: 'pointer' }}>
              Ver todos →
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {RELATED.map((r, i) => (
              <div key={i} style={{
                background: '#13131C',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                cursor: 'pointer', position: 'relative',
                transition: 'all 0.2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {r.sale && <span style={{ position: 'absolute', top: 8, left: 8, background: '#FF3B5E', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', fontFamily: F_MONO, letterSpacing: '0.08em' }}>SALE</span>}
                <div style={{ aspectRatio: '1/1', background: '#0F0F18', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 14 }}>
                  <img src={r.img} alt={r.name} style={{ width: '90%', height: '90%', objectFit: 'contain', filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.40))' }} />
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  <div style={{ fontSize: 10, color: '#fff', fontWeight: 600, marginBottom: 4 }}>{r.name}</div>
                  <div style={{ fontFamily: F_MONO, fontSize: 11, fontWeight: 900, color: '#fff' }}>₡{r.price.toLocaleString('es-CR')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Cart drawer (slides from right) ─── */}
        {cartOpen && (
          <div onClick={() => setCartOpen(false)} style={{
            position: 'absolute', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
            animation: 'overlayIn 0.2s ease',
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: 340, background: '#13131C',
              borderLeft: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
              display: 'flex', flexDirection: 'column',
              animation: 'drawerSlide 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              {/* Header */}
              <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <ShoppingBag size={14} color="#fff" strokeWidth={2} />
                  <span style={{ fontFamily: F_MONO, fontWeight: 900, fontSize: 11, letterSpacing: '0.14em' }}>TU CARRITO</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO }}>({cartCount})</span>
                </div>
                <button onClick={() => setCartOpen(false)} aria-label="Cerrar" style={{
                  width: 24, height: 24, background: 'rgba(255,255,255,0.06)', border: 'none',
                  color: '#fff', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0,
                }}>×</button>
              </div>

              {/* Items */}
              <div style={{ flex: 1, padding: '14px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 30, color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
                    Tu carrito está vacío
                  </div>
                ) : cartItems.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 10, paddingBottom: 12, borderBottom: idx < cartItems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <div style={{
                      width: 56, height: 56, background: '#0F0F18',
                      border: '1px solid rgba(255,255,255,0.06)',
                      overflow: 'hidden', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img src={it.img} alt={it.name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 3 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{it.name}</div>
                        <button onClick={() => removeItem(idx)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.40)', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 2 }}>×</button>
                      </div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.50)', fontFamily: F_MONO, marginBottom: 7 }}>
                        {it.color} · Talla {it.size}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid rgba(255,255,255,0.10)', padding: '2px 4px' }}>
                          <button onClick={() => changeQty(idx, -1)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', width: 16, height: 16, fontSize: 12, lineHeight: 1, padding: 0 }}>−</button>
                          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: F_MONO, minWidth: 14, textAlign: 'center' }}>{it.qty}</span>
                          <button onClick={() => changeQty(idx, 1)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', width: 16, height: 16, fontSize: 12, lineHeight: 1, padding: 0 }}>+</button>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 900, fontFamily: F_MONO }}>
                          ₡{(it.price * it.qty).toLocaleString('es-CR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer with totals */}
              {cartItems.length > 0 && (
                <div style={{ padding: '14px 20px 18px', borderTop: '1px solid rgba(255,255,255,0.10)', background: '#0F0F18' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 5 }}>
                    <span>Subtotal</span>
                    <span style={{ fontFamily: F_MONO }}>₡{cartTotal.toLocaleString('es-CR')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 10 }}>
                    <span>Envío {cartTotal >= 50000 ? '· gratis' : ''}</span>
                    <span style={{ fontFamily: F_MONO, color: cartTotal >= 50000 ? '#10B981' : '#fff' }}>
                      {cartTotal >= 50000 ? 'GRATIS' : '₡3.500'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 900, marginBottom: 12, paddingTop: 10, borderTop: '1px dashed rgba(255,255,255,0.10)' }}>
                    <span>Total</span>
                    <span style={{ fontFamily: F_MONO }}>₡{(cartTotal + (cartTotal >= 50000 ? 0 : 3500)).toLocaleString('es-CR')}</span>
                  </div>
                  <button style={{
                    width: '100%', padding: '14px',
                    background: '#fff', color: '#0A0A0F', border: 'none', cursor: 'pointer',
                    fontFamily: F_MONO, fontSize: 11, fontWeight: 900,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    Finalizar compra <ArrowUpRight size={13} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 60,
            background: toast.type === 'error' ? '#FF3B5E' : '#fff',
            color: toast.type === 'error' ? '#fff' : '#0A0A0F',
            padding: '10px 18px', fontSize: 11, fontWeight: 700,
            fontFamily: F_MONO, letterSpacing: '0.08em', textTransform: 'uppercase',
            boxShadow: '0 14px 30px rgba(0,0,0,0.4)',
            animation: 'toastUp 0.3s ease',
          }}>{toast.text}</div>
        )}

        <style>{`
          @keyframes cartPop { 0%{transform:scale(1)} 35%{transform:scale(1.45)} 100%{transform:scale(1)} }
          @keyframes toastUp { from{transform:translate(-50%, 20px); opacity:0} to{transform:translate(-50%, 0); opacity:1} }
          @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes drawerSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes imgSwap { from { opacity: 0.4; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        `}</style>
      </div>
    </BrowserFrame>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 03 · APP — Pulse Fit, dark fitness app
// ────────────────────────────────────────────────────────────────────────
function AppMock() {
  // ─── Multi-screen state ────────────────────────────────────────────────
  const [activeTab, setActiveTab]   = useState('hoy');
  const [playing, setPlaying]       = useState(true);
  const [progress, setProgress]     = useState(0.62);
  const [bpm, setBpm]               = useState(142);
  const [kcal, setKcal]             = useState(284);
  const [activeRing, setActiveRing] = useState(null); // 0=move, 1=exercise, 2=stand
  const [routineFilter, setRoutineFilter] = useState('Todas');
  const [favRoutines, setFavRoutines]     = useState({ 0: true });
  const [waterCount, setWaterCount]       = useState(5); // out of 8
  const [statsRange, setStatsRange]       = useState('S');  // S=semana, M=mes, A=año
  const [notifBadge, setNotifBadge]       = useState(true);

  // Theme — accent color
  const ACC      = '#FF3B6B';
  const ACC_DEEP = '#C2185B';
  const PURPLE   = '#6A1B9A';
  const BG_PHONE = '#0F0F12';

  // ─── Live updates while workout playing ────────────────────────────────
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setBpm(b => Math.max(128, Math.min(168, b + Math.round((Math.random() - 0.45) * 4))));
      setProgress(p => Math.min(1, p + 0.004));
      setKcal(k => k + 1);
    }, 1100);
    return () => clearInterval(id);
  }, [playing]);

  const togglePlay = () => setPlaying(p => !p);
  const handleSkip = () => { setProgress(p => Math.min(1, p + 0.10)); setKcal(k => k + 25); };
  const addWater   = () => setWaterCount(w => Math.min(8, w + 1));
  const removeWater = () => setWaterCount(w => Math.max(0, w - 1));

  const TABS = [
    { id: 'hoy',     Icon: Activity,  t: 'Hoy' },
    { id: 'rutinas', Icon: Play,      t: 'Rutinas' },
    { id: 'stats',   Icon: BarChart3, t: 'Stats' },
    { id: 'perfil',  Icon: User,      t: 'Perfil' },
  ];

  // ─── Data for each screen ──────────────────────────────────────────────
  const ROUTINES = [
    { name: 'Cardio HIIT',    level: 'Intermedio', dur: '30 min', kcal: 380, cat: 'Cardio',  color: '#FF3B6B' },
    { name: 'Yoga matutino',  level: 'Todos',      dur: '20 min', kcal: 120, cat: 'Yoga',    color: '#A78BFA' },
    { name: 'Fuerza · Tren superior', level: 'Avanzado', dur: '45 min', kcal: 420, cat: 'Fuerza',  color: '#4FC3F7' },
    { name: 'Caminata interválica',   level: 'Principiante', dur: '25 min', kcal: 180, cat: 'Cardio',  color: '#81C784' },
    { name: 'Core & abdomen', level: 'Intermedio', dur: '15 min', kcal: 95, cat: 'Fuerza', color: '#FFA726' },
  ];
  const FILTERS = ['Todas', 'Cardio', 'Fuerza', 'Yoga'];
  const filteredRoutines = ROUTINES.filter(r => routineFilter === 'Todas' || r.cat === routineFilter);

  const STATS_DATA = {
    S: { kcalTotal: 2840, sessions: 5, minutes: 162, labels: ['L','M','M','J','V','S','D'], values: [320,420,0,380,520,640,560] },
    M: { kcalTotal: 12480, sessions: 22, minutes: 720, labels: ['S1','S2','S3','S4'],          values: [2840,3120,3010,3510] },
    A: { kcalTotal: 142000, sessions: 248, minutes: 8600, labels: ['E','F','M','A','M','J','J','A','S','O','N','D'], values: [9800,10200,11400,12100,11800,12500,11900,13200,12800,12100,11600,12480] },
  };
  const stats = STATS_DATA[statsRange];
  const maxStat = Math.max(...stats.values);

  // Activity rings (Apple watch style)
  const RINGS = [
    { name: 'Movimiento', val: kcal, goal: 600, unit: 'kcal', color: '#FF3B6B' },
    { name: 'Ejercicio',  val: 28,   goal: 45,  unit: 'min',  color: '#4FC3F7' },
    { name: 'Pararse',    val: 8,    goal: 12,  unit: 'hrs',  color: '#FFA726' },
  ];

  const ACHIEVEMENTS = [
    { icon: Flame,        title: '12 días seguidos',  date: 'Esta semana',  color: '#FF6B35' },
    { icon: Activity,     title: 'Primer 5K corrido', date: 'Hace 3 días',   color: '#FF3B6B' },
    { icon: CheckCircle2, title: '50 rutinas',         date: 'Hace 1 sem',   color: '#81C784' },
    { icon: Star,         title: 'Nivel 8 alcanzado',  date: 'Hace 2 sem',   color: '#FFD580' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 12px 36px', background: 'linear-gradient(180deg, #2A1F1F 0%, #1A0F0F 100%)', borderRadius: 8, border: `1px solid ${MK.border}`, position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, ${ACC}40 0%, transparent 60%)`,
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* Phone */}
      <div style={{
        width: 270,
        background: '#0A0A0A',
        borderRadius: 42,
        padding: 6,
        boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 2px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          background: BG_PHONE,
          borderRadius: 36, overflow: 'hidden', position: 'relative',
        }}>
          {/* Notch */}
          <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 88, height: 22, background: '#000', borderRadius: 14, zIndex: 5 }} />

          {/* Status bar */}
          <div style={{ padding: '12px 22px 4px', display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, fontFamily: F_MONO, color: '#fff' }}>
            <span>9:41</span>
            <span style={{ display: 'inline-flex', gap: 4, fontSize: 9 }}>● ● ●</span>
          </div>

          {/* ═══════ SCREEN: HOY ═══════ */}
          {activeTab === 'hoy' && (
            <div key="hoy" style={{ animation: 'screenIn 0.32s ease' }}>
              {/* Header with bell */}
              <div style={{ padding: '6px 18px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Miércoles 15</div>
                  <div style={{ fontFamily: F_DISPLAY, fontSize: 22, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1 }}>
                    Hola, <span style={{ fontStyle: 'italic' }}>Andrea</span>
                  </div>
                </div>
                <button onClick={() => setNotifBadge(false)} style={{
                  position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                }}>
                  <Bell size={15} color="rgba(255,255,255,0.7)" strokeWidth={1.8} />
                  {notifBadge && <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: '#FF3B6B', boxShadow: '0 0 6px #FF3B6B' }} />}
                </button>
              </div>

              {/* Activity rings — clickable */}
              <div style={{ padding: '0 14px 12px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,59,107,0.10), rgba(106,27,154,0.10))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16, padding: 14,
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  {/* Stacked rings */}
                  <div style={{ position: 'relative', width: 70, height: 70, flexShrink: 0 }}>
                    {RINGS.map((r, i) => {
                      const size = 70 - i * 18;
                      const p = Math.min(1, r.val / r.goal);
                      return (
                        <div key={i} style={{ position: 'absolute', top: (70 - size) / 2, left: (70 - size) / 2 }}>
                          <Ring progress={p} size={size} sw={4} color={r.color} track={`${r.color}25`} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {RINGS.map((r, i) => {
                      const p = Math.min(1, r.val / r.goal);
                      const open = activeRing === i;
                      return (
                        <button key={i} onClick={() => setActiveRing(open ? null : i)} style={{
                          display: 'flex', alignItems: 'center', gap: 6, fontSize: 9,
                          color: 'rgba(255,255,255,0.85)', background: 'transparent', border: 'none',
                          padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                          opacity: activeRing === null || open ? 1 : 0.45, transition: 'opacity 0.2s',
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.color, boxShadow: `0 0 4px ${r.color}` }} />
                          <span style={{ fontWeight: 600, minWidth: 64 }}>{r.name}</span>
                          <span style={{ fontFamily: F_MONO, color: r.color, fontWeight: 700 }}>{r.val}<span style={{ opacity: 0.5 }}>/{r.goal}</span></span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active workout */}
              <div style={{
                margin: '0 14px 12px',
                background: `linear-gradient(135deg, ${ACC} 0%, ${ACC_DEEP} 50%, ${PURPLE} 100%)`,
                color: '#fff', borderRadius: 18, padding: 14,
                boxShadow: `0 16px 36px ${ACC}40`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', filter: 'blur(20px)' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 8, opacity: 0.85, fontFamily: F_MONO, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: playing ? '#fff' : 'rgba(255,255,255,0.4)', boxShadow: playing ? '0 0 6px #fff' : 'none', animation: playing ? 'pulse 1.5s infinite' : 'none' }} />
                      {playing ? 'En curso' : 'Pausado'}
                    </div>
                    <div style={{ fontFamily: F_DISPLAY, fontSize: 16, lineHeight: 1.1, marginBottom: 4, letterSpacing: '-0.02em' }}>
                      Cardio <span style={{ fontStyle: 'italic' }}>HIIT</span>
                    </div>
                    <div style={{ fontSize: 9, opacity: 0.85, fontFamily: F_MONO, marginBottom: 8 }}>
                      {String(Math.floor(progress * 30)).padStart(2, '0')}:{String(Math.floor((progress * 30 % 1) * 60)).padStart(2, '0')} / 30:00
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9, background: 'rgba(255,255,255,0.18)', padding: '3px 8px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                      <Heart size={9} fill="#fff" strokeWidth={0} style={{ animation: playing ? 'heartbeat 0.85s infinite' : 'none' }} />
                      <strong>{bpm}</strong> bpm
                    </div>
                  </div>
                  <Ring progress={progress} size={64} sw={5} color="#fff" track="rgba(255,255,255,0.22)" label={`${Math.round(progress * 100)}%`} />
                </div>

                <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                  <button onClick={togglePlay} style={{
                    flex: 1, background: '#fff', color: ACC_DEEP,
                    padding: '8px 0', borderRadius: 10,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    border: 'none', cursor: 'pointer',
                  }}>
                    {playing
                      ? <><Pause size={10} fill={ACC_DEEP} strokeWidth={0} /> Pausar</>
                      : <><Play  size={10} fill={ACC_DEEP} strokeWidth={0} /> Reanudar</>}
                  </button>
                  <button onClick={handleSkip} style={{
                    background: 'rgba(255,255,255,0.20)', color: '#fff',
                    padding: '8px 12px', borderRadius: 10,
                    fontSize: 10, fontWeight: 700,
                    border: 'none', backdropFilter: 'blur(4px)', cursor: 'pointer',
                  }}>Skip</button>
                </div>
              </div>

              {/* Water tracker — interactive */}
              <div style={{ margin: '0 14px 12px', padding: '10px 12px', background: 'rgba(79,195,247,0.10)', border: '1px solid rgba(79,195,247,0.25)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 9, color: '#4FC3F7', fontFamily: F_MONO, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>Hidratación</div>
                  <div style={{ fontSize: 10, color: '#fff', fontWeight: 700, fontFamily: F_MONO }}>{waterCount}/8 vasos</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={removeWater} style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: 'rgba(255,255,255,0.10)', color: '#fff',
                    border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1, padding: 0,
                  }}>−</button>
                  <div style={{ flex: 1, display: 'flex', gap: 3 }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} style={{
                        flex: 1, height: 16, borderRadius: 3,
                        background: i < waterCount ? '#4FC3F7' : 'rgba(79,195,247,0.18)',
                        boxShadow: i < waterCount ? '0 0 6px rgba(79,195,247,0.5)' : 'none',
                        transition: 'all 0.2s',
                      }} />
                    ))}
                  </div>
                  <button onClick={addWater} style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: '#4FC3F7', color: '#fff',
                    border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1, padding: 0, fontWeight: 700,
                  }}>+</button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════ SCREEN: RUTINAS ═══════ */}
          {activeTab === 'rutinas' && (
            <div key="rutinas" style={{ animation: 'screenIn 0.32s ease' }}>
              <div style={{ padding: '10px 18px 12px' }}>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 22, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 12 }}>
                  Rutinas
                </div>
                {/* Filters */}
                <div style={{ display: 'flex', gap: 5, marginBottom: 10, overflowX: 'auto' }}>
                  {FILTERS.map(f => {
                    const a = routineFilter === f;
                    return (
                      <button key={f} onClick={() => setRoutineFilter(f)} style={{
                        fontSize: 9, padding: '4px 10px', borderRadius: 999,
                        background: a ? '#fff' : 'rgba(255,255,255,0.06)',
                        color: a ? BG_PHONE : 'rgba(255,255,255,0.65)',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        fontWeight: a ? 700 : 500, letterSpacing: '0.04em',
                        whiteSpace: 'nowrap', transition: 'all 0.15s',
                      }}>{f}</button>
                    );
                  })}
                </div>
              </div>
              {/* Routine list */}
              <div style={{ padding: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: 7, maxHeight: 320, overflowY: 'auto' }}>
                {filteredRoutines.map((r, i) => (
                  <div key={r.name} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderLeft: `3px solid ${r.color}`,
                    borderRadius: '0 10px 10px 0',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: `${r.color}22`, color: r.color,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Play size={11} fill={r.color} strokeWidth={0} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10.5, color: '#fff', fontWeight: 600, marginBottom: 2 }}>{r.name}</div>
                      <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.5)', fontFamily: F_MONO, display: 'flex', gap: 8 }}>
                        <span>{r.dur}</span>
                        <span>·</span>
                        <span>{r.kcal} kcal</span>
                        <span>·</span>
                        <span>{r.level}</span>
                      </div>
                    </div>
                    <button onClick={() => setFavRoutines(f => ({ ...f, [i]: !f[i] }))} style={{
                      background: 'transparent', border: 'none', cursor: 'pointer', padding: 2,
                    }}>
                      <Heart size={12} fill={favRoutines[i] ? r.color : 'transparent'} color={favRoutines[i] ? r.color : 'rgba(255,255,255,0.35)'} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════ SCREEN: STATS ═══════ */}
          {activeTab === 'stats' && (
            <div key="stats" style={{ animation: 'screenIn 0.32s ease' }}>
              <div style={{ padding: '10px 18px 8px' }}>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 22, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 10 }}>
                  Progreso
                </div>
                {/* Range switch */}
                <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: 3, marginBottom: 12 }}>
                  {[{ id: 'S', l: 'Semana' }, { id: 'M', l: 'Mes' }, { id: 'A', l: 'Año' }].map(r => {
                    const a = statsRange === r.id;
                    return (
                      <button key={r.id} onClick={() => setStatsRange(r.id)} style={{
                        flex: 1, padding: '5px 0', borderRadius: 6,
                        background: a ? '#fff' : 'transparent',
                        color: a ? BG_PHONE : 'rgba(255,255,255,0.55)',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: 9, fontWeight: a ? 700 : 500,
                      }}>{r.l}</button>
                    );
                  })}
                </div>
                {/* KPI summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5, marginBottom: 12 }}>
                  {[
                    { v: stats.kcalTotal >= 1000 ? `${(stats.kcalTotal/1000).toFixed(1)}k` : stats.kcalTotal, l: 'kcal',     c: '#FF6B35' },
                    { v: stats.sessions,                                                                     l: 'sesiones',  c: '#4FC3F7' },
                    { v: stats.minutes >= 60 ? `${(stats.minutes/60).toFixed(1)}h` : `${stats.minutes}m`,    l: 'tiempo',    c: '#81C784' },
                  ].map((k, i) => (
                    <div key={i} style={{
                      background: `${k.c}12`, border: `1px solid ${k.c}30`,
                      padding: '7px 6px', borderRadius: 8, textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: F_MONO }}>{k.v}</div>
                      <div style={{ fontSize: 7.5, color: k.c, fontFamily: F_MONO, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, marginTop: 1 }}>{k.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bar chart */}
              <div style={{ padding: '0 18px 14px' }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                  Kcal · {statsRange === 'S' ? 'última semana' : statsRange === 'M' ? 'últimas 4 semanas' : 'último año'}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100, padding: '4px 0' }}>
                  {stats.values.map((v, i) => {
                    const h = Math.max(4, (v / maxStat) * 96);
                    const isLast = i === stats.values.length - 1;
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{
                          width: '100%', height: h,
                          background: isLast
                            ? `linear-gradient(180deg, ${ACC} 0%, ${ACC_DEEP} 100%)`
                            : 'rgba(255,255,255,0.15)',
                          borderRadius: 3,
                          boxShadow: isLast ? `0 0 12px ${ACC}50` : 'none',
                          animation: `barGrow 0.5s ease ${i * 0.04}s both`,
                          transformOrigin: 'bottom',
                        }} />
                        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', fontFamily: F_MONO }}>{stats.labels[i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ margin: '0 14px 12px', padding: '10px 12px', background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={14} color="#10B981" strokeWidth={2.5} />
                <span style={{ fontSize: 10, color: '#fff' }}>
                  <strong>+18%</strong> vs. {statsRange === 'S' ? 'semana' : statsRange === 'M' ? 'mes' : 'año'} anterior
                </span>
              </div>
            </div>
          )}

          {/* ═══════ SCREEN: PERFIL ═══════ */}
          {activeTab === 'perfil' && (
            <div key="perfil" style={{ animation: 'screenIn 0.32s ease' }}>
              <div style={{ padding: '10px 18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Avatar */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${ACC}, ${PURPLE})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 26,
                  border: '2px solid rgba(255,255,255,0.20)',
                  boxShadow: `0 12px 30px ${ACC}55`,
                  marginBottom: 10,
                }}>A</div>
                <div style={{ fontFamily: F_DISPLAY, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>Andrea</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.50)', fontFamily: F_MONO, letterSpacing: '0.10em', textTransform: 'uppercase', marginTop: 2 }}>
                  Nivel 8 · 1,840 XP
                </div>

                {/* XP bar */}
                <div style={{ width: '100%', marginTop: 12 }}>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '68%', background: `linear-gradient(90deg, ${ACC}, ${PURPLE})`, borderRadius: 99, boxShadow: `0 0 8px ${ACC}` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, marginTop: 4 }}>
                    <span>Nivel 8</span>
                    <span>360 XP para nivel 9</span>
                  </div>
                </div>
              </div>

              {/* Streak banner */}
              <div style={{
                margin: '0 14px 12px',
                padding: '10px 12px',
                background: 'linear-gradient(135deg, rgba(255,107,53,0.18), rgba(255,200,100,0.12))',
                border: '1px solid rgba(255,200,100,0.30)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,107,53,0.25)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'flameWiggle 1.2s ease-in-out infinite',
                }}>
                  <Flame size={18} fill="#FF6B35" color="#FF6B35" strokeWidth={0} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>12 días en racha</div>
                  <div style={{ fontSize: 8.5, color: '#FFD580', fontFamily: F_MONO }}>Mejor racha: 28 días</div>
                </div>
              </div>

              {/* Achievements */}
              <div style={{ padding: '0 14px 12px' }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                  Logros recientes
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8,
                    }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: 8,
                        background: `${a.color}20`, color: a.color,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <a.icon size={13} strokeWidth={2} fill={i === 0 || i === 1 ? a.color : 'transparent'} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{a.title}</div>
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO }}>{a.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab bar — functional */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 0 14px',
            display: 'flex', justifyContent: 'space-around',
            background: '#08080A',
          }}>
            {TABS.map((tb) => {
              const a = activeTab === tb.id;
              return (
                <button key={tb.id} onClick={() => setActiveTab(tb.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    padding: '2px 4px',
                  }}>
                  <tb.Icon size={15} color={a ? ACC : 'rgba(255,255,255,0.4)'}
                    fill={a ? ACC : 'transparent'} strokeWidth={a ? 0 : 1.8} />
                  <span style={{ fontSize: 7.5, fontWeight: a ? 700 : 500, color: a ? '#fff' : 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{tb.t}</span>
                  {a && <span style={{ width: 12, height: 2, background: ACC, borderRadius: 2 }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating side cards — change by active tab */}
      <div aria-hidden style={{
        position: 'absolute', top: '18%', right: '6%',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        padding: '10px 14px', borderRadius: 10,
        fontSize: 9, color: 'rgba(255,255,255,0.75)',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
        transform: 'rotate(4deg)', maxWidth: 130,
      }}>
        <Flame size={13} fill="#FF6B35" strokeWidth={0} />
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 10 }}>+50 XP</div>
          <div style={{ fontSize: 8, opacity: 0.7 }}>Nuevo récord</div>
        </div>
      </div>
      <div aria-hidden style={{
        position: 'absolute', bottom: '20%', left: '6%',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        padding: '10px 14px', borderRadius: 10,
        fontSize: 9, color: 'rgba(255,255,255,0.75)',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
        transform: 'rotate(-3deg)', maxWidth: 130,
      }}>
        <CheckCircle2 size={13} color="#81C784" strokeWidth={2} />
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 10 }}>Meta 4/5</div>
          <div style={{ fontSize: 8, opacity: 0.7 }}>Esta semana</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.25); } 70% { transform: scale(1); } }
        @keyframes screenIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes barGrow  { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes flameWiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 04 · SYSTEMS — B2B SaaS admin dashboard
// ────────────────────────────────────────────────────────────────────────
function SystemMock() {
  const INDIGO = '#4F46E5';
  const [query, setQuery]         = useState('');
  const [period, setPeriod]       = useState('6M');
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', stock: '', price: '' });
  const [feed, setFeed]           = useState([
    { Icon: 'ShoppingBag', c: '#10B981', t: 'Venta · #2847',         d: 'Sucursal Centro', a: '₡18.400', s: 'hace 3 min' },
    { Icon: 'Package',     c: '#8A46FF', t: 'Stock bajo · Taladro',  d: '3 unidades',       a: 'Alerta',   s: 'hace 12 min' },
    { Icon: 'Users',       c: '#4F46E5', t: 'Nuevo cliente',         d: 'Constructora SC',  a: '+1',       s: 'hace 1 h' },
    { Icon: 'CheckCircle2',c: '#10B981', t: 'Pedido entregado',      d: 'Orden #2841',      a: '✓',        s: 'hace 2 h' },
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [salesToday, setSalesToday] = useState(385);
  const [tableSort, setTableSort]   = useState('stock'); // stock | name | price
  const [selectedRows, setSelectedRows] = useState({});

  // Live sales counter — simulate ventas coming in
  React.useEffect(() => {
    const id = setInterval(() => {
      setSalesToday(s => s + Math.round(Math.random() * 8));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Simulate new activity event every ~6 seconds
  React.useEffect(() => {
    const events = [
      { Icon: 'ShoppingBag', c: '#10B981', t: 'Venta · nueva',       d: 'Sucursal Norte',   a: '₡8.900',  s: 'ahora' },
      { Icon: 'Package',     c: '#4F46E5', t: 'Producto recibido',   d: 'Lote #4421',       a: '+50',      s: 'ahora' },
      { Icon: 'Users',       c: '#8A46FF', t: 'Cliente registrado',  d: 'Por web',          a: '+1',       s: 'ahora' },
    ];
    const id = setInterval(() => {
      const e = events[Math.floor(Math.random() * events.length)];
      setFeed(f => [e, ...f.slice(0, 4)]);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const ICONS_MAP = { ShoppingBag, Package, Users, CheckCircle2 };

  const rows = [
    { p: 'Tornillo cabeza plana 1/4" x 100u', sku: 'TR-0142', s: 420, pr: '₡4.500',  prRaw: 4500, st: 'ok',   trend: [10,12,14,18,22,28] },
    { p: 'Cinta métrica 5m flexible',          sku: 'CM-0089', s: 12,  pr: '₡2.200',  prRaw: 2200, st: 'low',  trend: [22,18,14,10,12,8]  },
    { p: 'Taladro DeWalt 20V Brushless',       sku: 'DW-2401', s: 3,   pr: '₡89.000', prRaw: 89000, st: 'crit', trend: [18,14,10,7,5,3]    },
    { p: 'Brocha 3" mango madera natural',     sku: 'BR-0033', s: 85,  pr: '₡1.800',  prRaw: 1800, st: 'ok',   trend: [12,14,18,22,28,32] },
    { p: 'Cable eléctrico THHN 12 AWG · m',    sku: 'CE-1244', s: 240, pr: '₡850',    prRaw: 850, st: 'ok',   trend: [8,10,12,14,18,22]  },
  ];
  const filtered = rows
    .filter(r => !query || r.p.toLowerCase().includes(query.toLowerCase()) || r.sku.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (tableSort === 'name')  return a.p.localeCompare(b.p);
      if (tableSort === 'price') return b.prRaw - a.prRaw;
      return a.s - b.s; // stock asc — most urgent first
    });
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;
  const toggleRow = (sku) => setSelectedRows(r => ({ ...r, [sku]: !r[sku] }));
  const toggleAll = () => {
    if (selectedCount === filtered.length) setSelectedRows({});
    else setSelectedRows(filtered.reduce((acc, r) => ({ ...acc, [r.sku]: true }), {}));
  };

  // Clients data for the Clientes nav
  const CLIENTS = [
    { name: 'Constructora SC',   email: 'compras@constructorasc.cr', orders: 47, spent: '₡2.4M', tier: 'Oro',   color: '#F59E0B' },
    { name: 'Roberto Méndez',    email: 'rmendez@gmail.com',          orders: 12, spent: '₡385k', tier: 'Plata', color: '#9CA3AF' },
    { name: 'Refacciones Lima',  email: 'contacto@reflima.cr',        orders: 38, spent: '₡1.8M', tier: 'Oro',   color: '#F59E0B' },
    { name: 'María Vargas',      email: 'maria.vargas@hotmail.com',   orders: 5,  spent: '₡92k',  tier: 'Nuevo', color: '#4F46E5' },
  ];

  const submitNewProduct = (e) => {
    e.preventDefault();
    if (!productForm.name) return;
    setFeed(f => [
      { Icon: 'Package', c: '#10B981', t: `Producto añadido · ${productForm.name}`, d: `Stock inicial: ${productForm.stock || 0}`, a: 'Nuevo', s: 'ahora' },
      ...f.slice(0, 4),
    ]);
    setProductForm({ name: '', stock: '', price: '' });
    setShowProductModal(false);
  };
  const statusStyles = {
    ok:   { bg: MK.greenSoft,  c: '#047857',  t: 'En stock' },
    low:  { bg: MK.yellowSoft, c: '#92400E',  t: 'Bajo'      },
    crit: { bg: MK.redSoft,    c: '#B91C1C',  t: 'Crítico'   },
  };

  // Period-aware sales data
  const PERIOD_DATA = {
    '7D': { data: [42, 38, 55, 48, 62, 71, 68],                  labels: ['L','M','M','J','V','S','D'],                       total: '₡384k', delta: '+12%' },
    '30D':{ data: [180, 220, 195, 240, 280, 265, 310, 340],      labels: ['S1','S2','S3','S4','S5','S6','S7','Hoy'],          total: '₡2.03M', delta: '+18%' },
    '6M': { data: [180, 220, 195, 280, 310, 290, 340, 385],      labels: ['Dic','Ene','Feb','Mar','Abr','May','Jun','Jul'],   total: '₡2.41M', delta: '+24%' },
  };
  const periodView = PERIOD_DATA[period];

  const NAV = [
    { Icon: BarChart3,  t: 'Dashboard' },
    { Icon: Package,    t: 'Inventario', badge: '12' },
    { Icon: TrendingUp, t: 'Ventas' },
    { Icon: Users,      t: 'Clientes' },
    { Icon: Settings,   t: 'Ajustes' },
  ];

  return (
    <BrowserFrame url="panel.ferreterialopez.cr">
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', minHeight: 460, position: 'relative' }}>

        {/* ─── Sidebar ─── */}
        <div style={{ background: 'linear-gradient(180deg, #0F1419 0%, #0A0D12 100%)', color: '#fff', padding: '18px 0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0 18px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${INDIGO}, #818CF8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${INDIGO}50` }}>
              <Package size={14} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>FerreLópez</div>
              <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 1 }}>Admin · v2.4</div>
            </div>
          </div>

          {NAV.map((m, i) => {
            const a = activeNav === m.t;
            return (
              <button key={i} onClick={() => setActiveNav(m.t)}
                style={{
                  padding: '9px 18px',
                  background: a ? 'rgba(79,70,229,0.18)' : 'transparent',
                  borderLeft: `2.5px solid ${a ? INDIGO : 'transparent'}`,
                  display: 'flex', alignItems: 'center', gap: 10, fontSize: 10.5,
                  color: a ? '#fff' : 'rgba(255,255,255,0.55)',
                  fontWeight: a ? 600 : 500,
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'inherit', transition: 'all 0.18s',
                }}
                onMouseEnter={(e) => !a && (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => !a && (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <m.Icon size={13} strokeWidth={2} />
                <span style={{ flex: 1 }}>{m.t}</span>
                {m.badge && (
                  <span style={{
                    background: a ? INDIGO : 'rgba(255,255,255,0.10)',
                    color: '#fff', fontSize: 8, fontWeight: 700,
                    padding: '1px 6px', borderRadius: 99, fontFamily: F_MONO,
                  }}>{m.badge}</span>
                )}
              </button>
            );
          })}

          {/* Quick-add CTA */}
          <button onClick={() => setShowProductModal(true)} style={{
            margin: '18px 14px 0',
            padding: '9px 12px',
            background: `linear-gradient(135deg, ${INDIGO}, #818CF8)`,
            color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.06em',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            borderRadius: 8,
            boxShadow: `0 6px 16px ${INDIGO}40`,
          }}>
            <Plus size={12} strokeWidth={2.5} /> Nuevo producto
          </button>

          {/* Bottom user card */}
          <div style={{ marginTop: 'auto', padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${INDIGO}, #818CF8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, boxShadow: `0 4px 10px ${INDIGO}45` }}>RL</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, color: '#fff', fontWeight: 600 }}>Ramón López</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)' }}>Gerente · 3 sucursales</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main content ─── */}
        <div style={{ padding: '18px 22px', background: MK.card, overflow: 'hidden' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>
                {activeNav}
              </div>
              <div style={{ fontFamily: F_DISPLAY, fontSize: 24, fontWeight: 400, color: MK.text, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                {activeNav === 'Dashboard'  && <>Resumen <span style={{ fontStyle: 'italic' }}>general</span></>}
                {activeNav === 'Inventario' && <>Productos <span style={{ fontStyle: 'italic' }}>en stock</span></>}
                {activeNav === 'Ventas'     && <>Movimientos <span style={{ fontStyle: 'italic' }}>recientes</span></>}
                {activeNav === 'Clientes'   && <>Base de <span style={{ fontStyle: 'italic' }}>clientes</span></>}
                {activeNav === 'Ajustes'    && <>Configuración <span style={{ fontStyle: 'italic' }}>del sistema</span></>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {(activeNav === 'Inventario' || activeNav === 'Dashboard') && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: MK.bg, border: `1px solid ${query ? INDIGO : MK.border}`,
                  padding: '6px 10px', fontSize: 9.5, color: MK.text,
                  fontFamily: F_MONO, transition: 'border-color 0.18s', borderRadius: 6,
                }}>
                  <Search size={10} color={query ? INDIGO : MK.muted} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar producto…"
                    style={{
                      border: 'none', background: 'transparent', outline: 'none',
                      fontSize: 9.5, color: MK.text, fontFamily: F_MONO, width: 110,
                    }}
                  />
                  {query && (
                    <button onClick={() => setQuery('')} style={{ background: 'transparent', border: 'none', color: MK.muted, cursor: 'pointer', fontSize: 11, padding: 0, lineHeight: 1 }}>×</button>
                  )}
                </div>
              )}
              <button onClick={() => setNotifOpen(o => !o)} style={{
                position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
              }}>
                <Bell size={14} color={MK.textSoft} strokeWidth={2} />
                <span style={{ position: 'absolute', top: 0, right: 0, width: 7, height: 7, borderRadius: '50%', background: MK.red }} />
              </button>
              <button onClick={() => setShowProductModal(true)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: INDIGO, color: '#fff',
                padding: '8px 14px', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.06em', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', borderRadius: 6,
                boxShadow: `0 4px 12px ${INDIGO}40`,
              }}>
                <Plus size={11} strokeWidth={2.5} /> Producto
              </button>
            </div>
          </div>

          {/* ════════ SCREEN: Dashboard ════════ */}
          {activeNav === 'Dashboard' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              {/* KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
                {[
                  { l: 'Total productos', v: '1,248',                                            d: '+12 esta semana', trend: 'up',   data: [200,205,212,220,228,236,240,248], c: MK.text },
                  { l: 'Stock bajo',       v: '12',                                              d: '4 críticos',      trend: 'flat', data: [8,10,11,9,10,12,12,12],            c: MK.yellow },
                  { l: 'Por reordenar',    v: '4',                                               d: 'Acción urgente',  trend: 'up',   data: [1,1,2,2,3,3,4,4],                  c: MK.accent },
                  { l: 'Ventas hoy',       v: `₡${salesToday}k`,                                 d: '+18% vs ayer',    trend: 'up',   data: [180,220,240,280,310,340,360,salesToday], c: MK.green, live: true },
                ].map((k, i) => (
                  <div key={i} style={{
                    padding: '12px 14px', border: `1px solid ${MK.border}`,
                    background: MK.card, position: 'relative',
                    boxShadow: SHADOW_LIFT, borderRadius: 8,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ fontSize: 8.5, color: MK.muted, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>{k.l}</div>
                      {k.live && <span style={{ width: 6, height: 6, borderRadius: '50%', background: MK.green, boxShadow: `0 0 6px ${MK.green}`, animation: 'pulse 2s infinite' }} />}
                    </div>
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

              {/* Chart + Live feed */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
                <div style={{ padding: 14, border: `1px solid ${MK.border}`, background: MK.card, borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                        Ventas {period === '7D' ? 'semanales' : period === '30D' ? 'mensuales' : '6 meses'}
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: MK.text, marginTop: 4, letterSpacing: '-0.02em' }}>
                        {periodView.total} <span style={{ fontSize: 10, color: MK.green, fontWeight: 600, marginLeft: 4 }}>↗ {periodView.delta}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {['7D', '30D', '6M'].map((p) => {
                        const active = period === p;
                        return (
                          <button key={p} onClick={() => setPeriod(p)}
                            style={{
                              fontSize: 8.5, padding: '3px 8px',
                              background: active ? MK.text : 'transparent',
                              color: active ? '#fff' : MK.muted,
                              border: `1px solid ${active ? MK.text : MK.border}`,
                              fontWeight: 700, letterSpacing: '0.06em',
                              fontFamily: F_MONO, cursor: 'pointer',
                              transition: 'all 0.15s', borderRadius: 4,
                            }}>{p}</button>
                        );
                      })}
                    </div>
                  </div>
                  <LineChart key={period} data={periodView.data} labels={periodView.labels} color={INDIGO} w={380} h={150} />
                </div>

                {/* Live activity feed */}
                <div style={{ padding: 14, border: `1px solid ${MK.border}`, background: MK.card, display: 'flex', flexDirection: 'column', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                    <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Actividad en vivo</div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 8, color: MK.green, fontFamily: F_MONO, fontWeight: 700 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: MK.green, boxShadow: `0 0 4px ${MK.green}`, animation: 'pulse 2s infinite' }} /> LIVE
                    </span>
                  </div>
                  {feed.map((a, i, arr) => {
                    const IconComp = ICONS_MAP[a.Icon] || Package;
                    return (
                      <div key={i} style={{
                        display: 'flex', gap: 10, padding: '7px 0',
                        borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
                        alignItems: 'center',
                        animation: i === 0 ? 'feedSlide 0.4s ease' : 'none',
                      }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: `${a.c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <IconComp size={11} color={a.c} strokeWidth={2} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 9.5, color: MK.text, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.t}</div>
                          <div style={{ fontSize: 8, color: MK.muted }}>{a.d}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 9.5, color: a.c, fontWeight: 700, fontFamily: F_MONO }}>{a.a}</div>
                          <div style={{ fontSize: 7, color: MK.mutedSoft, fontFamily: F_MONO, marginTop: 1 }}>{a.s}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ════════ SCREEN: Inventario ════════ */}
          {activeNav === 'Inventario' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              {/* Table toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 5, fontSize: 9, color: MK.muted }}>
                  <span>Ordenar:</span>
                  {['stock', 'name', 'price'].map(s => (
                    <button key={s} onClick={() => setTableSort(s)} style={{
                      background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                      fontWeight: tableSort === s ? 700 : 500,
                      color: tableSort === s ? INDIGO : MK.muted,
                      fontSize: 9, padding: 0,
                    }}>{s === 'stock' ? 'Stock' : s === 'name' ? 'Nombre' : 'Precio'}</button>
                  ))}
                </div>
                {selectedCount > 0 && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 9.5, color: INDIGO, fontWeight: 700, fontFamily: F_MONO, animation: 'fadeIn 0.3s ease' }}>
                    {selectedCount} seleccionado{selectedCount > 1 ? 's' : ''}
                    <span style={{ display: 'inline-flex', gap: 6 }}>
                      <button style={{ background: `${INDIGO}15`, border: `1px solid ${INDIGO}30`, color: INDIGO, padding: '2px 8px', fontSize: 9, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', borderRadius: 4 }}>Exportar</button>
                      <button style={{ background: `${MK.red}15`, border: `1px solid ${MK.red}30`, color: MK.red, padding: '2px 8px', fontSize: 9, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', borderRadius: 4 }}>Eliminar</button>
                    </span>
                  </div>
                )}
              </div>

              <div style={{ border: `1px solid ${MK.border}`, background: MK.card, borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '24px 2.4fr 0.7fr 0.5fr 0.7fr 0.6fr 0.4fr', padding: '10px 14px', background: MK.bg, fontSize: 8, fontWeight: 700, color: MK.muted, textTransform: 'uppercase', letterSpacing: '0.14em', borderBottom: `1px solid ${MK.border}`, alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={selectedCount === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ cursor: 'pointer', margin: 0 }} />
                  <span>Producto</span><span>SKU</span><span>Stock</span><span>Precio</span><span>Estado</span><span>Tendencia</span>
                </div>
                {filtered.length === 0 && (
                  <div style={{ padding: '24px 14px', fontSize: 10, color: MK.muted, textAlign: 'center', fontStyle: 'italic' }}>
                    No hay productos que coincidan con "{query}"
                  </div>
                )}
                {filtered.map((row, i, arr) => {
                  const s = statusStyles[row.st];
                  const checked = !!selectedRows[row.sku];
                  return (
                    <div key={row.sku} style={{
                      display: 'grid', gridTemplateColumns: '24px 2.4fr 0.7fr 0.5fr 0.7fr 0.6fr 0.4fr',
                      padding: '10px 14px',
                      borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
                      fontSize: 10, alignItems: 'center', gap: 8,
                      background: checked ? `${INDIGO}08` : query ? `${INDIGO}04` : 'transparent',
                      transition: 'background 0.15s',
                    }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleRow(row.sku)} style={{ cursor: 'pointer', margin: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{ width: 26, height: 26, background: MK.bg, border: `1px solid ${MK.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 4 }}>
                          <Package size={12} color={MK.muted} strokeWidth={1.8} />
                        </div>
                        <span style={{ color: MK.text, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.p}</span>
                      </div>
                      <span style={{ color: MK.muted, fontFamily: F_MONO, fontSize: 9 }}>{row.sku}</span>
                      <span style={{ color: MK.text, fontWeight: 600 }}>{row.s}</span>
                      <span style={{ color: MK.text, fontWeight: 600, fontFamily: F_MONO, fontSize: 9.5 }}>{row.pr}</span>
                      <span style={{
                        fontSize: 8, fontWeight: 700, padding: '3px 8px',
                        background: s.bg, color: s.c,
                        justifySelf: 'flex-start', letterSpacing: '0.06em', borderRadius: 3,
                      }}>{s.t}</span>
                      <Spark data={row.trend} color={s.c} w={40} h={20} sw={1.2} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════ SCREEN: Ventas ════════ */}
          {activeNav === 'Ventas' && (
            <div style={{ animation: 'fadeIn 0.3s ease', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: 16, border: `1px solid ${MK.border}`, background: MK.card, borderRadius: 8 }}>
                <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Ventas por sucursal</div>
                {[
                  { name: 'Centro',     v: '₡1.2M', p: 0.82, c: '#10B981' },
                  { name: 'Norte',      v: '₡680k', p: 0.46, c: '#4F46E5' },
                  { name: 'Sur',        v: '₡520k', p: 0.35, c: '#F59E0B' },
                ].map((b, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
                      <span style={{ color: MK.text, fontWeight: 600 }}>{b.name}</span>
                      <span style={{ color: MK.text, fontFamily: F_MONO, fontWeight: 700 }}>{b.v}</span>
                    </div>
                    <div style={{ height: 6, background: MK.bg, borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${b.p * 100}%`, background: b.c, borderRadius: 99, boxShadow: `0 0 6px ${b.c}80`, transition: 'width 0.4s' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 16, border: `1px solid ${MK.border}`, background: MK.card, borderRadius: 8 }}>
                <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Top productos vendidos</div>
                {[
                  { p: 'Taladro DeWalt 20V', v: 87, color: '#FF3B6B' },
                  { p: 'Cable THHN 12 AWG', v: 64, color: '#4F46E5' },
                  { p: 'Brocha 3"',         v: 52, color: '#10B981' },
                  { p: 'Tornillo 1/4"',     v: 41, color: '#F59E0B' },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
                    <span style={{ fontSize: 9, color: MK.muted, fontFamily: F_MONO, minWidth: 18, fontWeight: 700 }}>#{i+1}</span>
                    <span style={{ flex: 1, fontSize: 10, color: MK.text, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.p}</span>
                    <div style={{ width: 60, height: 5, background: MK.bg, borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${p.v}%`, background: p.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 10, color: MK.text, fontFamily: F_MONO, fontWeight: 700, minWidth: 28, textAlign: 'right' }}>{p.v}u</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ SCREEN: Clientes ════════ */}
          {activeNav === 'Clientes' && (
            <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CLIENTS.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px',
                  border: `1px solid ${MK.border}`, background: MK.card, borderRadius: 8,
                  transition: 'all 0.18s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = INDIGO; e.currentTarget.style.transform = 'translateX(2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = MK.border; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${c.color}, ${c.color}AA)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: F_MONO, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {c.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ fontSize: 11.5, color: MK.text, fontWeight: 600 }}>{c.name}</div>
                      <span style={{ fontSize: 8, color: c.color, background: `${c.color}15`, border: `1px solid ${c.color}30`, padding: '1px 7px', borderRadius: 999, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.tier}</span>
                    </div>
                    <div style={{ fontSize: 9, color: MK.muted, fontFamily: F_MONO, marginTop: 2 }}>{c.email}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: MK.text, fontFamily: F_MONO, fontWeight: 700 }}>{c.spent}</div>
                    <div style={{ fontSize: 8.5, color: MK.muted, fontFamily: F_MONO, marginTop: 2 }}>{c.orders} pedidos</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ════════ SCREEN: Ajustes ════════ */}
          {activeNav === 'Ajustes' && (
            <div style={{ animation: 'fadeIn 0.3s ease', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { Icon: Bell,         t: 'Notificaciones',     d: 'Email · SMS · WhatsApp', value: 'Activas' },
                { Icon: Shield,       t: 'Permisos & roles',   d: '8 usuarios activos',     value: 'Admin' },
                { Icon: Database,     t: 'Respaldos',          d: 'Diarios · 30 días',      value: 'OK' },
                { Icon: RotateCw,     t: 'Sincronización',     d: 'Cada 5 min · 3 sedes',    value: 'Live' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '14px 16px', border: `1px solid ${MK.border}`, background: MK.card, borderRadius: 8,
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${INDIGO}15`, border: `1px solid ${INDIGO}30`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: INDIGO, flexShrink: 0 }}>
                    <s.Icon size={16} strokeWidth={1.8} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: MK.text, fontWeight: 600, marginBottom: 2 }}>{s.t}</div>
                    <div style={{ fontSize: 9, color: MK.muted, fontFamily: F_MONO }}>{s.d}</div>
                  </div>
                  <span style={{ fontSize: 9, color: MK.green, background: MK.greenSoft, padding: '3px 8px', borderRadius: 999, fontWeight: 700, fontFamily: F_MONO, letterSpacing: '0.06em' }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── Notifications dropdown ─── */}
        {notifOpen && (
          <div onClick={() => setNotifOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              position: 'absolute', top: 50, right: 60, width: 240,
              background: MK.card, border: `1px solid ${MK.border}`,
              borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
              animation: 'fadeIn 0.2s ease',
            }}>
              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${MK.borderSoft}`, fontSize: 9, color: MK.muted, fontFamily: F_MONO, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                Notificaciones · 3 nuevas
              </div>
              {[
                { t: 'Stock crítico',  d: 'Taladro DeWalt · 3 unidades', c: MK.red },
                { t: 'Pedido grande',  d: 'Constructora SC · ₡180k',     c: MK.green },
                { t: 'Backup completo',d: 'Hace 12 minutos',              c: INDIGO },
              ].map((n, i) => (
                <div key={i} style={{ padding: '10px 14px', borderBottom: i < 2 ? `1px solid ${MK.borderSoft}` : 'none', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: n.c, flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: 10.5, color: MK.text, fontWeight: 600 }}>{n.t}</div>
                    <div style={{ fontSize: 9, color: MK.muted, marginTop: 1 }}>{n.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── New product modal ─── */}
        {showProductModal && (
          <div onClick={() => setShowProductModal(false)} style={{
            position: 'absolute', inset: 0, zIndex: 60,
            background: 'rgba(15,20,25,0.55)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
            animation: 'fadeIn 0.2s ease',
          }}>
            <form onSubmit={submitNewProduct} onClick={(e) => e.stopPropagation()} style={{
              background: MK.card, border: `1px solid ${MK.border}`,
              borderRadius: 14, width: 380, maxWidth: '100%',
              boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.04)',
              overflow: 'hidden',
              animation: 'modalUp 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              {/* ── Header ── */}
              <div style={{ padding: '20px 24px 18px', borderBottom: `1px solid ${MK.borderSoft}`, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `linear-gradient(135deg, ${INDIGO}, #818CF8)`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, boxShadow: `0 6px 14px ${INDIGO}40`,
                }}>
                  <Package size={17} color="#fff" strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F_DISPLAY, fontSize: 19, color: MK.text, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 4 }}>
                    Nuevo producto
                  </div>
                  <div style={{ fontSize: 11, color: MK.muted, lineHeight: 1.4 }}>
                    Se añade al inventario activo y aparece en el feed.
                  </div>
                </div>
                <button type="button" onClick={() => setShowProductModal(false)} aria-label="Cerrar"
                  style={{
                    width: 26, height: 26, border: 'none',
                    background: 'transparent', color: MK.muted,
                    cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0,
                    borderRadius: 6, transition: 'background 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = MK.bg; e.currentTarget.style.color = MK.text; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MK.muted; }}
                >×</button>
              </div>

              {/* ── Body ── */}
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Name field */}
                <div>
                  <label style={{ fontSize: 9, color: MK.textSoft, fontFamily: F_MONO, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                    Nombre <span style={{ color: MK.red }}>*</span>
                  </label>
                  <input
                    value={productForm.name}
                    onChange={(e) => setProductForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Ej. Tornillo cabeza plana 1/4&quot;"
                    autoFocus
                    style={{
                      width: '100%', padding: '10px 14px', fontSize: 12,
                      border: `1.5px solid ${MK.border}`, background: '#fff',
                      color: MK.text, outline: 'none', fontFamily: 'inherit',
                      borderRadius: 8, transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = INDIGO; e.target.style.boxShadow = `0 0 0 3px ${INDIGO}18`; }}
                    onBlur={(e)  => { e.target.style.borderColor = MK.border; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Stock + price grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 9, color: MK.textSoft, fontFamily: F_MONO, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                      Stock inicial
                    </label>
                    <input
                      value={productForm.stock}
                      onChange={(e) => setProductForm(f => ({ ...f, stock: e.target.value }))}
                      placeholder="0"
                      type="number"
                      style={{
                        width: '100%', padding: '10px 14px', fontSize: 12,
                        border: `1.5px solid ${MK.border}`, background: '#fff',
                        color: MK.text, outline: 'none', fontFamily: F_MONO,
                        borderRadius: 8, transition: 'border-color 0.15s, box-shadow 0.15s',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = INDIGO; e.target.style.boxShadow = `0 0 0 3px ${INDIGO}18`; }}
                      onBlur={(e)  => { e.target.style.borderColor = MK.border; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 9, color: MK.textSoft, fontFamily: F_MONO, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                      Precio (₡)
                    </label>
                    <input
                      value={productForm.price}
                      onChange={(e) => setProductForm(f => ({ ...f, price: e.target.value }))}
                      placeholder="0"
                      type="number"
                      style={{
                        width: '100%', padding: '10px 14px', fontSize: 12,
                        border: `1.5px solid ${MK.border}`, background: '#fff',
                        color: MK.text, outline: 'none', fontFamily: F_MONO,
                        borderRadius: 8, transition: 'border-color 0.15s, box-shadow 0.15s',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = INDIGO; e.target.style.boxShadow = `0 0 0 3px ${INDIGO}18`; }}
                      onBlur={(e)  => { e.target.style.borderColor = MK.border; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Helper text */}
                <div style={{ fontSize: 10, color: MK.muted, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: MK.bg, borderRadius: 6, border: `1px solid ${MK.borderSoft}` }}>
                  <CheckCircle2 size={11} color={MK.green} strokeWidth={2.5} />
                  Los datos pueden editarse después desde el inventario.
                </div>
              </div>

              {/* ── Footer with two buttons ── */}
              <div style={{
                padding: '14px 24px 20px',
                borderTop: `1px solid ${MK.borderSoft}`,
                background: MK.bg,
                display: 'flex', justifyContent: 'flex-end', gap: 8,
              }}>
                <button type="button" onClick={() => setShowProductModal(false)} style={{
                  padding: '10px 18px',
                  background: 'transparent', color: MK.textSoft,
                  border: `1px solid ${MK.border}`, cursor: 'pointer',
                  fontSize: 11, fontWeight: 600,
                  fontFamily: 'inherit', borderRadius: 7,
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = MK.text; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MK.textSoft; }}
                >Cancelar</button>
                <button type="submit" disabled={!productForm.name} style={{
                  padding: '10px 20px', border: 'none',
                  cursor: !productForm.name ? 'not-allowed' : 'pointer',
                  background: !productForm.name ? 'rgba(0,0,0,0.06)' : `linear-gradient(135deg, ${INDIGO}, #818CF8)`,
                  color: !productForm.name ? MK.mutedSoft : '#fff',
                  fontSize: 11, fontWeight: 700,
                  fontFamily: 'inherit', borderRadius: 7,
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  boxShadow: !productForm.name ? 'none' : `0 6px 14px ${INDIGO}40`,
                  transition: 'all 0.15s',
                }}>
                  <Plus size={12} strokeWidth={2.5} />
                  Crear producto
                </button>
              </div>
            </form>
          </div>
        )}

        <style>{`
          @keyframes feedSlide { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes modalUp   { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        `}</style>
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

  const KEYWORDS = [
    { kw: 'diseño web Costa Rica', pos: 1,  change: 8,  vol: '5.4k', sub: 'diseño-web',     results: '2.340.000', delta: '+847%' },
    { kw: 'e-commerce CR',         pos: 3,  change: 2,  vol: '2.1k', sub: 'ecommerce',      results: '1.120.000', delta: '+412%' },
    { kw: 'desarrollo web SJO',    pos: 4,  change: 5,  vol: '1.8k', sub: 'desarrollo-web', results: '894.000',   delta: '+318%' },
    { kw: 'apps móviles CR',       pos: 7,  change: 12, vol: '980',  sub: 'apps-moviles',   results: '512.000',   delta: '+186%' },
  ];
  const [selectedKw, setSelectedKw] = useState(0);
  const active = KEYWORDS[selectedKw];

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
          <div key={active.kw} style={{
            flex: 1, padding: '8px 16px',
            border: `1px solid ${MK.border}`,
            borderRadius: 24, fontSize: 11, color: MK.text,
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 1px 6px rgba(32,33,36,0.08)',
            animation: 'serpSwap 0.4s ease',
          }}>
            <Search size={12} color={MK.muted} />
            <span style={{ flex: 1 }}>{active.kw}</span>
            <span style={{ width: 1, height: 14, background: MK.border }} />
            <Search size={11} color="#4285F4" />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 18, fontSize: 9.5, color: MK.muted, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${MK.borderSoft}` }}>
          <span style={{ color: '#4285F4', borderBottom: '2px solid #4285F4', paddingBottom: 6, fontWeight: 500 }}>Todo</span>
          <span>Imágenes</span><span>Videos</span><span>Mapas</span><span>Noticias</span><span>Más</span>
        </div>

        <div style={{ fontSize: 9, color: MK.muted, marginBottom: 12, fontFamily: F_MONO }}>
          Cerca de <strong>{active.results}</strong> resultados · 0,{30 + selectedKw * 5} segundos
        </div>

        {/* Our result — position varies based on selected keyword */}
        <div key={active.kw} style={{
          background: '#FFF8F4', padding: '14px 16px',
          border: `1.5px solid ${MK.accent}50`,
          marginBottom: 14, position: 'relative',
          boxShadow: `0 8px 24px ${MK.accent}15`,
          animation: 'serpSwap 0.4s ease',
        }}>
          <div style={{
            position: 'absolute', top: -10, right: 12,
            background: active.pos === 1 ? MK.accent : active.pos <= 3 ? '#10B981' : '#F59E0B',
            color: '#fff',
            fontSize: 8.5, fontWeight: 700, padding: '4px 10px',
            letterSpacing: '0.12em',
            boxShadow: `0 4px 12px ${active.pos === 1 ? MK.accent : '#0a0'}40`,
          }}>★ #{active.pos} POSICIÓN</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, marginBottom: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg, #FF5C9A 0%, #8A46FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 8, fontWeight: 700 }}>V</div>
            <div>
              <span style={{ color: MK.text, fontWeight: 500 }}>VO Studio</span>
              <span style={{ color: MK.muted, marginInline: 4 }}>·</span>
              <span style={{ color: MK.muted }}>https://vostudio.cr</span>
              <span style={{ color: MK.muted, marginInline: 2 }}>›</span>
              <span style={{ color: MK.muted }}>{active.sub}</span>
            </div>
          </div>
          <div style={{ fontSize: 14, color: MK.blueG, fontWeight: 400, marginBottom: 5, lineHeight: 1.3 }}>VO Studio — {active.kw.charAt(0).toUpperCase() + active.kw.slice(1)}</div>
          <div style={{ fontSize: 10.5, color: MK.textSoft, lineHeight: 1.5 }}>
            Páginas web, e-commerce y apps móviles para empresas. Ingenieros en Sistemas graduados de la UTN. <strong>Respuesta en menos de 24h</strong>.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 9 }}>
            <div style={{ display: 'inline-flex', gap: 1 }}>
              {[0,1,2,3,4].map(i => <Star key={i} size={9} fill="#F59E0B" strokeWidth={0} />)}
            </div>
            <span style={{ color: MK.text, fontWeight: 700 }}>4.9/5</span>
            <span style={{ color: MK.muted }}>· 47 reseñas en Google</span>
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

        {/* Keyword table — clickable */}
        <div style={{ background: MK.card, padding: 14, border: `1px solid ${MK.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Top palabras clave</div>
            <span style={{ fontSize: 8, color: MK.accent, fontWeight: 600, fontFamily: F_MONO }}>Click para previsualizar</span>
          </div>
          {KEYWORDS.map((k, i, arr) => {
            const isActive = selectedKw === i;
            return (
              <button key={i} onClick={() => setSelectedKw(i)}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 36px 36px 50px',
                  width: '100%',
                  alignItems: 'center', gap: 8,
                  padding: '8px 8px',
                  border: 'none',
                  borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
                  fontSize: 10,
                  background: isActive ? `${MK.accent}10` : 'transparent',
                  borderLeft: `2px solid ${isActive ? MK.accent : 'transparent'}`,
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'inherit', transition: 'all 0.18s',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                  <Target size={9} color={isActive ? MK.accent : MK.muted} strokeWidth={2} />
                  <span style={{ color: MK.text, fontWeight: isActive ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{k.kw}</span>
                </div>
                <span style={{ color: MK.text, fontWeight: 700, textAlign: 'center', fontFamily: F_MONO, fontSize: 10 }}>#{k.pos}</span>
                <span style={{ color: MK.green, fontWeight: 700, fontSize: 9, textAlign: 'right', display: 'inline-flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  <ChevronUp size={9} strokeWidth={2.5} />{k.change}
                </span>
                <span style={{ color: MK.muted, fontSize: 9, fontFamily: F_MONO, textAlign: 'right' }}>{k.vol}/m</span>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .vo-mk-seo { grid-template-columns: 1fr !important; }
        }
        @keyframes serpSwap { from { opacity: 0.4; transform: translateY(-2px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 06 · MAINTENANCE — Real status-page dashboard
// ────────────────────────────────────────────────────────────────────────
function MaintenanceMock() {
  const [activeTab, setActiveTab]   = useState('status');
  const [lastUpdate, setLastUpdate] = useState(Date.now() - 120000);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [tick, setTick] = useState(0);
  const [cpu, setCpu] = useState(34);
  const [memory, setMemory] = useState(62);
  const [requests, setRequests] = useState(248);
  const [subscribed, setSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [alertChannels, setAlertChannels] = useState({ email: true, sms: false, slack: true, whatsapp: false });
  const [bandwidth, setBandwidth] = useState(187);

  // Live updates
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  // Live metric gauges
  React.useEffect(() => {
    const id = setInterval(() => {
      setCpu(c => Math.max(18, Math.min(72, c + Math.round((Math.random() - 0.5) * 8))));
      setMemory(m => Math.max(45, Math.min(85, m + Math.round((Math.random() - 0.5) * 4))));
      setRequests(r => r + Math.floor(Math.random() * 12));
      setBandwidth(b => Math.max(120, Math.min(240, b + Math.round((Math.random() - 0.5) * 14))));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const secondsAgo = Math.floor((Date.now() - lastUpdate) / 1000);
  const timeLabel = secondsAgo < 60
    ? `hace ${secondsAgo}s`
    : secondsAgo < 3600
    ? `hace ${Math.floor(secondsAgo / 60)} min`
    : `hace ${Math.floor(secondsAgo / 3600)}h`;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastUpdate(Date.now());
      setRefreshing(false);
    }, 900);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => { setSubscribed(false); setSubEmail(''); }, 2400);
  };

  const SERVICES_DATA = [
    { id: 'web',  Icon: Globe,    n: 'Sitio web',     lat: '89ms',  data: [85, 90, 88, 92, 87, 89],   region: 'Vercel · São Paulo',  uptime: '99.99%' },
    { id: 'api',  Icon: Server,   n: 'API',           lat: '142ms', data: [150, 145, 140, 148, 142, 142], region: 'AWS · us-east-1', uptime: '99.96%' },
    { id: 'db',   Icon: Database, n: 'Base de datos', lat: '38ms',  data: [40, 38, 36, 39, 37, 38],   region: 'Atlas · us-east-1',   uptime: '99.99%' },
    { id: 'cdn',  Icon: Zap,      n: 'CDN',           lat: '24ms',  data: [25, 24, 26, 22, 25, 24],   region: 'Bunny · Global',      uptime: '100%'   },
  ];

  const TABS = [
    { id: 'status',    Icon: CheckCircle2, t: 'Estado' },
    { id: 'metricas',  Icon: BarChart3,    t: 'Métricas' },
    { id: 'incidentes',Icon: Shield,       t: 'Incidentes' },
    { id: 'alertas',   Icon: Bell,         t: 'Alertas' },
  ];

  const INCIDENTS = [
    { sev: 'resolved', t: 'API · timeout intermitente', d: 'Resuelto en 4 min · sin impacto en usuarios',  date: '18 Jul · 14:32',  dur: '4 min' },
    { sev: 'resolved', t: 'CDN · cache miss elevado',    d: 'Resuelto en 12 min · purga manual aplicada',  date: '02 Jul · 09:17',  dur: '12 min' },
    { sev: 'resolved', t: 'BD · slow query alert',        d: 'Resuelto en 8 min · index añadido',         date: '24 Jun · 22:08',  dur: '8 min' },
    { sev: 'resolved', t: 'Mantenimiento programado',    d: 'Sin downtime · deploy verde',                date: '15 Jun · 03:00',  dur: '—' },
  ];

  const DEPLOYS = [
    { id: '7d4f2', branch: 'main',    msg: 'fix: optimize hero animation',  author: 'JV', status: 'success', time: 'hace 2h' },
    { id: '3a91c', branch: 'main',    msg: 'feat: add cart drawer',          author: 'ZL', status: 'success', time: 'hace 8h' },
    { id: '9b8d1', branch: 'staging', msg: 'chore: bump deps · react@19.0',  author: 'JV', status: 'success', time: 'hace 1d' },
  ];

  return (
    <BrowserFrame url="status.vostudio.cr">
      <div style={{ padding: 22, background: MK.bg, minHeight: 460, position: 'relative' }}>

        {/* ─── Top header ─── */}
        <div style={{
          background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10,
          padding: '18px 22px', marginBottom: 12,
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'center',
          boxShadow: SHADOW_LIFT, position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${MK.green} 0%, ${MK.green} 90%, ${MK.yellow} 95%, ${MK.green} 100%)`,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: MK.greenSoft, border: `2px solid ${MK.green}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px ${MK.green}50`,
            }}>
              <CheckCircle2 size={20} color={MK.green} strokeWidth={2.2} fill={MK.greenSoft} />
            </div>
            <div>
              <div style={{ fontSize: 9, color: MK.green, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: MK.green, boxShadow: `0 0 6px ${MK.green}`, animation: 'pulse 2s infinite' }} />
                Todos los sistemas operativos
              </div>
              <div style={{ fontFamily: F_DISPLAY, fontSize: 20, color: MK.text, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Funcionando con <span style={{ fontStyle: 'italic', color: MK.green }}>normalidad</span>
              </div>
              <div style={{ fontSize: 10, color: MK.muted, marginTop: 3, fontFamily: F_MONO }}>Última caída: hace 18 días · 4 min · resuelta</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>Uptime · 30d</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: MK.green, letterSpacing: '-0.03em', lineHeight: 1, fontFamily: F_MONO }}>
              99.98<span style={{ fontSize: 16, opacity: 0.7 }}>%</span>
            </div>
            <div style={{ fontSize: 9, color: MK.green, fontWeight: 600, marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <ChevronUp size={10} strokeWidth={2.5} /> +0.12% vs. mes anterior
            </div>
          </div>
        </div>

        {/* ─── Tab nav + refresh ─── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 3, background: MK.card, border: `1px solid ${MK.border}`, padding: 3, borderRadius: 8 }}>
            {TABS.map(tb => {
              const a = activeTab === tb.id;
              return (
                <button key={tb.id} onClick={() => setActiveTab(tb.id)} style={{
                  padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 10, fontWeight: a ? 700 : 500,
                  background: a ? MK.text : 'transparent',
                  color: a ? '#fff' : MK.muted,
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  borderRadius: 5, transition: 'all 0.18s',
                }}>
                  <tb.Icon size={11} strokeWidth={2} />
                  {tb.t}
                </button>
              );
            })}
          </div>
          <button onClick={handleRefresh} disabled={refreshing} style={{
            fontSize: 9, color: refreshing ? MK.accent : MK.muted,
            background: refreshing ? `${MK.accent}10` : MK.card,
            border: `1px solid ${refreshing ? MK.accent : MK.border}`,
            padding: '5px 10px', borderRadius: 6,
            display: 'inline-flex', alignItems: 'center', gap: 6, cursor: refreshing ? 'wait' : 'pointer',
            fontFamily: 'inherit', transition: 'all 0.18s',
          }}>
            <RotateCw size={10} strokeWidth={2} style={{ animation: refreshing ? 'spin 0.9s linear infinite' : 'none' }} />
            {refreshing ? 'Actualizando…' : `Actualizado ${timeLabel}`}
          </button>
        </div>

        {/* ════════ TAB: Estado ════════ */}
        {activeTab === 'status' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {/* 60-day uptime chart */}
            <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: 14, marginBottom: 12, boxShadow: SHADOW_LIFT }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Disponibilidad · últimos 60 días</div>
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

            {/* Service status grid — clickable */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {SERVICES_DATA.map((s) => {
                const isOpen = selectedService === s.id;
                return (
                  <button key={s.id} onClick={() => setSelectedService(isOpen ? null : s.id)}
                    style={{
                      background: isOpen ? `${MK.green}08` : MK.card,
                      padding: '12px 14px', borderRadius: 10,
                      border: `1px solid ${isOpen ? MK.green : MK.border}`,
                      boxShadow: SHADOW_LIFT, cursor: 'pointer',
                      textAlign: 'left', fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <s.Icon size={13} color={MK.text} strokeWidth={1.8} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: MK.text }}>{s.n}</span>
                      </div>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: MK.green, boxShadow: `0 0 8px ${MK.green}`, animation: 'pulse 2s infinite' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: MK.text, letterSpacing: '-0.02em', fontFamily: F_MONO }}>{s.lat}</div>
                        <div style={{ fontSize: 7.5, color: MK.muted, fontFamily: F_MONO, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginTop: 1 }}>Latencia</div>
                      </div>
                      <Spark data={s.data} color={MK.green} w={48} h={22} sw={1.3} />
                    </div>
                    {isOpen && (
                      <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${MK.borderSoft}`, animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: MK.muted, marginBottom: 3 }}>
                          <span>Región</span>
                          <span style={{ color: MK.text, fontWeight: 600, fontFamily: F_MONO, fontSize: 8.5 }}>{s.region}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: MK.muted }}>
                          <span>Uptime 30d</span>
                          <span style={{ color: MK.green, fontWeight: 700, fontFamily: F_MONO, fontSize: 9 }}>{s.uptime}</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════ TAB: Métricas (live gauges) ════════ */}
        {activeTab === 'metricas' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {/* Live metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 }}>
              {[
                { l: 'CPU',              v: `${cpu}%`,           p: cpu / 100,       c: cpu > 70 ? MK.red : cpu > 50 ? MK.yellow : MK.green },
                { l: 'Memoria',          v: `${memory}%`,         p: memory / 100,    c: memory > 80 ? MK.red : memory > 65 ? MK.yellow : MK.green },
                { l: 'Bandwidth',        v: `${bandwidth} MB/s`,  p: bandwidth / 300, c: '#4F46E5' },
                { l: 'Requests · min',   v: requests.toLocaleString('es-CR'), p: 0.62, c: '#8A46FF' },
              ].map((m, i) => (
                <div key={i} style={{
                  background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10,
                  padding: '14px 16px', boxShadow: SHADOW_LIFT, position: 'relative',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>{m.l}</div>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: MK.green, boxShadow: `0 0 6px ${MK.green}`, animation: 'pulse 1.6s infinite' }} />
                  </div>
                  <div key={m.v} style={{ fontSize: 22, fontWeight: 700, color: m.c, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 10, fontFamily: F_MONO, animation: 'gaugeUpdate 0.4s ease' }}>
                    {m.v}
                  </div>
                  {/* Gauge bar */}
                  <div style={{ height: 5, background: MK.bg, borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${Math.min(100, m.p * 100)}%`,
                      background: m.c, borderRadius: 99,
                      boxShadow: `0 0 8px ${m.c}80`,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Big request chart */}
            <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: 14, marginBottom: 12, boxShadow: SHADOW_LIFT }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Requests · últimas 24h</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: MK.text, marginTop: 4, letterSpacing: '-0.02em', fontFamily: F_MONO }}>
                    342,847 <span style={{ fontSize: 10, color: MK.green, fontWeight: 600, marginLeft: 4 }}>↗ +12%</span>
                  </div>
                </div>
                <div style={{ fontSize: 9, color: MK.muted, fontFamily: F_MONO, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 1, background: '#4F46E5' }} />
                  Hits / hora
                </div>
              </div>
              <LineChart
                data={[8200,9100,10400,11200,12800,14200,15600,16400,15800,15200,14800,14200,13800,13200,12800,13400,14200,15200,16400,17800,18400,17200,16100,14800]}
                labels={['00','','06','','12','','18','','24']}
                color="#4F46E5" w={420} h={130}
              />
            </div>

            {/* Recent deploys */}
            <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: 14, boxShadow: SHADOW_LIFT }}>
              <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Deploys recientes</div>
              {DEPLOYS.map((d, i) => (
                <div key={d.id} style={{
                  display: 'grid', gridTemplateColumns: 'auto auto 1fr auto auto', gap: 10,
                  padding: '7px 0', alignItems: 'center',
                  borderBottom: i < DEPLOYS.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
                }}>
                  <CheckCircle2 size={11} color={MK.green} strokeWidth={2.5} />
                  <span style={{ fontFamily: F_MONO, fontSize: 9, background: MK.bg, padding: '2px 6px', color: MK.text, fontWeight: 600 }}>{d.id}</span>
                  <span style={{ fontSize: 10, color: MK.text, fontFamily: F_MONO, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ color: MK.accent, marginRight: 6 }}>{d.branch}</span>{d.msg}
                  </span>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: `linear-gradient(135deg, ${MK.accent}, #C14DFF)`, color: '#fff', fontSize: 8, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: F_MONO }}>{d.author}</span>
                  <span style={{ fontSize: 8.5, color: MK.mutedSoft, fontFamily: F_MONO }}>{d.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ TAB: Incidentes ════════ */}
        {activeTab === 'incidentes' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
              {[
                { l: 'Sin incidentes', v: '18 días', c: MK.green },
                { l: 'Total · 90 días', v: '4',     c: MK.text },
                { l: 'Tiempo medio',   v: '8 min',  c: '#4F46E5' },
              ].map((k, i) => (
                <div key={i} style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: '12px 14px', boxShadow: SHADOW_LIFT }}>
                  <div style={{ fontSize: 8.5, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{k.l}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: k.c, letterSpacing: '-0.02em', lineHeight: 1, fontFamily: F_MONO }}>{k.v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: 14, boxShadow: SHADOW_LIFT }}>
              <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Historial · 90 días</div>
              {INCIDENTS.map((inc, i, arr) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
                }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 8, fontWeight: 700, padding: '3px 8px',
                    color: MK.green, background: MK.greenSoft,
                    letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 3,
                  }}>
                    <CheckCircle2 size={9} strokeWidth={2.5} />
                    Resuelto
                  </div>
                  <div>
                    <div style={{ fontSize: 10.5, color: MK.text, fontWeight: 600 }}>{inc.t}</div>
                    <div style={{ fontSize: 9, color: MK.muted, marginTop: 1 }}>{inc.d}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 9, color: MK.text, fontFamily: F_MONO, fontWeight: 600 }}>{inc.dur}</div>
                    <div style={{ fontSize: 8, color: MK.mutedSoft, fontFamily: F_MONO, marginTop: 2 }}>{inc.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ TAB: Alertas ════════ */}
        {activeTab === 'alertas' && (
          <div style={{ animation: 'fadeIn 0.3s ease', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 12 }}>
            {/* Subscribe panel */}
            <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: 18, boxShadow: SHADOW_LIFT }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Bell size={14} color={MK.accent} strokeWidth={2} />
                <div style={{ fontFamily: F_DISPLAY, fontSize: 16, color: MK.text, letterSpacing: '-0.02em' }}>
                  Notificaciones <span style={{ fontStyle: 'italic', color: MK.accent }}>instantáneas</span>
                </div>
              </div>
              <p style={{ fontSize: 10.5, color: MK.muted, marginBottom: 14, lineHeight: 1.5 }}>
                Recibí un aviso apenas algo se degrade — antes de que tu cliente lo note.
              </p>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                <input value={subEmail} onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="tu@empresa.cr" type="email"
                  disabled={subscribed}
                  style={{
                    flex: 1, padding: '9px 12px', fontSize: 11,
                    border: `1px solid ${MK.border}`, background: MK.bg,
                    color: MK.text, outline: 'none', fontFamily: 'inherit', borderRadius: 6,
                  }} />
                <button type="submit" disabled={subscribed} style={{
                  padding: '9px 14px',
                  background: subscribed ? MK.green : MK.text, color: '#fff',
                  border: 'none', cursor: subscribed ? 'default' : 'pointer',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase',
                  fontFamily: 'inherit', borderRadius: 6,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  {subscribed ? (<><CheckCircle2 size={11} strokeWidth={2.5} />Suscrito</>) : 'Suscribirme'}
                </button>
              </form>
              <div style={{ fontSize: 9, color: MK.muted, fontFamily: F_MONO, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Users size={10} strokeWidth={2} />
                <strong style={{ color: MK.text }}>184</strong> personas reciben estos avisos
              </div>
            </div>

            {/* Alert channels toggles */}
            <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: 18, boxShadow: SHADOW_LIFT }}>
              <div style={{ fontSize: 9, color: MK.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Canales de alerta</div>
              {[
                { id: 'email',    label: 'Email',    desc: 'avisos@vostudio.cr' },
                { id: 'sms',      label: 'SMS',      desc: '+506 6267-6464' },
                { id: 'slack',    label: 'Slack',    desc: '#status-vostudio' },
                { id: 'whatsapp', label: 'WhatsApp', desc: 'Grupo soporte' },
              ].map((ch, i, arr) => {
                const on = alertChannels[ch.id];
                return (
                  <div key={ch.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                    padding: '8px 0',
                    borderBottom: i < arr.length - 1 ? `1px solid ${MK.borderSoft}` : 'none',
                  }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: MK.text, fontWeight: 600 }}>{ch.label}</div>
                      <div style={{ fontSize: 9, color: MK.muted, fontFamily: F_MONO, marginTop: 1 }}>{ch.desc}</div>
                    </div>
                    <button onClick={() => setAlertChannels(c => ({ ...c, [ch.id]: !c[ch.id] }))} aria-label={`Toggle ${ch.label}`}
                      style={{
                        width: 32, height: 18, borderRadius: 99,
                        background: on ? MK.green : 'rgba(0,0,0,0.12)',
                        border: 'none', cursor: 'pointer', position: 'relative',
                        transition: 'background 0.2s',
                      }}>
                      <span style={{
                        position: 'absolute', top: 2, left: on ? 16 : 2,
                        width: 14, height: 14, borderRadius: '50%', background: '#fff',
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.20)',
                      }} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Subscribed success toast */}
            {subscribed && (
              <div style={{
                position: 'absolute', bottom: 20, right: 20, zIndex: 50,
                background: MK.green, color: '#fff',
                padding: '10px 18px', fontSize: 11, fontWeight: 700,
                fontFamily: F_MONO, letterSpacing: '0.06em',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: `0 12px 32px ${MK.green}50`, borderRadius: 8,
                animation: 'fadeIn 0.3s ease',
              }}>
                <CheckCircle2 size={13} strokeWidth={2.5} />
                Suscripción confirmada
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse  { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes spin   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gaugeUpdate { from { opacity: 0.55; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      `}</style>
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
