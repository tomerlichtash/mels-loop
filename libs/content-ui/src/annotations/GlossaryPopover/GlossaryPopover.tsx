'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { Loader, Popover } from '@mels-loop/ui/primitives';
import { useEffect, useId, useMemo, useRef } from 'react';

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
		<Popover
			open={opened}
			triggerRef={triggerRef}
			className={styles.dropdown}
			trigger={
				<button
					type="button"
					className={styles.trigger}
					onClick={() => openPopover(id)}
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
