import React, { PropsWithChildren } from 'react';
import styles from './PopoverTrigger.module.scss';
import type { PopoverTriggerProps } from './types';

const PopoverTrigger = ({
	children,
	...rest
}: PropsWithChildren<PopoverTriggerProps>): JSX.Element => (
	<span className={styles.root} {...rest}>
		{children}
	</span>
);

export default PopoverTrigger;
