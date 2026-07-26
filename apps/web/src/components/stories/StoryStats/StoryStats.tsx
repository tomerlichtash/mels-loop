import styles from './StoryStats.module.css';

export interface Stat {
	label: string;
	count: number;
}

/**
 * What a story holds: how much there is to read, and how much it rests on.
 *
 * Shared by the featured panel and the cards under it. The two rendered the
 * same counts from their own copies of this markup, in different places — the
 * featured one over its cover image, which needed a scrim to stay readable and
 * put text across the subject of the picture. They sit under the abstract in
 * both now.
 */
export function StoryStats({ stats }: { stats: Stat[] }) {
	if (stats.length === 0) return null;

	return (
		<div className={styles.root}>
			{stats.map((stat) => (
				<span key={stat.label} className={styles.stat}>
					<span className={styles.count}>{stat.count}</span>
					{stat.label}
				</span>
			))}
		</div>
	);
}
