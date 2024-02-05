import type { LinkTarget } from 'components';

export type SourceProps = {
	label?: string;
	url: string;
	target?: LinkTarget;
};

export type ReferenceContentLayoutProps = {
	label?: string;
	title?: string;
	term?: string;
	sources?: SourceProps[];
	sourcesLabel?: string;
	className?: string;
};

export type NoteContentLayoutProps = {
	className?: string;
};
