import React, { HTMLAttributes, PropsWithChildren } from 'react';
import Link from '../link';
import classNames from 'classnames';
import styles from './List.module.scss';
import Text from '../text';
import ListItem from '@components/list-item';
import { unique } from 'lib/utils';

export type ListItemProps = {
	label?: string;
	url?: string;
	target?: string;
};

type ListProps = {
	label?: string;
	items?: ListItemProps[];
	className?: string;
};

const renderListItems = (items) =>
	items.map(({ label, target, url }) => {
		return (
			<ListItem key={unique.id()} className={styles.item}>
				{url ? (
					<Link href={url} target={target} className={styles.link}>
						{label}
					</Link>
				) : (
					label
				)}
			</ListItem>
		);
	});

const List = ({
	items,
	label,
	children,
	className,
	...rest
}: PropsWithChildren<ListProps> &
	HTMLAttributes<HTMLDivElement>): JSX.Element => (
	<div className={classNames(styles.root, className)} {...rest}>
		{label && <Text className={styles.label}>{label}</Text>}
		<ul className={styles.list}>{children || renderListItems(items)}</ul>
	</div>
);

export default List;
