import React, { PropsWithChildren } from "react";
import { ComponentProps } from "../../../interfaces/models";
import styles from "./Container.module.scss";

function Container({ children, ...props }: PropsWithChildren<ComponentProps>) {
	return (
		<div className={styles.root} {...props}>
			{children}
		</div>
	);
}

export default Container;
