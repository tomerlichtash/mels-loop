import React, { PropsWithChildren } from 'react';
import styles from './CodeBlock.module.scss';
import type { CodeProps } from './types';

const CodeBlock = ({
	children,
	...rest
}: PropsWithChildren<CodeProps>): JSX.Element => (
	<div className={styles.root} {...rest}>
		<pre className={styles.pre}>
			<code className={styles.code}>{children}</code>
		</pre>
	</div>
);

export default CodeBlock;
