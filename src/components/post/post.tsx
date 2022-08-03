import React from "react";
import { ComponentProps, IParsedPageData } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";
import { ContentComponent } from "../content";
import { TimeFormat } from "../ui";
import { st, classes } from "../../pages/page-base.st.css";
import { classes as postClasses } from "./post.st.css";

export interface IBlogPostProps extends ComponentProps {
	title: string;
	date: Date;
	locale: string;
	path: string;
	author: string;
	content: IParsedPageData;
}

export const Post = ({
	title,
	date,
	locale,
	author,
	content,
	className,
}: IBlogPostProps): JSX.Element => {
	return (
		<article className={st(classes.root, postClasses.root, className)}>
			<header className={classes.header} aria-label={title} title={title}>
				<h2 className={classes.topic}>{title}</h2>
				<div className={classes.paragraph}>
					{date && (
						<TimeFormat
							dateStr={date}
							locale={locale}
							className={classes.date}
						/>
					)}{" "}
					&bull; {author}
				</div>
			</header>
			<main className={classes.section}>
				{content.parsed.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							className={classes.contentComponent}
							componentData={{ node }}
						/>
					);
				})}
			</main>
		</article>
	);
};

export default Post;
