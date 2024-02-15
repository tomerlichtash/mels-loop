import React, { PropsWithChildren } from 'react';
import { unique } from 'utils/index';
import Link from '../../link/Link';
import List from '../../list/List';
import ListItem from '../../list-item/ListItem';
import Text from '../../text/Text';
import styles from './ReferenceContentLayout.module.scss';

import type { ReferenceContentLayoutProps } from '../types';

export const ReferenceContentLayout = ({
	caption,
	term,
	title,
	sources,
	sourcesLabel,
	children,
}: PropsWithChildren<ReferenceContentLayoutProps>): JSX.Element => (
	<div className={styles.root}>
		<header className={styles.header}>
			<div role="caption" className={styles.caption}>
				{caption}
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
			{sources.length ? (
				<List role="list" label={sourcesLabel} className={styles.list}>
					{sources.map((source) => (
						<ListItem key={unique.id()}>
							{source.url ? (
								<Link href={source.url} target="_blank">
									{source.name}
								</Link>
							) : (
								<Text variant="body1">{source.name}</Text>
							)}
						</ListItem>
					))}
				</List>
			) : null}
		</footer>
	</div>
);

export default ReferenceContentLayout;
