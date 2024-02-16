import React, { PropsWithChildren } from 'react';
import styles from './Figure.module.scss';
import classNames from 'classnames';

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
	<figure className={classNames(styles.root, className)} {...rest}>
		{elementId && <a id={elementId}></a>}
		<div className="figure-content">{children}</div>
	</figure>
);

export default Figure;
export type { FigureProps };
