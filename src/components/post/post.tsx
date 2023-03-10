import React from "react";
import { ComponentProps, IParsedPageData } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";
import { ContentComponent } from "../content";
import { Button, TimeFormat } from "../ui";

export interface IBlogPostProps extends ComponentProps {
	title: string;
	date: Date;
	locale: string;
	author: string;
	content: IParsedPageData;
	path?: string;
}

export const Post = ({
	title,
	date,
	locale,
	author,
	path,
	content,
	className,
}: IBlogPostProps): JSX.Element => {
	return (
		<article className="post">
			<div className="section">
				<header className="header" aria-label={title} title={title}>
					<h2 className="topic">
						{path ? (
							<Button label={title} link={`/${path}`} className="button" />
						) : (
							<span className="title">{title}</span>
						)}
					</h2>
					<div className="paragraph">
						{date && (
							<TimeFormat dateStr={date} locale={locale} className="date" />
						)}{" "}
						&bull; {author}
					</div>
				</header>
				<main>
					{content.parsed.map((node) => {
						return (
							<ContentComponent
								key={mlUtils.uniqueId()}
								componentData={{ node }}
							/>
						);
					})}
				</main>
			</div>
		</article>
	);
};

export default Post;
