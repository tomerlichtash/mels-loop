import React, { PropsWithChildren, useMemo } from 'react';
import * as ToggleGroupPrimitives from '@radix-ui/react-toggle-group';
import classNames from 'classnames';
import styles from './ToggleGroup.module.scss';

type ToggleGroupProps = {
	defaultValue: string;
	onSelect?: (val: string) => void;
	type: 'single';
	noEmptyValue?: boolean;
	className?: string;
};

const ToggleGroup = ({
	defaultValue,
	type,
	onSelect,
	noEmptyValue = true,
	children,
	className,
}: PropsWithChildren<ToggleGroupProps>): JSX.Element => {
	const childrenWithProps = useMemo(
		() =>
			React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					const isDisabled =
						child.props.disabled || noEmptyValue
							? child.props['data-value'] === defaultValue
							: false;
					return (
						<ToggleGroupPrimitives.Item
							className={styles.item}
							value={child.props['data-value']}
							asChild
							disabled={isDisabled}
						>
							{React.cloneElement(child, {})}
						</ToggleGroupPrimitives.Item>
					);
				}
				return child;
			}),
		[children, defaultValue, noEmptyValue]
	);

	return (
		<ToggleGroupPrimitives.Root
			type={type}
			defaultValue={defaultValue}
			onValueChange={(val) => {
				console.log(defaultValue);
				val && onSelect(val);
			}}
			className={classNames(styles.root, className)}
		>
			{childrenWithProps}
		</ToggleGroupPrimitives.Root>
	);
};

export default ToggleGroup;
export type { ToggleGroupProps };
