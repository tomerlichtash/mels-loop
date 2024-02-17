import React, { PropsWithChildren, type SyntheticEvent } from 'react';
import NextLink from 'next/link';
import Button from '../button/Button';
import styles from './Link.module.scss';
import { Slot } from '@radix-ui/react-slot';

type LinkTargetProps = string;

type LinkProps = {
	label?: string;
	title?: string;
	href?: string;
	target?: string;
	asChild?: boolean;
	onClick?: (e: SyntheticEvent) => void;
	className?: string;
};

const Link = ({
	label,
	title,
	href,
	target,
	asChild,
	onClick,
	children,
}: PropsWithChildren<LinkProps>): JSX.Element => {
	const Comp = asChild ? Slot : Button;

	return (
		<Comp onClick={onClick} className={styles.root} asChild title={title}>
			<NextLink href={href} target={target}>
				{children || label}
			</NextLink>
		</Comp>
	);
};

export default Link;
export type { LinkProps, LinkTargetProps };
