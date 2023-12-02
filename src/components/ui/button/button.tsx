import React, { PropsWithChildren, SyntheticEvent } from "react";
import { ComponentProps } from "../../../interfaces/models";
import styles from "./Button.module.scss";
import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";

type ButtonProps = {
	title?: string;
	asChild?: boolean;
	href?: string;
	target?: "_blank";
	onClick?: (e: SyntheticEvent) => void;
};

function Button({
	asChild,
	children,
	className,
	title,
	onClick,
	...props
}: PropsWithChildren<ButtonProps> & ComponentProps) {
	const Comp = asChild && typeof children !== "string" ? Slot : "button";

	return (
		<Comp
			className={classNames(styles.root, className)}
			onClick={(e: SyntheticEvent) => onClick?.(e)}
			title={title}
			{...props}
		>
			{children}
		</Comp>
	);
}

export default Button;
