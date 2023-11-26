import React, { useMemo } from "react";
import { Scrollbar, List } from "@components/ui";

import styles from "./dynamic-content-layout.module.scss";

import type { LinkTarget } from "@components/ui/Link/types";
import type { ComponentProps } from "../../../interfaces/models";
import type { TextDirection } from "../../../locale/locale-context";

export type NoteViews = "note" | "ref";

export interface IBibliographySource {
	name?: string;
	url: string;
	author?: string;
}

export interface INoteProps extends ComponentProps {
	type: NoteViews;
	label?: string;
	title?: string;
	term?: string;
	sources?: IBibliographySource[];
	biblgraphyLabel?: string;
	textDirection: TextDirection;
}

const DynamicContentLayout = ({
	type,
	label,
	term,
	title,
	sources,
	biblgraphyLabel,
	textDirection,
	children,
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
			<article className={styles.article}>
				{type === "ref" && (
					<header className={styles.header}>
						<div className={styles.topic}>{label}</div>
						<div className={styles.title}>{title}</div>
						<div className={styles.term}>{term}</div>
					</header>
				)}
				<main className={styles.content}>
					{/* {contents} */}
					{children}
				</main>
				{sources && (
					<footer className={styles.footer}>
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

export default DynamicContentLayout;
