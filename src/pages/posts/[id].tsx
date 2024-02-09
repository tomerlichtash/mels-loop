import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import type { IPageProps } from 'types/models';
import { LoadFolderModes } from 'types/parser';
import { ContentTypes } from '../../consts';
import { mlNextUtils } from '../../lib/nextUtils';
import usePageData from '../../lib/usePageData';
import { LocaleContext } from '../../context/locale/localeContext';
import { useContext } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import BlogPost from 'components/content-layout/article-content-layout/BlogPost';
import { Layout, Link } from 'components';
import { unique } from 'utils';

export default function Doc(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const { locale, translate, textDirection } = useContext(LocaleContext);
	const { metaData } = page;
	const { title, date, author } = metaData;
	const backIcon =
		textDirection === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />;

	return (
		<Layout title={title}>
			<div className="page">
				<Link href={'/posts'}>
					{backIcon} {translate('button.back')}
				</Link>
				<BlogPost
					key={unique.id()}
					title={title}
					date={date}
					author={author}
					locale={locale}
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
