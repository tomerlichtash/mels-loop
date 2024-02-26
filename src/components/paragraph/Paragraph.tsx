import React, { PropsWithChildren } from 'react';
import styles from './Paragraph.module.scss';
import classNames from 'classnames';
import { Text } from '..';

type ParagraphProps = {
	className?: string;
};

export const Paragraph = ({
	children,
	className,
}: PropsWithChildren<ParagraphProps>): JSX.Element => (
	<p className={classNames(styles.root, className)}>
		<Text variant="body1">{children}</Text>
	</p>
);

export default Paragraph;
export type { ParagraphProps };
