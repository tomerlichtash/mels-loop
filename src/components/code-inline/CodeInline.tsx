import React, { PropsWithChildren } from 'react';
import styles from './CodeInline.module.scss';
import classNames from 'classnames';

type CodeInlineProps = {
	className?: string;
};

const CodeInline = ({
	children,
	className,
	...rest
}: PropsWithChildren<CodeInlineProps>): JSX.Element => (
	<code className={classNames(styles.root, className)} {...rest}>
		{children}
	</code>
);

export default CodeInline;
