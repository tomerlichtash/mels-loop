import React, { PropsWithChildren } from 'react';
import { Text, Container } from 'components/index';
import { DateFormat, Heading, TextLink } from 'components/index';
import { localeDateFormat } from 'layout/consts';
import classNames from 'classnames';
import styles from './GenericContentLayout.module.scss';

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
	className,
}: PropsWithChildren<GenericContentLayoutProps>): JSX.Element => (
	<article className={classNames(styles.root, className)}>
		{caption && (
			<Container alignItemsCenter>
				<Text className={styles.caption}>{caption}</Text>
			</Container>
		)}

		{title && (
			<Heading level={1}>
				<TextLink
					variant="h1"
					linked={!!path}
					href={path}
					className={styles.title}
				>
					{title}
				</TextLink>
			</Heading>
		)}

		{abstract && (
			<Text variant="h2" className={styles.abstract}>
				{abstract}
			</Text>
		)}

		{author && (
			<Container alignItemsCenter>
				<Text className={styles.author}>{author}</Text>
			</Container>
		)}

		{date && (
			<Container alignItemsCenter>
				<DateFormat
					date={date}
					format={localeDateFormat[locale]}
					className={styles.date}
				/>
			</Container>
		)}

		{children}
	</article>
);

export default GenericContentLayoutProps;
