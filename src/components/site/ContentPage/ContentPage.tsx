import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./ContentPage.module.scss";

type ContentPageProps = {
	title?: string;
	subtitle?: string;
	abstract?: string;
	className?: string;
};

const Article = ({
	title,
	subtitle,
	abstract,
	children,
	className,
}: ContentPageProps & PropsWithChildren) => (
	<article className={classNames(styles.root, className)}>
		{title && <h1 className={styles.title}>{title}</h1>}
		{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
		{abstract && <p className={styles.abstract}>{abstract}</p>}
		<div className={styles.content}>{children}</div>
	</article>
);

export default Article;
