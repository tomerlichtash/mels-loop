'use client';

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
	const { annotations, loadingKeys, loadAnnotation } = useAnnotations();

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
			<NavBar rootLabel={displayLabel} />
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
