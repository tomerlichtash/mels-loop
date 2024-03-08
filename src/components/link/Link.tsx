import React, { PropsWithChildren, type SyntheticEvent } from 'react';
import NextLink from 'next/link';
import styles from './Link.module.scss';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';

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
	className,
}: PropsWithChildren<LinkProps>): JSX.Element => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			onClick={onClick}
			className={classNames(styles.root, className)}
			title={title}
		>
			<NextLink
				href={href}
				target={target}
			>
				{children || label}
			</NextLink>
		</Comp>
	);
};

export default Link;
export type { LinkProps, LinkTargetProps };
