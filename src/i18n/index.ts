import { fr } from './locales/fr';
import { en } from './locales/en';

export type Locale = 'fr' | 'en';

export const dictionaries: Record<Locale, typeof fr> = {
  fr,
  en,
};

export type Dictionary = typeof fr;