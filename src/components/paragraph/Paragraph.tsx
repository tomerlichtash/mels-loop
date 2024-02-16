import React, { PropsWithChildren } from 'react';
import styles from './Paragraph.module.scss';
import classNames from 'classnames';

type ParagraphProps = {
	className?: string;
};

export const Paragraph = ({
	children,
	className,
}: PropsWithChildren<ParagraphProps>): JSX.Element => (
	<p className={classNames(styles.root, className)}>{children}</p>
);

export default Paragraph;
export type { ParagraphProps };
