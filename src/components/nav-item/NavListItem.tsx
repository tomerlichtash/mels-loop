import Link from 'next/link';
import { Button } from '../button';
import classNames from 'classnames';
import styles from './NavListItem.module.scss';
import { PropsWithChildren } from 'react';
import type { NavListItemProps } from './types';
import type { NavItemDataProps } from '../HorizontalMenu/types';

const NavListItem = ({
	url,
	target,
	children,
	className,
	onClick,
}: PropsWithChildren<NavListItemProps & NavItemDataProps>) => (
	<Button
		className={classNames(styles.root, className)}
		onClick={onClick}
		asChild
	>
		<Link href={url} target={target}>
			<span className={classNames(styles.content)}>{children}</span>
		</Link>
	</Button>
);

export default NavListItem;
