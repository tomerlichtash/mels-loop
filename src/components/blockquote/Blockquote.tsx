import React, { PropsWithChildren } from 'react';
import styles from './Blockquote.module.scss';
import classNames from 'classnames';

type BlockquoteProps = {
	className?: string;
};

const Blockquote = ({
	children,
	className,
}: PropsWithChildren<BlockquoteProps>): JSX.Element => (
	<blockquote className={classNames(styles.root, className)}>{children}</blockquote>
);

export default Blockquote;
export type { BlockquoteProps };
