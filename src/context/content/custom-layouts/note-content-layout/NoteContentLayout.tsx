import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './NoteContentLayout.module.css';
import { Text } from '@melsloop/ml-components';

type NoteContentLayoutProps = {
	className?: string;
};

const NoteContentLayout = ({
	children,
	className
}: PropsWithChildren<NoteContentLayoutProps>): JSX.Element => (
	<Text
		role="note"
		className={classNames(styles.root, className)}
	>
		{children}
	</Text>
);

export default NoteContentLayout;
export type { NoteContentLayoutProps };
