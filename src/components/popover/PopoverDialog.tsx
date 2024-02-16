import React, { PropsWithChildren } from 'react';
import styles from './PopoverDialog.module.scss';
import type { PopoverDialogProps } from './types';

const PopoverDialog = ({ children }: PropsWithChildren<PopoverDialogProps>) => {
	return <div className={styles.root}>{children}</div>;
};

export default PopoverDialog;
