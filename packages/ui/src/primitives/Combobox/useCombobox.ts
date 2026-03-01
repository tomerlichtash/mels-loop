import {
	type KeyboardEvent,
	useCallback,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react';

import type { ComboboxOption } from './Combobox';

type ComboboxFilterFn = (option: ComboboxOption, query: string) => boolean;

const defaultFilter: ComboboxFilterFn = (option, query) =>
	option.label.toLowerCase().includes(query.toLowerCase());

interface UseComboboxOptions {
	options: ComboboxOption[];
	value: string | string[];
	onValueChange: ((v: string) => void) | ((v: string[]) => void);
	multiple?: boolean;
	disabled?: boolean;
	filter?: ComboboxFilterFn;
	id?: string;
}

export function useCombobox({
	options,
	value,
	onValueChange,
	multiple,
	disabled,
	filter,
	id: idProp,
}: UseComboboxOptions) {
	const isMulti = !!multiple;

	const autoId = useId();
	const id = idProp ?? autoId;
	const listboxId = `${id}-listbox`;

	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState<string | null>(null);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	const inputRef = useRef<HTMLInputElement>(null);

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

	const hasValue = isMulti
		? (value as string[]).length > 0
		: !!(value as string);

	const inputValue = isMulti
		? (query ?? '')
		: open
			? (query ?? selectedLabel)
			: selectedLabel;

	const showPlaceholder = isMulti ? selectedValues.length === 0 : !value;

	const highlightedOptionId =
		highlightedIndex >= 0
			? `${listboxId}-option-${highlightedIndex}`
			: undefined;

	// --- Actions ---

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
				inputRef.current?.focus();
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
		inputRef.current?.focus();
	}, [isMulti, onValueChange]);

	const handleRemoveValue = useCallback(
		(removeValue: string) => {
			const current = value as string[];
			const onChange = onValueChange as (v: string[]) => void;
			onChange(current.filter((v) => v !== removeValue));
		},
		[value, onValueChange],
	);

	// --- Input handlers ---

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuery(e.target.value);
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

	return {
		// IDs
		id,
		listboxId,

		// State
		open,
		isMulti,
		highlightedIndex,
		highlightedOptionId,
		inputRef,

		// Derived
		filteredOptions,
		selectedValues,
		selectedLabel,
		hasValue,
		inputValue,
		showPlaceholder,

		// Actions
		openDropdown,
		closeDropdown,
		selectOption,
		handleClear,
		handleRemoveValue,
		isSelected,
		setHighlightedIndex,

		// Input handlers
		handleInputChange,
		handleClick,
		handleKeyDown,
	};
}
