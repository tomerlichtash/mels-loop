import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import cn from 'classnames';

import styles from './ToggleGroup.module.css';

interface ToggleGroupItemProps {
	value: string;
	label: string;
	className?: string;
	'aria-label'?: string;
}

interface ToggleGroupProps {
	value: string;
	items: ToggleGroupItemProps[];
	onChange?: (value: string) => void;
	className?: string;
	'aria-label'?: string;
}

export type { ToggleGroupItemProps };

export function ToggleGroup({
	value,
	items,
	onChange,
	className,
	'aria-label': ariaLabel,
}: ToggleGroupProps) {
	return (
		<RadixToggleGroup.Root
			type="single"
			value={value}
			onValueChange={(v) => {
				if (v) onChange?.(v);
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
