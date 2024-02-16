import React, { PropsWithChildren } from 'react';
import styles from './GenericPageContentLayout.module.scss';
import classNames from 'classnames';
import Text from 'components/text/Text';
import Container from 'components/container/Container';

type GenericPageContentLayout = {
	caption?: string;
	title?: string;
	abstract?: string;
	className?: string;
};

export const GenericPageContentLayout = ({
	caption,
	title,
	abstract,
	children,
	className,
}: PropsWithChildren<GenericPageContentLayout>): JSX.Element => {
	return (
		<article className={classNames(styles.root, className)}>
			{caption && (
				<Container alignItemsCenter>
					<Text className={styles.caption}>{caption}</Text>
				</Container>
			)}

			{title && (
				<Container alignItemsCenter>
					<Text variant="caption" className={styles.title}>
						{title}
					</Text>
				</Container>
			)}

			{abstract && (
				<Container alignItemsCenter>
					<Text variant="h1" className={styles.abstract}>
						{abstract}
					</Text>
				</Container>
			)}

			{children && (
				<Container>
					<Text variant="body1" className={styles.section}>
						{children}
					</Text>
				</Container>
			)}
		</article>
	);
};

export default GenericPageContentLayout;
