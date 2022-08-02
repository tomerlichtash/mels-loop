import React from "react";
import { ComponentProps, IParsedPageData } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";
import { ContentComponent } from "../content";
import { Button, TimeFormat } from "../ui";
// import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "../../pages/page-base.st.css";
import { classes as postClasses } from "./post.st.css";

export interface IBlogPostProps extends ComponentProps {
	title: string;
	date: Date;
	locale: string;
	path: string;
	content: IParsedPageData;
}

export const Post = ({
	title,
	date,
	locale,
	path,
	content,
	className,
}: IBlogPostProps): JSX.Element => {
	// const { siteTitle, siteSubtitle, textDirection } =
	// 	useContext(ReactLocaleContext);
	return (
		<div className={st(classes.root, postClasses.root, className)}>
			<article className={classes.wrapper}>
				<header className={classes.header}>
					<h2 className={classes.topic}>
						<Button
							label={title}
							link={`/${path}`}
							className={classes.button}
						/>
					</h2>
					{date && (
						<TimeFormat
							dateStr={date}
							locale={locale}
							className={classes.date}
						/>
					)}
				</header>
				<main className={classes.dada}>
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
		</div>
	);
};

export default Post;
