import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { GenericPage } from 'lib/dynamic-content-utils';
import { mlNextUtils } from 'lib/next-utils/nextUtils';
import ContentTypes from 'contentTypes';
import { LoadFolderModes } from 'types/parser';
import type { IPageProps } from 'types/models';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	mlNextUtils.getFolderStaticPaths(ContentTypes.About, context.locales);

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) =>
	mlNextUtils.getFolderStaticProps(
		`${ContentTypes.Docs}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder
	);
