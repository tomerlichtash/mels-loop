import React, { useContext } from "react";
import Header from "../header";
import LocaleSelector from "../locale-selector";
import ThemeSelector from "../theme-selector";
import { Menu } from "../menu";
import styles from "./top-bar.module.scss";
import classNames from "classnames";
import { ReactLocaleContext } from "../../contexts/locale-context";

export default function TopBar({ isMobile }) {
	const { textDirection } = useContext(ReactLocaleContext);
	return (
		<div className={styles.root} data-text-direction={textDirection}>
			<div className={styles.content}>
				<div className={styles.section}>
					<Header className={styles.header} />
				</div>
				<div className={styles.section}>
					<Menu
						className={classNames([styles.item, styles.menu])}
						isMobile={isMobile}
					/>
					{!isMobile && (
						<>
							<LocaleSelector
								className={classNames([styles.item, styles.localeSelector])}
							/>
							<ThemeSelector
								className={classNames([styles.item, styles.themeSelector])}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
