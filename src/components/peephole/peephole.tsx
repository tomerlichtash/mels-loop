import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { classes } from "./peephole.st.css";

export interface IPosition {
	x?: number;
	y?: number;
}

export interface IPeepholeProps extends ComponentProps {
	position: IPosition;
	toggle: boolean;
	closeFunc: () => void;
}

export const Peephole = ({
	toggle,
	position,
	closeFunc,
}: IPeepholeProps): JSX.Element => {
	if (!toggle) {
		return <span></span>;
	}
	return (
		<div className={classes.root} style={{ top: position.y }}>
			<div onClick={() => closeFunc()}>X</div>
			<div className={classes.content}>peephole test</div>
		</div>
	);
};

export default Peephole;
