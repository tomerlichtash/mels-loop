'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { Popover } from '@mels-loop/ui/primitives';
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
			toolbar={<NavBar rootLabel={originalLabel} />}
			loading={!displayContent}
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
				<p className={styles.kicker}>{t('content.glossaryLabel')}</p>
				<p className={styles.headerTitle}>{displayLabel}</p>
				{locale === 'he' && displayTerm && (
					/*
					 * The isolation belongs on the text, not on the paragraph.
					 *
					 * dir="ltr" on the <p> made its start edge the left one, so the
					 * English term sat against the far side of the panel while the
					 * Hebrew title above it ran to the right. <bdi> keeps the Latin
					 * run ordered left-to-right and sealed off from its neighbours,
					 * which is the whole reason the attribute was there, and leaves
					 * the paragraph aligned with everything else in the header.
					 */
					<p className={styles.headerSub}>
						<bdi dir="ltr">{titleCase(displayTerm)}</bdi>
					</p>
				)}
			</div>
			{/* The panel renders its own loader while this is null — see `loading`. */}
			{displayContent && (
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
