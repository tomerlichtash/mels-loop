import React, { PropsWithChildren } from 'react';
import {
	ContentLayout,
	NoteContentLayout,
	ReferenceContentLayout,
} from 'components/index';
import { DynamicContentTypes } from 'lib/types';
import { useLocale } from 'hooks/index';
import type { ContentLayoutProps } from 'components/content-layout/ContentLayout';

export const DynamicContentLayout = ({
	type,
	term,
	sources,
	children,
}: PropsWithChildren<ContentLayoutProps>): JSX.Element => {
	let dynamicLayout = null;

	const { t, lang, textDirection } = useLocale();

	switch (type) {
		case DynamicContentTypes.Annotation:
			// todo: support source list for note content layout
			dynamicLayout = <NoteContentLayout>{children}</NoteContentLayout>;
			break;
		case DynamicContentTypes.Glossary:
			dynamicLayout = (
				<ReferenceContentLayout
					caption={t(`common:caption:glossary`)}
					title={t(`glossary:term:${term}`)}
					term={lang !== 'en' && t(`glossaryEN:term:${term}`)}
					sources={sources}
					sourcesLabel={t(
						`common:caption:source:${
							sources.length > 1 ? 'multiple' : 'single'
						}`
					)}
				>
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
