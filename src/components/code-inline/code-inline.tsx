import React, { PropsWithChildren } from 'react';
import styles from './code-inline.module.scss';
import classNames from 'classnames';

export type CodeInlineProps = {
	className?: string;
};

export const CodeInline = ({
	children,
	className,
	...rest
}: PropsWithChildren<CodeInlineProps>): JSX.Element => (
	<code className={classNames(styles.root, className)} {...rest}>
		{children}
	</code>
);
