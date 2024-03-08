import React, { PropsWithChildren, useMemo } from 'react';
import Text, { HeadingVariant, SubtitleVariant, type TextVariant } from '../text/Text';
import Link from '../link/Link';
import styles from './TextLink.module.scss';
import classNames from 'classnames';

export type TextLinkProps = {
	href: string;
	title?: string;
	linked?: boolean;
	variant?: TextVariant | HeadingVariant | SubtitleVariant;
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
	const text = useMemo(
		() => (
			<Text
				variant={variant}
				className={styles.label}
			>
				{children}
			</Text>
		),
		[children, variant]
	);

	const link = useMemo(
		() => (
			<Link
				href={href}
				className={styles.link}
				asChild={asChild}
			>
				{text}
			</Link>
		),
		[href, text, asChild]
	);

	return (
		<span
			title={title}
			aria-label={title}
			className={classNames(styles.root, className)}
			data-variant={variant}
		>
			{linked ? link : text}
		</span>
	);
};

export default TextLink;
