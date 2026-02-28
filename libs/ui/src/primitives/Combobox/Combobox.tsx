'use client';

import { CheckIcon, ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import cn from 'classnames';
import {
	forwardRef,
	type KeyboardEvent,
	useCallback,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react';

import { FormField } from '../_internal/FormField/FormField';
import { InputAction } from '../_internal/InputAction/InputAction';
import { Label } from '../_internal/Label/Label';
import { Chip } from '../Chip/Chip';
import styles from './Combobox.module.css';

export interface ComboboxOption {
	value: string;
	label: string;
	disabled?: boolean;
}

type ComboboxSize = 'sm' | 'md' | 'lg';
type ComboboxRadius = 'none' | 'sm' | 'md' | 'lg';
type ComboboxFilterFn = (option: ComboboxOption, query: string) => boolean;

interface ComboboxBaseProps {
	options: ComboboxOption[];
	filter?: ComboboxFilterFn;
	label?: string;
	placeholder?: string;
	error?: boolean;
	errorMessage?: string;
	required?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	size?: ComboboxSize;
	radius?: ComboboxRadius;
	emptyMessage?: string;
	clearLabel?: string;
	toggleLabel?: string;
	id?: string;
	className?: string;
	name?: string;
}

interface ComboboxSingleProps extends ComboboxBaseProps {
	multiple?: false;
	value: string;
	onValueChange: (value: string) => void;
}

interface ComboboxMultiProps extends ComboboxBaseProps {
	multiple: true;
	value: string[];
	onValueChange: (value: string[]) => void;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;

const defaultFilter: ComboboxFilterFn = (option, query) =>
	option.label.toLowerCase().includes(query.toLowerCase());

const chipSizeMap: Record<ComboboxSize, 'sm' | 'md'> = {
	sm: 'sm',
	md: 'sm',
	lg: 'md',
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
	function Combobox(props, ref) {
		const {
			options,
			multiple,
			filter,
			label,
			placeholder,
			error,
			errorMessage,
			required,
			disabled,
			fullWidth,
			size = 'md',
			radius = 'md',
			emptyMessage = 'No results found',
			clearLabel = 'Clear',
			toggleLabel = 'Toggle',
			id: idProp,
			className,
			name,
		} = props;

		const isMulti = !!multiple;
		const value = props.value;
		const onValueChange = props.onValueChange;

		const autoId = useId();
		const id = idProp ?? autoId;
		const listboxId = `${id}-listbox`;

		const [open, setOpen] = useState(false);
		const [query, setQuery] = useState<string | null>(null);
		const [highlightedIndex, setHighlightedIndex] = useState(-1);

		const innerRef = useRef<HTMLInputElement>(null);
		const mergedRef = useCallback(
			(node: HTMLInputElement | null) => {
				innerRef.current = node;
				if (typeof ref === 'function') ref(node);
				else if (ref)
					(ref as React.RefObject<HTMLInputElement | null>).current = node;
			},
			[ref],
		);

		const filterFn = filter ?? defaultFilter;

		const selectedValues = useMemo(
			() =>
				isMulti
					? (value as string[])
					: (value as string)
						? [value as string]
						: [],
			[isMulti, value],
		);

		const isSelected = useCallback(
			(optionValue: string) => selectedValues.includes(optionValue),
			[selectedValues],
		);

		const filteredOptions = useMemo(
			() =>
				query
					? options.filter((o) => !o.disabled && filterFn(o, query))
					: options,
			[options, query, filterFn],
		);

		const selectedLabel = useMemo(
			() =>
				isMulti
					? ''
					: (options.find((o) => o.value === (value as string))?.label ?? ''),
			[isMulti, options, value],
		);

		const openDropdown = useCallback(() => {
			if (disabled) return;
			setOpen(true);
			setQuery(null);
			setHighlightedIndex(-1);
		}, [disabled]);

		const closeDropdown = useCallback(() => {
			setOpen(false);
			setQuery(null);
			setHighlightedIndex(-1);
		}, []);

		const selectOption = useCallback(
			(option: ComboboxOption) => {
				if (option.disabled) return;
				if (isMulti) {
					const current = value as string[];
					const onChange = onValueChange as (v: string[]) => void;
					if (current.includes(option.value)) {
						onChange(current.filter((v) => v !== option.value));
					} else {
						onChange([...current, option.value]);
					}
					setQuery(null);
					setHighlightedIndex(-1);
					innerRef.current?.focus();
				} else {
					(onValueChange as (v: string) => void)(option.value);
					closeDropdown();
				}
			},
			[isMulti, value, onValueChange, closeDropdown],
		);

		const handleClear = useCallback(() => {
			if (isMulti) {
				(onValueChange as (v: string[]) => void)([]);
			} else {
				(onValueChange as (v: string) => void)('');
			}
			innerRef.current?.focus();
		}, [isMulti, onValueChange]);

		const handleRemoveValue = useCallback(
			(removeValue: string) => {
				const current = value as string[];
				const onChange = onValueChange as (v: string[]) => void;
				onChange(current.filter((v) => v !== removeValue));
				innerRef.current?.focus();
			},
			[value, onValueChange],
		);

		const [draggedValue, setDraggedValue] = useState<string | null>(null);
		const [dragOverValue, setDragOverValue] = useState<string | null>(null);
		const [dragOverSide, setDragOverSide] = useState<'before' | 'after' | null>(
			null,
		);

		const handleDragStart = useCallback(
			(e: React.DragEvent, chipValue: string) => {
				setDraggedValue(chipValue);
				e.dataTransfer.effectAllowed = 'move';
			},
			[],
		);

		const handleDragOver = useCallback(
			(e: React.DragEvent, chipValue: string) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = 'move';
				const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
				const midpoint = rect.left + rect.width / 2;
				setDragOverValue(chipValue);
				setDragOverSide(e.clientX < midpoint ? 'before' : 'after');
			},
			[],
		);

		const handleDrop = useCallback(
			(e: React.DragEvent) => {
				e.preventDefault();
				if (draggedValue && dragOverValue && draggedValue !== dragOverValue) {
					const current = [...(value as string[])];
					const fromIndex = current.indexOf(draggedValue);
					if (fromIndex !== -1) {
						const item = current.splice(fromIndex, 1)[0];
						const targetIndex = current.indexOf(dragOverValue);
						const insertIndex =
							dragOverSide === 'after' ? targetIndex + 1 : targetIndex;
						current.splice(insertIndex, 0, item);
						(onValueChange as (v: string[]) => void)(current);
					}
				}
				setDraggedValue(null);
				setDragOverValue(null);
				setDragOverSide(null);
			},
			[draggedValue, dragOverValue, dragOverSide, value, onValueChange],
		);

		const handleDragEnd = useCallback(() => {
			setDraggedValue(null);
			setDragOverValue(null);
			setDragOverSide(null);
		}, []);

		const handleInputChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const val = e.target.value;
				setQuery(val);
				if (!open) setOpen(true);
				setHighlightedIndex(0);
			},
			[open],
		);

		const handleClick = useCallback(() => {
			if (!open) openDropdown();
		}, [open, openDropdown]);

		const navigateHighlight = useCallback(
			(direction: 1 | -1) => {
				setHighlightedIndex((prev) => {
					const len = filteredOptions.length;
					if (len === 0) return -1;

					let next = prev + direction;
					if (next < 0) next = len - 1;
					if (next >= len) next = 0;

					let attempts = 0;
					while (filteredOptions[next]?.disabled && attempts < len) {
						next += direction;
						if (next < 0) next = len - 1;
						if (next >= len) next = 0;
						attempts++;
					}

					return next;
				});
			},
			[filteredOptions],
		);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent<HTMLInputElement>) => {
				if (e.nativeEvent.isComposing) return;

				switch (e.key) {
					case 'ArrowDown':
						e.preventDefault();
						if (!open) {
							openDropdown();
							setHighlightedIndex(0);
						} else {
							navigateHighlight(1);
						}
						break;

					case 'ArrowUp':
						e.preventDefault();
						if (!open) {
							openDropdown();
							setHighlightedIndex(filteredOptions.length - 1);
						} else {
							navigateHighlight(-1);
						}
						break;

					case 'Enter':
						e.preventDefault();
						if (
							open &&
							highlightedIndex >= 0 &&
							filteredOptions[highlightedIndex]
						) {
							selectOption(filteredOptions[highlightedIndex]);
						} else if (!open) {
							openDropdown();
						}
						break;

					case 'Backspace':
						if (isMulti && !query && selectedValues.length > 0) {
							handleRemoveValue(selectedValues[selectedValues.length - 1]);
						}
						break;

					case 'Escape':
						if (open) {
							e.preventDefault();
							closeDropdown();
						}
						break;

					case 'Home':
						if (open) {
							e.preventDefault();
							setHighlightedIndex(0);
						}
						break;

					case 'End':
						if (open) {
							e.preventDefault();
							setHighlightedIndex(filteredOptions.length - 1);
						}
						break;

					case 'Tab':
						if (open) closeDropdown();
						break;
				}
			},
			[
				open,
				highlightedIndex,
				filteredOptions,
				openDropdown,
				closeDropdown,
				selectOption,
				navigateHighlight,
				isMulti,
				query,
				selectedValues,
				handleRemoveValue,
			],
		);

		const highlightedOptionId =
			highlightedIndex >= 0
				? `${listboxId}-option-${highlightedIndex}`
				: undefined;

		const hasValue = isMulti
			? (value as string[]).length > 0
			: !!(value as string);

		const inputValue = isMulti
			? (query ?? '')
			: open
				? (query ?? selectedLabel)
				: selectedLabel;

		const showPlaceholder = isMulti ? selectedValues.length === 0 : !value;

		const sharedInputProps = {
			ref: mergedRef,
			id,
			name,
			role: 'combobox' as const,
			value: inputValue,
			placeholder: showPlaceholder ? placeholder : undefined,
			disabled,
			required,
			autoComplete: 'off' as const,
			'aria-expanded': open,
			'aria-controls': listboxId,
			'aria-activedescendant': highlightedOptionId,
			'aria-autocomplete': 'list' as const,
			'aria-haspopup': 'listbox' as const,
			'aria-required': required || undefined,
			'aria-invalid': error || undefined,
			onChange: handleInputChange,
			onFocus: openDropdown,
			onClick: handleClick,
			onKeyDown: handleKeyDown,
		};

		const inputClasses = cn(
			styles.input,
			styles[`size-${size}`],
			styles[`radius-${radius}`],
			{
				[styles.error]: error,
			},
		);

		const renderAnchor = () => {
			if (isMulti) {
				return (
					<PopoverPrimitive.Anchor asChild>
						<div
							className={cn(inputClasses, styles.inputWrapper)}
							onClick={() => {
								innerRef.current?.focus();
								if (!open) openDropdown();
							}}
						>
							{selectedValues.map((v) => {
								const opt = options.find((o) => o.value === v);
								if (!opt) return null;
								return (
									<Chip
										key={v}
										size={chipSizeMap[size]}
										onDismiss={
											disabled ? undefined : () => handleRemoveValue(v)
										}
										dismissLabel={clearLabel}
										disabled={disabled}
										draggable={!disabled}
										onDragStart={(e) => handleDragStart(e, v)}
										onDragOver={(e) => handleDragOver(e, v)}
										onDrop={handleDrop}
										onDragEnd={handleDragEnd}
										className={cn({
											[styles.chipDraggable]: !disabled,
											[styles.chipDragging]: draggedValue === v,
											[styles.chipDropBefore]:
												dragOverValue === v &&
												draggedValue !== v &&
												dragOverSide === 'before',
											[styles.chipDropAfter]:
												dragOverValue === v &&
												draggedValue !== v &&
												dragOverSide === 'after',
										})}
									>
										{opt.label}
									</Chip>
								);
							})}
							<input {...sharedInputProps} className={styles.inputBare} />
						</div>
					</PopoverPrimitive.Anchor>
				);
			}

			return (
				<PopoverPrimitive.Anchor asChild>
					<input {...sharedInputProps} className={inputClasses} />
				</PopoverPrimitive.Anchor>
			);
		};

		const renderOptions = () =>
			filteredOptions.map((option, index) => {
				const selected = isSelected(option.value);
				return (
					<div
						key={option.value}
						role="option"
						id={`${listboxId}-option-${index}`}
						className={styles.option}
						data-highlighted={index === highlightedIndex}
						data-selected={selected}
						data-disabled={option.disabled || undefined}
						aria-selected={selected}
						aria-disabled={option.disabled || undefined}
						onPointerDown={(e) => e.preventDefault()}
						onClick={() => selectOption(option)}
						onPointerMove={() => setHighlightedIndex(index)}
					>
						{isMulti && (
							<CheckIcon
								className={cn(styles.checkIcon, {
									[styles.checkIconVisible]: selected,
								})}
							/>
						)}
						{option.label}
					</div>
				);
			});

		const comboboxElement = (
			<PopoverPrimitive.Root open={open}>
				<div
					className={cn(
						styles.root,
						styles[`size-${size}`],
						{ [styles.fullWidth]: fullWidth },
						'ml-combobox',
						!label && className,
					)}
				>
					{renderAnchor()}

					<span className={styles.actions}>
						{hasValue && !disabled && (
							<InputAction
								aria-label={clearLabel}
								onClick={handleClear}
								tabIndex={-1}
							>
								<Cross2Icon />
							</InputAction>
						)}
						<InputAction
							aria-label={toggleLabel}
							onClick={() => (open ? closeDropdown() : openDropdown())}
							onMouseDown={(e) => e.preventDefault()}
							tabIndex={-1}
						>
							<ChevronDownIcon
								className={cn(styles.chevron, {
									[styles.chevronOpen]: open,
								})}
							/>
						</InputAction>
					</span>

					<PopoverPrimitive.Portal>
						<PopoverPrimitive.Content
							className={styles.listbox}
							role="listbox"
							id={listboxId}
							aria-multiselectable={isMulti || undefined}
							side="bottom"
							align="start"
							sideOffset={4}
							onOpenAutoFocus={(e) => e.preventDefault()}
							onCloseAutoFocus={(e) => e.preventDefault()}
							onPointerDownOutside={() => closeDropdown()}
						>
							{filteredOptions.length === 0 ? (
								<div className={styles.empty} role="status">
									{emptyMessage}
								</div>
							) : (
								renderOptions()
							)}
						</PopoverPrimitive.Content>
					</PopoverPrimitive.Portal>
				</div>
			</PopoverPrimitive.Root>
		);

		if (!label) return comboboxElement;

		return (
			<FormField error={errorMessage} className={className}>
				<Label htmlFor={id} required={required}>
					{label}
				</Label>
				{comboboxElement}
			</FormField>
		);
	},
);
