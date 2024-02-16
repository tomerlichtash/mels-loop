import React, { PropsWithChildren } from 'react';
import styles from './ListItem.module.scss';
import type { LinkTargetProps } from '../link/Link';

type ListItemProps = {
	label?: string;
	url?: string;
	target?: LinkTargetProps;
	className?: string;
};

const ListItem = ({ children, ...rest }: PropsWithChildren<ListItemProps>) => (
	<li className={styles.root} {...rest}>
		{children}
	</li>
);

export default ListItem;
export type { ListItemProps };
