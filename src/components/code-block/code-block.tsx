import React, { PropsWithChildren } from 'react';
import styles from './code-block.module.scss';
import type { CodeInlineProps } from '@components/code-inline/code-inline';

export const CodeBlock = ({
	children,
	...rest
}: PropsWithChildren<CodeInlineProps>): JSX.Element => (
	<div className={styles.root} {...rest}>
		<pre className={styles.pre}>
			<code className={styles.code}>{children}</code>
		</pre>
	</div>
);
