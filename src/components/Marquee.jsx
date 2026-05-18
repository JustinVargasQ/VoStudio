import { STACK, VO } from '../data/content';

function Track({ items, reverse = false, speed = 25 }) {
  const arr = [...items, ...items, ...items];
  return (
    <div
      className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
      style={{ display: 'flex', gap: 56, width: 'max-content', animationDuration: `${speed}s` }}
    >
      {arr.map((t, i) => (
        <span key={i} style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Syne,sans-serif' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: VO, display: 'inline-block', flexShrink: 0, boxShadow: `0 0 8px ${VO}` }} />
          {t}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#080808' }}>
      <div style={{ overflow: 'hidden', padding: '14px 0' }}>
        <Track items={STACK} speed={28} />
      </div>
      <div style={{ overflow: 'hidden', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Track items={[...STACK].reverse()} reverse speed={36} />
      </div>
      {/* Edge fades */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg, #080808, transparent)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, background: 'linear-gradient(-90deg, #080808, transparent)', pointerEvents: 'none', zIndex: 2 }} />
    </div>
  );
}
