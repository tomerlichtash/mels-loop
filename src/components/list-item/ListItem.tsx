import React, { forwardRef, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './ListItem.module.scss';
import type { LinkTargetProps } from '../link/Link';

type ListItemProps = {
	label?: string;
	url?: string;
	target?: LinkTargetProps;
	className?: string;
};

const ListItem = forwardRef<HTMLLIElement, PropsWithChildren<ListItemProps>>(
	({ children, className, ...rest }: PropsWithChildren<ListItemProps>, ref) => (
		<li
			ref={ref}
			className={classNames(styles.root, className)}
			{...rest}
		>
			{children}
		</li>
	)
);

ListItem.displayName = 'ListItem';

export default ListItem;
export type { ListItemProps };
