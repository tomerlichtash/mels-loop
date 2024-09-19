import { Context, createContext } from 'react';
import { PageContextClass } from './PageContextClass';
import type { IPageContext } from './types';

const ctx = createContext<IPageContext>(new PageContextClass(null, ''));

export const PageContext: Context<IPageContext> = ctx;
