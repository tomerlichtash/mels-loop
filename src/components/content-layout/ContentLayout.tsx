import React, { PropsWithChildren } from 'react';
import Scrollbar from '../scrollbar/Scrollbar';
import styles from './ContentLayout.module.scss';
import type { DynamicContentTypes } from 'lib/types';
import type { RefOrSourceProps } from 'types/components';
import type { TextDirection } from 'types/locale';

type ContentLayoutProps = {
	type: DynamicContentTypes;
	textDirection?: TextDirection;
	term?: string;
	sources?: RefOrSourceProps[];
};

const ContentLayout = ({
	textDirection,
	children,
}: PropsWithChildren<ContentLayoutProps>): JSX.Element => (
	<Scrollbar textDirection={textDirection}>
		<section className={styles.root}>
			<article className={styles.article}>{children}</article>
		</section>
	</Scrollbar>
);

export default ContentLayout;
export type { ContentLayoutProps };
