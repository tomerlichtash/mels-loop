import { CheckIcon } from '@phosphor-icons/react/ssr';
import cn from 'classnames';

import type { ComboboxOption } from './Combobox';
import styles from './ComboboxListbox.module.css';

interface ComboboxListboxProps {
	options: ComboboxOption[];
	multiple?: boolean;
	highlightedIndex: number;
	emptyMessage: string;
	listboxId: string;
	isSelected: (value: string) => boolean;
	onSelect: (option: ComboboxOption) => void;
	onHighlight: (index: number) => void;
}

export function ComboboxListbox({
	options,
	multiple,
	highlightedIndex,
	emptyMessage,
	listboxId,
	isSelected,
	onSelect,
	onHighlight,
}: ComboboxListboxProps) {
	if (options.length === 0) {
		return (
			<div className={styles.empty} role="status">
				{emptyMessage}
			</div>
		);
	}

	return (
		<>
			{options.map((option, index) => {
				const selected = isSelected(option.value);
				return (
					<div
						key={option.value}
						role="option"
						id={`${listboxId}-option-${index}`}
						className={styles.option}
						data-highlighted={index === highlightedIndex}
						data-selected={selected}
						data-multi={multiple || undefined}
						data-disabled={option.disabled || undefined}
						aria-selected={selected}
						aria-disabled={option.disabled || undefined}
						onPointerDown={(e) => e.preventDefault()}
						onClick={() => onSelect(option)}
						onPointerMove={() => onHighlight(index)}
					>
						{multiple && (
							<CheckIcon
								className={cn(styles.checkIcon, {
									[styles.checkIconVisible]: selected,
								})}
							/>
						)}
						{option.label}
					</div>
				);
			})}
		</>
	);
}
