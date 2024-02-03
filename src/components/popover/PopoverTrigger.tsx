import React, { PropsWithChildren } from 'react';
import styles from './PopoverTrigger.module.scss';

type PopoverTriggerProps = {
	className?: string;
};

export const PopoverTrigger = ({
	children,
}: PropsWithChildren<PopoverTriggerProps>): JSX.Element => (
	<span className={styles.root}>{children}</span>
);

export default PopoverTrigger;
