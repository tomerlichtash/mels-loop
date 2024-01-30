import React, { PropsWithChildren } from "react";
import { ComponentProps } from "../../../interfaces/models";
import { PopoverTrigger as Trigger } from "@components/primitives";
import styles from "./PopoverTrigger2.module.scss";

const PopoverTrigger = ({
	children,
}: PropsWithChildren<ComponentProps>): JSX.Element => (
	<Trigger asChild>
		<span className={styles.root}>{children}</span>
	</Trigger>
);

export default PopoverTrigger;
