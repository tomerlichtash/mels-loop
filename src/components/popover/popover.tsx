import React, { useState } from "react";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./popover.st.css";

export interface PopOverProps extends ComponentProps {
	children: React.ReactNode;
}

export const PopOver = (props: PopOverProps): JSX.Element => {
	debugger;
	const [showPop, togglePop] = useState(false);
	// const onMouseOver = () => {};
	return (
		<div
			className={classes.root}
			onMouseOver={() => togglePop(true)}
			onMouseLeave={() => togglePop(false)}
		>
			{showPop && <div className={classes.popBox}>{props["data-content"]}</div>}
			{props.children}
		</div>
	);
};

export default PopOver;
