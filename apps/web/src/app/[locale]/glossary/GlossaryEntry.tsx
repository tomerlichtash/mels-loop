import { Card, Container, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import styles from './GlossaryEntry.module.css';

interface GlossaryEntryProps {
	slug: string;
}

export function GlossaryEntry({ slug }: GlossaryEntryProps) {
	const displayName = slug
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());

	return (
		<Card variant="outlined" padding="sm">
			<Container direction="row" justify="between">
				<Text weight={500} component="span">
					{displayName}
				</Text>
				<Link href={`/glossary/${slug}`} className={styles.link}>
					View
				</Link>
			</Container>
		</Card>
	);
}
