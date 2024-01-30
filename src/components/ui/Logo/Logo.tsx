import React from "react";
import styles from "./Logo.module.scss";
import classNames from "classnames";

type LogoProps = {
	className?: string;
};

const Logo = ({ className }: LogoProps) => (
	<span className={classNames(styles.root, className)}></span>
);

export default Logo;
