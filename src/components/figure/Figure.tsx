import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Figure.module.scss';

type FigureProps = {
	elementId: string;
	className?: string;
};

const Figure = ({
	elementId,
	children,
	className,
	...rest
}: PropsWithChildren<FigureProps>) => (
	<figure
		className={classNames(styles.root, className)}
		{...rest}
	>
		{elementId && <a id={elementId}></a>}
		<div className={styles.figureContent}>{children}</div>
	</figure>
);

export default Figure;
export type { FigureProps };
