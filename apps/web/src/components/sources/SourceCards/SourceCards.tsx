'use client';

import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-loaders/types';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Card,
	CardActions,
	CardBody,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
} from '@mels-loop/ui/primitives';
import { ClipboardCopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import styles from './SourceCards.module.css';

interface SourceGroup {
	type: SourceType;
	label: string;
	sources: ResolvedSource[];
}

interface SourceCardsProps {
	groups: SourceGroup[];
	locale: string;
	dir: 'ltr' | 'rtl';
}

function SourceCard({
	source,
	locale,
}: {
	source: ResolvedSource;
	locale: string;
}) {
	const [copied, setCopied] = useState(false);

	const handleCopyId = () => {
		navigator.clipboard.writeText(source.id);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	const hasImage = source.type === 'image' && source.url;
	const description = source.description || source.summary;

	return (
		<Card interactive href={`/${locale}/sources/${source.id}`}>
			{hasImage && <CardMedia src={source.url} alt={source.title} />}
			<CardHeader>
				<h3 className={styles.cardTitle}>{source.title}</h3>
			</CardHeader>
			{source.summary && <CardBody>{source.summary}</CardBody>}
			{description && description !== source.summary && (
				<CardContent>
					<p className={styles.cardDesc}>{description}</p>
				</CardContent>
			)}
			{source.date && (
				<CardContent>
					<span className={styles.metaItem}>
						<span className={styles.metaLabel}>Date</span>
						{source.date}
					</span>
				</CardContent>
			)}
			<CardActions align="start">
				<Button variant="text" size="xs" onClick={handleCopyId}>
					<ClipboardCopyIcon />
					{copied ? 'Copied!' : 'Copy ID'}
				</Button>
				{source.url && (
					<a
						href={source.url}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.action}
					>
						<ExternalLinkIcon />
						Open source
					</a>
				)}
			</CardActions>
		</Card>
	);
}

export function SourceCards({ groups, locale, dir }: SourceCardsProps) {
	const searchParams = useSearchParams();
	const activeType = searchParams.get('type') as SourceType | null;
	const search = searchParams.get('q') ?? '';

	const filteredGroups = useMemo(() => {
		const visible = activeType
			? groups.filter((g) => g.type === activeType)
			: groups;
		const sorted = visible.map((g) => ({
			...g,
			sources: [...g.sources].sort((a, b) =>
				(b.date ?? '').localeCompare(a.date ?? ''),
			),
		}));
		if (!search.trim()) return sorted;
		const q = search.toLowerCase();
		return sorted
			.map((g) => ({
				...g,
				sources: g.sources.filter(
					(s) =>
						s.title.toLowerCase().includes(q) ||
						s.summary?.toLowerCase().includes(q) ||
						s.description?.toLowerCase().includes(q) ||
						s.tags?.some((t) => t.toLowerCase().includes(q)),
				),
			}))
			.filter((g) => g.sources.length > 0);
	}, [groups, activeType, search]);

	const filteredCount = filteredGroups.reduce(
		(sum, g) => sum + g.sources.length,
		0,
	);

	return (
		<>
			{search.trim() && (
				<p className={styles.resultCount}>
					{filteredCount} {filteredCount === 1 ? 'result' : 'results'}
				</p>
			)}
			<div dir={dir}>
				<Accordion type="multiple" defaultValue={[]}>
					{filteredGroups.map((group) => (
						<AccordionItem key={group.type} value={group.type}>
							<AccordionTrigger>
								{group.label}
								<span className={styles.groupCount}>
									({group.sources.length})
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<Grid columns={3} gap="md">
									{group.sources.map((source) => (
										<SourceCard
											key={source.id}
											source={source}
											locale={locale}
										/>
									))}
								</Grid>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</>
	);
}
