'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { useEffect, useId, useRef } from 'react';

import { useAnnotations, usePopoverOpen } from '../providers/PopoverProvider';

interface UseContentPopoverOptions<T> {
	key: string;
	data: T | undefined;
	isLoading: boolean;
	load: (key: string) => void;
}

interface UseContentPopoverResult<T> {
	popoverId: string;
	opened: boolean;
	side: 'left' | 'right';
	triggerRef: React.RefObject<HTMLButtonElement | null>;
	triggerProps: {
		ref: React.RefObject<HTMLButtonElement | null>;
		onClick: () => void;
	};
	data: T | undefined;
	isLoading: boolean;
}

export function useContentPopover<T>({
	key,
	data,
	isLoading,
	load,
}: UseContentPopoverOptions<T>): UseContentPopoverResult<T> {
	const popoverId = useId();
	const { locale } = useTranslation();
	const { openPopover, registerTrigger } = useAnnotations();
	const opened = usePopoverOpen(popoverId);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const side = locale === 'he' ? 'left' : 'right';

	useEffect(() => {
		registerTrigger(popoverId, triggerRef.current);
		return () => registerTrigger(popoverId, null);
	}, [popoverId, registerTrigger]);

	return {
		popoverId,
		opened,
		side,
		triggerRef,
		triggerProps: {
			ref: triggerRef,
			onClick: () => {
				const cached = !!data;
				const t0 = performance.now();
				if (!data && !isLoading) load(key);
				openPopover(popoverId);
				requestAnimationFrame(() => {
					console.debug(
						`[Popover] ${key} open: ${(performance.now() - t0).toFixed(1)}ms (${cached ? 'cached' : 'fetching'})`,
					);
				});
			},
		},
		data,
		isLoading,
	};
}
