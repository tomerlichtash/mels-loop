import React, { PropsWithChildren, useMemo } from "react";
import { Scrollbar, List } from "@components/ui";
import type { TextDirection } from "@locale/index";
import styles from "./dynamic-content-layout.module.scss";

type ViewType = "note" | "ref";

type SourceProps = {
	name?: string;
	url: string;
	author?: string;
};

type DynamicLayoutProps = {
	type: ViewType;
	label?: string;
	title?: string;
	term?: string;
	sources?: SourceProps[];
	sourcesLabel?: string;
	textDirection: TextDirection;
};

const DynamicContentLayout = ({
	type,
	label,
	term,
	title,
	sources,
	sourcesLabel,
	textDirection,
	children,
}: PropsWithChildren<DynamicLayoutProps>): JSX.Element => {
	const mappedSources = useMemo(
		() =>
			sources &&
			sources.map(({ name, author, ...rest }) => {
				const authorSuffix = author ? ` / ${author}` : "";
				return {
					label: `${name}${authorSuffix}`,
					target: "_blank",
					...rest,
				};
			}),
		[sources]
	);

	return (
		<Scrollbar textDirection={textDirection}>
			<div className={styles.root}>
				<article className={styles.article}>
					{type === "ref" && (
						<header className={styles.header}>
							<div className={styles.topic}>{label}</div>
							<div className={styles.title}>{title}</div>
							<div className={styles.term}>{term}</div>
						</header>
					)}
					<main className={styles.content}>{children}</main>
					{sources && (
						<footer className={styles.footer}>
							<List
								items={mappedSources}
								label={`${sourcesLabel}:`}
								className={styles.bibliography}
							/>
						</footer>
					)}
				</article>
			</div>
		</Scrollbar>
	);
};

export default DynamicContentLayout;
