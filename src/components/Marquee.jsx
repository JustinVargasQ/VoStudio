import { BG_ALT, TEXT, TEXT_S, BORDER, BG_CARD, F_MONO } from '../theme';
import { useApp } from '../context/AppContext';
import { TECH } from './TechLogos';

const STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB',
  'PostgreSQL', 'Tailwind', 'Vite', 'React Native', 'Figma',
  'Cloudinary', 'Express',
];

function Pill({ name }) {
  const entry = TECH[name];
  if (!entry) return null;
  const { Logo } = entry;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '10px 18px',
      background: BG_CARD,
      border: `1px solid ${BORDER}`,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <Logo size={20} />
      <span style={{
        fontFamily: F_MONO, fontSize: 13, color: TEXT, fontWeight: 500, letterSpacing: '0.02em',
      }}>
        {name}
      </span>
    </span>
  );
}

export function Marquee() {
  const { t } = useApp();
  const items = [...STACK, ...STACK];
  return (
    <section style={{
      background: BG_ALT,
      borderTop: `1px solid ${BORDER}`,
      borderBottom: `1px solid ${BORDER}`,
      padding: '40px 0 44px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        textAlign: 'center', marginBottom: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
      }}>
        <span style={{ width: 28, height: 1, background: TEXT_S, opacity: 0.4 }} />
        <span style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT_S }}>
          {t('common.builtWith')}
        </span>
        <span style={{ width: 28, height: 1, background: TEXT_S, opacity: 0.4 }} />
      </div>

      <div style={{
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}>
        <div className="marquee-slow" style={{
          display: 'flex', gap: 14, whiteSpace: 'nowrap',
          width: 'max-content', alignItems: 'center',
        }}>
          {items.map((tech, i) => <Pill key={i} name={tech} />)}
        </div>
      </div>
    </section>
  );
}
