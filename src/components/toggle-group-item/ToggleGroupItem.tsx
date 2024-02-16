import React, { PropsWithChildren } from 'react';
import * as ToggleGroupRoot from '@radix-ui/react-toggle-group';
import Button from '../button/Button';
import classNames from 'classnames';
import styles from './ToggleGroupItem.module.scss';

type ToggleGroupItemProps = {
	title: string;
	value: string;
	className?: string;
};

const ToggleGroupItem = ({
	title,
	value,
	children,
	className,
}: PropsWithChildren<ToggleGroupItemProps>): JSX.Element => (
	<Button
		asChild
		title={title}
		aria-label={title}
		className={classNames(styles.root, className)}
	>
		<ToggleGroupRoot.ToggleGroupItem value={value}>
			{children}
		</ToggleGroupRoot.ToggleGroupItem>
	</Button>
);

export default ToggleGroupItem;
export type { ToggleGroupItemProps };
