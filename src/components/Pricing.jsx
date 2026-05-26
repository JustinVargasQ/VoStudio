import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Check, Star, X, ArrowUpRight, Clock, Monitor, ShoppingBag, LayoutDashboard, Gauge, Heart, Users, BarChart3, Settings, Layers, FileText, Search, Plus } from 'lucide-react';
import {
  BG, BG_ALT, BG_SECTION, BG_CARD, BG_POPULAR, POPULAR_FG, POPULAR_BORDER,
  TEXT, TEXT_S, TEXT_D, BORDER, A, A_L, A_D, A2, F_DISPLAY, F_MONO, MAX_W, PAD_X,
} from '../theme';
import { getContent } from '../data/content';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import { RevealItem } from './Reveal';

// ── Plan metadata (paleta v7 — sin amarillo/naranja) ──────────────────────────
// Landing = rosa principal, Sitio = lila, E-commerce = coral, App = rosa profundo
const PLAN_META = [
  { accent: '#FF5C9A', glow: '#FF5C9A44' },  // rosa fuerte
  { accent: '#B79CFF', glow: '#B79CFF44' },  // lila suave (popular)
  { accent: '#FF6A63', glow: '#FF6A6344' },  // coral
  { accent: '#E03877', glow: '#E0387744' },  // rosa profundo
];

// ── Mockup mapping (per plan index — content i18n lives in content.js) ──────
const PLAN_MOCKUPS = [MockupLanding, MockupSitio, MockupEcommerce, MockupApp];

