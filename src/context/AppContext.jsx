import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { STRINGS, LOCALES } from '../i18n/strings';

const AppContext = createContext(null);

const THEME_KEY  = 'vo-theme';
const LOCALE_KEY = 'vo-locale';

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
  const [theme, setThemeState]   = useState(detectInitialTheme);
  const [locale, setLocaleState] = useState(detectInitialLocale);

  // Apply theme to <html data-theme>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const setTheme  = useCallback((t) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')), []);
  const setLocale = useCallback((l) => { if (STRINGS[l]) setLocaleState(l); }, []);

  // Translator with es fallback
  const t = useCallback((key) => {
    const dict = STRINGS[locale] || STRINGS.es;
    return dict[key] ?? STRINGS.es[key] ?? key;
  }, [locale]);

  const value = useMemo(() => ({
    theme, setTheme, toggleTheme,
    locale, setLocale,
    locales: LOCALES,
    t,
  }), [theme, locale, t, setTheme, toggleTheme, setLocale]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
