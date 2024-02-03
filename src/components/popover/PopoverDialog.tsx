import React, { PropsWithChildren } from 'react';
import styles from './PopoverDialog.module.scss';

export type PopoverDialogProps = {
	className?: string;
};

export const PopoverDialog = ({
	children,
	...rest
}: PropsWithChildren<PopoverDialogProps>) => {
	return (
		<div className={styles.root} {...rest}>
			{children}
		</div>
	);
};

export default PopoverDialog;
