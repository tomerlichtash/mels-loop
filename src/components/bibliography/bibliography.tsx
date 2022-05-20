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
			<div className={classes.title}>{label}</div>
			<span className={classes.list}>
				{sources.map(({ name, url, author }) => {
					const authorSuffix = author ? ` / ${author}` : "";
					return (
						<Button
							key={mlUtils.uniqueId()}
							label={`${name}${authorSuffix}`}
							link={url}
							target="_blank"
							className={classes.button}
						/>
					);
				})}
			</span>
		</div>
	);
};

export default Bibliography;
