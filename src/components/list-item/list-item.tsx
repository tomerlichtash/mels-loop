import React, { PropsWithChildren } from 'react';
import styles from './list-item.module.scss';

type ListItemProps = {
	className?: string;
};

export const ListItem = ({
	children,
	...rest
}: PropsWithChildren<ListItemProps>) => (
	<li className={styles.root} {...rest}>
		{children}
	</li>
);

export default ListItem;
