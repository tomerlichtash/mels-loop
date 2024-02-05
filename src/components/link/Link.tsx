import React, { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { Button } from '../button';
import styles from './Link.module.scss';
import type { LinkProps } from './types';

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
