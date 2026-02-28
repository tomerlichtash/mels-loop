'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { Loader, Popover } from '@mels-loop/ui/primitives';
import { useMemo } from 'react';

import { ContentRenderer } from '../../../renderer/core/ContentRenderer';
import { useContent } from '../../hooks/useContent';
import { useContentPopover } from '../../hooks/useContentPopover';
import { useAnnotations } from '../../providers/PopoverProvider';
import { InternalLink } from '../../shared/InternalLink/InternalLink';
import { NavBar } from '../../shared/NavBar/NavBar';
import styles from './GlossaryPopover.module.css';

interface GlossaryPopoverProps {
	term: string;
	label?: React.ReactNode;
	children: React.ReactNode;
}

export function GlossaryPopover({
	term,
	label,
	children,
}: GlossaryPopoverProps) {
	const { locale } = useTranslation();
	const { glossary, loadingKeys, loadGlossaryTerm } = useAnnotations();

	const { opened, triggerRef, triggerProps } = useContentPopover({
		key: term,
		data: glossary[term],
		isLoading: loadingKeys.has(term),
		load: loadGlossaryTerm,
	});

	const baseContent = glossary[term] ?? null;
	const originalLabel =
		typeof label === 'string'
			? label
			: baseContent?.metadata.glossary_key || term;

	const {
		content: displayContent,
		term: displayTerm,
		label: displayLabel,
	} = useContent(baseContent, term, originalLabel);

	const componentOverrides = useMemo(() => ({ a: InternalLink }), []);

	return (
		<Popover
			open={opened}
			triggerRef={triggerRef}
			className={styles.dropdown}
			trigger={
				<button
					type="button"
					className={styles.trigger}
					{...triggerProps}
					aria-label={`Glossary: ${term}`}
				>
					{children}
				</button>
			}
		>
			<div className={styles.header}>
				<p className={styles.headerTitle}>{displayLabel}</p>
				{locale === 'he' && displayTerm && (
					<p className={styles.headerSub} dir="ltr">
						{displayTerm
							.replace(/-/g, ' ')
							.replace(/\b\w/g, (c) => c.toUpperCase())}
					</p>
				)}
			</div>
			<NavBar rootLabel={originalLabel} />
			{!displayContent ? (
				<div className={styles.loader}>
					<Loader size="md" />
				</div>
			) : (
				<>
					<ContentRenderer
						hast={displayContent.hast}
						className={styles.body}
						components={componentOverrides}
					/>
					{displayContent.metadata.source_name && (
						<p className={styles.source}>
							{displayContent.metadata.source_url ? (
								<a
									href={displayContent.metadata.source_url}
									className={styles.sourceLink}
									target="_blank"
								>
									{displayContent.metadata.source_name}
								</a>
							) : (
								displayContent.metadata.source_name
							)}
						</p>
					)}
				</>
			)}
		</Popover>
	);
}
