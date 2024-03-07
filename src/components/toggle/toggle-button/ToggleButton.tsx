import React, { PropsWithChildren } from 'react';
import * as ToggleRoot from '@radix-ui/react-toggle';
import classNames from 'classnames';
import styles from './ToggleButton.module.scss';

type ToggleButtonProps = {
	title: string;
	isToggled: boolean;
	onClick?: () => void;
	className?: string;
};

const ToggleButton = ({
	isToggled,
	title,
	children,
	onClick,
	className,
	...rest
}: PropsWithChildren<ToggleButtonProps>): JSX.Element => (
	<div className={styles.root}>
		<ToggleRoot.Root
			onPressedChange={onClick}
			defaultPressed={isToggled}
			title={title}
			className={classNames(styles.root, className)}
			asChild
			{...rest}
		>
			<span className={styles.item}>{children}</span>
		</ToggleRoot.Root>
	</div>
);

export default ToggleButton;
export type { ToggleButtonProps };
