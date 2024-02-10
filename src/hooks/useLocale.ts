import { useContext } from 'react';
import { LocaleContext } from '../context/locale/localeContext';
import { ILocaleContext } from 'context/locale/types';

export const useLocale = (): ILocaleContext => useContext(LocaleContext);
