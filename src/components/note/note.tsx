import React, { useMemo } from "react";
import { Scrollbar, List } from "@components/ui";

import styles from "./Note.module.scss";

import type { LinkTarget } from "@components/ui/Link/types";
import type { ComponentProps } from "../../interfaces/models";
import type { TextDirection } from "../../locale/locale-context";

export type NoteViews = "note" | "ref";

export interface IBibliographySource {
	name?: string;
	url: string;
	author?: string;
}

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

const Note = ({
	type,
	label,
	term,
	contents,
	title,
	sources,
	biblgraphyLabel,
	textDirection,
}: INoteProps): JSX.Element => {
	const mappedSources = useMemo(
		() =>
			sources &&
			sources.map(({ name, author, ...rest }) => {
				const authorSuffix = author ? ` / ${author}` : "";
				return {
					label: `${name}${authorSuffix}`,
					target: "_blank" as LinkTarget,
					...rest,
				};
			}),
		[sources]
	);

	return (
		<Scrollbar className={styles.root} textDirection={textDirection}>
			<article>
				{type === "ref" && (
					<header className={styles.header}>
						<div className={styles.topic}>{label}</div>
						<div className={styles.title}>{title}</div>
						<div className={styles.term}>{term}</div>
					</header>
				)}

				<main className={styles.content}>{contents}</main>

				{sources && (
					<footer>
						<List
							items={mappedSources}
							label={`${biblgraphyLabel}:`}
							className={styles.bibliography}
						/>
					</footer>
				)}
			</article>
		</Scrollbar>
	);
};

export default Note;
