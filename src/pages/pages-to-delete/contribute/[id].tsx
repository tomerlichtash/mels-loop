// import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
// import { mlNextUtils } from 'lib/next-utils/nextUtils';
// import { ContentTypes } from 'types';
// import { LoadFolderModes } from 'lib/types/modes';
import GenericPage from 'components/GenericPage';
import type { IPageProps } from 'types';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

// export const getStaticPaths: GetStaticPaths = async (context) =>
// 	mlNextUtils.getFolderStaticPaths(ContentTypes.Contrib, context.locales);

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) =>
// 	mlNextUtils.getFolderStaticProps(
// 		`${ContentTypes.Contrib}/${context.params.id as string}`,
// 		context.locale,
// 		LoadFolderModes.Folder
// 	);
