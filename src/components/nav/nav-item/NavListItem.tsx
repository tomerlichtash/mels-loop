/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import Button from '../../button/Button';
import classNames from 'classnames';
import styles from './NavListItem.module.scss';
import { PropsWithChildren } from 'react';
import type { NavItemDataProps } from '../types';

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
export type { NavListItemProps };
