import React, { PropsWithChildren, type SyntheticEvent } from 'react';
import NextLink from 'next/link';
import Button from '../button/Button';
import styles from './Link.module.scss';

type LinkTargetProps = string;

type LinkProps = {
	label?: string;
	title?: string;
	href?: string;
	target?: string;
	onClick?: (e: SyntheticEvent) => void;
	className?: string;
};

const Link = ({
	label,
	title,
	href,
	target,
	onClick,
	children,
}: PropsWithChildren<LinkProps>): JSX.Element => (
	<Button onClick={onClick} className={styles.root} asChild title={title}>
		<NextLink href={href} target={target}>
			{children || label}
		</NextLink>
	</Button>
);

export default Link;
export type { LinkProps, LinkTargetProps };
