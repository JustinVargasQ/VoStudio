import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────────────────────────────────
   HeroVisual — Isometric tech scene
   Laptop + phone + floating UI cards + orbiting tech badges + particles.
   Pure SVG + framer-motion. ~6KB.
   ────────────────────────────────────────────────────────────────────────── */

const CODE_LINES = [
  { c: '#C792EA', t: 'const' }, { c: '#82AAFF', t: ' studio' }, { c: '#89DDFF', t: ' = ' }, { c: '#FFCB6B', t: '{' },
];
const CODE_BLOCK = [
  [ ['#C792EA','import'], ['#89DDFF',' { '], ['#82AAFF','build'], ['#89DDFF', ' } '], ['#C792EA','from'], ['#C3E88D',' "studio"'] ],
  [ ['#C792EA','export'], ['#C792EA',' const'], ['#82AAFF',' Hero'], ['#89DDFF',' = '], ['#FFCB6B','()'], ['#89DDFF',' =>'] ],
  [ ['#89DDFF','  <'], ['#F07178','section'], ['#FFCB6B',' className'], ['#89DDFF','='], ['#C3E88D','"hero"'], ['#89DDFF','>'] ],
  [ ['#89DDFF','    <'], ['#F07178','Headline'], ['#89DDFF',' />'] ],
  [ ['#89DDFF','  </'], ['#F07178','section'], ['#89DDFF','>'] ],
];

const TECH_BADGES = [
  { t: 'React',   c: '#E03877', angle:   0 },
  { t: 'Node.js', c: '#15803D', angle:  60 },
  { t: 'Vite',    c: '#A21CAF', angle: 120 },
  { t: 'TS',      c: '#E03877', angle: 180 },
  { t: 'Mongo',   c: '#15803D', angle: 240 },
  { t: 'Tailwind',c: '#0E7490', angle: 300 },
];

function CodeLine({ tokens, y, delay }) {
  // Animates a "typing" reveal by growing a clip mask
  return (
    <motion.g
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 0.6 + delay, duration: 0.3 }}
    >
      <text x="0" y={y} fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="500">
        {tokens.map(([c, t], i) => {
          let prev = tokens.slice(0, i).reduce((acc, [, txt]) => acc + txt.length, 0);
          return <tspan key={i} fill={c} x={prev * 4.2} dy={i === 0 ? 0 : 0}>{t}</tspan>;
        })}
      </text>
    </motion.g>
  );
}

