import React, { PropsWithChildren, useMemo } from 'react';
import Text, { type TextVariant } from '../text/Text';
import Link from '../link/Link';
import styles from './TextLink.module.scss';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';

export type TextLinkProps = {
	href: string;
	title?: string;
	linked?: boolean;
	variant?: TextVariant;
	asChild?: boolean;
	className?: string;
};

const TextLink = ({
	href,
	title,
	linked,
	variant,
	children,
	asChild,
	className,
}: PropsWithChildren<TextLinkProps>): JSX.Element => {
	const Comp = asChild ? Slot : 'span';

	const text = useMemo(
		() => (
			<Text variant={variant} className={styles.label}>
				<Comp>{children}</Comp>
			</Text>
		),
		[Comp, children, variant]
	);

	const link = useMemo(
		() => (
			<Link href={href} className={styles.link}>
				<Comp>{text}</Comp>
			</Link>
		),
		[href, Comp, text]
	);

	return (
		<div
			title={title}
			aria-label={title}
			className={classNames(styles.root, className)}
			data-variant={variant}
		>
			{linked ? link : text}
		</div>
	);
};

export default TextLink;
