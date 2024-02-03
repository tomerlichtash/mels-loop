import React, { PropsWithChildren } from 'react';
import styles from './PopoverToolbar.module.scss';

type PopoverToolbarProps = {
	className?: string;
};

export const PopoverToolbar = ({
	children,
}: PropsWithChildren<PopoverToolbarProps>): JSX.Element => (
	<div className={styles.root}>{children}</div>
);

export default PopoverToolbar;
