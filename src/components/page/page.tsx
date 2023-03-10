import React from "react";
import { ComponentProps } from "../../interfaces/models";

export interface PageProps extends ComponentProps {
	nodes: React.ReactNode;
}

export const Page = ({ nodes, className }: PageProps): JSX.Element => {
	return (
		<main className="page">
			<div className="gutter">{nodes}</div>
		</main>
	);
};

export default Page;
