import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { mlUtils } from "../../lib/ml-utils";
import { st, classes } from "./bibliography.st.css";

export interface IBibliographySource {
	name: string;
	url: string;
	author?: string;
}

export interface IBibliographyProps extends ComponentProps {
	sources?: IBibliographySource[];
}

export const Bibliography = ({
	sources,
	className,
}: IBibliographyProps): JSX.Element => {
	if (!sources) {
		return;
	}

	return (
		<div className={st(classes.root, className)}>
			<span className={classes.list}>
				{sources.map(({ name, url }) => {
					return (
						<Button
							key={mlUtils.uniqueId()}
							label={name}
							link={url}
							target="_blank"
						/>
					);
				})}
			</span>
		</div>
	);
};

export default Bibliography;
