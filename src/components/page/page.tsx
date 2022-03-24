import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import Peephole from "../peephole";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { st, classes } from "./page.st.css";

export interface PageProps extends ComponentProps {
	nodes: React.ReactNode;
}

export const Page = ({ nodes, className }: PageProps): JSX.Element => {
	const { showPeephole, togglePeephole, peepholePosition } =
		useContext(ReactLayoutContext);
	return (
		<main className={st(classes.root, className)}>
			<div className={classes.gutter}>{nodes}</div>
			<aside className={classes.aside}>
				aside
				<Peephole
					toggle={showPeephole}
					position={peepholePosition}
					closeFunc={togglePeephole}
				/>
			</aside>
		</main>
	);
};

export default Page;
