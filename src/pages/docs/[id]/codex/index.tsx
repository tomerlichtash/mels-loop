// import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
// import { mlNextUtils } from 'lib/next-utils/nextUtils';
// import { ContentTypes } from 'types';
// import { createPopoverLinksNodeProcessor } from 'lib/markdown-utils/next-utils/processors/createPopoverLinksNodeProcessor';
import GenericPage from 'components/GenericPage';
// import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';
import type { IPageProps } from 'types';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

// export const getStaticPaths: GetStaticPaths = async (context) =>
// 	mlNextUtils.getFolderStaticPaths(ContentTypes.Docs, context.locales);

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
// 	return mlNextUtils.getFolderStaticProps(
// 		`${ContentTypes.Docs}/${context.params.id as string}/codex`,
// 		context.locale,
// 		LoadFolderModes.Folder,
// 		{
// 			contentMode: LoadContentModes.Full,
// 			nodeProcessors: [createPopoverLinksNodeProcessor()]
// 		}
// 	);
// };
