import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { TextDirection } from "../../interfaces/locale-context";
import { IBibliographySource } from "../bibliography/bibliography";
import Bibliography from "../bibliography";

export type NoteViews = "note" | "ref";

export interface INoteProps extends ComponentProps {
	type: NoteViews;
	contents: React.ReactElement[];
	label?: string;
	title?: string;
	term?: string;
	sources?: IBibliographySource[];
	biblgraphyLabel?: string;
	textDirection: TextDirection;
}

export const Note = ({
	type,
	label,
	term,
	contents,
	title,
	sources,
	textDirection,
	biblgraphyLabel,
	className,
}: INoteProps): JSX.Element => {
	return (
		<div className="note">
			{type === "ref" && (
				<div className="header">
					<div className="topic">{label}</div>
					<div className="title">{title}</div>
					<div className="term">{term}</div>
				</div>
			)}
			<div className="content">{contents}</div>
			{sources && (
				<Bibliography
					sources={sources}
					label={biblgraphyLabel}
					className="bibliography"
				/>
			)}
		</div>
	);
};

export default Note;
