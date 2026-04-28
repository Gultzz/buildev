"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, TranslationKey } from "@/lib/translations";
import { z } from "zod";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKey;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "pt" || browserLang === "en" || browserLang === "es") {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    
    const zodErrs = translations[language].zodErrors;
    z.setErrorMap((issue, ctx) => {
      let message = ctx.defaultError;
      
      if (issue.code === z.ZodIssueCode.invalid_type) {
        if (issue.received === "undefined") {
          message = zodErrs.required;
        } else {
          message = zodErrs.invalidType;
        }
      } else if (issue.code === z.ZodIssueCode.invalid_string && issue.validation === "email") {
        message = zodErrs.invalidEmail;
      } else if (issue.code === z.ZodIssueCode.too_small) {
        if (issue.path[0] === "name") {
          message = zodErrs.nameTooShort;
        } else if (issue.path[0] === "message") {
          message = zodErrs.messageTooShort;
        } else {
          message = zodErrs.tooShortGeneric.replace("{min}", String(issue.minimum));
        }
      }
      return { message };
    });
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
