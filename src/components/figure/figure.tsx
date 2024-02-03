import React from 'react';
import styles from './figure.module.scss';

export const Figure = ({ elementId, children, ...rest }) => (
	<figure className={styles.root} {...rest}>
		{elementId && <a id={elementId}></a>}
		<div className="figure-content">{children}</div>
	</figure>
);
