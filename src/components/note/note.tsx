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
	label?: string;
	title?: string;
	sources?: IBibliographySource[];
}

export const Note = ({
	type,
	label,
	contents,
	title,
	sources,
	className,
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
		<div className={st(classes.root, { type }, className)}>
			{type === "ref" && (
				<div className={classes.header}>
					<div className={classes.topic}>{label}</div>
					<div className={classes.title}>{title}</div>
				</div>
			)}
			<div className={classes.content}>{contents}</div>
			{sources && <div className={classes.sourceList}>{getSourceList()}</div>}
		</div>
	);
};

export default Note;
