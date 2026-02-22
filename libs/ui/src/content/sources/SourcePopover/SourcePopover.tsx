'use client';

import type { ResolvedSource } from '@mels-loop/content-pipeline/types';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useId, useRef } from 'react';

import { Loader } from '../../../primitives/Loader/Loader';
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
		<Popover.Root open={opened}>
			<Popover.Trigger asChild>
				<button
					ref={triggerRef}
					type="button"
					className={styles.root}
					onClick={() => openPopover(popoverId)}
					aria-label={`Source: ${id}`}
				>
					{displayLabel}
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
						<NavBar
							rootLabel={typeof displayLabel === 'string' ? displayLabel : id}
						/>
						<div className={styles.scrollArea}>
							<div className={styles.bodyWrap}>
								{!source ? (
									<div className={styles.loader}>
										<Loader size="md" />
									</div>
								) : (
									<SourceDetail source={source} />
								)}
							</div>
						</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
