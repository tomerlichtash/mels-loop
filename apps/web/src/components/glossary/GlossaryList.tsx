import { Stack } from '@mels-loop/ui/primitives';
import { GlossaryEntry } from './GlossaryEntry';

interface GlossaryListProps {
	slugs: string[];
	locale: string;
}

export function GlossaryList({ slugs, locale }: GlossaryListProps) {
	return (
		<Stack gap="sm">
			{slugs.sort().map((slug) => (
				<GlossaryEntry key={slug} slug={slug} locale={locale} />
			))}
		</Stack>
	);
}
