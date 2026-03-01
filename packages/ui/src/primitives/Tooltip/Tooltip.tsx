'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Tooltip.module.css';

type TooltipPadding = 'xs' | 'sm' | 'md' | 'lg';

interface TooltipProps {
	label: string;
	children: ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	side?: 'top' | 'right' | 'bottom' | 'left';
	delayDuration?: number;
	paddingHorizontal?: TooltipPadding;
	paddingVertical?: TooltipPadding;
	className?: string;
}

export function Tooltip({
	label,
	children,
	open,
	onOpenChange,
	side = 'bottom',
	delayDuration = 0,
	paddingHorizontal,
	paddingVertical,
	className,
}: TooltipProps) {
	return (
		<TooltipPrimitive.Provider delayDuration={delayDuration}>
			<TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						className={cn(
							styles.root,
							paddingHorizontal &&
								styles[`paddingHorizontal-${paddingHorizontal}`],
							paddingVertical && styles[`paddingVertical-${paddingVertical}`],
							className,
						)}
						side={side}
						sideOffset={5}
					>
						{label}
						<TooltipPrimitive.Arrow className={styles.arrow} />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
