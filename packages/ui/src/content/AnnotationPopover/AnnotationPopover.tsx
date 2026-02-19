'use client';

import { useId, useRef, useEffect, useMemo } from 'react';
import * as Popover from '@radix-ui/react-popover';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import { useAnnotations } from '../AnnotationProvider/AnnotationProvider';
import { ContentRenderer } from '../ContentRenderer/ContentRenderer';
import { PopoverNavBar } from '../PopoverNavBar/PopoverNavBar';
import { PopoverInternalLink } from '../PopoverInternalLink/PopoverInternalLink';
import { usePopoverContent } from '../usePopoverContent/usePopoverContent';
import styles from './AnnotationPopover.module.css';

interface AnnotationPopoverProps {
	sequence: string;
	target: string;
	content: ProcessedContent;
}

export function AnnotationPopover({
	sequence,
	target,
	content,
}: AnnotationPopoverProps) {
	const id = useId();
	const { activePopover, openPopover, registerTrigger } = useAnnotations();
	const opened = activePopover === id;
	const triggerRef = useRef<HTMLButtonElement>(null);

	const originalLabel = `[${sequence}]`;

	const { content: displayContent, label: displayLabel } = usePopoverContent(
		content,
		target,
		originalLabel,
	);

	const componentOverrides = useMemo(() => ({ a: PopoverInternalLink }), []);

	useEffect(() => {
		registerTrigger(id, triggerRef.current);
		return () => registerTrigger(id, null);
	}, [id, registerTrigger]);

	return (
		<Popover.Root open={opened}>
			<Popover.Trigger asChild>
				<button
					ref={triggerRef}
					type="button"
					className={styles.trigger}
					onClick={() => openPopover(id)}
					aria-label={`Annotation ${sequence}`}
				>
					{sequence}
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className={styles.dropdown}
					side="bottom"
					align="center"
					sideOffset={4}
				>
					<Popover.Arrow className={styles.arrow} />
					<div data-popover-content>
						<PopoverNavBar rootLabel={displayLabel} />
						<div className={styles.scrollArea}>
							<div className={styles.bodyWrap}>
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
							</div>
						</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
