import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { ReactLocaleContext } from "../../contexts/locale-context";
import classNames from "classnames";
import styles from "./header.module.scss";
import { Typography } from "@mui/material";
import Link from "next/link";

export const Header = ({ className }: ComponentProps): JSX.Element => {
	const { siteTitle, siteSubtitle } = useContext(ReactLocaleContext);
	return (
		<header className={classNames([styles.root, className])}>
			<Link
				title={`${siteTitle} - ${siteSubtitle}`}
				aria-label={`${siteTitle} - ${siteSubtitle}`}
				href="/"
				className={styles.siteTitle}
			>
				<Typography variant="button">{siteTitle}</Typography>
				<div className="site-logo"></div>
			</Link>
			<Typography
				variant="caption"
				aria-label={siteSubtitle}
				className={styles.siteSubtitle}
			>
				{siteSubtitle}
			</Typography>
		</header>
	);
};
