
import type { Locale } from '@/i18n';

const dictionaries = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  ar: () => import('@/messages/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
