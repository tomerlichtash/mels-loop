import React, { PropsWithChildren } from 'react';
import styles from './CodeInline.module.scss';
import classNames from 'classnames';

type CodeInlineProps = {
	className?: string;
};

const CodeInline = ({ children, className }: PropsWithChildren<CodeInlineProps>): JSX.Element => (
	<code className={classNames(styles.root, className)}>{children}</code>
);

export default CodeInline;
