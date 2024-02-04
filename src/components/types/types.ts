import { HTMLAttributes, PropsWithChildren } from 'react';

export type MLComponent<T, S = HTMLDivElement> = PropsWithChildren<T> &
	HTMLAttributes<S>;
