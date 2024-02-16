import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import type { IPageProps } from 'types/models';
import { LoadFolderModes } from 'types/parser/modes';
import { ContentTypes } from 'types/content';
import { mlNextUtils } from '../../lib/next-utils/nextUtils';
import { usePageData } from '../../hooks/usePageData';
import BlogPost from '../../custom-layouts/article-content-layout/BlogPost';
import { Link } from 'components/index';
import { unique } from 'utils/index';
import Layout from 'layout/Layout';
import { useLocale } from 'hooks/index';
import { getIcon } from 'components/icons';

export default function Doc(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const { t, lang, textDirection } = useLocale();
	const { metaData } = page;
	const { title, date, author } = metaData;
	const backIcon = getIcon(
		`chevron${textDirection === 'ltr' ? 'Left' : 'Right'}`
	);
	return (
		<Layout>
			<div className="page">
				<Link href={'/posts'}>
					{backIcon} {t('blog:button:back')}
				</Link>
				<BlogPost
					key={unique.id()}
					title={title}
					date={date}
					author={author}
					locale={lang}
					content={page}
				/>
			</div>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	mlNextUtils.getFolderStaticPaths(ContentTypes.Posts, context.locales);

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) =>
	mlNextUtils.getFolderStaticProps(
		`${ContentTypes.Posts}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder
	);
