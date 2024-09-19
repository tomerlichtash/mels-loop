import React, { PropsWithChildren } from 'react';
import { DateFormat, Heading, Text, Link, Container } from '@melsloop/ml-components';
import { localeDateFormat } from '../../consts';
import classNames from 'classnames';
import styles from './GenericContentLayout.module.css';

type GenericContentLayoutProps = {
	caption?: string;
	title?: string;
	abstract?: string;
	author?: string;
	date?: Date;
	path?: string;
	locale?: string;
	className?: string;
	pageStyles?: Record<string, string>;
};

export const GenericContentLayout = ({
	caption,
	title,
	abstract,
	author,
	date,
	children,
	path,
	locale,
	className
}: PropsWithChildren<GenericContentLayoutProps>): JSX.Element => (
	<article className={classNames(styles.root, className)}>
		{caption && (
			<Container>
				<Text className={styles.caption}>{caption}</Text>
			</Container>
		)}

		{title && (
			<Heading level={1}>
				<Link
					href={path}
					className={styles.title}
				>
					{title}
				</Link>
			</Heading>
		)}

		{abstract && <Heading level={4}>{abstract}</Heading>}

		{author && (
			<Container>
				<Text className={styles.author}>{author}</Text>
			</Container>
		)}

		{date && (
			<Container>
				<DateFormat
					value={date.toString()}
					format={localeDateFormat[locale]}
					className={styles.date}
				/>
			</Container>
		)}

		{children}
	</article>
);

export default GenericContentLayoutProps;
