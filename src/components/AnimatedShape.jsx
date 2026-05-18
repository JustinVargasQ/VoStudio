/**
 * Pure CSS/SVG animated shapes — replacement for per-card Three.js.
 * Looks like 3D but renders at 60fps on any device with zero WebGL cost.
 */

function Glow({ color, opacity = 0.45 }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${color}${Math.round(opacity*255).toString(16).padStart(2,'0')}, transparent 60%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }}
    />
  );
}

function Sphere({ color }) {
  return (
    <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Glow color={color} />
      {/* Main sphere */}
      <div
        style={{
          width: 130, height: 130, borderRadius: '50%',
          background: `radial-gradient(circle at 32% 32%, #ffffff80 0%, ${color} 35%, ${color}40 75%, transparent 100%)`,
          boxShadow: `0 0 60px ${color}80, inset -20px -25px 50px ${color}30, inset 12px 12px 24px #ffffff20`,
          animation: 'shape-pulse 4s ease-in-out infinite',
          position: 'relative',
        }}
      />
      {/* Orbiting ring */}
      <div
        style={{
          position: 'absolute', inset: 0,
          border: `1.5px dashed ${color}50`,
          borderRadius: '50%',
          animation: 'shape-spin 12s linear infinite',
          transform: 'rotateX(72deg)',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 12,
          border: `1px solid ${color}30`,
          borderRadius: '50%',
          animation: 'shape-spin-rev 18s linear infinite',
          transform: 'rotateY(70deg) rotateZ(20deg)',
        }}
      />
    </div>
  );
}

function Torus({ color }) {
  return (
    <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d', perspective: 600 }}>
      <Glow color={color} />
      <div style={{ animation: 'torus-rotate 7s linear infinite', transformStyle: 'preserve-3d' }}>
        <div
          style={{
            width: 130, height: 130, borderRadius: '50%',
            border: `20px solid ${color}`,
            boxShadow: `0 0 50px ${color}70, inset 0 0 20px ${color}90, 0 14px 0 -2px ${color}25`,
            background: 'transparent',
            transform: 'rotateX(60deg)',
          }}
        />
      </div>
    </div>
  );
}

function Polygon({ color, sides = 6 }) {
  const points = [];
  const cx = 50, cy = 50, r = 42;
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
    points.push(`${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`);
  }
  return (
    <div style={{ position: 'relative', width: 170, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Glow color={color} />
      <svg
        viewBox="0 0 100 100"
        style={{ width: 140, height: 140, animation: 'shape-spin 14s linear infinite', filter: `drop-shadow(0 0 20px ${color}80)` }}
      >
        <defs>
          <linearGradient id={`gradPoly-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="40%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <polygon
          points={points.join(' ')}
          fill={`url(#gradPoly-${color})`}
          stroke={color}
          strokeWidth="0.5"
        />
        <polygon
          points={points.join(' ')}
          fill="none"
          stroke={`${color}80`}
          strokeWidth="0.6"
          transform="rotate(30 50 50) scale(0.7) translate(21 21)"
        />
      </svg>
    </div>
  );
}

function Diamond({ color }) {
  return (
    <div style={{ position: 'relative', width: 170, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Glow color={color} />
      <svg
        viewBox="0 0 100 100"
        style={{ width: 130, height: 140, animation: 'shape-float 6s ease-in-out infinite', filter: `drop-shadow(0 0 22px ${color}80)` }}
      >
        <defs>
          <linearGradient id={`gradD-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: '50px 50px', animation: 'shape-spin 10s linear infinite' }}>
          <polygon points="50,8 86,50 50,92 14,50" fill={`url(#gradD-${color})`} stroke={color} strokeWidth="0.8" />
          <polygon points="50,8 50,92" stroke={`${color}60`} strokeWidth="0.5" />
          <polygon points="14,50 86,50" stroke={`${color}60`} strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Pyramid({ color }) {
  return (
    <div style={{ position: 'relative', width: 170, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Glow color={color} />
      <svg
        viewBox="0 0 100 100"
        style={{ width: 140, height: 140, animation: 'shape-spin 11s linear infinite', filter: `drop-shadow(0 0 22px ${color}80)` }}
      >
        <defs>
          <linearGradient id={`gradPy-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`gradPy2-${color}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <polygon points="50,10 12,85 88,85" fill={`url(#gradPy-${color})`} stroke={color} strokeWidth="0.8" />
        <polygon points="50,10 50,85 88,85" fill={`url(#gradPy2-${color})`} opacity="0.5" />
      </svg>
    </div>
  );
}

function Cone({ color }) {
  return (
    <div style={{ position: 'relative', width: 170, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Glow color={color} />
      <svg
        viewBox="0 0 100 100"
        style={{ width: 130, height: 150, animation: 'shape-spin 9s linear infinite', filter: `drop-shadow(0 0 22px ${color}80)` }}
      >
        <defs>
          <linearGradient id={`gradC-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="40%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id={`gradEll-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <polygon points="50,12 18,80 82,80" fill={`url(#gradC-${color})`} stroke={color} strokeWidth="0.8" />
        <ellipse cx="50" cy="80" rx="32" ry="8" fill={`url(#gradEll-${color})`} stroke={color} strokeWidth="0.6" />
      </svg>
    </div>
  );
}

export function AnimatedShape({ shape = 'sphere', color = '#EA6113' }) {
  let element;
  switch (shape) {
    case 'torus':        element = <Torus color={color} />;        break;
    case 'icosahedron':  element = <Polygon color={color} sides={6} />; break;
    case 'octahedron':   element = <Diamond color={color} />;      break;
    case 'tetrahedron':  element = <Pyramid color={color} />;      break;
    case 'cone':         element = <Cone color={color} />;         break;
    case 'sphere':
    default:             element = <Sphere color={color} />;       break;
  }
  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {element}
    </div>
  );
}
