import React, { PropsWithChildren } from 'react';
import * as ToggleGroupPrimitives from '@radix-ui/react-toggle-group';
import { ToggleGroupItemProps } from './toggle-group-item/ToggleGroupItem';
import classNames from 'classnames';
import styles from './ToggleGroup.module.scss';

type ToggleGroupProps = {
	defaultValue: string;
	options?: ToggleGroupItemProps[];
	onSelect?: (val: string) => void;
	type: 'single';
	className?: string;
};

const ToggleGroupRoot = ToggleGroupPrimitives.Root;

const ToggleGroup = ({
	defaultValue,
	type,
	onSelect,
	children,
	className,
}: PropsWithChildren<ToggleGroupProps>): JSX.Element => (
	<ToggleGroupRoot
		type={type}
		defaultValue={defaultValue}
		onValueChange={onSelect}
		className={classNames(styles.root, className)}
	>
		{children}
	</ToggleGroupRoot>
);

export default ToggleGroup;
export type { ToggleGroupProps };
