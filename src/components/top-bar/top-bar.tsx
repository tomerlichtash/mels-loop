import React from "react";
import Header from "../header";
import LocaleSelector from "../locale-selector";
import ThemeSelector from "../theme-selector";
import { Menu } from "../menu";
import styles from "./top-bar.module.scss";

export default function TopBar() {
	return (
		<div className={styles.root}>
			<div className={styles.section}>
				<Header className={styles.header} />
			</div>
			<div className={styles.section}>
				<Menu className={styles.menu} />
				<LocaleSelector className={styles.localeSelector} />
				<ThemeSelector className={styles.themeSelector} />
			</div>
		</div>
	);
}
