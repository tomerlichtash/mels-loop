import React, { PropsWithChildren } from 'react';
import { useLocale } from 'hooks/index';
import NoteContentLayout from './custom-layouts/note-content-layout/NoteContentLayout';
import ReferenceContentLayout from './custom-layouts/reference-content-layout/ReferenceContentLayout';
import ContentLayout from './custom-layouts/dynamic-content-layout/DynamicContentLayout';
import { DynamicContentTypes } from '../types';
import type { ContentLayoutProps } from './custom-layouts/dynamic-content-layout/DynamicContentLayout';

/**
 * Switch dynamic content layout layout
 */
const DynamicContentLayout = ({
	type,
	term,
	sources,
	children
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
						`common:caption:source:${sources.length > 1 ? 'multiple' : 'single'}`
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
		<ContentLayout
			type={type}
			textDirection={textDirection}
		>
			{dynamicLayout}
		</ContentLayout>
	);
};

export default DynamicContentLayout;
