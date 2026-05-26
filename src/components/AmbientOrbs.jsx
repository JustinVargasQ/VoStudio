/**
 * AmbientOrbs — 3 drifting, blurred radial gradients that live behind the
 * entire site, animated via CSS keyframes (orb-drift-a/b/c in index.css).
 *
 * Respects `prefers-reduced-motion`: when reduced motion is on, orbs stay
 * statically positioned (still tinting the bg) but don't drift.
 *
 * Pointer-events: none. Sits behind all content (z-index: 0) but ABOVE the
 * body background, so the bg tone still cascades through where the orbs
 * are transparent.
 */

import { useEffect, useState } from 'react';

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

export function AmbientOrbs() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0,
    }}>
      {/* Orb A — rosa fuerte, top-left drift */}
      <span
        className={reduced ? undefined : 'vo-orb-amb a'}
        style={{
          position: 'absolute',
          top:  '-12%',
          left: '-10%',
          width: '46vw',
          height: '46vw',
          maxWidth: 720, maxHeight: 720,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 92, 154, 0.45) 0%, rgba(255, 92, 154, 0) 65%)',
          filter: 'blur(80px)',
          opacity: 0.85,
          willChange: 'transform',
        }}
      />
      {/* Orb B — lila suave, bottom-right drift */}
      <span
        className={reduced ? undefined : 'vo-orb-amb b'}
        style={{
          position: 'absolute',
          bottom: '-15%',
          right:  '-10%',
          width:  '50vw',
          height: '50vw',
          maxWidth: 780, maxHeight: 780,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(183, 156, 255, 0.45) 0%, rgba(183, 156, 255, 0) 65%)',
          filter: 'blur(90px)',
          opacity: 0.8,
          willChange: 'transform',
        }}
      />
      {/* Orb C — coral pop, mid-right, faster + smaller */}
      <span
        className={reduced ? undefined : 'vo-orb-amb c'}
        style={{
          position: 'absolute',
          top:  '38%',
          right: '12%',
          width:  '24vw',
          height: '24vw',
          maxWidth: 380, maxHeight: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 106, 99, 0.45) 0%, rgba(255, 106, 99, 0) 65%)',
          filter: 'blur(70px)',
          opacity: 0.6,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
