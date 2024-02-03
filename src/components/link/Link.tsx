import React, { PropsWithChildren, SyntheticEvent } from 'react';
import NextLink from 'next/link';
import Button from '../button';
import styles from './Link.module.scss';

type LinkProps = {
	title?: string;
	href?: string;
	target?: string;
	onClick?: (e: SyntheticEvent) => void;
	className?: string;
};

export const Link = ({
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

	// <NextLink
	// 	title={title}
	// 	aria-label={title}
	// 	href={href}
	// 	target={target}
	// 	className={classNames(styles.root, className)}
	// >
	// 	{children}
	// </NextLink>
);

export default Link;
