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
	label: string;
}

export const Bibliography = ({
	sources,
	label,
	className,
}: IBibliographyProps): JSX.Element => {
	return (
		<div className={st(classes.root, className)}>
			<div className={classes.title}>{label}:</div>
			<ul className={classes.list}>
				{sources.map(({ name, url }) => {
					return (
						<li key={mlUtils.uniqueId()}>
							<Button
								label={name}
								link={url}
								target="_blank"
								className={classes.button}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Bibliography;
