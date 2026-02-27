'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import cn from 'classnames';
import type { CSSProperties, ReactNode } from 'react';

import styles from './Tooltip.module.css';

type TooltipPadding = 'xs' | 'sm' | 'md' | 'lg';

interface TooltipProps {
	label: string;
	children: ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	delayDuration?: number;
	paddingHorizontal?: TooltipPadding;
	paddingVertical?: TooltipPadding;
	className?: string;
}

export function Tooltip({
	label,
	children,
	side = 'bottom',
	delayDuration = 0,
	paddingHorizontal,
	paddingVertical,
	className,
}: TooltipProps) {
	const style: CSSProperties | undefined =
		paddingHorizontal || paddingVertical
			? {
					...(paddingHorizontal && {
						'--ml-tooltip-padding-horizontal': `var(--ml-space-${paddingHorizontal})`,
					}),
					...(paddingVertical && {
						'--ml-tooltip-padding-vertical': `var(--ml-space-${paddingVertical})`,
					}),
				}
			: undefined;

	return (
		<TooltipPrimitive.Provider delayDuration={delayDuration}>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						className={cn(styles.content, className)}
						side={side}
						sideOffset={5}
						style={style as CSSProperties}
					>
						{label}
						<TooltipPrimitive.Arrow className={styles.arrow} />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
