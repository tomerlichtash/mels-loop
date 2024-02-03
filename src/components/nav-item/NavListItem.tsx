import Link from 'next/link';
import { Button } from '@components/index';
import classNames from 'classnames';
import styles from './NavListItem.module.scss';
import { PropsWithChildren } from 'react';
import { NavItemDataProps } from '@components/HorizontalMenu/types';

type NavListItemProps = {
	onClick?: () => void;
	className?: string;
};

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
