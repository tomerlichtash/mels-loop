'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

import styles from './Tooltip.module.css';

interface TooltipProps {
	label: string;
	children: ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	delayDuration?: number;
}

export function Tooltip({
	label,
	children,
	side = 'bottom',
	delayDuration = 0,
}: TooltipProps) {
	return (
		<TooltipPrimitive.Provider delayDuration={delayDuration}>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						className={styles.content}
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
