/**
 * i18n/index.jsx
 * --------------
 * A very small translation system - no library needed.
 *
 * Usage inside any component:
 *   const { t, lang, setLang } = useI18n();
 *   <h1>{t('home.title')}</h1>
 *
 * Adding a language later:
 *   1. copy en.js, translate the values, keep the keys
 *   2. import it below and add it to LANGUAGES
 * Missing keys fall back to English, so a half-finished translation
 * never leaves a blank screen.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import kn from './kn.js';
import hi from './hi.js';

const DICTS = { en, kn, hi };

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'हिन्दी' }
];

const I18nContext = createContext(null);
const STORAGE_KEY = 'cropguard.lang';

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && DICTS[saved]) return saved;
    } catch { /* storage may be blocked */ }
    return 'en';
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = DICTS[lang] || en;
    const t = (key) => dict[key] ?? en[key] ?? key;
    return { lang, setLang, t, languages: LANGUAGES };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
