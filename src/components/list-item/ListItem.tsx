import React, { PropsWithChildren } from 'react';
import styles from './ListItem.module.scss';
import type { ListItemProps } from './types';

const ListItem = ({ children, ...rest }: PropsWithChildren<ListItemProps>) => (
	<li className={styles.root} {...rest}>
		{children}
	</li>
);

export default ListItem;
