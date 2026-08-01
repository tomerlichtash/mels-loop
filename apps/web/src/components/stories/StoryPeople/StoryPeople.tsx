import { Avatar } from '@mels-loop/ui/primitives';
import Image from 'next/image';

import styles from './StoryPeople.module.css';

export interface StoryPerson {
	href: string;
	name: string;
	/** The story-scoped alias ("The Big Boss") or the localized role. */
	subtitle?: string;
	avatarUrl?: string;
}

interface StoryPeopleProps {
	label: string;
	people: StoryPerson[];
}

/**
 * The story's people, in the aside — the involvement edges made visible.
 * Membership comes from story.json's `entities` roles, never from the text;
 * each row leads to the person's own page in the archive.
 */
export function StoryPeople({ label, people }: StoryPeopleProps) {
	if (people.length === 0) return null;

	return (
		<nav className={styles.root} aria-label={label}>
			<p className={styles.label}>{label}</p>
			<ul className={styles.list}>
				{people.map((person) => (
					<li key={person.href}>
						<a href={person.href} className={styles.row}>
							<Avatar
								size="sm"
								alt=""
								fallback={person.name
									.split(' ')
									.map((part) => part[0])
									.slice(0, 2)
									.join('')}
								image={
									person.avatarUrl ? (
										<Image
											src={person.avatarUrl}
											alt=""
											width={64}
											height={64}
											className={styles.avatarImage}
										/>
									) : undefined
								}
							/>
							<span className={styles.text}>
								<span className={styles.name}>{person.name}</span>
								{person.subtitle && (
									<span className={styles.subtitle}>{person.subtitle}</span>
								)}
							</span>
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
