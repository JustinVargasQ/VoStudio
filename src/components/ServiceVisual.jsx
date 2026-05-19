import { A, A_L, A2 } from '../theme';

const PALETTE = {
  bg1: '#EEF2FF',  // light blue tint
  bg2: '#FEF3C7',  // light amber tint
  bg3: '#F0FDF4',  // light green tint
  bg4: '#FCE7F3',  // light pink tint
  bg5: '#F3E8FF',  // light purple tint
  bg6: '#F5F4EF',  // warm beige
};

function Browser({ bg, accent = A }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <rect width="320" height="180" fill={bg} />
      {/* Browser window */}
      <rect x="40" y="32" width="240" height="130" rx="6" fill="#fff" stroke="#0A0A0A" strokeWidth="1.5" />
      <rect x="40" y="32" width="240" height="22" rx="6" fill="#0A0A0A" />
      <circle cx="52" cy="43" r="3" fill="#EF4444" />
      <circle cx="62" cy="43" r="3" fill="#F59E0B" />
      <circle cx="72" cy="43" r="3" fill="#22C55E" />
      <rect x="90" y="38" width="140" height="10" rx="2" fill="#fff" opacity="0.2" />
      {/* Content */}
      <rect x="52" y="66" width="100" height="8" rx="2" fill={accent} />
      <rect x="52" y="80" width="160" height="4" rx="2" fill="#E5E5E5" />
      <rect x="52" y="90" width="140" height="4" rx="2" fill="#E5E5E5" />
      <rect x="52" y="100" width="80" height="4" rx="2" fill="#E5E5E5" />
      <rect x="52" y="118" width="60" height="22" rx="2" fill="#0A0A0A" />
      <rect x="180" y="66" width="84" height="74" rx="3" fill={accent} opacity="0.15" />
      <circle cx="222" cy="103" r="14" fill={accent} opacity="0.5" />
    </svg>
  );
}

function Shop({ bg, accent = A, accent2 = A2 }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <rect width="320" height="180" fill={bg} />
      {/* Product cards */}
      <rect x="40" y="36" width="68" height="86" rx="4" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
      <rect x="44" y="40" width="60" height="46" rx="2" fill={accent} opacity="0.25" />
      <circle cx="74" cy="63" r="14" fill={accent} opacity="0.6" />
      <rect x="44" y="92" width="40" height="5" rx="1" fill="#0A0A0A" />
      <rect x="44" y="102" width="28" height="5" rx="1" fill={accent} />

      <rect x="118" y="50" width="68" height="86" rx="4" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
      <rect x="122" y="54" width="60" height="46" rx="2" fill={accent2} opacity="0.25" />
      <rect x="138" y="68" width="24" height="18" fill={accent2} opacity="0.6" />
      <rect x="122" y="106" width="44" height="5" rx="1" fill="#0A0A0A" />
      <rect x="122" y="116" width="30" height="5" rx="1" fill={accent} />

      <rect x="196" y="36" width="68" height="86" rx="4" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
      <rect x="200" y="40" width="60" height="46" rx="2" fill="#0A0A0A" opacity="0.85" />
      <path d="M218 56 L230 70 L242 56" stroke="#fff" strokeWidth="2" fill="none" />
      <rect x="200" y="92" width="40" height="5" rx="1" fill="#0A0A0A" />
      <rect x="200" y="102" width="28" height="5" rx="1" fill={accent} />

      {/* Cart badge */}
      <circle cx="248" cy="142" r="18" fill={accent} />
      <path d="M240 138 h4 l3 9 h10 l2 -7 h-12" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="246" cy="150" r="1.5" fill="#fff" />
      <circle cx="253" cy="150" r="1.5" fill="#fff" />
    </svg>
  );
}

function Phone({ bg, accent = A }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <rect width="320" height="180" fill={bg} />
      {/* Phone */}
      <rect x="120" y="20" width="80" height="150" rx="12" fill="#0A0A0A" />
      <rect x="124" y="24" width="72" height="142" rx="9" fill="#fff" />
      <rect x="148" y="28" width="24" height="4" rx="2" fill="#0A0A0A" />
      <rect x="130" y="42" width="60" height="10" rx="2" fill={accent} />
      <rect x="130" y="58" width="60" height="36" rx="3" fill={accent} opacity="0.18" />
      <circle cx="160" cy="76" r="9" fill={accent} opacity="0.7" />
      <rect x="130" y="102" width="60" height="5" rx="1" fill="#E5E5E5" />
      <rect x="130" y="112" width="40" height="5" rx="1" fill="#E5E5E5" />
      <rect x="130" y="128" width="28" height="14" rx="2" fill="#0A0A0A" />
      <rect x="162" y="128" width="28" height="14" rx="2" fill={accent} />
      <rect x="148" y="158" width="24" height="3" rx="1.5" fill="#0A0A0A" />
      {/* Floating accent shapes */}
      <circle cx="60" cy="50" r="22" fill={accent} opacity="0.18" />
      <rect x="234" y="92" width="42" height="42" rx="4" fill={accent} opacity="0.2" transform="rotate(12, 255, 113)" />
    </svg>
  );
}

