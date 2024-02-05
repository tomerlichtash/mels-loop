import React, { PropsWithChildren } from 'react';
import styles from './CodeInline.module.scss';
import classNames from 'classnames';
import type { CodeProps } from 'components/code-block/types';

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