export function HeroVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 580, marginInline: 'auto' }}>
      {/* Soft glow backdrop */}
      <div style={{
        position: 'absolute', inset: '5%',
        background: 'radial-gradient(circle at 50% 55%, rgba(224,56,119,0.25), transparent 60%)',
        filter: 'blur(50px)',
      }} />

      <svg viewBox="0 0 580 580" width="100%" height="100%" style={{ position: 'relative', overflow: 'visible' }}>
        <defs>
          {/* Laptop gradients */}
          <linearGradient id="screenBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
          <linearGradient id="screenTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="laptopBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
          <linearGradient id="laptopSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>

          {/* Phone gradients */}
          <linearGradient id="phoneFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E03877" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="10" result="off" />
            <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Code typing mask — grows width over time */}
          <clipPath id="typeMask">
            <motion.rect
              x="0" y="0" height="100"
              initial={{ width: 0 }}
              animate={{ width: [0, 160, 160] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', times: [0, 0.7, 1] }}
            />
          </clipPath>
        </defs>

        {/* ── Isometric grid floor ─────────────────────────────────────── */}
        <g opacity="0.15" stroke="#0A0A0A" strokeWidth="0.5">
          {[0,1,2,3,4,5].map(i => (
            <line key={`h${i}`} x1={60 + i*30} y1={460} x2={520 - i*30} y2={460 + i*8} />
          ))}
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <line key={`v${i}`} x1={80 + i*45} y1={460} x2={80 + i*45 - 20} y2={500} />
          ))}
        </g>

        {/* ── Orbiting tech badges (behind central scene) ──────────────── */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '290px 310px' }}
        >
          {TECH_BADGES.map((b, i) => {
            const rad = (b.angle * Math.PI) / 180;
            const cx = 290 + Math.cos(rad) * 240;
            const cy = 310 + Math.sin(rad) * 80;
            return (
              <motion.g key={i}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <g filter="url(#dropShadow)">
                  <rect x={cx - 38} y={cy - 14} width="76" height="28" rx="14" fill="#fff" stroke={b.c} strokeWidth="1.5" />
                  <circle cx={cx - 24} cy={cy} r="5" fill={b.c} />
                  <text x={cx - 12} y={cy + 3.5} fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="600" fill="#0A0A0A">{b.t}</text>
                </g>
              </motion.g>
            );
          })}
        </motion.g>

        {/* ── Floating UI card 1: Button preview (top-left) ────────────── */}
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <g filter="url(#dropShadow)" transform="translate(40, 90) rotate(-6)">
            <rect width="130" height="68" rx="6" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
            <text x="10" y="18" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#6B7280" fontWeight="600">BUTTON</text>
            <rect x="10" y="26" width="78" height="28" rx="3" fill="#E03877" />
            <text x="22" y="44" fontFamily="Inter, sans-serif" fontSize="9" fill="#fff" fontWeight="600">Empezar →</text>
            <circle cx="116" cy="38" r="4" fill="#22C55E" />
          </g>
        </motion.g>

        {/* ── Floating UI card 2: Color palette (top-right) ────────────── */}
        <motion.g
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <g filter="url(#dropShadow)" transform="translate(420, 70) rotate(8)">
            <rect width="120" height="80" rx="6" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
            <text x="10" y="18" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#6B7280" fontWeight="600">PALETTE</text>
            <rect x="10"  y="26" width="22" height="22" rx="3" fill="#0A0A0A" />
            <rect x="36"  y="26" width="22" height="22" rx="3" fill="#E03877" />
            <rect x="62"  y="26" width="22" height="22" rx="3" fill="#FF6A63" />
            <rect x="88"  y="26" width="22" height="22" rx="3" fill="#15803D" />
            <rect x="10"  y="56" width="100" height="3" rx="1.5" fill="#E5E7EB" />
            <rect x="10"  y="64" width="64" height="3" rx="1.5" fill="#E5E7EB" />
          </g>
        </motion.g>

        {/* ── Floating UI card 3: Chart (right side) ────────────────────── */}
        <motion.g
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <g filter="url(#dropShadow)" transform="translate(440, 360) rotate(-5)">
            <rect width="120" height="90" rx="6" fill="#fff" stroke="#0A0A0A" strokeWidth="1.2" />
            <text x="10" y="18" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#6B7280" fontWeight="600">METRICS</text>
            <text x="10" y="38" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="22" fill="#E03877" fontWeight="400">+48%</text>
            <polyline points="10,76 26,68 42,72 58,58 74,62 90,48 106,52" fill="none" stroke="#E03877" strokeWidth="1.5" />
            <polyline points="10,82 26,78 42,80 58,72 74,76 90,68 106,72" fill="none" stroke="#FF6A63" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
        </motion.g>

        {/* ── Floating mini "spec" card (bottom-left) ──────────────────── */}
        <motion.g
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <g filter="url(#dropShadow)" transform="translate(30, 380) rotate(4)">
            <rect width="100" height="60" rx="6" fill="#0A0A0A" />
            <text x="10" y="18" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#9CA3AF" fontWeight="600">DEPLOY</text>
            <circle cx="14" cy="34" r="3" fill="#22C55E" />
            <text x="22" y="37" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#22C55E" fontWeight="600">success</text>
            <text x="10" y="52" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#6B7280">vercel · 1.2s</text>
          </g>
        </motion.g>

        {/* ── Central scene: Laptop + Phone (isometric) ────────────────── */}
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* LAPTOP — base + screen in isometric */}
          <g filter="url(#dropShadow)">
            {/* Base (keyboard plane — parallelogram) */}
            <polygon points="120,400 380,400 420,440 80,440" fill="url(#laptopBase)" stroke="#0A0A0A" strokeWidth="1" />
            <polygon points="80,440 420,440 420,452 80,452" fill="url(#laptopSide)" stroke="#0A0A0A" strokeWidth="1" />
            {/* Trackpad */}
            <rect x="190" y="412" width="120" height="18" rx="2" fill="#9CA3AF" opacity="0.6" />

            {/* Screen back (lid back, slight darker) */}
            <polygon points="120,400 380,400 380,200 120,200" fill="#1F2937" stroke="#0A0A0A" strokeWidth="1" />
            {/* Screen front */}
            <polygon points="128,395 372,395 372,208 128,208" fill="url(#screenBg)" />

            {/* Screen top bar (window controls) */}
            <rect x="128" y="208" width="244" height="18" fill="url(#screenTop)" />
            <circle cx="140" cy="217" r="3" fill="#EF4444" />
            <circle cx="150" cy="217" r="3" fill="#FF6A63" />
            <circle cx="160" cy="217" r="3" fill="#22C55E" />
            <text x="240" y="220" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="#6B7280" textAnchor="middle">hero.jsx</text>

            {/* Code editor area */}
            <g transform="translate(140, 234)" fontFamily="'JetBrains Mono', monospace">
              {/* Line numbers */}
              {[1,2,3,4,5,6,7,8].map(n => (
                <text key={n} x="0" y={n * 14 - 4} fontSize="7" fill="#4B5563" fontWeight="400">{n}</text>
              ))}
              {/* Code lines */}
              <g transform="translate(14, 0)">
                <CodeLine y={10} delay={0}    tokens={CODE_BLOCK[0]} />
                <CodeLine y={24} delay={0.3}  tokens={CODE_BLOCK[1]} />
                <CodeLine y={38} delay={0.6}  tokens={CODE_BLOCK[2]} />
                <CodeLine y={52} delay={0.9}  tokens={CODE_BLOCK[3]} />
                <CodeLine y={66} delay={1.2}  tokens={CODE_BLOCK[4]} />
                {/* Blinking cursor on last line */}
                <motion.rect
                  x="20" y={72} width="5" height="9" fill="#82AAFF"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </g>
            </g>

            {/* Glow on screen */}
            <rect x="128" y="208" width="244" height="187" fill="url(#screenBg)" opacity="0" />
          </g>

          {/* PHONE — to the right of laptop, isometric */}
          <g filter="url(#dropShadow)" transform="translate(0,0)">
            {/* Phone body */}
            <rect x="420" y="280" width="80" height="140" rx="10" fill="#0A0A0A" />
            <rect x="424" y="284" width="72" height="132" rx="7" fill="url(#phoneFace)" />
            {/* Notch */}
            <rect x="448" y="288" width="24" height="4" rx="2" fill="#0A0A0A" />
            {/* App UI */}
            <text x="432" y="310" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(255,255,255,0.6)" fontWeight="600">VO · APP</text>
            <text x="432" y="334" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="18" fill="#fff">Hola.</text>
            <rect x="432" y="346" width="56" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
            <rect x="432" y="354" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
            {/* Cards in app */}
            <rect x="432" y="366" width="56" height="20" rx="3" fill="rgba(255,255,255,0.12)" />
            <rect x="436" y="370" width="20" height="3" rx="1.5" fill="#fff" />
            <rect x="436" y="377" width="36" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
            {/* CTA button */}
            <rect x="432" y="394" width="56" height="14" rx="3" fill="#FF6A63" />
            <text x="460" y="404" fontFamily="Inter, sans-serif" fontSize="7" fill="#0A0A0A" fontWeight="700" textAnchor="middle">Empezar</text>
          </g>
        </motion.g>

        {/* ── Connection lines — animated pulses laptop↔phone ──────────── */}
        <motion.g
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1="380" y1="330" x2="420" y2="340" stroke="#E03877" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="380" cy="330" r="3" fill="#E03877" />
          <circle cx="420" cy="340" r="3" fill="#E03877" />
        </motion.g>

        {/* Travelling data dot */}
        <motion.circle
          r="4" fill="#FF6A63"
          animate={{ cx: [380, 420, 380], cy: [330, 340, 330] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Particle dust ─────────────────────────────────────────────── */}
        <g fill="#E03877">
          {[
            { cx: 70, cy: 130, d: 0, t: 3 },
            { cx: 540, cy: 180, d: 0.5, t: 3.5 },
            { cx: 50, cy: 260, d: 1, t: 4 },
            { cx: 540, cy: 320, d: 1.5, t: 3.2 },
            { cx: 100, cy: 520, d: 0.8, t: 3.7 },
            { cx: 500, cy: 510, d: 1.3, t: 4.2 },
          ].map((p, i) => (
            <motion.circle key={i} cx={p.cx} cy={p.cy} r="2"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: p.t, repeat: Infinity, delay: p.d, ease: 'easeInOut' }} />
          ))}
        </g>

        {/* ── Cursor pointer (decorative) ───────────────────────────────── */}
        <motion.g
          animate={{ x: [0, 14, 0, -8, 0], y: [0, 8, 16, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          transform="translate(310, 280)"
        >
          <path d="M0 0 L0 18 L5 14 L9 22 L12 21 L8 13 L14 12 Z" fill="#fff" stroke="#0A0A0A" strokeWidth="1" />
        </motion.g>
      </svg>
    </div>
  );
}
