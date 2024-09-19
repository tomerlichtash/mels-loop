// import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
// import { mlNextUtils } from 'lib/next-utils/nextUtils';
// import { ContentTypes } from 'types';
import { type IPageProps } from 'types';
import GenericPage from 'components/GenericPage';
// import { LoadFolderModes } from 'lib/types/modes';
// import { mlFolderStaticProps } from 'lib/mlGetStaticProps';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

// export const getStaticPaths: GetStaticPaths = async (context) =>
// 	mlNextUtils.getFolderStaticPaths(ContentTypes.About, context.locales);

// export const getStaticProps: GetStaticProps = mlFolderStaticProps(ContentTypes.Docs);

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) =>
// 	mlNextUtils.getFolderStaticProps(
// 		`${ContentTypes.Docs}/${context.params.id as string}`,
// 		context.locale,
// 		LoadFolderModes.Folder
// 	);
