import React, { useContext, useMemo } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "@components/ui";
import { Logo } from "@components/site";
import styles from "./SiteTitle.module.scss";

import type { TextDirection } from "../../../locale/locale-context";
import { LocaleProvider } from "locale/context/locale-context";

type SiteTitleProps = {
	title?: string;
	subtitle?: string;
	isHome?: boolean;
	showLogo?: boolean;
	textDirection?: TextDirection;
	className?: string;
	variant?: string;
};

const SiteTitle = ({
	isHome,
	showLogo = true,
	variant,
	className,
}: SiteTitleProps): JSX.Element => {
	const { siteTitle: title, siteSubtitle: subtitle } =
		useContext(LocaleProvider);

	const label = useMemo(() => `${title} - ${subtitle}`, [title, subtitle]);

	const text = useMemo(
		() => (
			<span className={styles.title}>
				{showLogo && <Logo className={styles.logo} />}
				{title && <span className={styles.label}>{title}</span>}
			</span>
		),
		[title, showLogo]
	);

	const link = useMemo(
		() => (
			<Button className={styles.link} asChild>
				<Link href="/" title={label} aria-label={label}>
					{text}
				</Link>
			</Button>
		),
		[label, text]
	);

	return (
		<div className={classNames(styles.root, className)} data-variant={variant}>
			{isHome ? text : link}
			{subtitle && <span className={styles.subtitle}>{subtitle}</span>}
		</div>
	);
};

export default SiteTitle;
