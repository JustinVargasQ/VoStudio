import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Check, Star, X, ArrowUpRight, Clock, Monitor, ShoppingBag, LayoutDashboard, Gauge } from 'lucide-react';
import {
  BG, BG_ALT, BG_SECTION, BG_CARD, BG_POPULAR, POPULAR_FG, POPULAR_BORDER,
  TEXT, TEXT_S, TEXT_D, BORDER, A, A_L, A_D, F_DISPLAY, F_MONO, MAX_W, PAD_X,
} from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { RevealItem } from './Reveal';

// ── Plan metadata (no prices) ─────────────────────────────────────────────────
const PLAN_META = [
  { accent: '#0EA5E9', glow: '#0EA5E944' },
  { accent: A,        glow: `${A}44`    },
  { accent: '#F59E0B', glow: '#F59E0B44' },
  { accent: '#F97316', glow: '#F9731644' },
];

// ── Detailed content per plan ─────────────────────────────────────────────────
const PLAN_DETAIL = [
  {
    includes: [
      'Diseño custom responsive y mobile-first',
      'Hasta 5 secciones (Hero, Servicios, Sobre, Contacto…)',
      'Formulario de contacto + anti-spam',
      'SEO básico: title, metas, sitemap, robots.txt',
      'Google Analytics 4 configurado',
      'Dominio + hosting listos para operar',
      '1 ronda de revisiones de diseño',
      '30 días de soporte post-lanzamiento',
    ],
    examples: [
      { t: 'Profesional independiente', d: 'Abogado o médico que necesita presencia online seria en días.' },
      { t: 'Emprendimiento local', d: 'Negocio que vende por redes y da el salto a un sitio propio.' },
      { t: 'Evento o lanzamiento', d: 'Countdown, RSVP y captura de leads para una fecha.' },
    ],
    Mockup: MockupLanding,
  },
  {
    includes: [
      'Todo lo de Landing, más:',
      'Hasta 10 páginas con CMS integrado',
      'Editás textos e imágenes sin tocar código',
      'Blog funcional y administrable',
      'Formulario de cotización personalizado',
      'SEO avanzado: schema, open graph, velocidad',
      'Search Console + Analytics configurados',
      '2 rondas de revisiones de diseño',
      'Video de capacitación para tu equipo',
      '60 días de soporte post-lanzamiento',
    ],
    examples: [
      { t: 'PYME o empresa', d: 'Sitio actualizable sin pagar un dev cada vez que querés cambiar algo.' },
      { t: 'Clínica o consultorio', d: 'Citas, equipo médico, servicios, blog de salud y reseñas.' },
      { t: 'Agencia o estudio', d: 'Portafolio, blog de casos, formulario de brief y Calendly integrado.' },
    ],
    Mockup: MockupSitio,
  },
  {
    includes: [
      'Catálogo ilimitado con categorías y variantes',
      'Carrito y checkout multi-paso optimizado',
      'Pasarela real: SINPE Móvil, tarjeta y PayPal',
      'Panel admin: productos, pedidos e inventario',
      'Cupones y descuentos por temporada',
      'Notificaciones por WhatsApp y email',
      'Imágenes con Cloudinary (optimización auto)',
      'SEO de producto con URLs amigables',
      'Reseñas verificadas por compra real',
      '90 días de soporte post-lanzamiento',
    ],
    examples: [
      { t: 'Cosméticos y moda', d: 'Variantes (talla/color), wishlist, cupones y pedidos por WhatsApp.' },
      { t: 'Comida gourmet', d: 'Entregas por zona, calendario de pedidos y perecederos.' },
      { t: 'Arte y artesanías', d: 'Piezas únicas con envíos nacionales e internacionales.' },
    ],
    Mockup: MockupEcommerce,
  },
  {
    includes: [
      'Análisis de requerimientos + propuesta técnica',
      'Diseño UX/UI con prototipo aprobado en Figma',
      'Autenticación con roles y permisos granulares',
      'App web progresiva (PWA): instalable y offline',
      'API REST propia o integración con sistemas externos',
      'Base de datos diseñada a la medida del negocio',
      'Panel de administración completo',
      'Reportes exportables a Excel y PDF',
      'Respaldos automáticos + monitoreo 24/7',
      'Documentación técnica + manual en video',
      '90 días de soporte + mantenimiento',
    ],
    examples: [
      { t: 'ERP para constructora', d: 'Proyectos, presupuestos, materiales y planilla integrada.' },
      { t: 'CRM inmobiliario', d: 'Leads, fichas de propiedad, agentes y visitas calendarizadas.' },
      { t: 'App de delivery', d: 'Pedidos en tiempo real, tracking GPS y pagos in-app.' },
    ],
    Mockup: MockupApp,
  },
];

