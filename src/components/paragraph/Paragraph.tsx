import React, { PropsWithChildren } from 'react';
import styles from './Paragraph.module.scss';
import classNames from 'classnames';

type ParagraphProps = {
	className?: string;
};

export const Paragraph = ({
	children,
	className,
	...rest
}: PropsWithChildren<ParagraphProps>): JSX.Element => (
	<p className={classNames(styles.root, className)} {...rest}>
		{children}
	</p>
);

export default Paragraph;
export type { ParagraphProps };
