import React, { PropsWithChildren } from 'react';
import styles from './heading.module.scss';
import classNames from 'classnames';

type HeadingProps = {
	level: number | string;
	className?: string;
};

export const Heading = ({
	level,
	className,
	children,
}: PropsWithChildren<HeadingProps>): JSX.Element => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
	return <Tag className={classNames(styles.root, className)}>{children}</Tag>;
};

export default Heading;
