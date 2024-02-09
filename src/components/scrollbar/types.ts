import type { ScrollAreaScrollbarVisibleProps } from '@radix-ui/react-scroll-area';
import type { TextDirection } from 'types/locale';

type ScrollbarProps = {
	height?: string;
	textDirection: TextDirection;
} & ScrollAreaScrollbarVisibleProps;

export type { ScrollbarProps };
