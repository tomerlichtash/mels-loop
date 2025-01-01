import { IDynamicContentContext } from 'lib/types';
import { Context, createContext } from 'react';

const ctx = createContext<IDynamicContentContext>(null);

export const DynamicContentContext: Context<IDynamicContentContext> = ctx;
