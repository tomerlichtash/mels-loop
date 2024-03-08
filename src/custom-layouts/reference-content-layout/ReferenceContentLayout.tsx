import React, { PropsWithChildren } from 'react';
import { Link, List, ListItem, Text } from '../../components/index';
import styles from './ReferenceContentLayout.module.scss';
import type { RefOrSourceProps } from 'types/components';

type ReferenceContentLayoutProps = {
	term: string;
	caption?: string;
	title?: string;
	sources?: RefOrSourceProps[];
	sourcesLabel?: string;
	className?: string;
};

export const ReferenceContentLayout = ({
	caption,
	term,
	title,
	sources,
	sourcesLabel,
	children,
}: PropsWithChildren<ReferenceContentLayoutProps>): JSX.Element => (
	<article className={styles.root}>
		<header className={styles.header}>
			<div role="caption" className={styles.caption}>
				<span className={styles.label}>{caption}</span>
			</div>
			<div role="term" className={styles.term}>
				{title}
			</div>
			<div role="definition" className={styles.definition}>
				{term}
			</div>
		</header>

		<main role="note" className={styles.content}>
			{children}
		</main>

		<footer className={styles.footer}>
			{sources.length ? (
				<List role="list" label={sourcesLabel} className={styles.sources}>
					{sources.map((source) => (
						<ListItem key={`list-item-${source.name}`}>
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
	</article>
);

export default ReferenceContentLayout;
export type { ReferenceContentLayoutProps };
