import React, { PropsWithChildren } from "react";
import { default as NextLink } from "next/link";
import classNames from "classnames";
import styles from "./Link.module.scss";

type LinkProps = {
	title?: string;
	href?: string;
	target?: "_blank";
	className?: string;
};

const Link = ({
	title,
	href,
	target,
	children,
	className,
}: LinkProps & PropsWithChildren<LinkProps>): JSX.Element => (
	<NextLink
		title={title}
		aria-label={title}
		href={href}
		target={target}
		className={classNames(styles.root, className)}
	>
		{children}
	</NextLink>
);

export default Link;
