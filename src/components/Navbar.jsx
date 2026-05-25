import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BG, BORDER, TEXT, TEXT_S, BG_CARD_ALT, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';
import logoBlancoSrc from '../assets/logoblanco.jpeg';
import logoNaranjaSrc from '../assets/logonaranja.jpeg';

function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
      style={{
        width: 36, height: 36,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${BORDER}`,
        color: TEXT, background: 'transparent',
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = BG_CARD_ALT; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          {isDark ? (
            // Sun
            <>
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
              <line x1="4.93" y1="4.93" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.07" y2="19.07"/>
              <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="19.07" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.07" y2="4.93"/>
            </>
          ) : (
            // Moon
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}

function LocaleToggle() {
  const { locale, setLocale, locales } = useApp();
  const [open, setOpen] = useState(false);
  const current = locales.find((l) => l.code === locale) || locales[0];

  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [open]);

  return (
    <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          height: 36, padding: '0 12px',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: `1px solid ${BORDER}`, color: TEXT,
          fontFamily: F_MONO, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = BG_CARD_ALT; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <span>{current.short}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              minWidth: 140, listStyle: 'none',
              background: BG, border: `1px solid ${BORDER}`,
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              zIndex: 100,
            }}
          >
            {locales.map((l) => {
              const active = l.code === locale;
              return (
                <li key={l.code}>
                  <button
                    onClick={() => { setLocale(l.code); setOpen(false); }}
                    style={{
                      width: '100%', padding: '10px 14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      fontSize: 13, color: TEXT, fontWeight: active ? 600 : 500,
                      background: active ? BG_CARD_ALT : 'transparent',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = BG_CARD_ALT; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14 }}>{l.flag}</span>
                      {l.label}
                    </span>
                    <span style={{ fontFamily: F_MONO, fontSize: 10, color: TEXT_S, letterSpacing: '0.08em' }}>{l.short}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { t, theme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const logoSrc = theme === 'dark' ? logoBlancoSrc : logoNaranjaSrc;

  const LINKS = [
    { href: '#servicios', label: t('nav.services') },
    { href: '#precios',   label: t('nav.pricing') },
    { href: '#proyectos', label: t('nav.projects') },
    { href: '#proceso',   label: t('nav.process') },
    { href: '#faq',       label: t('nav.faq') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: BG,
        borderBottom: `1px solid ${scrolled ? BORDER : 'transparent'}`,
        transition: 'border-color 0.2s, background 0.3s',
      }}
    >
      <div
        style={{
          maxWidth: MAX_W, margin: '0 auto',
          padding: `14px ${PAD_X}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}
      >
        <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, flexShrink: 0,
            background: '#061720',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid rgba(6, 182, 212, 0.40)',
            boxShadow: '0 0 18px rgba(6, 182, 212, 0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'box-shadow 0.3s',
          }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={theme}
                src={logoSrc}
                alt="VO"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.35, ease: [0.21, 0.61, 0.35, 1] }}
                style={{ width: 30, height: 30, objectFit: 'cover' }}
              />
            </AnimatePresence>
          </div>
          <span style={{ fontFamily: F_DISPLAY, fontSize: 22, fontStyle: 'italic', letterSpacing: '-0.01em', color: TEXT, lineHeight: 1 }}>
            Studio
          </span>
        </a>

        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="vo-nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}
              style={{ fontSize: 14, fontWeight: 500, color: TEXT_S, transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_S)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LocaleToggle />
          <ThemeToggle />
          <a href="#contacto" className="vo-nav-cta"
            style={{
              background: 'linear-gradient(135deg, #FF5C9A 0%, #06B6D4 100%)',
              color: '#FFFFFF',
              padding: '11px 22px', fontSize: 13, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              borderRadius: 999,
              boxShadow: '0 4px 22px rgba(138, 70, 255, 0.45)',
              transition: 'transform 0.2s, box-shadow 0.2s, filter 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(225, 77, 255, 0.65)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 4px 22px rgba(138, 70, 255, 0.45)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t('common.cta.quote')}
            <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="vo-nav-burger"
          style={{ display: 'none', padding: 8, color: TEXT }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: `16px ${PAD_X} 24px`, display: 'flex', flexDirection: 'column', gap: 16, background: BG }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: 16, color: TEXT, fontWeight: 500 }}>{l.label}</a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <LocaleToggle />
            <ThemeToggle />
          </div>
          <a href="#contacto" onClick={() => setOpen(false)} style={{ background: 'linear-gradient(135deg, #FF5C9A 0%, #06B6D4 100%)', color: '#FFFFFF', padding: '13px 20px', fontSize: 14, fontWeight: 700, textAlign: 'center', borderRadius: 999, boxShadow: '0 4px 22px rgba(6, 182, 212, 0.40)' }}>{t('common.cta.quoteProj')} →</a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .vo-nav-links, .vo-nav-cta { display: none !important; }
          .vo-nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
