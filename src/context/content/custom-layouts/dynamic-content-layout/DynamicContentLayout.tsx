import React, { PropsWithChildren } from 'react';
import { Scrollbar } from '@melsloop/ml-components';
import type { DynamicContentTypes } from 'context/types';
import type { RefOrSourceProps } from 'context/page/types';
// import styles from './DynamicContentLayout.module.css';

type ContentLayoutProps = {
	type: DynamicContentTypes;
	textDirection?: 'ltr' | 'rtl';
	term?: string;
	sources?: RefOrSourceProps[];
};

const ContentLayout = ({
	textDirection,
	children
}: PropsWithChildren<ContentLayoutProps>): JSX.Element => (
	<Scrollbar textDirection={textDirection}>
		<section>{children}</section>
	</Scrollbar>
);

export default ContentLayout;
export type { ContentLayoutProps };
