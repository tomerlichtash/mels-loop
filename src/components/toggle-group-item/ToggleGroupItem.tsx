import React, { PropsWithChildren } from 'react';
import * as ToggleGroupRoot from '@radix-ui/react-toggle-group';

import { Button } from '@components/index';
import classNames from 'classnames';
import styles from './ToggleGroupItem.module.scss';

export type ToggleGroupItemProps = {
	title: string;
	value: string;
	className?: string;
};

const ToggleGroupItem = ({
	title,
	value,
	children,
	className,
	...rest
}: PropsWithChildren<ToggleGroupItemProps>): JSX.Element => (
	<Button
		asChild
		title={title}
		aria-label={title}
		className={classNames(styles.root, className)}
	>
		<ToggleGroupRoot.ToggleGroupItem value={value} {...rest}>
			{children}
		</ToggleGroupRoot.ToggleGroupItem>
	</Button>
);

export default ToggleGroupItem;