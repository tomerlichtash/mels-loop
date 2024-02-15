import { LinkProps } from '../components/link/types';

type LayoutProps = {
	title?: string;
	pageName?: string;
};

type LinkSectionProps = {
	label: string;
	items: LinkProps[];
};

export type { LayoutProps, LinkSectionProps };
