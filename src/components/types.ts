import { HTMLAttributes, PropsWithChildren } from 'react';

export type MLComponent<T, S = HTMLDivElement> = PropsWithChildren<T> &
	HTMLAttributes<S>;

export type * from './annotation/types';
export type * from './button/types';
export type * from './code-block/types';
export type * from './container/types';
export type * from './content-layout/types';
export type * from './css-var-image/types';
export type * from './custom-image/types';
export type * from './date-format/types';
export type * from './drawer/types';
export type * from './figure/types';
export type * from './HorizontalMenu/types'; // rename
export type * from './input/types';
export type * from './layout/types';
export type * from './layout/types';
export type * from './line/types';
export type * from './link/types';
export type * from './list/types';
export type * from './list-item/types';
export type * from './loading-indicator/types';
export type * from './locale-select/types';
export type * from './logo/types';
export type * from './nav-item/types';
export type * from './nav-item-content/types';
export type * from './page/types';
// export type * from '../paragraph/types';
export type * from './popover/types';
export type * from './recaptcha/types';
export type * from './scrollbar/types';
export type * from './separator/types';
export type * from './strip/types';
// export type * from '../table/types';
// export type * from '../term/types';
export type * from './text/types';
export type * from './text-area/types';
export type * from './text-link/types';
export type * from './theme-select/types';
export type * from './toggle/types';
export type * from './toggle-group/types';
export type * from './toggle-group-item/types';
export type * from './VerticalMenu/types'; // rename
