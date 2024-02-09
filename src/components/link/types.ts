import { SyntheticEvent } from 'react';

type LinkTarget = '_blank' | null;

type LinkProps = {
	label?: string;
	title?: string;
	href?: string;
	target?: LinkTarget;
	onClick?: (e: SyntheticEvent) => void;
	className?: string;
};

export type { LinkProps, LinkTarget };
