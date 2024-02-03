import React, { PropsWithChildren, SyntheticEvent } from 'react';
import styles from './PopoverCloseButton.module.scss';
import { Button } from '..';

export type PopoverCloseButtonProps = {
	onClick: (e: SyntheticEvent) => void;
	className?: string;
};

export const PopoverCloseButton = ({
	onClick,
	children,
}: PropsWithChildren<PopoverCloseButtonProps>) => {
	return (
		<Button className={styles.root} onClick={onClick} asChild>
			{children}
		</Button>
	);
};

export default PopoverCloseButton;
