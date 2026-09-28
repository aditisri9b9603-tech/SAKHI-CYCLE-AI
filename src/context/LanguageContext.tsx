import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (num: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sakhi_language');
    if (saved === 'hi' || saved === 'en') {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sakhi_language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof Translations, params?: Record<string, string | number>): string => {
    const dict = translations[language] || translations.en;
    let str = dict[key] || translations.en[key] || String(key);

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(new RegExp(`{${k}}`, 'g'), String(v));
      });
    }

    return str;
  };

  const formatDate = (dateInput: Date | string | number, options?: Intl.DateTimeFormatOptions): string => {
    try {
      const d = typeof dateInput === 'string' || typeof dateInput === 'number' ? new Date(dateInput) : dateInput;
      if (isNaN(d.getTime())) return String(dateInput);

      const locale = language === 'hi' ? 'hi-IN' : 'en-US';
      const defaultOptions: Intl.DateTimeFormatOptions = options || {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };

      return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
    } catch {
      return String(dateInput);
    }
  };

  const formatNumber = (num: number): string => {
    try {
      const locale = language === 'hi' ? 'hi-IN' : 'en-US';
      return new Intl.NumberFormat(locale).format(num);
    } catch {
      return String(num);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatDate, formatNumber }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
