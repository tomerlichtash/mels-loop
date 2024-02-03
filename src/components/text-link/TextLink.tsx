import React, { useMemo } from 'react';
import { Text, Link } from '@components/index';
import styles from './TextLink.module.scss';
import type { TextVariant } from '../text/Text';

type TextLinkProps = {
	label?: string;
	linked?: boolean;
	className?: string;
	variant?: TextVariant;
};

const TextLink = ({ linked, label, variant }: TextLinkProps): JSX.Element => {
	const text = useMemo(
		() => (
			<Text variant={variant} className={styles.label}>
				{label}
			</Text>
		),
		[label, variant]
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
			title={label}
			aria-label={label}
			className={styles.root}
			data-variant={variant}
		>
			{linked ? link : text}
		</div>
	);
};

export default TextLink;
