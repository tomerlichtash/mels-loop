import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { GenericPage } from 'lib/dynamic-content-utils';
import ContentTypes from 'contentTypes';
import { mlNextUtils } from 'lib/next-utils/nextUtils';
import type { IPageProps } from 'types/models';
import { LoadFolderModes } from 'types/parser';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	mlNextUtils.getFolderStaticPaths(ContentTypes.Contact, context.locales);

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) =>
	mlNextUtils.getFolderStaticProps(
		`${ContentTypes.Contact}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder
	);
