import React, { PropsWithChildren } from 'react';
import * as ToggleRoot from '@radix-ui/react-toggle';

import { Button } from '@components/index';
import classNames from 'classnames';
import styles from './Toggle.module.scss';

type ToggleProps = {
	title: string;
	isToggled: boolean;
	onToggle: () => void;
	className?: string;
};

const Toggle = ({
	isToggled,
	title,
	children,
	onToggle,
	className,
	...rest
}: PropsWithChildren<ToggleProps>): JSX.Element => (
	<Button asChild className={styles.root}>
		<ToggleRoot.Root
			onPressedChange={onToggle}
			defaultPressed={isToggled}
			title={title}
			className={classNames(styles.root, className)}
			{...rest}
		>
			{children}
		</ToggleRoot.Root>
	</Button>
);

export default Toggle;
