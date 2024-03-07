import React, { PropsWithChildren, useMemo } from 'react';
import * as ToggleGroupPrimitives from '@radix-ui/react-toggle-group';
// import { ToggleGroupItemProps } from './toggle-group-item/ToggleGroupItem';
import classNames from 'classnames';
import styles from './ToggleGroup.module.scss';

type ToggleGroupProps = {
	defaultValue: string;
	// options?: ToggleGroupItemProps[];
	onSelect?: (val: string) => void;
	type: 'single';
	className?: string;
};

const ToggleGroup = ({
	defaultValue,
	type,
	onSelect,
	children,
	className,
}: PropsWithChildren<ToggleGroupProps>): JSX.Element => {
	const childrenWithProps = useMemo(
		() =>
			React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return (
						<ToggleGroupPrimitives.Item
							className={styles.item}
							value={child.props['data-value']}
							asChild
						>
							{React.cloneElement(child, {})}
						</ToggleGroupPrimitives.Item>
					);
				}
				return child;
			}),
		[children]
	);

	return (
		<ToggleGroupPrimitives.Root
			type={type}
			defaultValue={defaultValue}
			onValueChange={onSelect}
			className={classNames(styles.root, className)}
		>
			{childrenWithProps}
		</ToggleGroupPrimitives.Root>
	);
};

export default ToggleGroup;
export type { ToggleGroupProps };
