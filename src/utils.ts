import { defaultLocale, dateFormats } from './consts';

import enUS from 'date-fns/locale/en-US';
import he from 'date-fns/locale/he';

export const isDefaultLocale = (locale: string) => locale === defaultLocale;

export const getLocale = (locale: string) =>
  isDefaultLocale(locale) ? enUS : he;

export const getLocaleFormat = (locale: string) =>
  dateFormats[locale] as Record<string, string>;
