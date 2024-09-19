import { Context, createContext } from 'react';
import type { IDynamicContentContext } from '../../lib/content-component/types';

const ctx = createContext<IDynamicContentContext>(null);

const DynamicContentContext: Context<IDynamicContentContext> = ctx;

export default DynamicContentContext;
