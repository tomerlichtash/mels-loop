'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useId, useMemo, useRef } from 'react';

import { Loader } from '../../../primitives';
import { ContentRenderer } from '../../ContentRenderer/ContentRenderer';
import { InternalLink } from '../internal/InternalLink/InternalLink';
import { NavBar } from '../internal/NavBar/NavBar';
import { useContent } from '../internal/useContent/useContent';
import { useAnnotations } from '../PopoverProvider/PopoverProvider';
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
	const id = useId();
	const { locale } = useTranslation();
	const {
		activePopover,
		openPopover,
		registerTrigger,
		glossary,
		loadingKeys,
		loadGlossaryTerm,
	} = useAnnotations();
	const opened = activePopover === id;
	const triggerRef = useRef<HTMLButtonElement>(null);

	const baseContent = glossary[term] ?? null;
	const isLoading = loadingKeys.has(term);

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

	useEffect(() => {
		registerTrigger(id, triggerRef.current);
		return () => registerTrigger(id, null);
	}, [id, registerTrigger]);

	useEffect(() => {
		if (opened && !baseContent && !isLoading) {
			loadGlossaryTerm(term);
		}
	}, [opened, baseContent, isLoading, loadGlossaryTerm, term]);

	return (
		<Popover.Root open={opened}>
			<Popover.Trigger asChild>
				<button
					ref={triggerRef}
					type="button"
					className={styles.root}
					onClick={() => openPopover(id)}
					aria-label={`Glossary: ${term}`}
				>
					{children}
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
							</div>
						</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
