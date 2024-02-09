import { TextDirection } from 'context/locale/types';
import type { ScrollAreaScrollbarVisibleProps } from '@radix-ui/react-scroll-area';

type ScrollbarProps = {
	height?: string;
	textDirection: TextDirection;
} & ScrollAreaScrollbarVisibleProps;

export type { ScrollbarProps };
