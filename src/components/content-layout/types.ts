import type { LinkTarget } from 'components';
import type { LocaleId, TextDirection } from 'types/locale';
import type { IParsedPageData } from 'types/models';

type ContentLayoutProps = {
	type: string;
	textDirection: TextDirection;
};

type SourceProps = {
	label?: string;
	url: string;
	target?: LinkTarget;
};

type ReferenceContentLayoutProps = {
	caption?: string;
	title?: string;
	term?: string;
	sources?: SourceProps[];
	sourcesLabel?: string;
	className?: string;
};

type NoteContentLayoutProps = {
	className?: string;
};

type IBlogPostProps = {
	title: string;
	date: Date;
	locale: LocaleId;
	author: string;
	content: IParsedPageData;
	path?: string;
	className?: string;
};

export type {
	IBlogPostProps,
	ContentLayoutProps,
	SourceProps, // todo: extract
	ReferenceContentLayoutProps,
	NoteContentLayoutProps,
};
