import React, { PropsWithChildren } from 'react';
import styles from './ListItem.module.scss';
import { LinkTarget } from '../link';

type ListItemProps = {
	label?: string;
	url?: string;
	target?: LinkTarget;
	className?: string;
};

const ListItem = ({ children, ...rest }: PropsWithChildren<ListItemProps>) => (
	<li className={styles.root} {...rest}>
		{children}
	</li>
);

export default ListItem;

export type { ListItemProps };
