import React, { PropsWithChildren } from 'react';
import styles from './PopoverDialog.module.scss';

export type PopoverDialogProps = {
	className?: string;
};

export const PopoverDialog = ({
	children,
}: PropsWithChildren<PopoverDialogProps>) => {
	return <div className={styles.root}>{children}</div>;
};

export default PopoverDialog;
