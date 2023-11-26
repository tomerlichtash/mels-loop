import React from "react";
import {
	ScrollAreaProps,
	ScrollArea,
	ScrollViewport,
	ScrollBar,
	ScrollBarThumb,
	ScrollBarCorner,
} from "@components/primitives";
import classNames from "classnames";
import styles from "./Scrollbar.module.scss";

export const Scrollbar = ({
	children,
	height,
	textDirection,
	className,
}: ScrollAreaProps) => {
	return (
		<ScrollArea
			className={classNames(styles.root, className)}
			type="always"
			dir={textDirection}
			style={{ height }}
		>
			<ScrollViewport className={styles.ScrolLAreaViewport}>
				{children}
			</ScrollViewport>
			<ScrollBar className={styles.ScrollAreaScrollbar} orientation="vertical">
				<ScrollBarThumb className={styles.ScrollAreaThumb} />
			</ScrollBar>
			<ScrollBar
				className={styles.ScrollAreaScrollbar}
				orientation="horizontal"
			>
				<ScrollBarThumb className={styles.ScrollAreaThumb} />
			</ScrollBar>
			<ScrollBarCorner className={styles.ScrollAreaCorner} />
		</ScrollArea>
	);
};

export default Scrollbar;
