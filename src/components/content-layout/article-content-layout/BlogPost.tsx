import React from 'react';
import { unique } from 'utils/index';
import { ContentComponent } from '../../../lib/dynamic-content-utils';
import Link from '../../link/Link';
import DateFormat from '../../date-format/DateFormat';
import { LocaleId } from 'types/locale';
import { IParsedPageData } from 'types/models';

type IBlogPostProps = {
	title: string;
	date: Date;
	locale: LocaleId;
	author: string;
	content: IParsedPageData;
	path?: string;
	className?: string;
};

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
