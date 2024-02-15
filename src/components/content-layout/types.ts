import { DynamicContentTypes } from 'lib/types/types';
import { BibliographyItemProps } from 'types/components';
import type { LocaleId, TextDirection } from 'types/locale';
import type { IParsedPageData } from 'types/models';

type ContentLayoutProps = {
	type: DynamicContentTypes;
	textDirection?: TextDirection;
	term?: string;
	sources?: BibliographyItemProps[];
};

type ReferenceContentLayoutProps = {
	term: string;
	caption?: string;
	title?: string;
	sources?: BibliographyItemProps[];
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
	// SourceProps, // todo: extract
	ReferenceContentLayoutProps,
	NoteContentLayoutProps,
};
