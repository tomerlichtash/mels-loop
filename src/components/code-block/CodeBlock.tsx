import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './CodeBlock.module.scss';

type CodeProps = {
	className?: string;
};

const CodeBlock = ({ children, className }: PropsWithChildren<CodeProps>): JSX.Element => (
	<div className={classNames(styles.root, className)}>
		<pre className={styles.pre}>
			<code className={styles.code}>{children}</code>
		</pre>
	</div>
);

export default CodeBlock;
export type { CodeProps };