function Dashboard({ bg, accent = A, accent2 = A2 }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <rect width="320" height="180" fill={bg} />
      <rect x="30" y="28" width="260" height="124" rx="6" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
      {/* sidebar */}
      <rect x="30" y="28" width="50" height="124" rx="6" fill="#0A0A0A" />
      <rect x="38" y="40" width="34" height="4" rx="1" fill="#fff" opacity="0.5" />
      <rect x="38" y="54" width="34" height="4" rx="1" fill={accent} />
      <rect x="38" y="68" width="34" height="4" rx="1" fill="#fff" opacity="0.3" />
      <rect x="38" y="82" width="34" height="4" rx="1" fill="#fff" opacity="0.3" />
      {/* stats */}
      <rect x="90" y="40" width="58" height="32" rx="3" fill={accent} opacity="0.15" />
      <rect x="94" y="46" width="22" height="4" rx="1" fill="#0A0A0A" />
      <rect x="94" y="56" width="40" height="10" rx="1" fill={accent} />
      <rect x="156" y="40" width="58" height="32" rx="3" fill={accent2} opacity="0.18" />
      <rect x="160" y="46" width="22" height="4" rx="1" fill="#0A0A0A" />
      <rect x="160" y="56" width="40" height="10" rx="1" fill={accent2} />
      <rect x="222" y="40" width="58" height="32" rx="3" fill="#22C55E" opacity="0.18" />
      <rect x="226" y="46" width="22" height="4" rx="1" fill="#0A0A0A" />
      <rect x="226" y="56" width="40" height="10" rx="1" fill="#15803D" />
      {/* chart */}
      <rect x="90" y="82" width="190" height="60" rx="3" fill="#FAFAFA" />
      <polyline points="98,128 120,108 142,116 164,96 186,104 208,86 230,92 252,76 274,82" fill="none" stroke={accent} strokeWidth="2" />
      <polyline points="98,134 120,128 142,124 164,118 186,120 208,110 230,114 252,102 274,108" fill="none" stroke={accent2} strokeWidth="2" strokeDasharray="3 2" />
    </svg>
  );
}

function Seo({ bg, accent = A, accent2 = A2 }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <rect width="320" height="180" fill={bg} />
      {/* Search results card */}
      <rect x="30" y="34" width="180" height="116" rx="6" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
      <rect x="42" y="48" width="100" height="10" rx="2" fill={accent} />
      <rect x="42" y="64" width="156" height="4" rx="1" fill="#E5E5E5" />
      <rect x="42" y="74" width="140" height="4" rx="1" fill="#E5E5E5" />
      <rect x="42" y="90" width="156" height="1" fill="#E5E5E5" />
      <rect x="42" y="100" width="80" height="8" rx="2" fill="#0A0A0A" />
      <rect x="42" y="114" width="140" height="4" rx="1" fill="#E5E5E5" />
      <rect x="42" y="124" width="120" height="4" rx="1" fill="#E5E5E5" />

      {/* Magnifying glass + chart */}
      <circle cx="252" cy="68" r="32" fill="none" stroke="#0A0A0A" strokeWidth="3" />
      <line x1="276" y1="92" x2="296" y2="112" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="252" cy="68" r="22" fill={accent} opacity="0.18" />
      <polyline points="236,76 246,68 256,72 268,58" stroke={accent} strokeWidth="2.5" fill="none" />
      <circle cx="268" cy="58" r="2.5" fill={accent} />

      {/* Trending arrow */}
      <path d="M226 130 L240 118 L252 124 L272 108" stroke={accent2} strokeWidth="2.5" fill="none" />
      <path d="M266 108 L272 108 L272 114" stroke={accent2} strokeWidth="2.5" fill="none" />
    </svg>
  );
}

function Shield({ bg, accent = A }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <rect width="320" height="180" fill={bg} />
      {/* Concentric rings */}
      <circle cx="160" cy="90" r="68" fill="none" stroke={accent} strokeWidth="1" opacity="0.2" />
      <circle cx="160" cy="90" r="50" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
      <circle cx="160" cy="90" r="32" fill={accent} opacity="0.12" />
      {/* Shield */}
      <path d="M160 38 L200 52 L200 90 Q200 124 160 144 Q120 124 120 90 L120 52 Z"
        fill="#fff" stroke="#0A0A0A" strokeWidth="1.5" />
      <path d="M160 38 L200 52 L200 90 Q200 124 160 144 Q120 124 120 90 L120 52 Z"
        fill={accent} opacity="0.1" />
      <path d="M140 88 L155 102 L182 76" stroke={accent} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkles */}
      <g fill={accent} opacity="0.6">
        <circle cx="56" cy="40" r="2.5" />
        <circle cx="276" cy="48" r="3" />
        <circle cx="48" cy="138" r="2" />
        <circle cx="286" cy="134" r="2.5" />
      </g>
    </svg>
  );
}

const VISUALS = [
  { Comp: Browser,   bg: PALETTE.bg1 },
  { Comp: Shop,      bg: PALETTE.bg2 },
  { Comp: Phone,     bg: PALETTE.bg3 },
  { Comp: Dashboard, bg: PALETTE.bg5 },
  { Comp: Seo,       bg: PALETTE.bg4 },
  { Comp: Shield,    bg: PALETTE.bg6 },
];

export function ServiceVisual({ index = 0 }) {
  const { Comp, bg } = VISUALS[index % VISUALS.length];
  return <Comp bg={bg} />;
}
