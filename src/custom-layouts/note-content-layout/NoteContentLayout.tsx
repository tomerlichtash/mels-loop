import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './NoteContentLayout.module.scss';

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
