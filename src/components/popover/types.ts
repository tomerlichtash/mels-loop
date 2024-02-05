import { SyntheticEvent } from 'react';

type PopoverTriggerProps = {
	className?: string;
};

type PopoverToolbarProps = {
	className?: string;
};

type PopoverDialogProps = {
	className?: string;
};

type PopoverCloseButtonProps = {
	onClick: (e: SyntheticEvent) => void;
	className?: string;
};

export type {
	PopoverTriggerProps,
	PopoverToolbarProps,
	PopoverDialogProps,
	PopoverCloseButtonProps,
};
