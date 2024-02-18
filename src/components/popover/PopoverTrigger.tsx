import React, { PropsWithChildren } from 'react';
import styles from './PopoverTrigger.module.scss';
import classNames from 'classnames';

type PopoverTriggerProps = {
	opened?: boolean;
	className?: string;
};

const PopoverTrigger = ({
	opened,
	children,
	className,
}: PropsWithChildren<PopoverTriggerProps>): JSX.Element => (
	<span
		data-popover-state={opened ? 'open' : 'closed'}
		className={classNames(styles.root, className)}
	>
		{children}
	</span>
);

export default PopoverTrigger;
