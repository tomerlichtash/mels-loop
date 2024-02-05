import React, { PropsWithChildren, SyntheticEvent } from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import styles from './Button.module.scss';
import type { ButtonProps } from './types';

const Button = ({
	asChild,
	children,
	className,
	title,
	onClick,
	...props
}: PropsWithChildren<ButtonProps>) => {
	const Comp = asChild && typeof children !== 'string' ? Slot : 'button';

	return (
		<Comp
			className={classNames(styles.root, className)}
			onClick={(e: SyntheticEvent) => onClick?.(e)}
			title={title}
			{...props}
		>
			{children}
		</Comp>
	);
};

export default Button;
