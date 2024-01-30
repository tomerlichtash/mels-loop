import React, { PropsWithChildren } from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Container.module.scss";
import classNames from "classnames";

type ContainerProps = {
	/** Container fixed `position` */
	sticky?: boolean;
	/** `sticky` position options */
	position?: "top" | "bottom";
	/** Add even space between container elements */
	spaceBetween?: boolean;
	/** Center container elements vertically */
	alignItemsCenter?: boolean;
	/** Full width container */
	fullWidth?: boolean;
	/** Add horizontal gutter */
	horizontalGutter?: boolean;
	/** Render container as slot  */
	asChild?: boolean;
	/** Classname */
	className?: string;
};

const Container = ({
	sticky,
	position,
	spaceBetween,
	alignItemsCenter,
	fullWidth,
	horizontalGutter,
	children,
	asChild,
	className,
	...rest
}: ContainerProps & PropsWithChildren) => {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			data-fixed-position={sticky}
			data-position={position}
			data-space-between={spaceBetween}
			data-align-items-center={alignItemsCenter}
			data-full-width={fullWidth}
			data-horizontal-gutter={horizontalGutter}
			className={classNames(styles.root, className)}
			{...rest}
		>
			{children}
		</Comp>
	);
};

export default Container;
