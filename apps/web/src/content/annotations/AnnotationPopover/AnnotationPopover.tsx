'use client';

import { Loader, Popover } from '@mels-loop/ui/primitives';
import { useEffect, useId, useMemo, useRef } from 'react';

import { ContentRenderer } from '../../ContentRenderer/ContentRenderer';
import { InternalLink } from '../internal/InternalLink/InternalLink';
import { NavBar } from '../internal/NavBar/NavBar';
import { useContent } from '../internal/useContent/useContent';
import { useAnnotations } from '../PopoverProvider/PopoverProvider';
import styles from './AnnotationPopover.module.css';

interface AnnotationPopoverProps {
	sequence: string;
	target: string;
}

export function AnnotationPopover({
	sequence,
	target,
}: AnnotationPopoverProps) {
	const id = useId();
	const {
		activePopover,
		openPopover,
		registerTrigger,
		annotations,
		loadingKeys,
		loadAnnotation,
	} = useAnnotations();
	const opened = activePopover === id;
	const triggerRef = useRef<HTMLButtonElement>(null);

	const originalLabel = `[${sequence}]`;
	const baseContent = annotations[target] ?? null;
	const isLoading = loadingKeys.has(target);

	const { content: displayContent, label: displayLabel } = useContent(
		baseContent,
		target,
		originalLabel,
	);

	const componentOverrides = useMemo(() => ({ a: InternalLink }), []);

	useEffect(() => {
		registerTrigger(id, triggerRef.current);
		return () => registerTrigger(id, null);
	}, [id, registerTrigger]);

	useEffect(() => {
		if (opened && !baseContent && !isLoading) {
			loadAnnotation(target);
		}
	}, [opened, baseContent, isLoading, loadAnnotation, target]);

	return (
		<Popover
			open={opened}
			triggerRef={triggerRef}
			className={styles.dropdown}
			trigger={
				<button
					type="button"
					className={styles.trigger}
					onClick={() => openPopover(id)}
					aria-label={`Annotation ${sequence}`}
				>
					{sequence}
				</button>
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
