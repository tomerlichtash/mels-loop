import React, { PropsWithChildren, SyntheticEvent } from 'react';
import NextLink from 'next/link';
import { Button } from '../button';
import styles from './Link.module.scss';

export type LinkTarget = '_blank' | null;

export type LinkProps = {
	title?: string;
	href?: string;
	target?: LinkTarget;
	onClick?: (e: SyntheticEvent) => void;
	className?: string;
};

const Link = ({
	title,
	href,
	target,
	onClick,
	children,
}: PropsWithChildren<LinkProps>): JSX.Element => (
	<Button onClick={onClick} className={styles.root} asChild title={title}>
		<NextLink href={href} target={target}>
			{children}
		</NextLink>
	</Button>
);

export default Link;
