import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import styles from "./scrollbar.module.scss";

export function Scrollable({
	children,
	orientation = "vertical",
	height = "100vh",
	className,
}: ScrollAreaProps) {
	const { textDirection } = useContext(ReactLocaleContext);
	return (
		<ScrollArea.Root
			className={classNames([styles.root, className])}
			type="always"
			dir={textDirection}
		>
			<ScrollArea.Viewport>{children}</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				className="ScrollAreaScrollbar"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="ScrollAreaThumb" />
			</ScrollArea.Scrollbar>
			<ScrollArea.Scrollbar
				className="ScrollAreaScrollbar"
				orientation="horizontal"
			>
				<ScrollArea.Thumb className="ScrollAreaThumb" />
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner className="ScrollAreaCorner" />
		</ScrollArea.Root>
	);
}
