import React, { PropsWithChildren } from 'react';
import styles from './Heading.module.scss';
import classNames from 'classnames';
import Text, { type HeadingVariant } from '../text/Text';

// type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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
	return (
		<Tag role="heading" className={classNames(styles.root, className)}>
			<Text variant={Tag as HeadingVariant}>{children}</Text>
		</Tag>
	);
};

export default Heading;