// ── Mini mockups específicos para pricing ─────────────────────────────────────
function MockupLanding() {
  return (
    <div style={{ background: '#06030D', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(138,70,255,0.20)', boxShadow: '0 8px 28px rgba(0,0,0,0.45)' }}>
      {/* Browser bar */}
      <div style={{ background: '#100B25', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {['#FF5C5C', '#FFBD2E', '#27C93F'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, marginLeft: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 14, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          <span style={{ fontFamily: F_MONO, fontSize: 8, color: 'rgba(255,255,255,0.38)' }}>tunegocio.com</span>
        </div>
      </div>
      {/* Nav */}
      <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', background: '#040D1A' }}>
        <div style={{ width: 36, height: 8, borderRadius: 3, background: '#FF5C9A' }} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {['Inicio', 'Servicios', 'Contacto'].map(l => <span key={l} style={{ fontSize: 8, color: 'rgba(255,255,255,0.40)' }}>{l}</span>)}
          <div style={{ padding: '3px 9px', background: '#FF5C9A', borderRadius: 4 }}>
            <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>Contactar</span>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div style={{ padding: '18px 14px 14px', background: 'linear-gradient(135deg, #06030D 0%, #1B1030 100%)' }}>
        <div style={{ width: '75%', height: 11, borderRadius: 3, background: 'rgba(255,255,255,0.88)', marginBottom: 6 }} />
        <div style={{ width: '55%', height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.35)', marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 7 }}>
          <div style={{ padding: '5px 14px', background: '#FF5C9A', borderRadius: 5 }}><span style={{ fontSize: 8.5, color: '#fff', fontWeight: 700 }}>Empezar</span></div>
          <div style={{ padding: '5px 14px', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 5 }}><span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.60)' }}>Ver más</span></div>
        </div>
      </div>
      {/* Features strip */}
      <div style={{ padding: '10px 14px 12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
        {[['#FF6A63', 'Rápido'], ['#FF5C9A', 'Seguro'], ['#B79CFF', 'Mobile']].map(([c, l]) => (
          <div key={l} style={{ padding: '7px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: c, marginBottom: 5 }} />
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: 3 }}>{l}</div>
            <div style={{ width: '80%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupSitio() {
  return (
    <div style={{ background: '#06030D', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(138,70,255,0.20)', boxShadow: '0 8px 28px rgba(0,0,0,0.45)' }}>
      {/* Browser bar */}
      <div style={{ background: '#100B25', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {['#FF5C5C', '#FFBD2E', '#27C93F'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, marginLeft: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 14, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          <span style={{ fontFamily: F_MONO, fontSize: 8, color: 'rgba(255,255,255,0.38)' }}>tuempresa.com/admin</span>
        </div>
      </div>
      {/* CMS layout: sidebar + content */}
      <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr' }}>
        {/* Sidebar */}
        <div style={{ background: '#040D1A', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[A, '#FF6A63', '#B79CFF', '#F59E0B', 'rgba(255,255,255,0.18)'].map((c, i) => (
            <div key={i} style={{ width: '100%', height: i === 0 ? 24 : 18, borderRadius: 5, background: i === 0 ? `${A}30` : 'rgba(255,255,255,0.05)', border: i === 0 ? `1px solid ${A}50` : '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            </div>
          ))}
        </div>
        {/* Content area */}
        <div style={{ padding: '10px' }}>
          <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO, letterSpacing: '0.08em', marginBottom: 8 }}>PÁGINAS DEL SITIO</div>
          {[['Inicio', '#27C93F'], ['Servicios', '#27C93F'], ['Blog', '#FFBD2E'], ['Contacto', '#27C93F']].map(([name, c]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 8px', marginBottom: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 5, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.70)', fontWeight: 500 }}>{name}</span>
              <span style={{ fontSize: 7, color: c, fontFamily: F_MONO }}>● online</span>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: '6px 8px', background: `${A}18`, border: `1px solid ${A}40`, borderRadius: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: A }} />
            <span style={{ fontSize: 8, color: A, fontFamily: F_MONO }}>Nueva entrada →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupEcommerce() {
  const products = [['Producto A', '₡24 900'], ['Producto B', '₡18 500'], ['Producto C', '₡32 000'], ['Producto D', '₡12 800']];
  return (
    <div style={{ background: '#06030D', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(245,158,11,0.25)', boxShadow: '0 8px 28px rgba(0,0,0,0.45)' }}>
      {/* Browser bar */}
      <div style={{ background: '#100B25', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {['#FF5C5C', '#FFBD2E', '#27C93F'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, marginLeft: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
          <span style={{ fontFamily: F_MONO, fontSize: 8, color: 'rgba(255,255,255,0.38)' }}>tienda.com</span>
          <span style={{ fontSize: 9, color: '#F59E0B' }}>🛒 3</span>
        </div>
      </div>
      {/* Product grid */}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, letterSpacing: '0.08em', marginBottom: 8 }}>CATÁLOGO · 48 productos</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {products.map(([name, price]) => (
            <div key={name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, overflow: 'hidden' }}>
              <div style={{ height: 36, background: `linear-gradient(135deg, #F59E0B18, #FF6A6318)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={14} color="#F59E0B" strokeWidth={1.5} />
              </div>
              <div style={{ padding: '5px 7px' }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.70)', fontWeight: 600, marginBottom: 2 }}>{name}</div>
                <div style={{ fontSize: 8, color: '#F59E0B', fontFamily: F_MONO, fontWeight: 700 }}>{price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupApp() {
  return (
    <div style={{ background: '#06030D', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(168,85,247,0.25)', boxShadow: '0 8px 28px rgba(0,0,0,0.45)' }}>
      {/* Browser bar */}
      <div style={{ background: '#100B25', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {['#FF5C5C', '#FFBD2E', '#27C93F'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, marginLeft: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 14, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          <span style={{ fontFamily: F_MONO, fontSize: 8, color: 'rgba(255,255,255,0.38)' }}>app.tusistema.com</span>
        </div>
      </div>
      {/* Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: '54px 1fr' }}>
        {/* Sidebar */}
        <div style={{ background: '#040D1A', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {['#E03877', '#FF6A63', '#27C93F', '#F59E0B'].map((c, i) => (
            <div key={i} style={{ height: 20, borderRadius: 5, background: i === 0 ? `${c}28` : 'rgba(255,255,255,0.04)', border: i === 0 ? `1px solid ${c}45` : '1px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            </div>
          ))}
        </div>
        {/* Content */}
        <div style={{ padding: '10px' }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginBottom: 8 }}>
            {[['847', 'Usuarios', '#E03877'], ['₡2.4M', 'Ingresos', '#27C93F'], ['98%', 'Uptime', '#FF6A63']].map(([v, l, c]) => (
              <div key={l} style={{ padding: '6px 7px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c, fontFamily: F_MONO, marginBottom: 1 }}>{v}</div>
                <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)' }}>{l}</div>
              </div>
            ))}
          </div>
          {/* Chart bars */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '7px 8px' }}>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.40)', fontFamily: F_MONO, marginBottom: 6 }}>ACTIVIDAD · últimos 7 días</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 28 }}>
              {[55, 40, 70, 45, 85, 60, 90].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: i === 6 ? '#E03877' : `rgba(168,85,247,${0.2 + i * 0.06})` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Starfield ─────────────────────────────────────────────────────────────────
function StarDot({ mousePosition, containerRef }) {
  const [pos] = useState({
    top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2, dur: 2 + Math.random() * 3, del: Math.random() * 5,
  });
  const cfg = { stiffness: 100, damping: 15, mass: 0.1 };
  const sx = useSpring(0, cfg);
  const sy = useSpring(0, cfg);

  useEffect(() => {
    if (!containerRef.current || mousePosition.x === null) { sx.set(0); sy.set(0); return; }
    const rect = containerRef.current.getBoundingClientRect();
    const dx = mousePosition.x - (rect.left + parseFloat(pos.left) / 100 * rect.width);
    const dy = mousePosition.y - (rect.top  + parseFloat(pos.top)  / 100 * rect.height);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 600) { const f = (1 - dist / 600) * 0.5; sx.set(dx * f); sy.set(dy * f); }
    else { sx.set(0); sy.set(0); }
  }, [mousePosition, pos, containerRef, sx, sy]);

  return (
    <motion.div
      style={{ position: 'absolute', top: pos.top, left: pos.left, width: pos.size, height: pos.size, borderRadius: '50%', background: TEXT, x: sx, y: sy }}
      initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: pos.dur, repeat: Infinity, delay: pos.del }}
    />
  );
}

function Starfield({ mousePosition, containerRef }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 80 }).map((_, i) => <StarDot key={i} mousePosition={mousePosition} containerRef={containerRef} />)}
    </div>
  );
}

// ── Compact card ──────────────────────────────────────────────────────────────
function CompactCard({ plan, meta, index, onExpand }) {
  const { t }      = useApp();
  const isPopular  = !!plan.popular;
  const accent     = meta.accent;
  const fg         = isPopular ? POPULAR_FG : TEXT;
  const fgMute     = isPopular ? 'rgba(250,250,250,0.70)' : TEXT_S;
  const fgDim      = isPopular ? 'rgba(250,250,250,0.45)' : TEXT_D;

  const [tilt, setTilt]       = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    setTilt({ rx: (py - 0.5) * -14, ry: (px - 0.5) * 14, gx: px * 100, gy: py * 100 });
  };

  return (
    <RevealItem y={40} style={{ height: '100%' }}>
      <motion.div layoutId={`plan-${index}`} onClick={onExpand} style={{ height: '100%', cursor: 'pointer', borderRadius: 22 }}>
        <div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }); }}
          onMouseMove={onMove}
          style={{
            height: '100%', borderRadius: 22,
            transform: (tilt.rx !== 0 || tilt.ry !== 0)
              ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
              : 'none',
            transition: hovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          }}
        >
          {/* Thick gradient border frame */}
          <div style={{
            height: '100%', padding: 2, borderRadius: 22,
            background: hovered
              ? `linear-gradient(145deg, ${accent}, ${accent}88, ${accent}cc)`
              : `linear-gradient(145deg, ${accent}88, ${accent}44, ${accent}66)`,
            boxShadow: hovered
              ? `0 0 0 1px ${accent}40, 0 24px 64px ${accent}40, 0 0 0 4px ${accent}12`
              : `0 0 0 1px ${accent}22, 0 8px 32px ${accent}18`,
            transition: 'background 0.35s, box-shadow 0.35s',
          }}>
            {/* Card body with relief gradient */}
            <div style={{
              height: '100%', borderRadius: 20,
              background: isPopular
                ? `linear-gradient(160deg, #2A0F1E 0%, #061520 35%, #041018 100%)`
                : `linear-gradient(160deg, #061420 0%, #040E18 45%, #020A12 100%)`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.35), inset 1px 0 0 rgba(255,255,255,0.04)`,
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Glare */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0, borderRadius: 20, zIndex: 1, pointerEvents: 'none',
                background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.09) 0%, transparent 55%)`,
              }} />
              {/* Ambient orb */}
              <div aria-hidden style={{
                position: 'absolute', top: '-25%', right: '-10%',
                width: 200, height: 200, borderRadius: '50%',
                background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
                filter: 'blur(35px)', pointerEvents: 'none',
              }} />

              {/* Top accent bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, ${accent}88)`, borderRadius: '20px 20px 0 0', flexShrink: 0 }} />

              {/* Popular badge */}
              {isPopular && (
                <div style={{
                  position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                  background: A, color: '#fff', padding: '5px 14px',
                  fontSize: 10, fontWeight: 700, fontFamily: F_MONO, letterSpacing: '0.14em', textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', gap: 5, zIndex: 4, borderRadius: '0 0 10px 10px',
                }}>
                  <Star size={9} fill="currentColor" /> {t('pricing.popular')}
                </div>
              )}

              {/* Popular blobs */}
              {isPopular && (
                <>
                  <motion.span aria-hidden animate={{ x: [0,25,-15,0], y: [0,-18,18,0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: '15%', right: '-25%', width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(circle, ${A} 0%, transparent 60%)`, filter: 'blur(40px)', opacity: 0.40, pointerEvents: 'none' }} />
                  <motion.span aria-hidden animate={{ x: [0,-20,12,0], y: [0,12,-8,0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', bottom: '8%', left: '-25%', width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle, ${A_D} 0%, transparent 65%)`, filter: 'blur(48px)', opacity: 0.50, pointerEvents: 'none' }} />
                </>
              )}

              <div style={{ padding: 'clamp(26px, 2.6vw, 34px)', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 2, marginTop: isPopular ? 18 : 0 }}>
                {/* Name */}
                <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 400, fontSize: 'clamp(26px, 2.2vw, 32px)', letterSpacing: '-0.02em', color: fg, lineHeight: 1.05 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: fgMute, lineHeight: 1.5, marginTop: 8, marginBottom: 18 }}>{plan.bestFor}</p>

                {/* Timeline */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 18, padding: '5px 11px', borderRadius: 999, background: `${accent}14`, border: `1px solid ${accent}30`, alignSelf: 'flex-start' }}>
                  <Clock size={10} color={accent} strokeWidth={2} />
                  <span style={{ fontFamily: F_MONO, fontSize: 9.5, color: accent, letterSpacing: '0.08em' }}>{plan.timeline}</span>
                </div>

                <div style={{ height: 1, background: isPopular ? 'rgba(255,255,255,0.12)' : BORDER, marginBottom: 16 }} />

                <div style={{ fontFamily: F_MONO, fontSize: 9.5, color: fgDim, letterSpacing: '0.13em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 11 }}>
                  {t('pricing.includes')}
                </div>

                {/* Top 4 features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                  {plan.features.slice(0, 4).map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: 9, fontSize: 13, color: fg, lineHeight: 1.5 }}>
                      <span style={{
                        width: 18, height: 18, flexShrink: 0, marginTop: 1,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: isPopular ? `${A_L}28` : `${accent}14`,
                        color: isPopular ? '#fff' : accent, borderRadius: 999,
                      }}><Check size={10} strokeWidth={3} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li style={{ fontSize: 12, color: fgDim, paddingLeft: 27, fontStyle: 'italic' }}>
                      +{plan.features.length - 4} más al abrir…
                    </li>
                  )}
                </ul>

                {plan.notIncluded && (
                  <p style={{ paddingTop: 13, borderTop: `1px dashed ${isPopular ? 'rgba(255,255,255,0.12)' : BORDER}`, fontSize: 11, color: fgDim, lineHeight: 1.5, fontStyle: 'italic', marginTop: 14 }}>
                    <span style={{ fontFamily: F_MONO, fontStyle: 'normal', fontWeight: 700, fontSize: 9, letterSpacing: '0.08em', marginRight: 5 }}>{t('pricing.notIncluded')}</span>
                    {plan.notIncluded}
                  </p>
                )}

                {/* CTA */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 22, padding: '13px 20px', fontSize: 13, fontWeight: 700,
                  background: isPopular ? '#fff' : accent, color: isPopular ? A : '#fff',
                  border: `1px solid ${isPopular ? '#fff' : accent}`, borderRadius: 10,
                  boxShadow: isPopular ? '0 12px 32px rgba(0,0,0,0.30)' : `0 6px 20px ${accent}40`,
                }}>
                  {plan.cta} <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </RevealItem>
  );
}

// ── Expanded card ─────────────────────────────────────────────────────────────
function ExpandedCard({ plan, meta, detail, index, onClose }) {
  const { t }     = useApp();
  const isPopular = !!plan.popular;
  const accent    = meta.accent;
  const fg        = isPopular ? POPULAR_FG : TEXT;
  const fgMute    = isPopular ? 'rgba(250,250,250,0.68)' : TEXT_S;
  const fgDim     = isPopular ? 'rgba(250,250,250,0.42)' : TEXT_D;
  const Mockup    = detail.Mockup;

  return (
    <motion.div layoutId={`plan-${index}`} style={{ borderRadius: 22, width: '100%' }}>
      {/* Thick gradient border */}
      <div style={{
        padding: 2, borderRadius: 22,
        background: `linear-gradient(145deg, ${accent}, ${accent}99, ${accent}cc)`,
        boxShadow: `0 0 0 4px ${accent}12, 0 32px 100px ${accent}40, 0 0 0 1px ${accent}35`,
      }}>
        <div style={{
          borderRadius: 20,
          background: isPopular
            ? `linear-gradient(160deg, #2A0F1E 0%, #061520 40%, #041018 100%)`
            : `linear-gradient(160deg, #061420 0%, #040E18 45%, #020A12 100%)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.35)`,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Top bar */}
          <div style={{ height: 5, background: `linear-gradient(90deg, ${accent}, ${accent}88)`, borderRadius: '20px 20px 0 0' }} />

          {/* Popular blobs */}
          {isPopular && (
            <>
              <motion.span aria-hidden animate={{ x: [0,35,-20,0], y: [0,-20,22,0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '8%', right: '-15%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${A} 0%, transparent 60%)`, filter: 'blur(55px)', opacity: 0.30, pointerEvents: 'none' }} />
              <motion.span aria-hidden animate={{ x: [0,-28,18,0], y: [0,18,-12,0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: '5%', left: '-15%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${A_D} 0%, transparent 65%)`, filter: 'blur(60px)', opacity: 0.40, pointerEvents: 'none' }} />
            </>
          )}

          {/* Ambient orb */}
          <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${accent}16 0%, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

          {/* Close */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18 }}
            onClick={onClose} aria-label="Cerrar"
            style={{
              position: 'absolute', top: 18, right: 18, zIndex: 10,
              width: 38, height: 38, borderRadius: '50%',
              background: isPopular ? 'rgba(255,255,255,0.09)' : BG_ALT,
              border: `1px solid ${isPopular ? 'rgba(255,255,255,0.16)' : BORDER}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: fg, cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}28`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = isPopular ? 'rgba(255,255,255,0.09)' : BG_ALT; }}
          >
            <X size={16} strokeWidth={2} />
          </motion.button>

          <div style={{ padding: 'clamp(22px, 3vw, 40px)', position: 'relative', zIndex: 2 }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}
            >
              <div>
                {isPopular && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: A, color: '#fff', borderRadius: 999, padding: '4px 11px', fontSize: 9.5, fontWeight: 700, fontFamily: F_MONO, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: 9 }}>
                    <Star size={9} fill="currentColor" /> {t('pricing.popular')}
                  </div>
                )}
                <h2 style={{ fontFamily: F_DISPLAY, fontWeight: 400, fontSize: 'clamp(26px, 3.4vw, 44px)', letterSpacing: '-0.025em', color: fg, lineHeight: 1.0, marginBottom: 6 }}>
                  {plan.name}
                </h2>
                <p style={{ fontSize: 13.5, color: fgMute, lineHeight: 1.5, maxWidth: '50ch' }}>{plan.bestFor}</p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 999, background: `${accent}16`, border: `1px solid ${accent}38`, flexShrink: 0 }}>
                <Clock size={12} color={accent} strokeWidth={2} />
                <span style={{ fontFamily: F_MONO, fontSize: 11, color: accent, letterSpacing: '0.08em', fontWeight: 600 }}>{plan.timeline}</span>
              </div>
            </motion.div>

            <div style={{ height: 1, background: isPopular ? 'rgba(255,255,255,0.10)' : BORDER, marginBottom: 24 }} />

            {/* ── Two-column body ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 'clamp(20px, 3vw, 36px)' }} className="vo-exp-body">

              {/* LEFT — includes in 2-col grid */}
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
                <div style={{ fontFamily: F_MONO, fontSize: 9.5, color: fgDim, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>
                  {t('pricing.includes')}
                </div>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '9px 16px' }}>
                  {detail.includes.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14 + i * 0.025, duration: 0.28 }}
                      style={{ display: 'flex', gap: 8, fontSize: 12.5, color: fg, lineHeight: 1.45 }}
                    >
                      <span style={{
                        width: 16, height: 16, flexShrink: 0, marginTop: 1,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: isPopular ? `${A_L}28` : `${accent}14`,
                        color: isPopular ? '#fff' : accent, borderRadius: 999,
                      }}><Check size={9} strokeWidth={3} /></span>
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </ul>

                {plan.notIncluded && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                    style={{ marginTop: 16, paddingTop: 13, borderTop: `1px dashed ${isPopular ? 'rgba(255,255,255,0.10)' : BORDER}`, fontSize: 11, color: fgDim, lineHeight: 1.5, fontStyle: 'italic' }}
                  >
                    <span style={{ fontFamily: F_MONO, fontStyle: 'normal', fontWeight: 700, fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', marginRight: 5 }}>{t('pricing.notIncluded')}</span>
                    {plan.notIncluded}
                  </motion.p>
                )}
              </motion.div>

              {/* RIGHT — mockup + cases */}
              <motion.div
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                <div>
                  <div style={{ fontFamily: F_MONO, fontSize: 9.5, color: fgDim, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 11 }}>
                    Vista previa
                  </div>
                  <Mockup />
                </div>

                <div>
                  <div style={{ fontFamily: F_MONO, fontSize: 9.5, color: fgDim, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
                    Casos reales
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {detail.examples.map((ex, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.24 + i * 0.06 }}
                        style={{
                          padding: '9px 13px', borderRadius: 9,
                          background: isPopular ? 'rgba(255,255,255,0.06)' : `${accent}08`,
                          border: `1px solid ${isPopular ? 'rgba(255,255,255,0.10)' : `${accent}20`}`,
                        }}
                      >
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: fg, marginBottom: 2 }}>{ex.t}</div>
                        <div style={{ fontSize: 11.5, color: fgMute, lineHeight: 1.45 }}>{ex.d}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
              style={{ marginTop: 26, paddingTop: 20, borderTop: `1px solid ${isPopular ? 'rgba(255,255,255,0.10)' : BORDER}`, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#contacto" onClick={onClose}
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '13px 26px', fontSize: 13, fontWeight: 700,
                  background: isPopular ? '#fff' : accent,
                  color: isPopular ? A : '#fff',
                  border: `1px solid ${isPopular ? '#fff' : accent}`, borderRadius: 10,
                  boxShadow: isPopular ? '0 12px 32px rgba(0,0,0,0.30)' : `0 8px 24px ${accent}45`,
                  textDecoration: 'none',
                }}
              >
                {plan.cta} <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.a>
              <span style={{ fontSize: 12, color: fgDim, lineHeight: 1.5 }}>
                Propuesta detallada en menos de 24 h · Sin compromiso
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 720px) { .vo-exp-body { grid-template-columns: 1fr !important; } }`}</style>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function Pricing() {
  const { t, locale }           = useApp();
  const { PRICING, GUARANTEES } = getContent(locale);
  const [expanded, setExpanded] = useState(null);
  const containerRef            = useRef(null);
  const [mouse, setMouse]       = useState({ x: null, y: null });

  return (
    <section
      id="precios"
      ref={containerRef}
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setMouse({ x: null, y: null })}
      style={{ background: BG_SECTION, padding: `clamp(80px, 12vh, 140px) 0`, position: 'relative', overflow: 'hidden' }}
    >
      <Starfield mousePosition={mouse} containerRef={containerRef} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow={t('pricing.eyebrow')}
          title={<>{t('pricing.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('pricing.title.2')}</span>.</>}
          intro={t('pricing.intro')}
        />

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: expanded !== null ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, alignItems: 'start' }}>
          <AnimatePresence mode="popLayout">
            {PRICING.map((plan, i) => {
              const isExp   = expanded === i;
              const isOther = expanded !== null && !isExp;
              if (isOther) return null;
              if (isExp) {
                return (
                  <ExpandedCard key={i} plan={plan} meta={PLAN_META[i]} detail={PLAN_DETAIL[i]} index={i} onClose={() => setExpanded(null)} />
                );
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.22 } }}
                  transition={{ duration: 0.35, ease: [0.21, 0.61, 0.35, 1] }}
                  style={{ minHeight: 'clamp(520px, 60vh, 640px)' }}
                >
                  <CompactCard plan={plan} meta={PLAN_META[i]} index={i} onExpand={() => setExpanded(i)} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Guarantees */}
        <AnimatePresence>
          {expanded === null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                marginTop: 'clamp(40px, 5vw, 64px)',
                padding: 'clamp(24px, 3vw, 36px)',
                background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24,
              }}
            >
              {GUARANTEES.map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 32, height: 32, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: `${A}12`, border: `1px solid ${A}33`, color: A, borderRadius: 8 }}>
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <span style={{ fontSize: 13, color: TEXT, lineHeight: 1.4 }}>{g.text}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p style={{ fontSize: 13, color: TEXT_D, marginTop: 24, maxWidth: '60ch', lineHeight: 1.6, fontStyle: 'italic' }}>
          {getContent(locale).PRICING_NOTE}
        </p>
      </div>
    </section>
  );
}
