'use client';

import { Popover } from '@mels-loop/ui/primitives';

import { SourceDetail } from '../../../sources/SourceDetail/SourceDetail';
import { useContentPopover } from '../../hooks/useContentPopover';
import { useAnnotations } from '../../providers/PopoverProvider';
import { NavBar } from '../../shared/NavBar/NavBar';
import styles from './SourcePopover.module.css';

interface SourcePopoverProps {
	id: string;
	label?: React.ReactNode;
}

export function SourcePopover({ id, label }: SourcePopoverProps) {
	const { sources, loadingKeys, loadResolvedSource, closePopover } =
		useAnnotations();

	const {
		opened,
		side,
		triggerRef,
		triggerProps,
		data: source,
	} = useContentPopover({
		key: id,
		data: sources[id],
		isLoading: loadingKeys.has(id),
		load: loadResolvedSource,
	});

	const displayLabel = label ?? id;

	return (
		<Popover
			open={opened}
			onOpenChange={(next) => {
				if (!next) closePopover();
			}}
			toolbar={<NavBar rootLabel={String(displayLabel)} />}
			loading={!source}
			title={id}
			side={side}
			triggerRef={triggerRef}
			className={styles.dropdown}
			trigger={
				<button
					type="button"
					className={styles.trigger}
					{...triggerProps}
					aria-label={`Source: ${id}`}
				>
					{displayLabel}
				</button>
			}
		>
			{/* The panel renders its own loader while this is null — see `loading`. */}
			{source && <SourceDetail source={source} />}
		</Popover>
	);
}
