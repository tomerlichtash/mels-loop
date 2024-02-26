import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { unique } from 'utils/index';
import Link from '../link/Link';
import Text from '../text/Text';
import ListItem, { ListItemProps } from '../list-item/ListItem';
import classNames from 'classnames';
import styles from './List.module.scss';

type ListProps = {
	items?: ListItemProps[];
	label?: string;
	ordered?: boolean;
	className?: string;
};

const renderListItems = (items: ListItemProps[]) =>
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
	ordered,
	children,
	className,
}: PropsWithChildren<ListProps> &
	HTMLAttributes<HTMLDivElement>): JSX.Element => {
	const Tag = ordered ? 'ol' : 'ul';
	return (
		<div className={classNames(styles.root, className)}>
			{label && <Text className={styles.label}>{label}</Text>}
			<Tag className={styles.items}>{children || renderListItems(items)}</Tag>
		</div>
	);
};

export default List;
