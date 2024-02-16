import React, { PropsWithChildren } from 'react';
import styles from './NoteContentLayout.module.scss';
import classNames from 'classnames';

type NoteContentLayoutProps = {
	className?: string;
};

const NoteContentLayout = ({
	children,
	className,
}: PropsWithChildren<NoteContentLayoutProps>): JSX.Element => (
	<div role="note" className={classNames(styles.root, className)}>
		{children}
	</div>
);

export default NoteContentLayout;
export type { NoteContentLayoutProps };
