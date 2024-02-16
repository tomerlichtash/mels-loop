import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { GenericPage } from 'lib/dynamic-content-utils';
import { mlNextUtils } from 'lib/next-utils/nextUtils';
import { ContentTypes } from 'types/content';
import { LoadFolderModes } from 'types/parser/modes';
import { IPageProps } from 'types/models';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	mlNextUtils.getFolderStaticPaths(ContentTypes.Contrib, context.locales);

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) =>
	mlNextUtils.getFolderStaticProps(
		`${ContentTypes.Contrib}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder
	);
