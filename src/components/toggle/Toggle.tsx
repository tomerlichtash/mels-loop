import React, { PropsWithChildren } from 'react';
import * as ToggleRoot from '@radix-ui/react-toggle';
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
	<div className={styles.root}>
		<ToggleRoot.Root
			onPressedChange={onToggle}
			defaultPressed={isToggled}
			title={title}
			className={classNames(styles.root, className)}
			{...rest}
		>
			{children}
		</ToggleRoot.Root>
	</div>
);

export default Toggle;
export type { ToggleProps };
