import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { st, classes } from "./page.st.css";

export interface PageProps extends ComponentProps {
	nodes: React.ReactNode;
}

export const Page = ({ nodes, className }: PageProps): JSX.Element => {
	return <main className={st(classes.root, className)}>{nodes}</main>;
};

export default Page;
