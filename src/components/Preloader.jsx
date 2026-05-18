import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { VO, VO_LIGHT } from '../data/content';

export function Preloader({ onDone }) {
  const root = useRef(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    // Counter animation — kept short
    const obj = { v: 0 };
    gsap.to(obj, {
      v: 100,
      duration: 1.1,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.floor(obj.v)),
    });

    const tl = gsap.timeline({ delay: 0.05 });

    tl.fromTo('.pre-v, .pre-o',
        { yPercent: 130, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.55, ease: 'power4.out' }
      )
      .fromTo('.pre-s,.pre-t,.pre-u,.pre-d,.pre-i,.pre-o2',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.035, duration: 0.5, ease: 'power4.out' },
        '-=0.25'
      )
      .fromTo('.pre-bar',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: 'power2.out' },
        '-=0.35'
      )
      .to('.pre-content', { y: -30, opacity: 0, duration: 0.35, ease: 'power3.in' }, '+=0.1')
      .to('.pre-mask', {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete: onDone,
      }, '-=0.1');
  }, { scope: root });

  const fs = 'clamp(56px,10vw,120px)';
  const fw = 800;
  const ff = 'Syne,sans-serif';

  return (
    <div ref={root} style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none' }}>
      <div
        className="pre-mask"
        style={{
          position: 'absolute', inset: 0,
          background: '#050505',
          clipPath: 'inset(0% 0% 0% 0%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Subtle background glow */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${VO}18 0%, transparent 60%)`, pointerEvents: 'none' }} />

        <div className="pre-content" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ overflow: 'hidden', lineHeight: 1, marginBottom: 6 }}>
            <span className="pre-v" style={{ display: 'inline-block', fontFamily: ff, fontWeight: fw, fontSize: fs, color: '#fff', letterSpacing: '-0.03em', opacity: 0 }}>V</span>
            <span className="pre-o" style={{ display: 'inline-block', fontFamily: ff, fontWeight: fw, fontSize: fs, color: '#fff', letterSpacing: '-0.03em', opacity: 0 }}>O</span>
          </div>
          <div style={{ overflow: 'hidden', lineHeight: 1, marginBottom: 32 }}>
            {'STUDIO'.split('').map((l, i) => (
              <span key={i} className={`pre-${['s','t','u','d','i','o2'][i]}`}
                style={{ display: 'inline-block', fontFamily: ff, fontWeight: fw, fontSize: fs, letterSpacing: '-0.03em', opacity: 0, background: `linear-gradient(135deg,${VO},${VO_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {l}
              </span>
            ))}
          </div>

          {/* Loading bar */}
          <div style={{ width: 280, maxWidth: '60vw', margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative', borderRadius: 1, overflow: 'hidden' }}>
            <div className="pre-bar" style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${VO}, ${VO_LIGHT})`, transformOrigin: 'left', transform: 'scaleX(0)', boxShadow: `0 0 12px ${VO}` }} />
          </div>

          {/* Counter + label row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 280, maxWidth: '60vw', margin: '14px auto 0', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            <span>Cargando</span>
            <span style={{ color: VO, fontFamily: ff, fontSize: 12 }}>{String(count).padStart(3, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
