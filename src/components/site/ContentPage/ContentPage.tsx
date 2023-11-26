import React from "react";
import classNames from "classnames";
import styles from "./ContentPage.module.scss";
import { ComponentProps } from "interfaces/models";

interface ContentPageProps extends ComponentProps {
	title?: string;
	subtitle?: string;
	abstract?: string;
}

const Article = ({
	title,
	subtitle,
	abstract,
	children,
	className,
}: ContentPageProps) => (
	<article className={classNames(styles.root, className)}>
		{title && <h1 className={styles.title}>{title}</h1>}
		{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
		{abstract && <p className={styles.abstract}>{abstract}</p>}
		<div className={styles.content}>{children}</div>
	</article>
);

export default Article;
