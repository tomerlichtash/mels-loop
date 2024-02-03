import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollAreaScrollbarVisibleProps } from '@radix-ui/react-scroll-area';
import { TextDirection } from 'locale/locale-context';
import classNames from 'classnames';
import styles from './Scrollbar.module.scss';

type ScrollAreaProps = {
	height?: string;
	textDirection: TextDirection;
};

export const Scrollbar = ({
	children,
	height,
	textDirection,
	className,
	...rest
}: ScrollAreaProps & ScrollAreaScrollbarVisibleProps) => (
	<ScrollAreaPrimitive.Root
		className={classNames(styles.root, className)}
		type="always"
		dir={textDirection}
		style={{ height }}
	>
		<ScrollAreaPrimitive.Viewport
			className={styles.ScrolLAreaViewport}
			{...rest}
		>
			{children}
		</ScrollAreaPrimitive.Viewport>
		<ScrollAreaPrimitive.Scrollbar
			className={styles.ScrollAreaScrollbar}
			orientation="vertical"
		>
			<ScrollAreaPrimitive.Thumb className={styles.ScrollAreaThumb} />
		</ScrollAreaPrimitive.Scrollbar>
		<ScrollAreaPrimitive.Scrollbar
			className={styles.ScrollAreaScrollbar}
			orientation="horizontal"
		>
			<ScrollAreaPrimitive.Thumb className={styles.ScrollAreaThumb} />
		</ScrollAreaPrimitive.Scrollbar>
		<ScrollAreaPrimitive.Corner className={styles.ScrollAreaCorner} />
	</ScrollAreaPrimitive.Root>
);

export default Scrollbar;