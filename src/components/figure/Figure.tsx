import React, { PropsWithChildren } from 'react';
import styles from './Figure.module.scss';
import type { FigureProps } from './types';

export const Figure = ({
	elementId,
	children,
	...rest
}: PropsWithChildren<FigureProps>) => (
	<figure className={styles.root} {...rest}>
		{elementId && <a id={elementId}></a>}
		<div className="figure-content">{children}</div>
	</figure>
);
