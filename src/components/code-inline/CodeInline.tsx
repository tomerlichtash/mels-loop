import React, { PropsWithChildren } from 'react';
import styles from './CodeInline.module.scss';
import classNames from 'classnames';

type CodeProps = {
	className?: string;
};

const CodeInline = ({
	children,
	className,
	...rest
}: PropsWithChildren<CodeProps>): JSX.Element => (
	<code className={classNames(styles.root, className)} {...rest}>
		{children}
	</code>
);

export default CodeInline;

export type { CodeProps };
