import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { IPageProps } from '../../types/models';
import { CONTENT_TYPES } from '../../consts';
import { mlNextUtils } from '../../lib/next-utils';
import { LoadFolderModes } from '../../types/parser';
import Layout from '../../components/layout';
import usePageData from '../../lib/usePageData';
import { mlUtils } from '../../lib/ml-utils';
import { LocaleProvider } from '../../locale/context/locale-context';
import { useContext } from 'react';
import BlogPost from '../../components/BlogPost';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link from '@components/link';

export default function Doc(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const { locale, translate, textDirection } = useContext(LocaleProvider);
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
					key={mlUtils.uniqueId()}
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

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.POSTS, context.locales);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.POSTS}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
