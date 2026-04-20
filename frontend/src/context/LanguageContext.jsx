import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import bn from '../locales/bn.json';
import ta from '../locales/ta.json';
import te from '../locales/te.json';
import gu from '../locales/gu.json';
import ur from '../locales/ur.json';
import mr from '../locales/mr.json';
import kn from '../locales/kn.json';
import or from '../locales/or.json';
import ml from '../locales/ml.json';

const locales = { en, hi, bn, ta, te, gu, ur, mr, kn, or, ml };

export const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'ur', name: 'اردو' },
  { code: 'mr', name: 'मराठी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'മലയാളം' }
];

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
    let val = locales[lang] || locales['en']; // fallback to en if lang missing
    for (const k of keys) {
      if (val === undefined) break;
      val = val[k];
    }
    
    // If not found in target lang, fallback to English
    if (val === undefined || typeof val !== 'string') {
      let enVal = locales['en'];
      for (const k of keys) {
        if (enVal === undefined) return key;
        enVal = enVal[k];
      }
      return enVal ?? key;
    }
    return val;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
