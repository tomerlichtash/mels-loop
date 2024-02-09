import React, { PropsWithChildren } from 'react';
import {
	ContentLayout,
	NoteContentLayout,
	NoteContentLayoutProps,
	ReferenceContentLayout,
	ReferenceContentLayoutProps,
} from 'components';
import { BibliographyItem, DynamicContentTypes } from 'lib/types';
import type { TextDirection } from 'types';

type ContentLayoutProps = {
	type: DynamicContentTypes;
	textDirection: TextDirection;
	sources?: BibliographyItem[];
};

const mapSources = (sources) =>
	sources &&
	sources.map(({ name, author, ...rest }) => {
		const authorSuffix = author ? ` / ${author}` : '';
		return {
			label: `${name}${authorSuffix}`,
			target: '_blank',
			...rest,
		};
	});

export const DynamicContentLayout = ({
	type,
	children,
	textDirection,
	sources,
	...rest
}: PropsWithChildren<
	| (ContentLayoutProps & ReferenceContentLayoutProps)
	| (ContentLayoutProps & NoteContentLayoutProps)
>): JSX.Element => {
	let dynamicLayout = null;

	switch (type) {
		case DynamicContentTypes.Annotation:
			dynamicLayout = (
				<NoteContentLayout {...rest}>{children}</NoteContentLayout>
			);
			break;
		case DynamicContentTypes.Glossary:
			dynamicLayout = (
				<ReferenceContentLayout {...rest} sources={mapSources(sources)}>
					{children}
				</ReferenceContentLayout>
			);
			break;
		default:
			dynamicLayout = <>error: undefined dynamic content layout</>;
			break;
	}

	return (
		<ContentLayout type={type} textDirection={textDirection}>
			{dynamicLayout}
		</ContentLayout>
	);
};
