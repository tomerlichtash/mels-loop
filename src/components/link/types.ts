export type LinkTarget = '_blank' | null;

export type LinkProps = {
	title?: string;
	href?: string;
	target?: LinkTarget;
	className?: string;
};
