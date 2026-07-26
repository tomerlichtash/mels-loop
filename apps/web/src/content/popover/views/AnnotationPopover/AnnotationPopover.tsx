'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { IndexMarker, Loader, Popover } from '@mels-loop/ui/primitives';
import { useMemo } from 'react';

import { ContentRenderer } from '../../../renderer/core/ContentRenderer';
import { useContent } from '../../hooks/useContent';
import { useContentPopover } from '../../hooks/useContentPopover';
import { useAnnotations } from '../../providers/PopoverProvider';
import { InternalLink } from '../../shared/InternalLink/InternalLink';
import { NavBar } from '../../shared/NavBar/NavBar';
import styles from './AnnotationPopover.module.css';

interface AnnotationPopoverProps {
	sequence: string;
	target: string;
}

export function AnnotationPopover({
	sequence,
	target,
}: AnnotationPopoverProps) {
	const index = Number(sequence);
	const { t } = useTranslation();
	const { annotations, loadingKeys, loadAnnotation, closePopover } =
		useAnnotations();

	const { opened, side, triggerRef, triggerProps } = useContentPopover({
		key: target,
		data: annotations[target],
		isLoading: loadingKeys.has(target),
		load: loadAnnotation,
	});

	const originalLabel = `[${sequence}]`;
	const baseContent = annotations[target] ?? null;
	const { content: displayContent, label: displayLabel } = useContent(
		baseContent,
		target,
		originalLabel,
	);

	const componentOverrides = useMemo(() => ({ a: InternalLink }), []);

	return (
		<Popover
			open={opened}
			onOpenChange={(next) => {
				if (!next) closePopover();
			}}
			toolbar={<NavBar rootLabel={displayLabel} />}
			title={`Annotation ${sequence}`}
			side={side}
			triggerRef={triggerRef}
			className={styles.dropdown}
			trigger={
				<IndexMarker
					index={index}
					aria-label={`Annotation ${sequence}`}
					{...triggerProps}
				/>
			}
		>
			{/*
			 * Chip only, no display title. Annotations carry no title in their
			 * frontmatter — deriving one from the English slug would put an
			 * untranslated heading on the Hebrew sheet, which is the bug just
			 * fixed for glossary terms. The number is the annotation's name.
			 */}
			<div className={styles.header}>
				<p className={styles.kicker}>
					{t('content.annotationLabel')} {String(index).padStart(2, '0')}
				</p>
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
									rel="noopener noreferrer"
								>
									{displayContent.metadata.source_name}
								</a>
							) : (
								displayContent.metadata.source_name
							)}
							{/* Carried in the frontmatter but never rendered until now. */}
							{displayContent.metadata.source_author && (
								<span className={styles.sourceAuthor}>
									{' — '}
									{displayContent.metadata.source_author}
								</span>
							)}
						</p>
					)}
				</>
			)}
		</Popover>
	);
}