// ── Browser frame (shared header) ────────────────────────────────────────────
function BrowserFrame({ url, children, borderColor = 'rgba(255,92,154,0.22)', rightSlot = null }) {
  return (
    <div style={{
      background: '#06030D', borderRadius: 10, overflow: 'hidden',
      border: `1px solid ${borderColor}`,
      boxShadow: '0 12px 32px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.02)',
    }}>
      <div style={{ background: '#1B1030', padding: '7px 11px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {['#FF5C5C', '#FFBD2E', '#27C93F'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}55` }} />)}
        <div style={{ flex: 1, marginLeft: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
          <span style={{ fontFamily: F_MONO, fontSize: 8.5, color: 'rgba(255,255,255,0.45)' }}>{url}</span>
          {rightSlot}
        </div>
      </div>
      {children}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// INTERACTIVE MOCKUPS — every one updates on a timer or on user click/hover
// ═════════════════════════════════════════════════════════════════════════════

// ── Mockup 1: LANDING — rotating headlines + animated CTA + interactive feats ─
function MockupLanding() {
  const { t } = useApp();
  const headlines = [
    t('mockup.landing.headline1'),
    t('mockup.landing.headline2'),
    t('mockup.landing.headline3'),
  ];
  const [hIndex, setHIndex] = useState(0);
  const [activeFeat, setActiveFeat] = useState(0);

  useEffect(() => {
    const headTimer = setInterval(() => setHIndex(i => (i + 1) % headlines.length), 3400);
    const featTimer = setInterval(() => setActiveFeat(i => (i + 1) % 3), 2200);
    return () => { clearInterval(headTimer); clearInterval(featTimer); };
  }, [headlines.length]);

  const FEATS = [
    { c: '#FF5C9A', l: t('mockup.landing.feat.fast') },
    { c: '#B79CFF', l: t('mockup.landing.feat.secure') },
    { c: '#FF6A63', l: t('mockup.landing.feat.mobile') },
  ];

  return (
    <BrowserFrame url={t('mockup.url.landing')} borderColor="rgba(255,92,154,0.30)">
      {/* Top nav */}
      <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,92,154,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ width: 14, height: 14, borderRadius: 4, background: 'linear-gradient(135deg, #FF5C9A, #B79CFF)' }} />
          <div style={{ width: 28, height: 6, borderRadius: 2, background: 'rgba(255,255,255,0.85)' }} />
        </div>
        <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
          {[t('mockup.nav.home'), t('mockup.nav.services'), t('mockup.nav.contact')].map(l => (
            <span key={l} style={{ fontSize: 8, color: 'rgba(255,255,255,0.50)' }}>{l}</span>
          ))}
          <motion.div whileHover={{ scale: 1.06 }}
            style={{ padding: '3px 9px', background: 'linear-gradient(135deg, #FF5C9A, #E03877)', borderRadius: 4, boxShadow: '0 2px 8px rgba(255,92,154,0.45)' }}>
            <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>{t('mockup.cta.contact')}</span>
          </motion.div>
        </div>
      </div>
      {/* Hero with rotating headline */}
      <div style={{ padding: '18px 14px 16px', background: 'linear-gradient(135deg, #06030D 0%, #1B1030 60%, #2A0F1E 100%)', position: 'relative', overflow: 'hidden', minHeight: 110 }}>
        <motion.div aria-hidden animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity }}
          style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,92,154,0.35), transparent 70%)', filter: 'blur(20px)' }} />
        <motion.div aria-hidden animate={{ scale: [1.1, 1, 1.1], opacity: [1, 0.7, 1] }} transition={{ duration: 6, repeat: Infinity }}
          style={{ position: 'absolute', bottom: -20, left: -20, width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle, rgba(183,156,255,0.35), transparent 70%)', filter: 'blur(20px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={hIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 4, lineHeight: 1.2, minHeight: 28 }}
            >
              {headlines[hIndex]}
            </motion.div>
          </AnimatePresence>
          <div style={{ width: '60%', height: 4, borderRadius: 2, background: 'linear-gradient(90deg, #FF5C9A, #B79CFF)', marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 7 }}>
            <motion.div animate={{ boxShadow: ['0 4px 12px rgba(255,92,154,0.40)', '0 6px 22px rgba(255,92,154,0.70)', '0 4px 12px rgba(255,92,154,0.40)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ padding: '6px 15px', background: 'linear-gradient(135deg, #FF5C9A, #B79CFF)', borderRadius: 5 }}>
              <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>{t('mockup.cta.start')}</span>
            </motion.div>
            <div style={{ padding: '6px 15px', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 5 }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)' }}>{t('mockup.cta.more')}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Features strip — active one highlighted */}
      <div style={{ padding: '11px 14px 13px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
        {FEATS.map(({ c, l }, i) => {
          const isActive = activeFeat === i;
          return (
            <motion.div key={l}
              animate={{ scale: isActive ? 1.05 : 1, y: isActive ? -2 : 0 }}
              transition={{ duration: 0.35 }}
              onMouseEnter={() => setActiveFeat(i)}
              style={{
                padding: '8px 9px',
                background: isActive ? `${c}25` : `${c}10`,
                border: `1px solid ${isActive ? c + '70' : c + '28'}`,
                borderRadius: 7,
                boxShadow: isActive ? `0 6px 18px ${c}40` : 'none',
                cursor: 'pointer',
                transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
              }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: `linear-gradient(135deg, ${c}, ${c}aa)`, marginBottom: 6, boxShadow: `0 2px 8px ${c}50` }} />
              <div style={{ fontSize: 8.5, color: isActive ? '#fff' : 'rgba(255,255,255,0.82)', fontWeight: 600, marginBottom: 3 }}>{l}</div>
              <div style={{ width: isActive ? '95%' : '85%', height: 3, borderRadius: 2, background: `${c}55`, transition: 'width 0.4s' }} />
              <div style={{ width: isActive ? '70%' : '50%', height: 3, borderRadius: 2, background: `${c}30`, marginTop: 2, transition: 'width 0.4s' }} />
            </motion.div>
          );
        })}
      </div>
    </BrowserFrame>
  );
}

// ── Mockup 2: SITIO COMPLETO — CMS with cycling active page + live counter ───
function MockupSitio() {
  const { t } = useApp();
  const ACCENT = '#B79CFF';
  const pages = [
    { name: t('mockup.cms.page.home'),    status: 'online' },
    { name: t('mockup.cms.page.about'),   status: 'online' },
    { name: t('mockup.cms.page.svc'),     status: 'online' },
    { name: t('mockup.cms.page.blog'),    status: 'draft'  },
    { name: t('mockup.cms.page.contact'), status: 'online' },
  ];
  const [activeMenu, setActiveMenu]   = useState(0);
  const [savedAgo, setSavedAgo]       = useState(2);
  const [activePage, setActivePage]   = useState(null);

  useEffect(() => {
    const sav = setInterval(() => setSavedAgo(s => s >= 60 ? 1 : s + 1), 1000);
    const men = setInterval(() => setActiveMenu(i => (i + 1) % 4), 3200);
    const pag = setInterval(() => setActivePage(i => i === null ? 0 : (i + 1) % pages.length), 1800);
    return () => { clearInterval(sav); clearInterval(men); clearInterval(pag); };
  }, [pages.length]);

  const MENU = [
    { Icon: FileText, color: ACCENT },
    { Icon: Layers,   color: '#FF5C9A' },
    { Icon: Users,    color: '#FF6A63' },
    { Icon: Settings, color: '#E03877' },
  ];

  return (
    <BrowserFrame url={t('mockup.url.cms')} borderColor="rgba(183,156,255,0.30)">
      <div style={{ display: 'grid', gridTemplateColumns: '58px 1fr', minHeight: 200 }}>
        {/* Sidebar */}
        <div style={{ background: '#0F0820', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '11px 7px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #FF5C9A, #B79CFF)', alignSelf: 'center', marginBottom: 4, boxShadow: '0 4px 10px rgba(255,92,154,0.35)' }} />
          {MENU.map(({ Icon, color }, i) => {
            const active = activeMenu === i;
            return (
              <motion.div key={i}
                animate={{ scale: active ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActiveMenu(i)}
                style={{
                  width: '100%', height: 22, borderRadius: 6,
                  background: active ? `${color}22` : 'transparent',
                  border: active ? `1px solid ${color}55` : '1px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? `0 0 12px ${color}45` : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
                }}>
                <Icon size={11} color={active ? color : 'rgba(255,255,255,0.40)'} strokeWidth={2} />
              </motion.div>
            );
          })}
        </div>
        {/* Content */}
        <div style={{ padding: '12px', background: 'linear-gradient(180deg, #06030D 0%, #0A0518 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO, letterSpacing: '0.10em', fontWeight: 700 }}>
              {t('mockup.cms.eyebrow')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO }}>
                {t('mockup.cms.saved')} {savedAgo}s
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 7px', borderRadius: 4, background: `${ACCENT}18`, border: `1px solid ${ACCENT}38` }}>
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
                <span style={{ fontSize: 7.5, color: ACCENT, fontFamily: F_MONO, fontWeight: 700 }}>CMS</span>
              </div>
            </div>
          </div>
          {pages.map(({ name, status }, i) => {
            const isOnline = status === 'online';
            const c = isOnline ? '#27C93F' : '#FFBD2E';
            const isHL = activePage === i;
            return (
              <motion.div key={name}
                animate={{ x: isHL ? 4 : 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActivePage(i)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '6px 10px', marginBottom: 4,
                  background: isHL ? `${ACCENT}20` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isHL ? ACCENT + '50' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 6, cursor: 'pointer',
                  transition: 'background 0.25s, border 0.25s',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileText size={9} color={isHL ? ACCENT : 'rgba(255,255,255,0.50)'} strokeWidth={2} />
                  <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{name}</span>
                </div>
                <span style={{ fontSize: 7, color: c, fontFamily: F_MONO, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <motion.span animate={{ opacity: isOnline ? [1, 0.45, 1] : 1 }} transition={{ duration: 1.6, repeat: Infinity }}
                    style={{ width: 4, height: 4, borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}` }} />
                  {isOnline ? t('mockup.cms.online').replace('● ', '') : t('mockup.cms.draft').replace('● ', '')}
                </span>
              </motion.div>
            );
          })}
          <motion.div animate={{ boxShadow: [`0 4px 12px ${ACCENT}20`, `0 6px 22px ${ACCENT}55`, `0 4px 12px ${ACCENT}20`] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{ marginTop: 8, padding: '7px 10px', background: `linear-gradient(135deg, ${ACCENT}22, #FF5C9A18)`, border: `1px solid ${ACCENT}48`, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={10} color={ACCENT} strokeWidth={2.5} />
            <span style={{ fontSize: 8, color: '#fff', fontFamily: F_MONO, fontWeight: 600 }}>{t('mockup.cms.newEntry')}</span>
          </motion.div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── Mockup 3: E-COMMERCE — clickable products, live cart count, floating +1 ──
function MockupEcommerce() {
  const { t } = useApp();
  const ACCENT = '#FF6A63';
  const products = [
    { name: `${t('mockup.shop.product')} A`, price: 24900, color: '#FF5C9A' },
    { name: `${t('mockup.shop.product')} B`, price: 18500, color: '#B79CFF' },
    { name: `${t('mockup.shop.product')} C`, price: 32000, color: '#FF6A63' },
    { name: `${t('mockup.shop.product')} D`, price: 12800, color: '#E03877' },
  ];
  const [cart, setCart]         = useState({ items: 3, total: 64200 });
  const [pop, setPop]           = useState(null);   // index of last-added product (for +1 toast)
  const [filter, setFilter]     = useState(0);

  const addToCart = (i) => {
    setCart(c => ({ items: c.items + 1, total: c.total + products[i].price }));
    setPop(i);
    setTimeout(() => setPop(null), 900);
  };

  const fmtPrice = (n) => `₡${n.toLocaleString('es-CR').replace(/,/g, ' ')}`;

  return (
    <BrowserFrame
      url={t('mockup.url.shop')}
      borderColor="rgba(255,106,99,0.30)"
      rightSlot={
        <motion.span key={cart.items}
          initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 480, damping: 20 }}
          style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 8.5, color: ACCENT, fontWeight: 700 }}>
          <ShoppingBag size={9} strokeWidth={2.5} /> {cart.items}
        </motion.span>
      }
    >
      {/* Filter strip + live total */}
      <div style={{ padding: '8px 12px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {[t('mockup.shop.all'), 'Skincare', 'Makeup'].map((l, i) => (
            <span key={l} onClick={() => setFilter(i)}
              style={{
                padding: '2px 8px', borderRadius: 99, cursor: 'pointer',
                background: filter === i ? `${ACCENT}30` : 'rgba(255,255,255,0.04)',
                border: filter === i ? `1px solid ${ACCENT}60` : '1px solid rgba(255,255,255,0.07)',
                fontSize: 7.5, color: filter === i ? ACCENT : 'rgba(255,255,255,0.55)', fontWeight: 600,
                transition: 'background 0.25s, color 0.25s, border 0.25s',
              }}>{l}</span>
          ))}
        </div>
        <motion.span key={cart.total}
          initial={{ scale: 1.15, color: ACCENT }} animate={{ scale: 1, color: 'rgba(255,255,255,0.7)' }}
          transition={{ duration: 0.45 }}
          style={{ fontSize: 8, fontFamily: F_MONO, fontWeight: 700 }}>
          {fmtPrice(cart.total)}
        </motion.span>
      </div>
      {/* Product grid */}
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 7 }}>
          {products.map(({ name, price, color }, i) => (
            <motion.div key={name}
              whileHover={{ y: -3, boxShadow: `0 10px 24px ${color}40` }}
              whileTap={{ scale: 0.96 }}
              onClick={() => addToCart(i)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                position: 'relative',
              }}>
              <AnimatePresence>
                {pop === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -22, scale: 1 }}
                    exit={{ opacity: 0, y: -34 }}
                    transition={{ duration: 0.6 }}
                    style={{ position: 'absolute', top: 18, right: 6, zIndex: 5, padding: '2px 7px', borderRadius: 99, background: `linear-gradient(135deg, ${color}, ${color}cc)`, fontSize: 8, color: '#fff', fontWeight: 800, fontFamily: F_MONO, pointerEvents: 'none', boxShadow: `0 4px 12px ${color}60` }}>
                    +1
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{
                height: 42,
                background: `linear-gradient(135deg, ${color}30, ${color}15 70%, transparent)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <Heart size={9} style={{ position: 'absolute', top: 4, right: 4 }} color="rgba(255,255,255,0.40)" strokeWidth={2} />
                <ShoppingBag size={16} color={color} strokeWidth={1.8} />
              </div>
              <div style={{ padding: '6px 8px' }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.78)', fontWeight: 600, marginBottom: 3 }}>{name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 8.5, color: color, fontFamily: F_MONO, fontWeight: 700 }}>{fmtPrice(price)}</span>
                  <span style={{ padding: '1.5px 6px', background: `${color}28`, borderRadius: 99, fontSize: 6.5, color: color, fontWeight: 700, fontFamily: F_MONO, textTransform: 'uppercase' }}>
                    + {t('mockup.shop.addCart')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── Mockup 4: APP/SISTEMA — animated chart + counting KPIs + live dot ────────
function MockupApp() {
  const { t } = useApp();
  const ACCENT = '#E03877';

  // Chart bars change every 2.5s
  const [bars, setBars] = useState([55, 40, 70, 45, 85, 60, 95]);
  // KPI values count up subtly
  const [users, setUsers] = useState(847);
  const [activeMenu, setActiveMenu] = useState(0);

  useEffect(() => {
    const barT = setInterval(() => {
      setBars(prev => prev.map(() => 30 + Math.round(Math.random() * 70)));
    }, 2500);
    const usrT = setInterval(() => {
      setUsers(u => u + (1 + Math.round(Math.random() * 3)));
    }, 1800);
    const menT = setInterval(() => setActiveMenu(i => (i + 1) % 4), 3400);
    return () => { clearInterval(barT); clearInterval(usrT); clearInterval(menT); };
  }, []);

  const MENU = [
    { Icon: BarChart3, color: ACCENT },
    { Icon: Users,     color: '#FF6A63' },
    { Icon: FileText,  color: '#B79CFF' },
    { Icon: Settings,  color: '#FF5C9A' },
  ];

  const KPIS = [
    { v: users.toString(),                                l: t('mockup.app.kpi.users'),   c: '#FF5C9A', trend: '+12%' },
    { v: `₡${(2.4).toFixed(1)}M`,                         l: t('mockup.app.kpi.revenue'), c: '#B79CFF', trend: '+8%'  },
    { v: '98%',                                           l: t('mockup.app.kpi.uptime'),  c: '#FF6A63', trend: '✓'    },
  ];

  return (
    <BrowserFrame url={t('mockup.url.app')} borderColor="rgba(224,56,119,0.30)">
      <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', minHeight: 200 }}>
        {/* Sidebar */}
        <div style={{ background: '#0F0820', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '11px 6px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: 'linear-gradient(135deg, #E03877, #FF5C9A)', alignSelf: 'center', marginBottom: 3, boxShadow: '0 4px 10px rgba(224,56,119,0.40)' }} />
          {MENU.map(({ Icon, color }, i) => {
            const active = activeMenu === i;
            return (
              <motion.div key={i}
                animate={{ scale: active ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActiveMenu(i)}
                style={{
                  height: 22, borderRadius: 6,
                  background: active ? `${color}22` : 'transparent',
                  border: active ? `1px solid ${color}55` : '1px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? `0 0 12px ${color}45` : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
                }}>
                <Icon size={11} color={active ? color : 'rgba(255,255,255,0.40)'} strokeWidth={2} />
              </motion.div>
            );
          })}
        </div>
        {/* Content */}
        <div style={{ padding: '11px 12px', background: 'linear-gradient(180deg, #06030D 0%, #0A0518 100%)' }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginBottom: 9 }}>
            {KPIS.map(({ v, l, c, trend }) => (
              <div key={l} style={{
                padding: '7px 8px',
                background: `linear-gradient(135deg, ${c}15, transparent)`,
                border: `1px solid ${c}35`, borderRadius: 7,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 2 }}>
                  <motion.div key={v}
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                    style={{ fontSize: 10.5, fontWeight: 700, color: c, fontFamily: F_MONO }}>{v}</motion.div>
                  <span style={{ fontSize: 6.5, color: '#27C93F', fontFamily: F_MONO, fontWeight: 700 }}>{trend}</span>
                </div>
                <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.55)' }}>{l}</div>
              </div>
            ))}
          </div>
          {/* Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 7, padding: '8px 9px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.50)', fontFamily: F_MONO, fontWeight: 600 }}>{t('mockup.app.chart.title')}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#27C93F', boxShadow: '0 0 6px #27C93F' }} />
                <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.60)' }}>{t('mockup.app.live')}</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 36 }}>
              {bars.map((h, i) => (
                <motion.div key={i}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    flex: 1, borderRadius: '3px 3px 0 0',
                    background: i === bars.length - 1
                      ? `linear-gradient(180deg, ${ACCENT}, #FF5C9A)`
                      : `linear-gradient(180deg, rgba(255,92,154,${0.18 + i * 0.05}), rgba(183,156,255,${0.10 + i * 0.04}))`,
                    boxShadow: i === bars.length - 1 ? `0 0 10px ${ACCENT}80` : 'none',
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
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
                ? `linear-gradient(160deg, #2A0F1E 0%, #15082E 35%, #0A0518 100%)`
                : `linear-gradient(160deg, #1B1030 0%, #0F0820 45%, #06030D 100%)`,
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
                      +{plan.features.length - 4} {t('pricing.morePlus')}…
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
  const Mockup    = PLAN_MOCKUPS[index];

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
            ? `linear-gradient(160deg, #2A0F1E 0%, #15082E 40%, #0A0518 100%)`
            : `linear-gradient(160deg, #1B1030 0%, #0F0820 45%, #06030D 100%)`,
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
                    {t('pricing.preview')}
                  </div>
                  <Mockup />
                </div>

                <div>
                  <div style={{ fontFamily: F_MONO, fontSize: 9.5, color: fgDim, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
                    {t('pricing.realCases')}
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
                {t('pricing.detailNote')}
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
  const { t, locale }                          = useApp();
  const { PRICING, GUARANTEES, PRICING_DETAIL } = getContent(locale);
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
                  <ExpandedCard key={i} plan={plan} meta={PLAN_META[i]} detail={PRICING_DETAIL[i]} index={i} onClose={() => setExpanded(null)} />
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
