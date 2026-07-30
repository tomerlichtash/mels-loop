'use client';

import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import cn from 'classnames';
import type { CSSProperties, ReactNode } from 'react';

import styles from './ScrollArea.module.css';

export interface ScrollAreaProps {
	children: ReactNode;
	/**
	 * `auto` shows the scrollbar only while there is overflow, `always` keeps it
	 * present, `hover`/`scroll` reveal it on interaction. Default `auto`.
	 */
	type?: 'auto' | 'always' | 'scroll' | 'hover';
	orientation?: 'vertical' | 'horizontal';
	/** Caps the viewport; content taller than this scrolls. */
	maxHeight?: string;
	className?: string;
	viewportClassName?: string;
}

/**
 * A scroll container with a scrollbar that is actually visible.
 *
 * The platform scrollbar is an overlay on macOS and most touch systems: it
 * fades out when idle, so a panel with more content below looks identical to
 * one without. That is tolerable on a page, where the reader assumes scrolling,
 * and misleading in a short box like a popover, where they do not. This keeps a
 * styled bar that follows the theme in both directions.
 */
export function ScrollArea({
	children,
	type = 'auto',
	orientation = 'vertical',
	maxHeight,
	className,
	viewportClassName,
}: ScrollAreaProps) {
	return (
		<RadixScrollArea.Root
			type={type}
			className={cn(styles.root, 'ml-scroll-area', className)}
			style={
				maxHeight
					? ({ '--ml-scroll-area-max-height': maxHeight } as CSSProperties)
					: undefined
			}
		>
			<RadixScrollArea.Viewport
				className={cn(styles.viewport, viewportClassName)}
			>
				{children}
			</RadixScrollArea.Viewport>
			<RadixScrollArea.Scrollbar
				orientation={orientation}
				className={styles.scrollbar}
			>
				<RadixScrollArea.Thumb className={styles.thumb} />
			</RadixScrollArea.Scrollbar>
			<RadixScrollArea.Corner />
		</RadixScrollArea.Root>
	);
}
