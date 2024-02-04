import React, { PropsWithChildren } from 'react';
import { Scrollbar } from '@components/index';
import styles from './ContentLayout.module.scss';

import type { TextDirection } from '@locale/index';

type ContentLayoutProps = {
	type: string;
	textDirection: TextDirection;
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
