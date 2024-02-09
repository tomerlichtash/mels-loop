import React from 'react';
import { unique } from 'utils';
import { ContentComponent } from '../../../lib/dynamic-content';
import Link from '../../link/Link';
import DateFormat from '../../date-format/DateFormat';
import type { IBlogPostProps } from '../types';

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
							<Link href={`/${path}`} className="button">
								{title}
							</Link>
						) : (
							<span className="title">{title}</span>
						)}
					</h2>
					<div className="paragraph">
						<DateFormat date={date} locale={locale} /> &bull; {author}
					</div>
				</header>
				<main>
					{content.parsed.map((node) => (
						<ContentComponent key={unique.id()} componentData={{ node }} />
					))}
				</main>
			</div>
		</article>
	);
};

export default BlogPost;
