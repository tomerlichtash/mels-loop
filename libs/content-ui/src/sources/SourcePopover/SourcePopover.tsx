'use client';

import type { ResolvedSource } from '@mels-loop/content-pipeline/types';
import { Loader, Popover } from '@mels-loop/ui/primitives';
import { useEffect, useId, useRef } from 'react';

import { NavBar } from '../../annotations/internal/NavBar/NavBar';
import { useAnnotations } from '../../annotations/PopoverProvider/PopoverProvider';
import { SourceDetail } from '../SourceDetail/SourceDetail';
import styles from './SourcePopover.module.css';

interface SourcePopoverProps {
	id: string;
	label?: React.ReactNode;
}

export function SourcePopover({ id, label }: SourcePopoverProps) {
	const popoverId = useId();
	const {
		activePopover,
		openPopover,
		registerTrigger,
		sources,
		loadingKeys,
		loadResolvedSource,
	} = useAnnotations();
	const opened = activePopover === popoverId;
	const triggerRef = useRef<HTMLButtonElement>(null);

	const source: ResolvedSource | undefined = sources[id];
	const isLoading = loadingKeys.has(id);

	useEffect(() => {
		registerTrigger(popoverId, triggerRef.current);
		return () => registerTrigger(popoverId, null);
	}, [popoverId, registerTrigger]);

	useEffect(() => {
		if (opened && !source && !isLoading) {
			loadResolvedSource(id);
		}
	}, [opened, source, isLoading, loadResolvedSource, id]);

	const displayLabel = label ?? id;

	return (
		<Popover
			open={opened}
			triggerRef={triggerRef}
			className={styles.dropdown}
			trigger={
				<button
					type="button"
					className={styles.trigger}
					onClick={() => openPopover(popoverId)}
					aria-label={`Source: ${id}`}
				>
					{displayLabel}
				</button>
			}
		>
			<NavBar
				rootLabel={typeof displayLabel === 'string' ? displayLabel : id}
			/>
			{!source ? (
				<div className={styles.loader}>
					<Loader size="md" />
				</div>
			) : (
				<SourceDetail source={source} />
			)}
		</Popover>
	);
}
