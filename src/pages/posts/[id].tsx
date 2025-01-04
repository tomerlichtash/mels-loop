import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import type { IPageProps } from 'types/models';
import { LoadFolderModes } from 'types/parser/modes';
import { ContentTypes } from 'types/content';
import { mlNextUtils } from '../../lib/next-utils/nextUtils';
import { usePageData } from '../../hooks/usePageData';
import { Container, Link } from 'components/index';
import Layout from 'layout/Layout';
import { useLocale } from 'hooks/index';
import { getIcon } from 'components/icons';
import { GenericContentLayout } from 'custom-layouts/generic-content-layout/GenericContentLayout';
import { renderElements } from 'lib/dynamicContentHelpers';
import styles from '../../custom-layouts/generic-content-layout/mixins/BlogPostLayoutMixin.module.scss';

export default function Doc(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData?.[0];
	const { t, textDirection } = useLocale();
	const { metaData } = page;
	const { title, date, author } = metaData;
	const backIcon = getIcon(
		`chevron${textDirection === 'ltr' ? 'Left' : 'Right'}`
	);
	return (
		<Layout>
			<div className="page">
				<Container alignItemsCenter>
					<Link href="/posts">
						{backIcon}
						{t('common:button:backToTarget', {
							sep: t('common:to'),
							target: t('pages:blog:title'),
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
	mlNextUtils.getFolderStaticPaths(ContentTypes.Posts, context.locales);

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) =>
	mlNextUtils.getFolderStaticProps(
		`${ContentTypes.Posts}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder
	);
