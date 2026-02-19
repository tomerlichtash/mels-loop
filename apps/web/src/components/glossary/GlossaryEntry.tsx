import { Card, Text, Group } from '@mels-loop/ui/primitives';
import styles from './GlossaryEntry.module.css';

interface GlossaryEntryProps {
	slug: string;
	locale: string;
}

export function GlossaryEntry({ slug }: GlossaryEntryProps) {
	const displayName = slug
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());

	return (
		<Card withBorder padding="sm">
			<Group justify="space-between">
				<Text weight={500} component="span">
					{displayName}
				</Text>
				<a href={`/glossary/${slug}`} className={styles.link}>
					View
				</a>
			</Group>
		</Card>
	);
}
