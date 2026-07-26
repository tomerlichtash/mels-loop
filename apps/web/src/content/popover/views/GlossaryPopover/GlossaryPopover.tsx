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
import { nodeText, termLabel, titleCase } from '../../shared/term-label';
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
	const { locale, t } = useTranslation();
	const { glossary, loadingKeys, loadGlossaryTerm, closePopover } =
		useAnnotations();

	const { opened, side, triggerRef, triggerProps } = useContentPopover({
		key: term,
		data: glossary[term],
		isLoading: loadingKeys.has(term),
		load: loadGlossaryTerm,
	});

	const baseContent = glossary[term] ?? null;
	/*
	 * English takes the slug, which is the canonical singular — the prose may
	 * be inflected ("Real Programmers"). Hebrew has no such source, so it takes
	 * the prose, and the canonical English shows underneath.
	 */
	const originalLabel = termLabel(
		term,
		nodeText(label ?? children).trim(),
		locale,
	);

	const {
		content: displayContent,
		term: displayTerm,
		label: displayLabel,
	} = useContent(baseContent, term, originalLabel);

	const componentOverrides = useMemo(() => ({ a: InternalLink }), []);

	return (
		<Popover
			open={opened}
			onOpenChange={(next) => {
				if (!next) closePopover();
			}}
			title={originalLabel}
			side={side}
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
				<NavBar rootLabel={originalLabel} />
				<p className={styles.kicker}>{t('content.glossaryLabel')}</p>
				<p className={styles.headerTitle}>{displayLabel}</p>
				{locale === 'he' && displayTerm && (
					<p className={styles.headerSub} dir="ltr">
						{titleCase(displayTerm)}
					</p>
				)}
			</div>
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
							<span className={styles.sourceLabel}>
								{t('content.sourceLabel')}:
							</span>{' '}
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
