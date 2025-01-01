import React, { PropsWithChildren } from 'react';
import styles from './Term.module.scss';
import classNames from 'classnames';

type TermProps = {
	className?: string;
};

export const Term = ({
	children,
	className,
}: PropsWithChildren<TermProps>): JSX.Element => (
	<span className={classNames(styles.root, className)}>
		<dfn className={styles.label}>{children}</dfn>
	</span>
);

export default Term;
export type { TermProps };
