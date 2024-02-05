import React, { PropsWithChildren } from 'react';
import styles from './NoteContentLayout.module.scss';
import type { NoteContentLayoutProps } from '../types';

const NoteContentLayout = ({
	children,
}: PropsWithChildren<NoteContentLayoutProps>): JSX.Element => (
	<div role="note" className={styles.root}>
		{children}
	</div>
);

export default NoteContentLayout;
