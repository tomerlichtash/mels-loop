'use client';

import { useEffect, useId, useRef } from 'react';

import { useAnnotations } from '../providers/PopoverProvider';

interface UseContentPopoverOptions<T> {
	key: string;
	data: T | undefined;
	isLoading: boolean;
	load: (key: string) => void;
}

interface UseContentPopoverResult<T> {
	popoverId: string;
	opened: boolean;
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
	const { activePopover, openPopover, registerTrigger } = useAnnotations();
	const opened = activePopover === popoverId;
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		registerTrigger(popoverId, triggerRef.current);
		return () => registerTrigger(popoverId, null);
	}, [popoverId, registerTrigger]);

	useEffect(() => {
		if (opened && !data && !isLoading) {
			load(key);
		}
	}, [opened, data, isLoading, load, key]);

	return {
		popoverId,
		opened,
		triggerRef,
		triggerProps: {
			ref: triggerRef,
			onClick: () => openPopover(popoverId),
		},
		data,
		isLoading,
	};
}
