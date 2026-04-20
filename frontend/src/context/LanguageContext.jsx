import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';

const locales = { en, hi };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('smartschemes_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('smartschemes_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(l => l === 'en' ? 'hi' : 'en');
  const setLanguage = (l) => setLang(l);

  // t('nav.home') => resolves nested key from current locale
  const t = (key) => {
    const keys = key.split('.');
    let val = locales[lang];
    for (const k of keys) {
      if (val === undefined) return key;
      val = val[k];
    }
    return val ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
