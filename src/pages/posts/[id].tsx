import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { ContentTypes, type IPageProps } from 'types';
import { getFolderStaticPaths, getFolderStaticProps } from '../../lib/next-utils';
import { useLocale, usePageData } from 'hooks';
import { Container, Link } from '@melsloop/ml-components';
import Layout from 'layout/Layout';
import { renderElements } from 'helpers';
import styles from 'components/GenericContentLayout/mixins/BlogPostLayoutMixin.module.css';
import { GenericContentLayout } from 'components/GenericContentLayout/GenericContentLayout';
import { LoadFolderModes } from 'lib/types/modes';

export default function Doc(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const { t } = useLocale();
	const { metaData } = page;
	const { title, date, author } = metaData;
	// const backIcon = getIcon(`chevron${textDirection === 'ltr' ? 'Left' : 'Right'}`);
	return (
		<Layout>
			<div className="page">
				<Container>
					<Link href={'/posts'}>
						{/* {backIcon} */}
						{t('common:button:backToTarget', {
							sep: t('common:to'),
							target: t('pages:blog:title')
						})}
					</Link>
				</Container>
				<GenericContentLayout
					key={title}
					title={title}
					date={date}
					author={author}
					className={styles.root}
				>
					{renderElements(pageData)}
				</GenericContentLayout>
			</div>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	getFolderStaticPaths(ContentTypes.Posts, context.locales);

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) =>
	getFolderStaticProps(
		`${ContentTypes.Posts}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder
	);
