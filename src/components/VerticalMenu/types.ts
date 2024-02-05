import { NavParsedNodes } from '../HorizontalMenu/types';

type VerticalNavProps = {
	items: NavParsedNodes[];
	onClose: () => void;
};

type VerticalTriggerProps = {
	onClick: () => void;
};

export type { VerticalNavProps, VerticalTriggerProps };
