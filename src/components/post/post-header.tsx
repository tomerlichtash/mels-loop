import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button, TimeFormat } from "../ui";
import { classes } from "../../pages/page-base.st.css";
import { classes as postClasses } from "./post.st.css";

export interface IPostHeader extends ComponentProps {
	title: string;
	date: Date;
	locale: string;
	path: string;
	author: string;
}

export const PostHeader = ({
	title,
	date,
	locale,
	path,
}: IPostHeader): JSX.Element => {
	return (
		<header className={postClasses.header}>
			<h2 className={classes.topic}>
				<Button label={title} link={`/${path}`} className={classes.button} />
			</h2>
			<div className={classes.paragraph}>
				{date && (
					<TimeFormat dateStr={date} locale={locale} className={classes.date} />
				)}
			</div>
		</header>
	);
};

export default PostHeader;
