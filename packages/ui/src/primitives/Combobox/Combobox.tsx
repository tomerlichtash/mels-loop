'use client';

import { CaretDownIcon, XIcon } from '@phosphor-icons/react/ssr';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import cn from 'classnames';
import { forwardRef, useCallback, useRef } from 'react';

import { FormField } from '../_internal/FormField/FormField';
import { InputAction } from '../_internal/InputAction/InputAction';
import { Label } from '../_internal/Label/Label';
import { Chip } from '../Chip/Chip';
import styles from './Combobox.module.css';
import { ComboboxListbox } from './ComboboxListbox';
import { useCombobox } from './useCombobox';
import { useReorder } from './useReorder';

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
			className,
			name,
		} = props;

		const combobox = useCombobox({
			options,
			value: props.value,
			onValueChange: props.onValueChange,
			multiple,
			disabled,
			filter,
			id: props.id,
		});

		const reorder = useReorder({
			values: combobox.selectedValues,
			onReorder: props.onValueChange as (v: string[]) => void,
		});

		const mergedRef = useCallback(
			(node: HTMLInputElement | null) => {
				(
					combobox.inputRef as React.RefObject<HTMLInputElement | null>
				).current = node;
				if (typeof ref === 'function') ref(node);
				else if (ref)
					(ref as React.RefObject<HTMLInputElement | null>).current = node;
			},
			[ref, combobox.inputRef],
		);

		const rootRef = useRef<HTMLDivElement>(null);

		const inputClasses = cn(
			styles.input,
			styles[`size-${size}`],
			styles[`radius-${radius}`],
			{ [styles.error]: error },
		);

		const sharedInputProps = {
			ref: mergedRef,
			id: combobox.id,
			name,
			role: 'combobox' as const,
			value: combobox.inputValue,
			placeholder: combobox.showPlaceholder ? placeholder : undefined,
			disabled,
			required,
			autoComplete: 'off' as const,
			'aria-expanded': combobox.open,
			'aria-controls': combobox.listboxId,
			'aria-activedescendant': combobox.highlightedOptionId,
			'aria-autocomplete': 'list' as const,
			'aria-haspopup': 'listbox' as const,
			'aria-required': required || undefined,
			'aria-invalid': error || undefined,
			onChange: combobox.handleInputChange,
			onFocus: combobox.openDropdown,
			onClick: combobox.handleClick,
			onKeyDown: combobox.handleKeyDown,
		};

		const renderAnchor = () => {
			if (combobox.isMulti) {
				return (
					<PopoverPrimitive.Anchor asChild>
						<div
							className={cn(inputClasses, styles.inputWrapper)}
							onClick={() => {
								combobox.inputRef.current?.focus();
								if (!combobox.open) combobox.openDropdown();
							}}
						>
							{combobox.selectedValues.map((v) => {
								const opt = options.find((o) => o.value === v);
								if (!opt) return null;
								const drag = reorder.getDragState(v);
								return (
									<Chip
										key={v}
										size={chipSizeMap[size]}
										onMouseDown={(e) => e.preventDefault()}
										onClick={(e) => e.stopPropagation()}
										onDismiss={
											disabled ? undefined : () => combobox.handleRemoveValue(v)
										}
										dismissLabel={clearLabel}
										disabled={disabled}
										draggable={!disabled}
										onDragStart={(e) => reorder.handleDragStart(e, v)}
										onDragOver={(e) => reorder.handleDragOver(e, v)}
										onDrop={reorder.handleDrop}
										onDragEnd={reorder.handleDragEnd}
										className={cn({
											[styles.chipDraggable]: !disabled,
											[styles.chipDragging]: drag.isDragging,
											[styles.chipDropBefore]: drag.isDropBefore,
											[styles.chipDropAfter]: drag.isDropAfter,
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

		const comboboxElement = (
			<PopoverPrimitive.Root open={combobox.open}>
				<div
					ref={rootRef}
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
						{combobox.hasValue && !disabled && (
							<InputAction
								aria-label={clearLabel}
								onClick={combobox.handleClear}
								tabIndex={-1}
							>
								<XIcon />
							</InputAction>
						)}
						<InputAction
							aria-label={toggleLabel}
							onClick={() =>
								combobox.open
									? combobox.closeDropdown()
									: combobox.openDropdown()
							}
							onMouseDown={(e) => e.preventDefault()}
							tabIndex={-1}
						>
							<CaretDownIcon
								className={cn(styles.chevron, {
									[styles.chevronOpen]: combobox.open,
								})}
							/>
						</InputAction>
					</span>

					<PopoverPrimitive.Portal>
						<PopoverPrimitive.Content
							className={styles.listbox}
							role="listbox"
							id={combobox.listboxId}
							aria-multiselectable={combobox.isMulti || undefined}
							side="bottom"
							align="start"
							sideOffset={4}
							onOpenAutoFocus={(e) => e.preventDefault()}
							onCloseAutoFocus={(e) => e.preventDefault()}
							onPointerDownOutside={(e) => {
								const target = e.target as HTMLElement;
								/* Only this combobox's own field keeps the dropdown open —
								 * matching any '.ml-combobox' kept it open while the
								 * pointer went to a sibling combobox. */
								if (rootRef.current?.contains(target)) {
									e.preventDefault();
									return;
								}
								combobox.closeDropdown();
							}}
							onFocusOutside={(e) => {
								/* Same rule for keyboard focus — tabbing into a sibling
								 * combobox must close this one too. */
								const target = e.target as HTMLElement;
								if (rootRef.current?.contains(target)) {
									e.preventDefault();
									return;
								}
								combobox.closeDropdown();
							}}
						>
							<ComboboxListbox
								options={combobox.filteredOptions}
								multiple={combobox.isMulti}
								highlightedIndex={combobox.highlightedIndex}
								emptyMessage={emptyMessage}
								listboxId={combobox.listboxId}
								isSelected={combobox.isSelected}
								onSelect={combobox.selectOption}
								onHighlight={combobox.setHighlightedIndex}
							/>
						</PopoverPrimitive.Content>
					</PopoverPrimitive.Portal>
				</div>
			</PopoverPrimitive.Root>
		);

		if (!label) return comboboxElement;

		return (
			<FormField error={errorMessage} className={className}>
				<Label htmlFor={combobox.id} required={required}>
					{label}
				</Label>
				{comboboxElement}
			</FormField>
		);
	},
);
