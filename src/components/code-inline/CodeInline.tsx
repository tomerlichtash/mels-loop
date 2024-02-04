import React, { PropsWithChildren } from 'react';
import styles from './CodeInline.module.scss';
import classNames from 'classnames';

export type CodeProps = {
	className?: string;
};

export const CodeInline = ({
	children,
	className,
	...rest
}: PropsWithChildren<CodeProps>): JSX.Element => (
	<code className={classNames(styles.root, className)} {...rest}>
		{children}
	</code>
);
