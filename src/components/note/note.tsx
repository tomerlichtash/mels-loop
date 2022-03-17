import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { st, classes } from "./note.st.css";

export type NoteViews = "note" | "ref";

export interface IBibliographySource {
	name: string;
	url: string;
	author?: string;
}

export interface INoteProps extends ComponentProps {
	type: NoteViews;
	contents: React.ReactElement[];
	title?: string;
	sources?: IBibliographySource[];
}

export const Note = ({
	type,
	contents,
	title,
	sources,
}: INoteProps): JSX.Element => {
	const getSourceList = () => {
		if (!sources) {
			return false;
		}
		return (
			<span className={classes.sourceList}>
				{sources.map(({ name, url }, index: number) => {
					return (
						<Button
							key={`source-id-${index}`}
							label={name}
							link={url}
							target="_blank"
						/>
					);
				})}
			</span>
		);
	};
	return (
		<article className={st(classes.root, { type })}>
			{type === "ref" && (
				<header>
					<div>{type}</div>
					<div className={classes.title}>{title}</div>
				</header>
			)}
			<div>{contents}</div>
			{sources && <footer>{getSourceList()}</footer>}
		</article>
	);
};

export default Note;
