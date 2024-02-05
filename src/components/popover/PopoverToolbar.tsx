import React, { PropsWithChildren } from 'react';
import styles from './PopoverToolbar.module.scss';

export type PopoverToolbarProps = {
	className?: string;
};

const PopoverToolbar = ({
	children,
}: PropsWithChildren<PopoverToolbarProps>): JSX.Element => (
	<div className={styles.root}>{children}</div>
);

export default PopoverToolbar;
