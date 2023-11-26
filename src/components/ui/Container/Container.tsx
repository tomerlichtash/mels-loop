import React, { SyntheticEvent } from "react";
import { ComponentProps } from "../../../interfaces/models";
import styles from "./Container.module.scss";
import classNames from "classnames";

export interface ContainerProps extends ComponentProps {
	title?: string;
	asChild?: boolean;
}

function Container({ children, className, ...props }: ContainerProps) {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			{children}
		</div>
	);
}

export default Container;
