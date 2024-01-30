import React, { useMemo } from "react";
import Link from "next/link";
import { Button } from "@components/ui";
import styles from "./SiteTitle.module.scss";

type SiteTitleProps = {
	title?: string;
	subtitle?: string;
	linked?: boolean;
	className?: string;
	variant?: string;
};

const SiteTitle = ({
	linked,
	title,
	subtitle,
	variant,
}: SiteTitleProps): JSX.Element => {
	const label = useMemo(() => `${title} - ${subtitle}`, [title, subtitle]);

	const text = useMemo(
		() => title && <span className={styles.label}>{title}</span>,
		[title]
	);

	const link = useMemo(
		() => (
			<Button className={styles.link} asChild>
				<Link href="/">{text}</Link>
			</Button>
		),
		[text]
	);

	return (
		<div
			title={label}
			aria-label={label}
			className={styles.root}
			data-variant={variant}
		>
			{linked ? link : text}
			{subtitle && <span className={styles.subtitle}>{subtitle}</span>}
		</div>
	);
};

export default SiteTitle;
