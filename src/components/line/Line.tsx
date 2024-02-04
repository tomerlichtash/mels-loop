import React from 'react';
import styles from './Line.module.scss';

export const Line = ({ index, children, ...rest }): JSX.Element => {
	if (children.length === 0) {
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
