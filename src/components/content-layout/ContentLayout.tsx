import React, { PropsWithChildren } from 'react';
import Scrollbar from '../scrollbar/Scrollbar';
import styles from './ContentLayout.module.scss';
import type { ContentLayoutProps } from './types';

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
