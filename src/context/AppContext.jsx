import { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { STRINGS, LOCALES } from '../i18n/strings';

const AppContext = createContext(null);

const THEME_KEY  = 'vo-theme';
const LOCALE_KEY = 'vo-locale';

const CURTAIN_DURATION = 500;
const CURTAIN_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
const CURTAIN_BG = { light: '#FFFFFF', dark: '#0A0A0A' };

function detectInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function detectInitialLocale() {
  if (typeof window === 'undefined') return 'es';
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved && STRINGS[saved]) return saved;
  const browser = (navigator.language || 'es').split('-')[0];
  return STRINGS[browser] ? browser : 'es';
}

export function AppProvider({ children }) {
  const [theme, setThemeState]     = useState(detectInitialTheme);
  const [locale, setLocaleState]   = useState(detectInitialLocale);
  const [curtainPhase, setCurtainPhase] = useState('idle'); // 'idle' | 'falling' | 'rising'
  const [curtainBg, setCurtainBg]  = useState('#FFFFFF');
  const curtainBusy = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const setTheme = useCallback((t) => setThemeState(t), []);

  const toggleTheme = useCallback(() => {
    if (curtainBusy.current) return;
    curtainBusy.current = true;

    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      setCurtainBg(CURTAIN_BG[next]);
      setCurtainPhase('falling');

      setTimeout(() => {
        setThemeState(next);
        setCurtainPhase('rising');
        setTimeout(() => {
          setCurtainPhase('idle');
          curtainBusy.current = false;
        }, CURTAIN_DURATION + 60);
      }, CURTAIN_DURATION);

      return current; // don't change yet — curtain handles timing
    });
  }, []);

  const setLocale = useCallback((l) => { if (STRINGS[l]) setLocaleState(l); }, []);

  const t = useCallback((key) => {
    const dict = STRINGS[locale] || STRINGS.es;
    return dict[key] ?? STRINGS.es[key] ?? key;
  }, [locale]);

  const value = useMemo(() => ({
    theme, setTheme, toggleTheme,
    locale, setLocale,
    locales: LOCALES,
    t,
    curtainPhase, curtainBg,
    curtainDuration: CURTAIN_DURATION,
    curtainEase: CURTAIN_EASE,
  }), [theme, locale, t, setTheme, toggleTheme, setLocale, curtainPhase, curtainBg]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
