import React, { PropsWithChildren, useMemo } from 'react';
import Text, { type TextVariant } from '../text/Text';
import Link from '../link/Link';
import styles from './TextLink.module.scss';
import classNames from 'classnames';

export type TextLinkProps = {
	title?: string;
	linked?: boolean;
	variant?: TextVariant;
	className?: string;
};

const TextLink = ({
	title,
	linked,
	variant,
	children,
	className,
}: PropsWithChildren<TextLinkProps>): JSX.Element => {
	const text = useMemo(
		() => (
			<Text variant={variant} className={styles.label}>
				{children}
			</Text>
		),
		[children, variant]
	);

	const link = useMemo(
		() => (
			<Link href="/" className={styles.link}>
				{text}
			</Link>
		),
		[text]
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
