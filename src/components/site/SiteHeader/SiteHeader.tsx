import React, { useMemo } from "react";
import { SiteTitle, HorizontalMenu } from "@components/site";
import styles from "./SiteHeader.module.scss";
import classNames from "classnames";

type SiteHeaderProps = {
	isHome?: boolean;
	isMobile?: boolean;
	toggleSidebar?: () => void;
	className?: string;
};

const SiteHeader = ({
	isHome,
	isMobile,
	toggleSidebar,
	className,
}: SiteHeaderProps) => {
	const title = useMemo(
		() => <SiteTitle isHome={isHome} className={styles.siteTitle} />,
		[isHome]
	);

	const menu = useMemo(
		() => <HorizontalMenu isMobile={isMobile} toggleSidebar={toggleSidebar} />,
		[isMobile, toggleSidebar]
	);

	return (
		<header className={classNames(styles.root, className)}>
			<div className={styles.content}>
				{title}
				{menu}
			</div>
		</header>
	);
};

export default SiteHeader;
