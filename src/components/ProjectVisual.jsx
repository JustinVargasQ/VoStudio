import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

/* Stylized SVG previews — one per project. */

function JDStore({ t }) {
  return (
    <svg viewBox="0 0 600 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="jdBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor="#FDF2F8" />
          <stop offset="100%" stopColor="#FCE7F3" />
        </linearGradient>
        <linearGradient id="jdProd1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="jdProd2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FECACA" />
          <stop offset="100%" stopColor="#F87171" />
        </linearGradient>
        <linearGradient id="jdProd3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="jdShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="6" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="600" height="400" fill="url(#jdBg)" />

      {/* Browser window */}
      <g filter="url(#jdShadow)">
        <rect x="60" y="40" width="480" height="320" rx="8" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
        {/* Browser top bar */}
        <rect x="60" y="40" width="480" height="32" rx="8" fill="#0A0A0A" />
        <rect x="60" y="60" width="480" height="12" fill="#0A0A0A" />
        <circle cx="76"  cy="56" r="4" fill="#EF4444" />
        <circle cx="90"  cy="56" r="4" fill="#F59E0B" />
        <circle cx="104" cy="56" r="4" fill="#22C55E" />
        <rect x="160" y="50" width="280" height="12" rx="2" fill="rgba(255,255,255,0.15)" />
        <text x="172" y="59" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(255,255,255,0.7)">jd-virtual.vercel.app</text>

        {/* Header */}
        <g transform="translate(80, 90)">
          <text x="0" y="14" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="22" fill="#0A0A0A">JD Virtual</text>
          {/* Nav */}
          <text x="180" y="14" fontFamily="Inter, sans-serif" fontSize="9" fill="#525252">{t('mock.jd.nav.home')}</text>
          <text x="216" y="14" fontFamily="Inter, sans-serif" fontSize="9" fill="#525252">{t('mock.jd.nav.products')}</text>
          <text x="270" y="14" fontFamily="Inter, sans-serif" fontSize="9" fill="#525252">{t('mock.jd.nav.contact')}</text>
          {/* Cart */}
          <g transform="translate(420, 0)">
            <rect x="0" y="0" width="40" height="20" rx="10" fill="#0A0A0A" />
            <circle cx="9" cy="10" r="1.5" fill="#fff" />
            <circle cx="14" cy="10" r="1.5" fill="#fff" />
            <text x="22" y="13" fontFamily="Inter, sans-serif" fontSize="8" fill="#fff" fontWeight="600">3</text>
          </g>
        </g>

        {/* Hero promo */}
        <g transform="translate(80, 130)">
          <rect width="440" height="64" rx="4" fill="#F472B6" opacity="0.15" />
          <text x="20" y="28" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="18" fill="#0A0A0A">{t('mock.jd.hero.title')}</text>
          <text x="20" y="46" fontFamily="Inter, sans-serif" fontSize="9" fill="#525252">{t('mock.jd.hero.sub')}</text>
          <rect x="20" y="50" width="62" height="6" rx="1" fill="transparent" />
          <rect x="340" y="14" width="80" height="36" rx="2" fill="#0A0A0A" />
          <text x="380" y="36" fontFamily="Inter, sans-serif" fontSize="8" fill="#fff" fontWeight="700" textAnchor="middle">{t('mock.jd.hero.cta')}</text>
        </g>

        {/* Product grid */}
        <g transform="translate(80, 210)">
          {/* Product 1 */}
          <g>
            <rect width="140" height="130" rx="4" fill="#fff" stroke="#E5E5E5" strokeWidth="1" />
            <rect x="6" y="6" width="128" height="78" rx="3" fill="url(#jdProd1)" />
            <circle cx="48" cy="48" r="18" fill="#fff" opacity="0.6" />
            <ellipse cx="70" cy="50" rx="10" ry="20" fill="#fff" opacity="0.5" />
            <rect x="6" y="92" width="80" height="6" rx="1" fill="#0A0A0A" />
            <rect x="6" y="104" width="60" height="4" rx="1" fill="#A3A3A3" />
            <text x="6" y="124" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="13" fill="#0A0A0A">₡8.500</text>
            <rect x="100" y="114" width="34" height="14" rx="2" fill="#22C55E" />
            <text x="117" y="124" fontFamily="Inter, sans-serif" fontSize="7" fill="#fff" fontWeight="700" textAnchor="middle">+</text>
          </g>
          {/* Product 2 */}
          <g transform="translate(150, 0)">
            <rect width="140" height="130" rx="4" fill="#fff" stroke="#E5E5E5" strokeWidth="1" />
            <rect x="6" y="6" width="128" height="78" rx="3" fill="url(#jdProd2)" />
            <rect x="50" y="22" width="40" height="50" rx="3" fill="#fff" opacity="0.55" />
            <rect x="58" y="32" width="24" height="3" rx="1" fill="#fff" />
            <rect x="6" y="92" width="100" height="6" rx="1" fill="#0A0A0A" />
            <rect x="6" y="104" width="70" height="4" rx="1" fill="#A3A3A3" />
            <text x="6" y="124" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="13" fill="#0A0A0A">₡12.900</text>
            <rect x="100" y="114" width="34" height="14" rx="2" fill="#22C55E" />
            <text x="117" y="124" fontFamily="Inter, sans-serif" fontSize="7" fill="#fff" fontWeight="700" textAnchor="middle">+</text>
          </g>
          {/* Product 3 */}
          <g transform="translate(300, 0)">
            <rect width="140" height="130" rx="4" fill="#fff" stroke="#E5E5E5" strokeWidth="1" />
            <rect x="6" y="6" width="128" height="78" rx="3" fill="url(#jdProd3)" />
            <circle cx="70" cy="44" r="22" fill="#fff" opacity="0.6" />
            <rect x="6" y="92" width="70" height="6" rx="1" fill="#0A0A0A" />
            <rect x="6" y="104" width="56" height="4" rx="1" fill="#A3A3A3" />
            <text x="6" y="124" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="13" fill="#0A0A0A">₡6.200</text>
            <rect x="92" y="100" width="42" height="14" rx="2" fill="#F59E0B" />
            <text x="113" y="110" fontFamily="Inter, sans-serif" fontSize="6" fill="#fff" fontWeight="700" textAnchor="middle">-20%</text>
            <rect x="100" y="114" width="34" height="14" rx="2" fill="#22C55E" />
            <text x="117" y="124" fontFamily="Inter, sans-serif" fontSize="7" fill="#fff" fontWeight="700" textAnchor="middle">+</text>
          </g>
        </g>
      </g>

      {/* Floating WhatsApp button */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <g filter="url(#jdShadow)">
          <circle cx="510" cy="330" r="22" fill="#22C55E" />
          <path d="M504 330 Q504 322 510 322 Q516 322 516 330 Q516 333 514 335 L515 339 L511 337 Q510 338 510 338 Q504 338 504 330z"
            fill="#fff" />
        </g>
      </motion.g>
    </svg>
  );
}

function UtnMaps({ t }) {
  return (
    <svg viewBox="0 0 600 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="utnBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
        <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#6EE7B7" />
        </linearGradient>
        <filter id="utnShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="10" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="600" height="400" fill="url(#utnBg)" />

      {/* Background map context (faded, behind phone) */}
      <g opacity="0.25">
        <rect x="0" y="60" width="600" height="280" fill="#6EE7B7" opacity="0.3" />
        {/* Roads */}
        <path d="M 0 200 Q 200 180 600 220" stroke="#fff" strokeWidth="14" fill="none" />
        <path d="M 0 200 Q 200 180 600 220" stroke="#FBBF24" strokeWidth="2" fill="none" strokeDasharray="6 6" />
        <path d="M 200 0 L 240 400" stroke="#fff" strokeWidth="10" fill="none" />
        {/* Buildings */}
        <rect x="80"  y="240" width="60" height="50" fill="#E5E7EB" />
        <rect x="430" y="100" width="80" height="60" fill="#E5E7EB" />
        <rect x="500" y="280" width="50" height="60" fill="#E5E7EB" />
        {/* Pins */}
        <circle cx="120" cy="250" r="6" fill="#EF4444" />
        <circle cx="120" cy="250" r="14" fill="#EF4444" opacity="0.25" />
        <circle cx="450" cy="130" r="6" fill="#EA580C" />
        <circle cx="450" cy="130" r="14" fill="#EA580C" opacity="0.25" />
      </g>

      {/* Phone — center */}
      <g filter="url(#utnShadow)" transform="translate(220, 30)">
        {/* Body */}
        <rect width="170" height="340" rx="22" fill="#0A0A0A" />
        <rect x="5" y="5" width="160" height="330" rx="18" fill="#fff" />
        {/* Notch */}
        <rect x="60" y="10" width="50" height="6" rx="3" fill="#0A0A0A" />
        {/* Status bar */}
        <text x="18" y="30" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#0A0A0A" fontWeight="600">9:41</text>
        <g transform="translate(140, 22)" fill="#0A0A0A">
          <rect x="0" y="0"  width="3" height="6" rx="0.5" />
          <rect x="4" y="-1" width="3" height="7" rx="0.5" />
          <rect x="8" y="-2" width="3" height="8" rx="0.5" />
        </g>

        {/* Header */}
        <g transform="translate(14, 44)">
          <text x="0" y="10" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="18" fill="#0A0A0A">UTN Maps</text>
          <text x="0" y="24" fontFamily="Inter, sans-serif" fontSize="7" fill="#525252">{t('mock.utn.subtitle')}</text>
        </g>

        {/* Search input */}
        <g transform="translate(14, 80)">
          <rect width="142" height="26" rx="13" fill="#F5F4EF" stroke="#E5E5E5" strokeWidth="1" />
          <circle cx="12" cy="13" r="4" fill="none" stroke="#525252" strokeWidth="1.2" />
          <line x1="15" y1="16" x2="18" y2="19" stroke="#525252" strokeWidth="1.2" />
          <text x="24" y="16" fontFamily="Inter, sans-serif" fontSize="7" fill="#A3A3A3">{t('mock.utn.search')}</text>
        </g>

        {/* Map area */}
        <g transform="translate(14, 116)">
          <rect width="142" height="160" rx="6" fill="url(#mapBg)" />
          {/* Roads on phone */}
          <path d="M 0 80 Q 70 60 142 100" stroke="#fff" strokeWidth="5" fill="none" />
          <path d="M 0 80 Q 70 60 142 100" stroke="#FBBF24" strokeWidth="1" fill="none" strokeDasharray="3 3" />
          <path d="M 50 0 L 60 160" stroke="#fff" strokeWidth="4" fill="none" />
          {/* Buildings */}
          <rect x="10"  y="100" width="26" height="20" fill="#fff" opacity="0.85" />
          <rect x="80"  y="30"  width="30" height="24" fill="#fff" opacity="0.85" />
          <rect x="100" y="110" width="22" height="30" fill="#fff" opacity="0.85" />

          {/* Active route */}
          <path d="M 22 110 Q 50 80 90 42" stroke="#EA580C" strokeWidth="2.5" fill="none" />

          {/* Pin destination */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            transform="translate(95, 36)"
          >
            <circle r="11" fill="#EA580C" opacity="0.25" />
            <path d="M0 -10 A 7 7 0 1 1 -0.1 -10 Z" fill="#EA580C" />
            <path d="M -5 -4 L 5 -4 L 0 6 Z" fill="#EA580C" />
            <circle cy="-7" r="2.5" fill="#fff" />
          </motion.g>
          {/* Pin origin */}
          <g transform="translate(22, 110)">
            <circle r="5" fill="#fff" stroke="#EA580C" strokeWidth="2" />
            <circle r="2" fill="#EA580C" />
          </g>
        </g>

        {/* Bottom result card */}
        <g transform="translate(14, 286)">
          <rect width="142" height="40" rx="6" fill="#fff" stroke="#E5E5E5" strokeWidth="1" />
          <rect x="8" y="8" width="24" height="24" rx="4" fill="#FFF7ED" />
          <text x="14" y="24" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="12" fill="#EA580C">A</text>
          <text x="38" y="18" fontFamily="Inter, sans-serif" fontSize="8" fill="#0A0A0A" fontWeight="600">{t('mock.utn.building')}</text>
          <text x="38" y="28" fontFamily="Inter, sans-serif" fontSize="6" fill="#525252">2 min · 180 m</text>
          <rect x="106" y="12" width="28" height="16" rx="8" fill="#EA580C" />
          <text x="120" y="22" fontFamily="Inter, sans-serif" fontSize="6" fill="#fff" fontWeight="700" textAnchor="middle">→</text>
        </g>
      </g>

      {/* Floating side info card 1 */}
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <g filter="url(#utnShadow)" transform="translate(40, 80) rotate(-4)">
          <rect width="140" height="56" rx="6" fill="#fff" />
          <rect x="10" y="10" width="22" height="22" rx="11" fill="#EA580C" />
          <path d="M16 21 L20 25 L28 17" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <text x="40" y="22" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#0A0A0A">{t('mock.utn.points')}</text>
          <text x="40" y="34" fontFamily="Inter, sans-serif" fontSize="7" fill="#525252">{t('mock.utn.points.sub')}</text>
          <rect x="10" y="42" width="120" height="3" rx="1.5" fill="#E5E7EB" />
        </g>
      </motion.g>

      {/* Floating side info card 2 */}
      <motion.g
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <g filter="url(#utnShadow)" transform="translate(420, 250) rotate(5)">
          <rect width="140" height="60" rx="6" fill="#0A0A0A" />
          <text x="10" y="20" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#A3A3A3" fontWeight="600">{t('mock.utn.offline')}</text>
          <text x="10" y="38" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="16" fill="#fff">{t('mock.utn.offline.t')}</text>
          <text x="10" y="51" fontFamily="Inter, sans-serif" fontSize="7" fill="#A3A3A3">{t('mock.utn.offline.s')}</text>
        </g>
      </motion.g>
    </svg>
  );
}

const VISUALS = [JDStore, UtnMaps];

export function ProjectVisual({ index = 0 }) {
  const { t } = useApp();
  const Comp = VISUALS[index % VISUALS.length] || VISUALS[0];
  return <Comp t={t} />;
}
