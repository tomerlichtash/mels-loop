'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import styles from './StoryNav.module.css';

interface StoryNavProps {
	storySlug: string;
	sections: string[];
}

const sectionLabels: Record<string, Record<string, string>> = {
	articles: { en: 'Articles', he: 'מאמרים' },
	codex: { en: 'Codex', he: 'קודקס' },
	resources: { en: 'Resources', he: 'מקורות' },
};

export function StoryNav({ storySlug, sections }: StoryNavProps) {
	const { locale } = useTranslation();

	return (
		<nav className={styles.nav}>
			{sections.map((section) => (
				<a
					key={section}
					href={`/stories/${storySlug}/${section}`}
					className={styles.link}
				>
					{sectionLabels[section]?.[locale] || section}
				</a>
			))}
		</nav>
	);
}
