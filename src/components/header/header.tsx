import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { ReactLocaleContext } from "../../contexts/locale-context";
import Link from "next/link";
import classNames from "classnames";
import styles from "./header.module.scss";

export const Header = ({ className }: ComponentProps): JSX.Element => {
	const { siteTitle, siteSubtitle, textDirection } =
		useContext(ReactLocaleContext);

	return (
		<header
			className={classNames([styles.root, className])}
			data-text-direction={textDirection}
		>
			<Link
				title={`${siteTitle} - ${siteSubtitle}`}
				aria-label={`${siteTitle} - ${siteSubtitle}`}
				href="/"
				className={styles.title}
			>
				<div className={styles.logo}></div>
				<span className={styles.titleText}>{siteTitle}</span>
			</Link>
			<span className={styles.subtitle}>{siteSubtitle}</span>
		</header>
	);
};
