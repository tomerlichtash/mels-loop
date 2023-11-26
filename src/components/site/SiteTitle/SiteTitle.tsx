import React from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./SiteTitle.module.scss";
import type { ComponentProps } from "../../../interfaces/models";
import type { TextDirection } from "../../../locale/locale-context";

interface SiteTitleProps extends ComponentProps {
	title: string;
	subtitle: string;
	textDirection: TextDirection;
}

const SiteTitle = ({
	title,
	subtitle,
	textDirection,
	className,
}: SiteTitleProps): JSX.Element => (
	<div
		className={classNames(styles.root, className)}
		data-text-direction={textDirection}
	>
		<Link
			title={`${title} - ${subtitle}`}
			aria-label={`${title} - ${subtitle}`}
			href="/"
			className={styles.title}
		>
			<span className={styles.logo}></span>
			<span className={styles.titleText}>{title}</span>
		</Link>
		<span className={styles.subtitle}>{subtitle}</span>
	</div>
);

export default SiteTitle;
