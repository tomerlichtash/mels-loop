import React, { PropsWithChildren } from 'react';
import styles from './Line.module.scss';

type LineProps = {
	index: number;
};

export const Line = ({
	index,
	children,
	...rest
}: PropsWithChildren<LineProps>): JSX.Element => {
	if (!children) {
		return <span className="empty text-line"></span>;
	}

	return (
		<span className={styles.root} data-line-index={index} {...rest}>
			<a id={`line${index + 1}`}></a>
			{children}
		</span>
	);
};

export default Line;
export type { LineProps };
