'use client';

import * as Popover from '@radix-ui/react-popover';
import { useEffect, useId, useMemo, useRef } from 'react';

import { Loader } from '../../../primitives/Loader/Loader';
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
		<Popover.Root open={opened}>
			<Popover.Trigger asChild>
				<button
					ref={triggerRef}
					type="button"
					className={styles.root}
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
						<NavBar rootLabel={displayLabel} />
						<div className={styles.scrollArea}>
							<div className={styles.bodyWrap}>
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
							</div>
						</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
