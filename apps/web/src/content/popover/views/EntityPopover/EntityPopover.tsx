'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { Avatar, Popover } from '@mels-loop/ui/primitives';
import { UserIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import { useRef } from 'react';

import { useContentPopover } from '../../hooks/useContentPopover';
import { useAnnotations } from '../../providers/PopoverProvider';
import { NavBar } from '../../shared/NavBar/NavBar';
import styles from './EntityPopover.module.css';

interface EntityPopoverProps {
	id: string;
	label?: React.ReactNode;
}

const HOVER_OPEN_DELAY_MS = 250;

/**
 * An entity mention — an authored [Name](entity:id) marker wrapping the
 * name where it appears in the prose. Rare by design: the author highlights
 * one canonical occurrence per identity, not every occurrence of the name.
 *
 * Renders as a dotted term (the "this word carries more" convention) with a
 * small person glyph, and opens the identity hovercard on hover.
 */
export function EntityPopover({ id, label }: EntityPopoverProps) {
	const { t } = useTranslation();
	const { entities, loadingKeys, loadResolvedEntity, closePopover } =
		useAnnotations();

	const {
		opened,
		side,
		triggerRef,
		triggerProps,
		data: card,
	} = useContentPopover({
		/* The key namespaces this popover in the shared registries; the hook
		 * hands it back to load(), so the loader receives the bare id. */
		key: `entity:${id}`,
		data: entities[id],
		isLoading: loadingKeys.has(`entity:${id}`),
		load: () => loadResolvedEntity(id),
	});

	/* Hover opens the card (after a beat, so sweeps across the text don't
	 * pop cards); closing stays with the shared outside-click and Escape
	 * handling. Touch falls through to the click path. */
	const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const hoverProps = {
		onMouseEnter: () => {
			if (opened) return;
			hoverTimer.current = setTimeout(
				triggerProps.onClick,
				HOVER_OPEN_DELAY_MS,
			);
		},
		onMouseLeave: () => {
			if (hoverTimer.current) clearTimeout(hoverTimer.current);
		},
	};

	const displayLabel = label ?? id;

	return (
		<Popover
			open={opened}
			onOpenChange={(next) => {
				if (!next) closePopover();
			}}
			toolbar={<NavBar rootLabel={String(displayLabel)} />}
			loading={!card}
			title={id}
			side={side}
			triggerRef={triggerRef}
			className={styles.dropdown}
			trigger={
				<button
					type="button"
					className={styles.mention}
					{...triggerProps}
					{...hoverProps}
					aria-label={`Entity: ${id}`}
				>
					<UserIcon className={styles.mentionIcon} aria-hidden />
					{displayLabel}
				</button>
			}
		>
			{card && (
				<div className={styles.card}>
					<div className={styles.header}>
						<Avatar
							size="md"
							alt=""
							fallback={card.name
								.split(' ')
								.map((part) => part[0])
								.slice(0, 2)
								.join('')}
							image={
								card.avatarUrl ? (
									<Image
										src={card.avatarUrl}
										alt=""
										width={96}
										height={96}
										className={styles.avatarImage}
									/>
								) : undefined
							}
						/>
						<div className={styles.identity}>
							<p className={styles.name}>
								<UserIcon className={styles.nameIcon} aria-hidden />
								{card.name}
							</p>
							{card.role && <p className={styles.role}>{card.role}</p>}
							{(card.dates?.start || card.dates?.end) && (
								<p className={styles.dates}>
									{[card.dates.start, card.dates.end].filter(Boolean).join('–')}
								</p>
							)}
						</div>
					</div>
					{card.hasPage && (
						<a href={`/people/${card.id}`} className={styles.pageLink}>
							{t('people.viewPerson')} →
						</a>
					)}
					{card.summary && <p className={styles.summary}>{card.summary}</p>}
				</div>
			)}
		</Popover>
	);
}
