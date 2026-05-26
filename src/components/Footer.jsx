import { BG_DARK, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { TEAM, STUDIO_WA, STUDIO_PHONE_FMT } from '../data/content';
import { useApp } from '../context/AppContext';
import logoBlancoSrc from '../assets/logoblanco.jpeg';
import logoNaranjaSrc from '../assets/logonaranja.jpeg';

const YEAR = new Date().getFullYear();

export function Footer() {
  const { t, theme } = useApp();
  const logoSrc = theme === 'dark' ? logoBlancoSrc : logoNaranjaSrc;

  const COLS = [
    {
      title: t('footer.col.studio'),
      links: [
        { label: t('nav.services'), href: '#servicios' },
        { label: t('nav.pricing'),  href: '#precios' },
        { label: t('nav.projects'), href: '#proyectos' },
        { label: t('nav.process'),  href: '#proceso' },
        { label: t('nav.faq'),      href: '#faq' },
      ],
    },
    {
      title: t('footer.col.contact'),
      links: [
        { label: t('footer.startProject'), href: '#contacto' },
        { label: t('footer.scheduleCall'), href: 'https://cal.com/vostudio/consulta-gratuita', external: true },
      ],
    },
  ];

  return (
    <footer style={{ background: BG_DARK, color: '#FAFAFA', padding: `clamp(64px, 10vw, 96px) 0 32px` }}>
      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}` }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.6fr) repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          marginBottom: 'clamp(48px, 8vw, 96px)',
        }} className="vo-foot-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28, flexWrap: 'wrap' }}>
              <div className="vo-neon-hover" style={{
                width: 64, height: 64, flexShrink: 0,
                background: '#1B1030',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(255,92,154, 0.40)',
                boxShadow: '0 0 36px rgba(255,92,154, 0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src={logoSrc} alt="VO Studio" style={{ width: 56, height: 56, objectFit: 'cover' }} />
              </div>
              <div style={{
                fontFamily: F_DISPLAY, fontStyle: 'italic',
                fontSize: 'clamp(48px, 6vw, 72px)', letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                VO Studio
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(250,250,250,0.6)', lineHeight: 1.6, maxWidth: '40ch' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.5)', marginBottom: 20, fontWeight: 500 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noreferrer' : undefined}
                      style={{ fontSize: 14, color: '#FAFAFA', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(250,250,250,0.6)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#FAFAFA'}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.5)', marginBottom: 20, fontWeight: 500 }}>
              {t('footer.col.team')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TEAM.map((p) => (
                <li key={p.short}>
                  <a href={`mailto:${p.email}`}
                    style={{ fontSize: 14, color: '#FAFAFA', display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
                    <span>{p.name}</span>
                    <span style={{ fontSize: 11, color: 'rgba(250,250,250,0.5)' }}>{p.email}</span>
                  </a>
                </li>
              ))}
              <li style={{ marginTop: 8, paddingTop: 12, borderTop: '1px solid rgba(250,250,250,0.1)' }}>
                <a href={`https://wa.me/${STUDIO_WA}`} target="_blank" rel="noreferrer"
                  style={{ fontSize: 14, color: '#FAFAFA', display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
                  <span>VO Studio</span>
                  <span style={{ fontSize: 11, color: 'rgba(250,250,250,0.5)' }}>WhatsApp · +506 {STUDIO_PHONE_FMT}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: 32,
          borderTop: `1px solid rgba(250,250,250,0.1)`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ fontFamily: F_MONO, fontSize: 12, color: 'rgba(250,250,250,0.5)' }}>
            © {YEAR} VO Studio · {t('footer.copyright')}
          </p>
          <p style={{ fontFamily: F_MONO, fontSize: 12, color: 'rgba(250,250,250,0.5)' }}>
            {t('footer.rights')}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .vo-foot-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
