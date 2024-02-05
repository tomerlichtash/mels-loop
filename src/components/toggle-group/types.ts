import type { ToggleGroupItemProps } from '../toggle-group-item/types';

type ToggleGroupProps = {
	defaultValue: string;
	options?: ToggleGroupItemProps[];
	onSelect?: (val: string) => void;
	type: 'single';
	className?: string;
};

export type { ToggleGroupProps };
