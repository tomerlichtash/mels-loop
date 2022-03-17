import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { st, classes } from "./note.st.css";

export type FootnoteType = "note" | "ref";

export interface IFootnoteSource {
	name: string;
	url: string;
}

export interface FootnoteProps extends ComponentProps {
	type: FootnoteType;
	contents: React.ReactElement[];
	title?: string;
	sources?: IFootnoteSource[];
}

export const Note = ({
	type,
	contents,
	title,
	sources,
}: FootnoteProps): JSX.Element => {
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
					<div>Glossary</div>
					<div className={classes.title}>{title}</div>
				</header>
			)}
			<div>{contents}</div>
			{sources && <footer>{getSourceList()}</footer>}
		</article>
	);
};

export default Note;
