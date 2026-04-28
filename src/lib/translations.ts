import {pt} from './languages/translation.pt'
import {en} from './languages/translation.en'
import {es} from './languages/translation.es'

export const translations = {
  pt,
  en,
  es
};

export type Language = "pt" | "en" | "es";
export type TranslationKey = typeof translations.pt;
