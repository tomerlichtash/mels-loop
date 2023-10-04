import React from "react";
import { default as NextLink } from "next/link";
import classNames from "classnames";
import styles from "./Link.module.scss";

import type { LinkProps } from "./types";

const Link = ({
	label,
	href,
	target,
	children,
	className,
}: LinkProps): JSX.Element => (
	<NextLink
		href={href}
		target={target}
		className={classNames([styles.root, className])}
	>
		{label || children}
	</NextLink>
);

export default Link;
