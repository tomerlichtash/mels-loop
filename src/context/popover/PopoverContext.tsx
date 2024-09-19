import { Context, createContext } from 'react';
import { IPopoverContext } from './types';

const ctx = createContext<IPopoverContext>(null);

export const PopoverContext: Context<IPopoverContext> = ctx;
