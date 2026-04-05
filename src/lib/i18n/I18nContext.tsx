"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en, TranslationDict } from "./dictionaries/en";
import { zh } from "./dictionaries/zh";

export type Locale = "en" | "zh";

interface I18nContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: TranslationDict;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children, initialLocale = "en" }: { children: ReactNode; initialLocale?: Locale }) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Sync html lang if client-side detection differs from server, though server cookie usually handles this.
    try {
      const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
      let currentLocale = initialLocale;
      if (match && (match[1] === "zh" || match[1] === "en")) {
        currentLocale = match[1] as Locale;
      } else if (!match) {
        const browserLang = navigator.language;
        if (browserLang.toLowerCase().includes("zh")) {
          currentLocale = "zh";
          document.cookie = `NEXT_LOCALE=zh; path=/; max-age=31536000`;
        }
      }
      if (currentLocale !== locale) {
        setLocaleState(currentLocale);
        document.documentElement.lang = currentLocale;
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    try {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      localStorage.setItem("i18n_locale", newLocale); // Keep for legacy
    } catch (e) {
      // ignore
    }
  };

  const dict = locale === "zh" ? zh : en;

  return (
    <I18nContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider");      
  }
  return context;
};
