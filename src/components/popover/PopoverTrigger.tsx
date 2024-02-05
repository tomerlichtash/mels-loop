import React, { PropsWithChildren } from 'react';
import styles from './PopoverTrigger.module.scss';

export type PopoverTriggerProps = {
	className?: string;
};

const PopoverTrigger = ({
	children,
}: PropsWithChildren<PopoverTriggerProps>): JSX.Element => (
	<span className={styles.root}>{children}</span>
);

export default PopoverTrigger;
