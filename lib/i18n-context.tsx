"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { en } from "@/messages/en";
import { ru } from "@/messages/ru";
import { kk } from "@/messages/kk";
import type { Translation } from "@/messages/en";

export type Locale = "en" | "ru" | "kk";

const translations: Record<Locale, Translation> = { en, ru, kk };

interface I18nContextType {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: "ru",
  t: ru,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("kezen_locale") as Locale | null;
      if (saved === "en" || saved === "ru" || saved === "kk") {
        setLocaleState(saved);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("kezen_locale", newLocale);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const activeLocale = mounted ? locale : "ru";

  return (
    <I18nContext.Provider
      value={{ locale: activeLocale, t: translations[activeLocale], setLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
