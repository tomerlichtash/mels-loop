import React, { PropsWithChildren } from 'react';
import { unique } from 'lib/utils';
import { Link } from '../../link';
import { List } from '../../list';
import { ListItem } from '../../list-item';
import { Text } from '../../text';
import styles from './ReferenceContentLayout.module.scss';

import type { ReferenceContentLayoutProps } from '../types';

export const ReferenceContentLayout = ({
	label,
	term,
	title,
	sources,
	sourcesLabel,
	children,
}: PropsWithChildren<ReferenceContentLayoutProps>): JSX.Element => (
	<div className={styles.root}>
		<header className={styles.header}>
			<div role="caption" className={styles.caption}>
				{label}
			</div>
			<div role="term" className={styles.term}>
				{title}
			</div>
			<div role="definition" className={styles.defintion}>
				{term}
			</div>
		</header>
		<main role="note" className={styles.content}>
			{children}
		</main>
		<footer className={styles.footer}>
			{sources.length > 0 ? (
				<List role="list" label={sourcesLabel} className={styles.list}>
					{sources.map((source) => (
						<ListItem key={unique.id()}>
							{source.url ? (
								<Link href={source.url} target={source.target}>
									{source.label}
								</Link>
							) : (
								<Text variant="body1">{source.label}</Text>
							)}
						</ListItem>
					))}
				</List>
			) : null}
		</footer>
	</div>
);

export default ReferenceContentLayout;
