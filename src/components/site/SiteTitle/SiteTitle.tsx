import React, { useMemo } from "react";
import Link from "next/link";
import styles from "./SiteTitle.module.scss";

import type { TextDirection } from "../../../locale/locale-context";
import classNames from "classnames";

type SiteTitleProps = {
	title: string;
	subtitle: string;
	textDirection: TextDirection;
	isHome?: boolean;
	className?: string;
};

const SiteTitle = ({
	title,
	subtitle,
	textDirection,
	isHome,
	className,
}: SiteTitleProps): JSX.Element => {
	const titleContent = useMemo(() => {
		return (
			<span className={styles.title}>
				<span className={styles.logo}></span>
				<span className={styles.titleText}>{title}</span>
			</span>
		);
	}, [title]);

	const linkTitle = useMemo(() => {
		return (
			<Link
				title={`${title} - ${subtitle}`}
				aria-label={`${title} - ${subtitle}`}
				href="/"
			>
				{titleContent}
			</Link>
		);
	}, [titleContent, title, subtitle]);

	return (
		<div
			className={classNames(styles.root, className)}
			data-text-direction={textDirection}
		>
			{isHome ? titleContent : linkTitle}
			<span className={styles.subtitle}>{subtitle}</span>
		</div>
	);
};

export default SiteTitle;
