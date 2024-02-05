import React, { useMemo } from 'react';
import { Text } from '../text';
import { Link } from '../link';
import styles from './TextLink.module.scss';
import type { TextLinkProps } from './types';

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
