import { IDynamicContentContext } from 'lib/types/dynamic-content';
import { Context, createContext } from 'react';

const ctx = createContext<IDynamicContentContext>(null);

export const DynamicContentContext: Context<IDynamicContentContext> = ctx;
