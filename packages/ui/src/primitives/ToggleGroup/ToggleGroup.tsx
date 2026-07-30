import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './ToggleGroup.module.css';

export interface ToggleGroupItemProps {
	value: string;
	label: ReactNode;
	className?: string;
	'aria-label'?: string;
}

export interface ToggleGroupProps {
	value: string;
	items: ToggleGroupItemProps[];
	onValueChange?: (value: string) => void;
	className?: string;
	'aria-label'?: string;
}

export function ToggleGroup({
	value,
	items,
	onValueChange,
	className,
	'aria-label': ariaLabel,
}: ToggleGroupProps) {
	return (
		<RadixToggleGroup.Root
			type="single"
			value={value}
			onValueChange={(v) => {
				if (v) onValueChange?.(v);
			}}
			className={cn(styles.root, 'ml-toggle-group', className)}
			aria-label={ariaLabel}
		>
			{items.map((item) => (
				<RadixToggleGroup.Item
					key={item.value}
					value={item.value}
					className={cn(styles.item, item.className)}
					aria-label={item['aria-label']}
				>
					{item.label}
				</RadixToggleGroup.Item>
			))}
		</RadixToggleGroup.Root>
	);
}
