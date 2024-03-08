import React, { PropsWithChildren } from 'react';
import styles from './PopoverDialog.module.scss';
import classNames from 'classnames';

type PopoverDialogProps = {
	className?: string;
};

const PopoverDialog = ({ className, children }: PropsWithChildren<PopoverDialogProps>) => {
	return <div className={classNames(styles.root, className)}>{children}</div>;
};

export default PopoverDialog;
