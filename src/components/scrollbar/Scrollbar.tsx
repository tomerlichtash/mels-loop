import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import classNames from 'classnames';
import styles from './Scrollbar.module.scss';
import type { ScrollAreaScrollbarVisibleProps } from '@radix-ui/react-scroll-area';
import type { TextDirection } from 'types/locale';

type ScrollbarProps = {
	height?: string;
	textDirection: TextDirection;
} & ScrollAreaScrollbarVisibleProps;

const Scrollbar = ({ children, height, textDirection, className, ...rest }: ScrollbarProps) => (
	<ScrollAreaPrimitive.Root
		className={classNames(styles.root, className)}
		type="always"
		dir={textDirection}
		style={{ height }}
	>
		<ScrollAreaPrimitive.Viewport
			className={styles.viewport}
			{...rest}
		>
			{children}
		</ScrollAreaPrimitive.Viewport>
		<ScrollAreaPrimitive.Scrollbar
			className={styles.scrollbar}
			orientation="vertical"
		>
			<ScrollAreaPrimitive.Thumb className={styles.thumb} />
		</ScrollAreaPrimitive.Scrollbar>
		<ScrollAreaPrimitive.Scrollbar
			className={styles.scrollbar}
			orientation="horizontal"
		>
			<ScrollAreaPrimitive.Thumb className={styles.thumb} />
		</ScrollAreaPrimitive.Scrollbar>
		<ScrollAreaPrimitive.Corner className={styles.scrollAreaCorner} />
	</ScrollAreaPrimitive.Root>
);

export default Scrollbar;
export type { ScrollbarProps };
