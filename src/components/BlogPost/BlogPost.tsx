import React from "react";
import { mlUtils } from "../../lib/ml-utils";
import { ContentComponent } from "../content";
import { Button, DateFormat } from "@components/ui";

import type { LocaleId } from "../../locale/locale-context";
import type { ComponentProps, IParsedPageData } from "../../interfaces/models";

export interface IBlogPostProps extends ComponentProps {
	title: string;
	date: Date;
	locale: LocaleId;
	author: string;
	content: IParsedPageData;
	path?: string;
}

export const BlogPost = ({
	title,
	date,
	author,
	path,
	content,
	locale,
}: IBlogPostProps): JSX.Element => {
	return (
		<article className="post">
			<div className="section">
				<header className="header" aria-label={title} title={title}>
					<h2 className="topic">
						{path ? (
							<Button link={`/${path}`} className="button">
								{title}
							</Button>
						) : (
							<span className="title">{title}</span>
						)}
					</h2>
					<div className="paragraph">
						<DateFormat date={date} locale={locale} /> &bull; {author}
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

export default BlogPost;
