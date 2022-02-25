import React, { useState } from "react";
import { ComponentProps } from "../../interfaces/models";
import * as Popover from "@radix-ui/react-popover";
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
			{/* {showPop && <div className={classes.popBox}>{props["data-content"]}</div>} */}
			<Popover.Root>
				<Popover.Trigger className={classes.popOverTrigger}>
					{props.children}
				</Popover.Trigger>
				<Popover.Content side="top" align="center">
					<div className={classes.popOverContent}>
						<h1>title</h1>
						<p>some text some text some text some text some text some text </p>
						<Popover.Close>Close</Popover.Close>
					</div>
					<Popover.Arrow />
				</Popover.Content>
			</Popover.Root>
		</div>
	);
};

export default PopOver;
