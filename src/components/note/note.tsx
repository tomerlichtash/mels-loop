import React from "react";
import { ComponentProps } from "../../interfaces/models";
import Bibliography from "../bibliography";
import { IBibliographySource } from "../bibliography/bibliography";
import { ScrollArea } from "../note/scrollbar";
import { st, classes } from "./note.st.css";

export type NoteViews = "note" | "ref";

export interface INoteProps extends ComponentProps {
	type: NoteViews;
	contents: React.ReactElement[];
	label?: string;
	title?: string;
	term?: string;
	sources?: IBibliographySource[];
}

export const Note = ({
	type,
	label,
	term,
	contents,
	title,
	sources,
	className,
}: INoteProps): JSX.Element => {
	return (
		<ScrollArea asChild>
			<div className={st(classes.root, { type }, className)}>
				{type === "ref" && (
					<div className={classes.header}>
						<div className={classes.topic}>{label}</div>
						<div className={classes.title}>{title}</div>
						<div className={classes.term}>{term}</div>
					</div>
				)}
				{contents}
				<Bibliography sources={sources} />
			</div>
		</ScrollArea>
	);
};

export default Note;
