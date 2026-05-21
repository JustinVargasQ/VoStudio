import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ──────────────────────────────────────────────────────────────────────────
   AmbientBackground — global living layer
   - Cursor-following soft spotlight (overlay blend, glows over any section)
   - Drifting particles with mouse parallax (multiply blend, visible globally)
   - Pointer-events: none. Disabled on touch / prefers-reduced-motion.
   ────────────────────────────────────────────────────────────────────────── */

const PARTICLE_COUNT = 24;

// Pseudo-random but deterministic seed so layout is stable
function seedRandom(seed, n) {
  return (Math.sin(seed * (n + 1) * 7919) + 1) / 2;
}

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const r = (n) => seedRandom(i, n);
  return {
    id: i,
    x: r(1) * 100,
    y: r(2) * 100,
    size: 3 + r(3) * 5,
    depth: 0.3 + r(4) * 1.2,
    delay: r(5) * 4,
    duration: 10 + r(6) * 12,
    drift: 20 + r(7) * 40,
    isAmber: r(8) > 0.78,
  };
});

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    setCoarse(mq.matches);
  }, []);
  return coarse;
}

/* One particle — outer span handles parallax, inner span handles drift.
   Splitting them avoids x/y conflicts between style motion-values and animate keyframes. */
function Particle({ p, shiftX, shiftY }) {
  const px = useTransform(shiftX, (v) => v * p.depth);
  const py = useTransform(shiftY, (v) => v * p.depth);
  // v5 — particles: was amber/terracotta. Now magenta vs. violet.
  const color = p.isAmber ? '225, 77, 255' : '138, 70, 255';

  return (
    <motion.span
      aria-hidden
      style={{
        position: 'absolute',
        left: `${p.x}%`, top: `${p.y}%`,
        width: p.size, height: p.size,
        x: px, y: py,
        pointerEvents: 'none',
      }}
    >
      <motion.span
        style={{
          display: 'block',
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${color},0.85), rgba(${color},0) 70%)`,
        }}
        animate={{
          y: [0, -p.drift, 0],
          x: [0, p.drift / 2, 0],
          opacity: [0.25, 0.9, 0.25],
          scale: [0.85, 1.25, 0.85],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          repeatType: 'loop',
          delay: p.delay,
          ease: 'easeInOut',
        }}
      />
    </motion.span>
  );
}

export function AmbientBackground() {
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 70, damping: 25, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 25, mass: 0.6 });

  // Spotlight position (% based) — hook at top level
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);
  // v5 — spotlight glow: was rgba(234,88,12) terracotta. Now violet.
  const spotBg = useTransform(
    [spotX, spotY],
    ([x, y]) => `radial-gradient(500px circle at ${x} ${y}, rgba(138, 70, 255, 0.55), transparent 65%)`
  );

  // Parallax shift (pixels)
  const shiftX = useTransform(sx, (v) => (v - 0.5) * 50);
  const shiftY = useTransform(sy, (v) => (v - 0.5) * 50);

  useEffect(() => {
    if (reduced || coarse) return;
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reduced, coarse]);

  if (reduced) return null;

  return (
    <>
      {/* Particles — `screen` blend lights up violet/magenta dust on the cosmic
          dark bg and still reads as soft glow on the lavender light bg. */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 9997,
        overflow: 'hidden',
        mixBlendMode: 'screen',
      }}>
        {PARTICLES.map((p) => (
          <Particle key={p.id} p={p} shiftX={shiftX} shiftY={shiftY} />
        ))}
      </div>

      {/* Cursor spotlight — overlay blend creates "lighting" effect over any bg */}
      {!coarse && (
        <motion.div
          aria-hidden
          style={{
            position: 'fixed', inset: 0,
            pointerEvents: 'none',
            zIndex: 9998,
            mixBlendMode: 'overlay',
            opacity: 0.6,
            background: spotBg,
            transition: 'opacity 0.3s',
          }}
        />
      )}
    </>
  );
}
